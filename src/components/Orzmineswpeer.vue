<template>
  <div class="mineswpeer">
    <div class="indicator">
      <ul>
        <li class="timer">
          <i class="fa fa-clock-o" aria-hidden="true"></i>
        </li>
        <li class="reset">
          <button>
            <div class="button" @click="initboard">
              <i class="fa fa-meh-o" aria-hidden="true"></i>
            </div>
          </button>
        </li>
        <li class="mine-count">
          <i class="fa fa-bomb" aria-hidden="true"></i>
        </li>
      </ul>
    </div>

    <div class="board">
      <div v-for="row of mineMap" :key="row" class="row">
        <div
          v-for="data of row"
          :key="data"
          style="display:inline-block;border:1px solid #111;width:40px;height:40px;cursor: pointer;text-align:center"
        >{{data.mine==="true"?'O':'X'}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Orzminesweeper",
  props: { level: { type: Object, required: true } },
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
      const shuffled = mines
        .concat(empty)
        .sort(() => {
          return Math.random() > 0.5 ? -1 : 1;
        })
        .map((mine, index) => ({ mine, index }));
      console.log(shuffled);
      for (let i = 0; i < shuffled.length; i += width) {
        mineMap.push(shuffled.slice(i, i + width));
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
.indicator {
  margin: 0 auto;

  width: 600px;
  background-color: #f5f5f5;
  border-radius: 10px;
  .reset button {
    user-select: none;
    outline: none;
    -webkit-appearance: none;
    font-size: 30px;
    background-color: #f5f5f5;
    cursor: pointer;
    margin: 8px;
  }
  ul {
    padding-top: 20px;
    padding-bottom: 20px;
    text-align: center;
    li {
      vertical-align: middle;
      font-size: 30px;
      width: 30%;
      display: inline-block;
    }
  }
}
</style>
