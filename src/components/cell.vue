<template>
  <div
    class="cell"
    :class="{ open: data.isOpen, mark: data.isMark, trigger: data.isTrigger }"
    @click.left="handleOpen"
    @click.right="handleMark"
  >
    {{ data.isOpen ? (data.isMine === 'true' ? '💣' : data.adjMine) : data.isMark ? '🚩' : '' }}
  </div>
</template>

<script>
  import { defineComponent } from 'vue';

  export default defineComponent({
    name: 'cell',
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
        this.$emit('handleOpen', row, index);
      },
      //handle right cilck
      handleMark() {
        const { row, index } = this.data;
        event.preventDefault();
        this.$emit('handleMark', row, index);
      },
      mousedown($event, { idx }) {
        // eslint-disable-next-line no-console
        console.log($event);
        // eslint-disable-next-line no-console
        console.log(idx);
      }
    }
  });
</script>

<style lang="less">
  .cell {
    background-color: rgba(0, 0, 0, 0.4);
    color: #eeeeee;
    border-radius: 3px;
    margin: 2px;
    width: 32px;
    height: 32px;
    line-height: 32px;
    cursor: pointer;
    text-align: center;
    transition-duration: 0.4s;
    &.open {
      background-color: rgba(0, 0, 0, 0.7);
      &.mark {
        background-color: rgb(138, 106, 2);
      }
    }
    &.mark {
      background-color: rgba(198, 192, 147, 0.4);
      &:hover {
        background-color: rgba(83, 83, 71, 0.5);
      }
    }
    &.trigger {
      background-color: red;
      box-shadow: inset -1px -1px 8px #333;
    }
    &:hover {
      box-shadow: inset -1px -1px 8px #333;
      background-color: rgba(0, 0, 0, 0.3);
    }
  }
</style>
