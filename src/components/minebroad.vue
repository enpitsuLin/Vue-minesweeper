<template>
  <div class="mine-body">
    <div class="board">
      <div v-for="(row,i) of mineMap" :key="i" class="row">
        <cell v-for="data of row" :key="data.index" :data="data"></cell>
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
      mineMap: []
    };
  },
  computed: {
    newlevel() {
      return this.level.size;
    }
  },
  watch: {
    newlevel: function() {
      this.initboard();
    }
  },
  methods: {
    changelevel(item) {
      this.level = item;
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
            .map((mine, index) => ({ row: row, index, mine }))
        );
      }
      for (let row = 0; row < height; row++) {
        for (let index = 0; index < width; index++) {
          /* if (mineMap[row][index].mine === "true") {
            continue;
          } */
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
            if (mineMap[_row][_column].mine === "true") {
              adjMine++;
            }
          }
          mineMap[row][index] = {
            row: row,
            index: index,
            adjMine: adjMine,
            mine: mineMap[row][index].mine
          };
        }
      }
      return mineMap;
    }
  },
  mounted() {
    this.initboard();
  }
};
</script>

<style lang="less">
.mine-body {
  display: flex;
  flex-direction: column;
  align-items: center;
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
