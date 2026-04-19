<!--
 * @Description  : Navigation bar with glassmorphism style
 -->
<template>
  <nav class="navbar">
    <div class="navbar-container">
      <!-- Logo 区域 -->
      <div class="navbar-brand">
        <router-link to="/" class="brand-link">
          <img src="@/assets/logo.png" alt="logo" class="brand-logo" />
          <span class="brand-text">starTopoGraph</span>
        </router-link>
      </div>

      <!-- 右侧操作区 -->
      <div class="navbar-actions">
        <a-tooltip
          :title="$store.state.titleBar.theme === 'dark' ? '切换到浅色模式' : '切换到深色模式'"
          :mouseEnterDelay="0.5"
        >
          <div
            class="action-button"
            @click="toggleTheme"
          >
            <i
              :class="
                $store.state.titleBar.theme === 'dark'
                  ? 'y-solar:sun-bold'
                  : 'y-solar:moon-bold'
              "
              class="action-icon"
            ></i>
          </div>
        </a-tooltip>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapMutations } from "vuex";

export default {
  name: "NavBar",
  methods: {
    ...mapMutations("titleBar", ["toggleTheme"]),
  },
};
</script>

<style lang="less" scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 9999;
  padding: 0.75rem 1.5rem;
  backdrop-filter: blur(24px) saturate(180%);
  -webkit-backdrop-filter: blur(24px) saturate(180%);
  background: linear-gradient(
    135deg,
    rgba(20, 20, 20, 0.8) 0%,
    rgba(30, 30, 30, 0.75) 100%
  );
  border-bottom: 1px solid rgba(255, 255, 255, 0.12);
  box-shadow: 
    0 8px 32px 0 rgba(0, 0, 0, 0.4),
    inset 0 1px 0 0 rgba(255, 255, 255, 0.05);
  transition: all 0.3s ease;

  // 浅色模式
  :root:not(.dark) & {
    background: linear-gradient(
      135deg,
      rgba(255, 255, 255, 0.85) 0%,
      rgba(250, 250, 250, 0.8) 100%
    );
    border-bottom: 1px solid rgba(0, 0, 0, 0.08);
    box-shadow: 
      0 8px 32px 0 rgba(0, 0, 0, 0.12),
      inset 0 1px 0 0 rgba(255, 255, 255, 0.8);
  }

  // 深色模式
  .dark & {
    background: linear-gradient(
      135deg,
      rgba(20, 20, 20, 0.8) 0%,
      rgba(30, 30, 30, 0.75) 100%
    );
    border-bottom: 1px solid rgba(255, 255, 255, 0.12);
    box-shadow: 
      0 8px 32px 0 rgba(0, 0, 0, 0.4),
      inset 0 1px 0 0 rgba(255, 255, 255, 0.05);
  }
}

.navbar-container {
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
}

.navbar-brand {
  display: flex;
  align-items: center;
  flex-shrink: 0;

  .brand-link {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    text-decoration: none;
    color: inherit;
    transition: transform 0.2s ease;

    &:hover {
      transform: scale(1.05);
    }
  }

  .brand-logo {
    width: 2.5rem;
    height: 2.5rem;
    object-fit: contain;
  }

  .brand-text {
    font-size: 1.25rem;
    font-weight: 600;
    background: linear-gradient(135deg, #3a78db 0%, #5b9bd5 50%, #7db8e8 100%);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    color: transparent;
  }
}

.navbar-actions {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-shrink: 0;

  .action-button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 0.75rem;
    cursor: pointer;
    transition: all 0.3s ease;
    backdrop-filter: blur(12px) saturate(150%);
    -webkit-backdrop-filter: blur(12px) saturate(150%);
    background: rgba(255, 255, 255, 0.08);
    border: 1px solid rgba(255, 255, 255, 0.15);

    :root:not(.dark) & {
      background: rgba(0, 0, 0, 0.06);
      border: 1px solid rgba(0, 0, 0, 0.12);
    }

    .action-icon {
      font-size: 1.25rem;
      color: rgba(255, 255, 255, 0.8);

      :root:not(.dark) & {
        color: rgba(0, 0, 0, 0.7);
      }
    }

    &:hover {
      background: rgba(255, 255, 255, 0.1);
      border-color: rgba(255, 255, 255, 0.2);
      transform: translateY(-2px) scale(1.05);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);

      :root:not(.dark) & {
        background: rgba(0, 0, 0, 0.08);
        border-color: rgba(0, 0, 0, 0.15);
      }
    }
  }
}

// 响应式设计
@media (max-width: 768px) {
  .navbar {
    padding: 0.5rem 1rem;
  }

  .navbar-container {
    gap: 1rem;
  }

  .brand-text {
    display: none;
  }
}
</style>

