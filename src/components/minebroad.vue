<template>
  <div class="mine-body">
    <div class="info">
      <div class="timer">时间：{{timestr}}</div>
      <div class="reset">
        <button @click="reset">重来</button>
      </div>
      <div class="mine-count">剩余：{{level.mineTotal - mineCount.mark}}</div>
    </div>
    <div class="board">
      <div v-for="(row,i) of mineMap" :key="i" class="row">
        <cell
          v-for="data of row"
          :key="`${ data.row }-${ data.index }`"
          :data="data"
          @handleMark="handleMark"
          @handleOpen="handleOpen"
        ></cell>
      </div>
    </div>
  </div>
</template>

<script>
import Cell from "./cell.vue";

export default {
  name: "Orzminesweeper",
  props: { level: { type: Object, required: true } },
  components: { Cell },
  data() {
    return {
      mineMap: [],
      mineCount: { open: 0, mark: 0 },
      gameover: false,
      state: { dead: false, win: false, time: 0 },
      interval: undefined,
      timestr: "00:00"
    };
  },
  computed: {
    timer() {
      return !(
        !(this.mineCount.mark || this.mineCount.open) ||
        this.state.dead ||
        this.state.win
      );
    },
    newlevel() {
      return this.level.size;
    }
  },
  watch: {
    newlevel: function() {
      this.initboard();
    },
    timer(truthy) {
      if (truthy) {
        this.state.time = 1;
        this.interval = setInterval(() => {
          this.state.time++;
          const time = this.state.time;
          let min = ("0" + Math.floor(time / 60)).slice(-2);
          let sec = ("0" + (time % 60)).slice(-2);
          this.timestr = `${min}:${sec}`;
        }, 1000);
      } else {
        this.interval = clearInterval(this.interval);
      }
    }
  },
  methods: {
    reset() {
      this.state = { dead: false, win: false, time: 0 };
      this.mineCount = { open: 0, mark: 0 };
      this.interval = clearInterval(this.interval);
      this.timestr = "00:00";
      this.initboard();
    },
    initboard() {
      this.mineMap = this.createmines();
    },
    createmines() {
      const {
        mineTotal,
        size: [height, width]
      } = this.level;
      const empty = new Array(height * width - mineTotal).fill("false");
      const mines = new Array(mineTotal).fill("true");

      let mineMap = [];
      const shuffled = mines.concat(empty).sort(() => {
        return Math.random() > 0.5 ? -1 : 1;
      });
      for (let i = 0; i < shuffled.length; i += width) {
        const row = i / width;
        mineMap.push(
          shuffled
            .slice(i, i + width)
            .map((isMine, index) => ({ row: row, index, isMine }))
        );
      }
      for (let row = 0; row < height; row++) {
        for (let index = 0; index < width; index++) {
          const posMine = [
            [row - 1, index - 1],
            [row - 1, index],
            [row - 1, index + 1],
            [row, index - 1],
            [row, index + 1],
            [row + 1, index - 1],
            [row + 1, index],
            [row + 1, index + 1]
          ];
          let adjMine = 0;
          for (let i = 0; i < 8; i++) {
            let _row = posMine[i][0];
            let _column = posMine[i][1];

            if (
              _row < 0 ||
              _column < 0 ||
              _row > height - 1 ||
              _column > width - 1
            ) {
              continue;
            }
            if (mineMap[_row][_column].isMine === "true") {
              adjMine++;
            }
          }
          mineMap[row][index] = {
            row: row,
            index: index,
            adjMine: adjMine,
            isMine: mineMap[row][index].isMine,
            isOpen: false,
            isMark: false,
            isTrigger: false
          };
        }
      }
      return mineMap;
    },
    handleOpen(row, index) {
      if (this.state.dead || this.state.win) return;
      const {
        size: [height, width]
      } = this.level;
      if (row < 0 || index < 0 || row > height - 1 || index > width - 1) return;

      let item = this.mineMap[row][index];
      if (item.isOpen) return;
      if (item.isMark) {
        this.mineMap[row][index].isMark = false;
        this.mineCount.mark--;
      }
      this.mineMap[row][index].isOpen = true;
      this.mineCount.open++;
      this.checkwin();
      if (item.isMine === "true") {
        this.mineMap[row][index].isTrigger = true;
        this.GameOver();
        return;
      }
      if (item.adjMine !== 0) return;

      this.handleOpen(row - 1, index);
      this.handleOpen(row + 1, index);
      this.handleOpen(row, index + 1);
      this.handleOpen(row, index - 1);
    },
    handleMark(row, index) {
      if (this.state.dead || this.state.win) return;
      const item = this.mineMap[row][index];
      if (this.level.mineTotal - this.mineCount.mark - 1 < 0 || item.isOpen)
        return;
      this.mineCount.mark += item.isMark ? -1 : 1;

      this.mineMap[row][index].isMark = !this.mineMap[row][index].isMark;
    },
    GameOver() {
      this.state.dead = true;
      //触发所有的雷
      for (let row in this.mineMap) {
        let rowdata = this.mineMap[row];
        for (let index in rowdata) {
          const data = this.mineMap[row][index];
          if (data.isMine === "true") {
            data.isOpen = true;
            
          }
        }
      }
    },
    checkwin() {
      const {
        size: [width, height],
        mineTotal
      } = this.level;
      const totalCell = width * height;

      if (this.mineCount.open + mineTotal === totalCell) {
        this.state.win = true;
        console.log("win!");
      }
    }
  },
  mounted() {
    this.initboard();
  },
  destroyed() {
    clearInterval(this.interval);
  }
};
</script>

<style lang="less">
.mine-body {
  display: flex;
  flex-direction: column;
  align-items: center;
  .info {
    display: flex;
    justify-content: space-around;
    background-color: #eaeaef;
    box-shadow: 1px 1px 14px;
    margin-bottom: 20px;
    width: 100%;
    div {
      display: inline-block;
      margin: 20px;
    }
    .reset {
      button {
        border-radius: 4px;
        cursor: pointer;
      }
    }
  }
  .board {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    background-color: #eaeaef;
    box-shadow: 1px 1px 14px;
    .row {
      display: flex;
    }
  }
}
</style>
