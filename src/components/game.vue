<template>
  <div class="game">
    <div class="title">扫雷</div>
    <Dialog :title="dialog.title" :content="dialog.content" ref="dialog"></Dialog>
    <setting v-show="!isStart" @handleStart="handleStart"></setting>
    <Minebroad
      @showdialog="showdialog"
      v-show="isStart"
      :level="level"
      @back="back"
      ref="minebroad"
    ></Minebroad>
  </div>
</template>

<script type="text/babel">
import Minebroad from "./minebroad.vue";
import Dialog from "./dialog.vue";
import setting from "./setting";

export default {
  components: {
    Minebroad,
    Dialog,
    setting
  },

  data() {
    return {
      level: { name: "", size: [0, 0], mineTotal: 0 },
      isStart: false,
      dialog: { title: "", content: "" }
    };
  },
  methods: {
    showdialog(data) {
      this.dialog = data;
      this.$refs.dialog.show();
    },
    handleStart(data) {
      this.isStart = true;
      this.level = data;
      this.$refs.init()
    },
    back() {
      this.isStart = false;
    }
  }
};
</script>

<style lang="less">
* {
  box-sizing: border-box;
  user-select: none;
}
ol,
ul,
li {
  list-style: none;
}
a {
  text-decoration: none;
  display: block;
  -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
  -webkit-user-select: none;
  -moz-user-focus: none;
  -moz-user-select: none;
}
button {
  border: none;
  line-height: 1;
  white-space: nowrap;
  margin: 0;
  padding: 10px 15px;
  border-radius: 4px;
  cursor: pointer;
  transition-duration: 0.4s;
  &:hover {
    background-color: #333;
    color: white;
  }
}
.game {
  display: flex;
  flex-direction: column;
  align-items: center;
  .title {
    margin-top: 20px;
    text-align: center;
    font-size: 24px;
    padding: 5px;
  }
}
</style>
