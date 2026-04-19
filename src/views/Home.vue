<template>
  <div class="home-page">
    <!-- Hero 区域 -->
    <section class="hero-section">
      <div class="hero-background">
      <TopologyBackground />
    </div>
      <div class="hero-content">
        <div class="hero-logo">
          <img src="@/assets/logo.png" alt="logo" class="logo-image" />
        </div>
        <h1 class="hero-title">
          <span class="title-text">starTopoGraph</span>
        </h1>
        <p class="hero-subtitle">
          基于 AntV X6 的 Vue2 拓扑图编辑器
        </p>
        <p class="hero-description">
          强大的可视化编辑工具，让您轻松创建和管理复杂的拓扑图结构
        </p>
        <div class="hero-actions">
          <router-link to="/topology" class="btn-primary">
            <i class="y-material-symbols:rocket-launch"></i>
            <span>开始使用</span>
          </router-link>
          <a href="https://github.com/Ya2gLu/x6-vue2-topology" target="_blank" class="btn-secondary">
            <i class="y-mdi:github"></i>
            <span>GitHub</span>
          </a>
        </div>
      </div>
    </section>

    <!-- 特性展示 -->
    <section class="features-section">
      <div class="container">
        <h2 class="section-title">核心特性</h2>
        <div class="features-grid">
          <div class="feature-card" v-for="feature in features" :key="feature.title">
            <div class="feature-icon">
              <i :class="feature.icon"></i>
            </div>
            <h3 class="feature-title">{{ feature.title }}</h3>
            <p class="feature-description">{{ feature.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 快速开始 -->
    <section class="quick-start-section">
      <div class="container">
        <h2 class="section-title">快速开始</h2>
        <div class="quick-start-content">
          <div class="steps">
            <div class="step-item" v-for="(step, index) in quickStartSteps" :key="index">
              <div class="step-number">{{ index + 1 }}</div>
              <div class="step-content">
                <h3 class="step-title">{{ step.title }}</h3>
                <p class="step-description">{{ step.description }}</p>
            </div>
            </div>
          </div>
          <div class="code-preview">
            <div class="code-header">
              <span class="code-title">安装</span>
            </div>
            <div class="code-content">
              <pre><code>npm install @antv/x6 @antv/x6-vue-shape</code></pre>
            </div>
          </div>
            </div>
          </div>
    </section>

    <!-- 代码示例 -->
    <section class="examples-section">
      <div class="container">
        <h2 class="section-title">使用示例</h2>
        <div class="example-card">
          <div class="example-tabs">
            <div class="example-tab" :class="{ active: activeTab === 'basic' }" @click="activeTab = 'basic'">
              基础用法
            </div>
            <div class="example-tab" :class="{ active: activeTab === 'custom' }" @click="activeTab = 'custom'">
              自定义节点
            </div>
          </div>
          <div class="example-content">
            <pre v-if="activeTab === 'basic'"><code>{{ basicExample }}</code></pre>
            <pre v-else><code>{{ customExample }}</code></pre>
          </div>
        </div>
      </div>
    </section>

    <!-- 底部链接 -->
    <section class="footer-section">
      <div class="container">
        <div class="footer-links">
          <div class="footer-column">
            <h4>文档</h4>
            <ul>
              <li><a href="#">快速开始</a></li>
              <li><a href="#">API 参考</a></li>
              <li><a href="#">示例</a></li>
            </ul>
          </div>
          <div class="footer-column">
            <h4>资源</h4>
            <ul>
              <li><a href="https://github.com/Ya2gLu/x6-vue2-topology" target="_blank">GitHub</a></li>
              <li><a href="#">更新日志</a></li>
              <li><a href="#">常见问题</a></li>
            </ul>
          </div>
          <div class="footer-column">
            <h4>社区</h4>
            <ul>
              <li><a href="#">讨论区</a></li>
              <li><a href="#">反馈</a></li>
              <li><a href="#">贡献指南</a></li>
            </ul>
          </div>
        </div>
        <div class="footer-bottom">
          <p>© 2024 starTopoGraph. Built with ❤️ using Vue2 & AntV X6</p>
      </div>
      </div>
    </section>
  </div>
</template>

<script>
import TopologyBackground from '@/components/TopologyBackground.vue'

export default {
  name: 'Home',
  components: {
    TopologyBackground
  },
  data() {
    return {
      activeTab: 'basic',
      features: [
        {
          icon: 'y-material-symbols:drag-indicator',
          title: '可视化编辑',
          description: '直观的拖拽式界面，轻松创建复杂拓扑图'
        },
        {
          icon: 'y-material-symbols:shapes',
          title: '自定义节点',
          description: '支持多种节点类型和自定义形状，满足各种场景需求'
        },
        {
          icon: 'y-material-symbols:link',
          title: '连接管理',
          description: '灵活的连线配置和端口管理，支持多种连接方式'
        },
        {
          icon: 'y-material-symbols:speed',
          title: '高性能',
          description: '基于 AntV X6 引擎，流畅的交互体验和优秀的渲染性能'
        },
        {
          icon: 'y-material-symbols:save',
          title: '数据管理',
          description: '支持 JSON 格式的导入导出，方便数据持久化和迁移'
        },
        {
          icon: 'y-material-symbols:gesture',
          title: '交互操作',
          description: '支持缩放、平移、撤销重做等丰富的交互操作'
        }
      ],
      quickStartSteps: [
        {
          title: '安装依赖',
          description: '通过 npm 或 yarn 安装所需的依赖包'
        },
        {
          title: '创建画布',
          description: '初始化 X6 图形实例，配置画布参数'
        },
        {
          title: '添加节点',
          description: '使用拖拽面板或编程方式添加节点到画布'
        },
        {
          title: '连接节点',
          description: '通过连线工具或代码创建节点之间的连接关系'
        }
      ],
      basicExample: `import { Graph } from '@antv/x6'

// 创建画布
const graph = new Graph({
  container: document.getElementById('container'),
  width: 800,
  height: 600,
  grid: true
})

// 添加节点
const node = graph.addNode({
  x: 100,
  y: 100,
  width: 80,
  height: 40,
  label: 'Hello',
  attrs: {
    body: {
      stroke: '#8f8f8f',
      fill: '#fff',
      rx: 6,
      ry: 6,
    },
  },
})`,
      customExample: `// 注册自定义节点
Graph.registerNode('custom-node', {
  inherit: 'rect',
  width: 100,
  height: 40,
  attrs: {
    body: {
      stroke: '#3a78db',
      fill: '#e8f4ff',
      rx: 8,
      ry: 8,
    },
    text: {
      fill: '#3a78db',
      fontSize: 14,
    },
  },
})

// 使用自定义节点
graph.addNode({
  shape: 'custom-node',
  x: 200,
  y: 200,
  label: 'Custom Node',
})`
    }
  }
}
</script>

<style lang="less" scoped>
.home-page {
  min-height: 100vh;
  background: #0a0a0a;
  color: #fff;
}

// Hero 区域
.hero-section {
  position: relative;
  min-height: calc(80vh - 4.5rem);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem 6rem;
  overflow: hidden;

  .hero-background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
    opacity: 0.3;
  }

  .hero-content {
    position: relative;
    z-index: 1;
    text-align: center;
    max-width: 900px;
    margin: 0 auto;
  }

  .hero-logo {
    margin-bottom: 2rem;
    animation: fadeInDown 0.8s ease-out;

    .logo-image {
      width: 120px;
      height: 120px;
      object-fit: contain;
      filter: drop-shadow(0 8px 32px rgba(58, 120, 219, 0.3));
    }
  }

  .hero-title {
    margin-bottom: 1rem;
    animation: fadeInDown 0.8s ease-out 0.2s both;

    .title-text {
      font-size: 4rem;
      font-weight: 700;
  background: linear-gradient(135deg, #3a78db 0%, #5b9bd5 50%, #7db8e8 100%);
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: transparent;
      color: transparent;
      display: inline-block;
    }
  }

  .hero-subtitle {
    font-size: 1.5rem;
    color: rgba(255, 255, 255, 0.8);
    margin-bottom: 1rem;
    animation: fadeInDown 0.8s ease-out 0.4s both;
  }

  .hero-description {
    font-size: 1.125rem;
    color: rgba(255, 255, 255, 0.6);
    margin-bottom: 3rem;
    line-height: 1.6;
    animation: fadeInDown 0.8s ease-out 0.6s both;
  }

  .hero-actions {
    display: flex;
    gap: 1rem;
    justify-content: center;
    flex-wrap: wrap;
    animation: fadeInUp 0.8s ease-out 0.8s both;

    .btn-primary,
    .btn-secondary {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.875rem 2rem;
      border-radius: 0.75rem;
      font-size: 1rem;
      font-weight: 500;
      text-decoration: none;
      transition: all 0.3s ease;
      border: 2px solid transparent;

      i {
        font-size: 1.25rem;
      }
    }

    .btn-primary {
      background: linear-gradient(135deg, #3a78db 0%, #5b9bd5 100%);
      color: #fff;
      border-color: #3a78db;
      box-shadow: 0 4px 16px rgba(58, 120, 219, 0.4);

      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 24px rgba(58, 120, 219, 0.5);
      }
    }

    .btn-secondary {
      background: rgba(255, 255, 255, 0.1);
      color: rgba(255, 255, 255, 0.9);
      border-color: rgba(255, 255, 255, 0.2);
      backdrop-filter: blur(12px);

      &:hover {
        background: rgba(255, 255, 255, 0.15);
        transform: translateY(-2px);
      }
    }
  }
}

// 容器
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

// 通用标题
.section-title {
  font-size: 2.5rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 3rem;
  background: linear-gradient(135deg, #fff 0%, rgba(255, 255, 255, 0.8) 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

// 特性区域
.features-section {
  padding: 6rem 0;
  background: linear-gradient(180deg, #0a0a0a 0%, #141414 100%);

  .features-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
  }

  .feature-card {
    padding: 2rem;
    border-radius: 1rem;
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(12px);
    transition: all 0.3s ease;

    &:hover {
      transform: translateY(-4px);
      background: rgba(255, 255, 255, 0.05);
      border-color: rgba(58, 120, 219, 0.4);
      box-shadow: 0 8px 32px rgba(58, 120, 219, 0.2);
    }

    .feature-icon {
      width: 64px;
      height: 64px;
      border-radius: 1rem;
      background: linear-gradient(135deg, rgba(58, 120, 219, 0.2) 0%, rgba(91, 155, 213, 0.2) 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 1.5rem;

      i {
        font-size: 2rem;
        color: #3a78db;
      }
    }

    .feature-title {
      font-size: 1.25rem;
      font-weight: 600;
      margin-bottom: 0.75rem;
      color: #fff;
    }

    .feature-description {
      color: rgba(255, 255, 255, 0.6);
      line-height: 1.6;
    }
  }
}

// 快速开始区域
.quick-start-section {
  padding: 6rem 0;
  background: #0a0a0a;

  .quick-start-content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 3rem;
    align-items: start;

    @media (max-width: 968px) {
      grid-template-columns: 1fr;
    }
  }

  .steps {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }

  .step-item {
    display: flex;
    gap: 1.5rem;
    align-items: start;

    .step-number {
      flex-shrink: 0;
      width: 48px;
      height: 48px;
      border-radius: 50%;
      background: linear-gradient(135deg, #3a78db 0%, #5b9bd5 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.25rem;
      font-weight: 700;
      color: #fff;
    }

    .step-content {
      flex: 1;

      .step-title {
        font-size: 1.25rem;
        font-weight: 600;
        margin-bottom: 0.5rem;
        color: #fff;
      }

      .step-description {
        color: rgba(255, 255, 255, 0.6);
        line-height: 1.6;
      }
    }
  }

  .code-preview {
    border-radius: 1rem;
    overflow: hidden;
    background: rgba(20, 20, 20, 0.8);
    border: 1px solid rgba(255, 255, 255, 0.1);

    .code-header {
      padding: 1rem 1.5rem;
      background: rgba(255, 255, 255, 0.05);
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);

      .code-title {
        font-size: 0.875rem;
        color: rgba(255, 255, 255, 0.6);
        text-transform: uppercase;
        letter-spacing: 0.05em;
      }
    }

    .code-content {
      padding: 1.5rem;

      pre {
        margin: 0;
        color: #e6e6e6;
        font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
        font-size: 0.875rem;
        line-height: 1.6;
        overflow-x: auto;

        code {
          color: #e6e6e6;
        }
      }
    }
  }
}

// 示例区域
.examples-section {
  padding: 6rem 0;
  background: linear-gradient(180deg, #141414 0%, #0a0a0a 100%);

  .example-card {
    border-radius: 1rem;
    overflow: hidden;
    background: rgba(20, 20, 20, 0.8);
    border: 1px solid rgba(255, 255, 255, 0.1);

    .example-tabs {
      display: flex;
      background: rgba(255, 255, 255, 0.05);
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);

      .example-tab {
        padding: 1rem 2rem;
        cursor: pointer;
        color: rgba(255, 255, 255, 0.6);
        transition: all 0.3s ease;
        border-bottom: 2px solid transparent;

        &:hover {
          color: rgba(255, 255, 255, 0.8);
          background: rgba(255, 255, 255, 0.03);
        }

        &.active {
          color: #3a78db;
          border-bottom-color: #3a78db;
          background: rgba(58, 120, 219, 0.1);
        }
      }
    }

    .example-content {
      padding: 2rem;

      pre {
        margin: 0;
        color: #e6e6e6;
        font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
        font-size: 0.875rem;
        line-height: 1.8;
        overflow-x: auto;

        code {
          color: #e6e6e6;
        }
      }
    }
  }
}

// 底部区域
.footer-section {
  padding: 4rem 0 2rem;
  background: #0a0a0a;
  border-top: 1px solid rgba(255, 255, 255, 0.1);

  .footer-links {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 3rem;
    margin-bottom: 3rem;

    .footer-column {
      h4 {
        font-size: 1rem;
        font-weight: 600;
        margin-bottom: 1rem;
        color: #fff;
      }

      ul {
        list-style: none;
        padding: 0;
        margin: 0;

        li {
          margin-bottom: 0.75rem;

          a {
            color: rgba(255, 255, 255, 0.6);
            text-decoration: none;
            transition: color 0.3s ease;

            &:hover {
              color: #3a78db;
            }
          }
        }
      }
    }
  }

  .footer-bottom {
    text-align: center;
    padding-top: 2rem;
    border-top: 1px solid rgba(255, 255, 255, 0.1);

    p {
      color: rgba(255, 255, 255, 0.5);
      font-size: 0.875rem;
    }
  }
}

// 动画
@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

// 响应式
@media (max-width: 768px) {
  .hero-title .title-text {
    font-size: 2.5rem;
  }

  .hero-subtitle {
    font-size: 1.25rem;
  }

  .section-title {
    font-size: 2rem;
  }

  .features-grid {
    grid-template-columns: 1fr;
  }
}
</style>
