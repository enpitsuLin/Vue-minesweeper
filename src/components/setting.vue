<template>
  <div class="setting">
    <div class="levels">
      <button class="level" @click="handleLv('easy')">简单</button>
      <button class="level" @click="handleLv('mid')">中级</button>
      <button class="level" @click="handleLv('hard')">困难</button>
      <button class="level" @click="handleLv('custom')">自定义</button>
    </div>
    <div class="size">
      雷区尺寸：
      <input type="number" v-model="size[0]" min="8" max="50" :disabled="level!=='custom'">×
      <input type="number" v-model="size[1]" min="8" max="50" :disabled="level!=='custom'">
    </div>
    <div class="mine">
      地雷数量：
      <input type="number" v-model="mine" min="1" :max="maxmine" :disabled="level!=='custom'">
    </div>
    <div class="bottom">
      <button class="confirm" @click="confirm">确定</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      level: "",
      size: [10, 10],
      mine: 1
    };
  },
  methods: {
    maxmine() {
      return this.size[0] * this.size[1] - 1;
    },
    handleLv(item) {
      this.level = item;
      let height = item === "easy" ? 10 : 16,
        width = item === "easy" ? 10 : item === "mid" ? 16 : 30,
        mine = item === "easy" ? 10 : item === "mid" ? 40 : 99;

      if (item === "custom") {
        (height = 10), (width = 10), (mine = 10);
      }
      this.size = [height, width];
      this.mine = mine;
    },
    confirm() {
      const data = { name: this.level, size: this.size, mineTotal: this.mine };
      this.$emit("handleStart", data);
    }
  }
};
</script>

<style lang="less" scoped>
.setting {
  * {
    margin-bottom: 20px;
  }
  margin-top: 30px;
  box-shadow: 1px 1px 14px;
  padding: 30px 50px;
  .levels {
    display: flex;
    justify-content: space-between;
  }
  .bottom {
    text-align: right;
    margin-bottom: 0;
  }
  input {
    width: 150px;
    text-indent: 80px;
    outline: 0;
    border: 1px solid #000;
    border-radius: 2px;
    height: 28px;
    text-align: center;
    transition-duration: 0.4s;
    &:focus {
      box-shadow: 2px 2px 8px #111;
      text-indent: 70px;
    }
    &:disabled {
      background-color: #64646473;
    }
  }
}
</style>