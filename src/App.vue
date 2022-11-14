<template>
  <div>
    <Game />
  </div>
</template>

<script>
  import { defineComponent } from 'vue';
  import Game from './components/game.vue';

  export default defineComponent({
    components: { Game }
  });
</script>
