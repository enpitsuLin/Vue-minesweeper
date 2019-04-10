<template>
  <div class="game">
    <Dialog :title="dialog.title" :content="dialog.content" ref="dialog"></Dialog>
    <Minebroad @showdialog="showdialog" :level="level"></Minebroad>
  </div>
</template>

<script type="text/babel">
import Minebroad from "./minebroad.vue";
import Dialog from "./dialog.vue";

export default {
  components: {
    Minebroad,
    Dialog
  },

  data() {
    return {
      levels: [
        { name: "easy", size: [9, 9], mineTotal: 10 },
        { name: "mid", size: [16, 16], mineTotal: 40 },
        { name: "hard", size: [16, 30], mineTotal: 99 }
      ],
      level: { name: "easy", size: [9, 9], mineTotal: 10 },
      dialog: { title: "", content: "" }
    };
  },
  methods: {
    showdialog(data) {
      this.dialog = data;
      this.$refs.dialog.show();
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
.game {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
