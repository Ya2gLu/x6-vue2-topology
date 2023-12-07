<!--
 * @Author       : ya2glu@163.com
 * @Date         : 2023-05-26 09:12:49
 * @LastEditTime : 2023-08-15 09:08:40
 * @LastEditors  : ya2glu
 * @Description  : ExampleNode
 * @FilePath     : \x6-vue2-topology\src\components\Topology\src\modules\ExampleNode.vue
-->
<template>
  <div>
    <div class="container">
      <!-- <icon-park type="Server" theme="outline" size="28" /> -->
    </div>
  </div>
</template>

<script>
  // import { IconPark } from '@icon-park/vue/es/all'
  export default {
    name: 'ExampleNode',
    components: {
      // IconPark
    },
    inject: ['getNode'],
    data() {
      return {}
    },

    mounted() {
      console.log('getNode', this.getNode())
    },

    methods: {},
  }
</script>

<style lang="less" scoped>
  .container {
    width: 64px;
    height: 64px;
    background-color: #1b1b1b;
    border-radius: 15px;

    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
