import { createApp } from 'vue';
import { createRouter, createMemoryHistory } from 'vue-router';
import './style.css';
import RouteView from './route.vue';
// import App from './App.vue';
// 2. 定义一些路由
// 每个路由都需要映射到一个组件。
// 我们后面再讨论嵌套路由。
const routes = [{ path: '/', component: () => import('./a.md') }];
// 3. 创建路由实例并传递 `routes` 配置
// 你可以在这里输入更多的配置，但我们在这里
// 暂时保持简单
const router = createRouter({
  // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
  history: createMemoryHistory(),
  routes, // `routes: routes` 的缩写
});

const app = createApp(RouteView);

app.use(router);

app.mount('#app');
