<script>
import NavBar from "@/components/NavBar.vue";

export default {
  name: "App",
  components: {
    NavBar,
  },
  computed: {
    showNavBar() {
      // 在编辑器页面不显示导航栏
      return this.$route.path !== "/topology";
    },
  },
};
</script>

<template>
  <div id="app">
    <NavBar v-if="showNavBar" />
    <div class="app-content" :class="{ 'no-navbar': !showNavBar }">
      <router-view />
    </div>
  </div>
</template>

<style scoped>
.app-content {
  padding-top: 4.5rem; /* 为导航栏留出空间 */
}

.app-content.no-navbar {
  padding-top: 0; /* 编辑器页面不需要顶部间距 */
}

/* Topology 页面全屏布局调整 */
.app-content :deep(.max-w-full.min-h-screen),
.app-content :deep(.max-w-full.h-screen) {
  height: calc(100vh - 4.5rem) !important;
  min-height: calc(100vh - 4.5rem) !important;
  max-height: calc(100vh - 4.5rem) !important;
}

.app-content.no-navbar :deep(.max-w-full.min-h-screen),
.app-content.no-navbar :deep(.max-w-full.h-screen) {
  height: 100vh !important;
  min-height: 100vh !important;
  max-height: 100vh !important;
}
</style>
