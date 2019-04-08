<template>
  <div
    class="cell"
    :class="{'open':data.isOpen,'mark':data.isMark}"
    @click.left="handleOpen"
    @click.right="handleMark"
  >{{data.isOpen?(data.isMine==="true"?"💣":data.adjMine):(data.isMark?"🚩":"")}}</div>
</template>

<script>
export default {
  name: "cell",
  props: {
    data: Object //data {row,index,isOpen,isMark,mine}
  },
  data() {
    return {};
  },
  methods: {
    //handle left cilck
    handleOpen() {
      const { row, index } = this.data;
      this.$emit("handleOpen", row, index);
    },
    //handle right cilck
    handleMark() {
      const { row, index } = this.data;
      event.preventDefault();
      this.$emit("handleMark", row, index);
    }
  }
};
</script>

<style lang="less">
.cell {
  background-color: rgba(0, 0, 0, 0.4);
  color: #eeeeee;
  border-radius: 3px;
  margin: 2px;
  width: 32px;
  height: 32px;
  cursor: pointer;
  text-align: center;
  &.open {
    background-color: rgba(0, 0, 0, 0.7);
  }
  &.mark {
    background-color: rgba(198, 192, 147, 0.4);
    &:hover {
      background-color: rgba(0, 0, 0, 0.5);
    }
  }
  &:hover {
    background-color: rgba(0, 0, 0, 0.3);
  }
}
</style>
