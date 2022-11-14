<template>
  <div class="dialog">
    <!-- 遮罩 -->
    <div class="dialog-cover" v-show="isShow" @click="isShow = false"></div>
    <!-- 弹窗 -->
    <dialog class="dialog-container" v-show="isShow">
      <div class="dialog-header">
        <div class="dialog-title">{{ title }}</div>
      </div>
      <div class="dialog-content" v-html="content"></div>
      <div class="dialog-footer">
        <button @click="isShow = false">关闭</button>
      </div>
    </dialog>
  </div>
</template>

<script>
  import { defineComponent } from 'vue';

  export default defineComponent({
    props: {
      content: {
        type: String,
        default: ''
      },
      title: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        isShow: false
      };
    },
    methods: {
      show() {
        this.isShow = true;
      }
    }
  });
</script>

<style lang="less" scoped>
  .dialog {
    position: relative;
    color: #2e2c2d;
    .dialog-cover {
      background: rgba(0, 0, 0, 0.2);
      position: fixed;
      z-index: 200;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
    .dialog-container {
      border: none;
      position: fixed;

      width: 80%;
      max-width: 400px;
      top: 35%;
      display: block;
      padding: 20px;
      z-index: 300;
      border-radius: 5px;
      .dialog-header {
        margin: 0;
        margin-bottom: 5px;
        .dialog-title {
          padding-left: 0;
          font-size: 16px;
          font-weight: 700;
          height: 18px;
          color: #333;
        }
      }
      .dialog-content {
        margin-top: 20px;
      }
      .dialog-footer {
        text-align: right;
        button {
          border: none;
          display: inline-block;
          line-height: 1;
          white-space: nowrap;
          cursor: pointer;
          margin: 0;
          padding: 10px 15px;
          border-radius: 4px;
          -webkit-transition-duration: 0.4s;
          transition-duration: 0.4s;
          &:hover {
            background-color: #333;
            color: white;
          }
        }
      }
    }
  }
</style>
