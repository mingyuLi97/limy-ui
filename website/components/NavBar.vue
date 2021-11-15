<template>
  <div :class="b()">
    <div v-for="(group, index) in groups" :key="index" :class="b('group')">
      <div :class="b('title')">
        {{ group.title }}
      </div>
      <a
        v-for="(item, index) in group.children"
        :key="index"
        :class="b('item', [{ active: currentPath === item.path }])"
        href="JavaScript:void(0);"
        @click="onClickItem(item, index)"
      >
        {{ item.title }}
      </a>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { createBEM } from '~/utils/create/bem';

@Component
export default class NavBar extends Vue {
  get b() {
    return createBEM('limy-doc-nav');
  }

  get currentPath(): string {
    return this.$route.path;
  }

  groups = [
    {
      title: '开发指南',
      children: [
        {
          title: '介绍',
          path: ''
        }
      ]
    },
    {
      title: '基础组件',
      children: [
        {
          title: '介绍',
          path: ''
        },
        {
          title: '介绍',
          path: ''
        },
        {
          title: '介绍',
          path: ''
        },
        {
          title: '介绍',
          path: ''
        }
      ]
    },
    {
      title: '基础组件',
      children: [
        {
          title: '介绍',
          path: ''
        },
        {
          title: '介绍',
          path: ''
        },
        {
          title: '介绍',
          path: ''
        },
        {
          title: '介绍',
          path: ''
        }
      ]
    },
    {
      title: '布局组件',
      children: [
        {
          title: '介绍',
          path: ''
        }
      ]
    }
  ];

  created() {
    this.groups.unshift({
      title: '基础组件',
      children: this.$router.options.routes.map(route => {
        const path = route.path;
        return {
          title: path === '/' ? 'home' : path.substr(1),
          path
        };
      })
    });
  }

  onClickItem(item: { title: string; path: string }, index: number) {
    this.$router.replace(item.path);
  }
}
</script>
