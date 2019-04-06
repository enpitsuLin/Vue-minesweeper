<template>
  <div class="Orzmine">
    <div class="mine-body">
      <!--<Minemenu></Minemenu>-->
      <Orzmineswpeer :level="level"></Orzmineswpeer>
    </div>
  </div>
</template>

<script type="text/babel">
import Orzmineswpeer from "./components/Orzmineswpeer";

export default {
  components: {
    Orzmineswpeer
  },
  
  data() {
    return {
      levels: [
         { name: 'easy', size: [9, 9], mineTotal: 10 },
        { name: 'mid', size: [16, 16], mineTotal: 40 },
        { name: 'hard', size: [16, 30], mineTotal: 99 }
      ],
      level: { name: 'easy', size: [9, 9], mineTotal: 10 },
    };
  }
};
</script>

<style lang="less">
* {
  margin: 0;
  padding: 0;
  border: 0;
  box-sizing: border-box;
}
ol,
ul,
li {
  list-style: none;
}
</style>
