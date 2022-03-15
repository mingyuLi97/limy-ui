import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Home from './components/Home.vue';

function getRoutes() {
  const routes: RouteConfig[] = [];
  routes.push({
    path: '/',
    component: Home
  });
  const demos = require.context(
    '~',
    true,
    /components\/[^/]*\/demo\/index\.vue$/i
  );
  demos.keys().forEach(demoPath => {
    routes.push({
      path: ('/' + demoPath.match(/\/([^/]*)\/demo/)?.[1]) as string,
      component: demos(demoPath).default
    });
  });
  console.log(`[router] routes`, routes);
  return routes;
}

Vue.use(VueRouter);
const router = new VueRouter({
  mode: 'hash',
  routes: getRoutes()
});

export default router;
