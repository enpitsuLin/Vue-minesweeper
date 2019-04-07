<template>
  <div class="cell">{{data.adjMine}}</div>
</template>

<script>
export default {
  name: "cell",
  props: {
    data: Object
  },
  data() {
    return {
      opened: false
    };
  },
  computer: {}
};
</script>

<style lang="less">
.cell {
  border: 1px solid gray;
  border-radius: 2px;
  width: 40px;
  height: 40px;
  cursor: pointer;
  text-align: center;
  &:hover {
    background-color: #fff2e2;
  }
}
</style>
