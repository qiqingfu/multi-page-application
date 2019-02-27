<template>
  <div id="app">
    <ul>
      <li
        v-for="router in routersList"
        v-bind:key="router.name"
        v-on:click="goFn(router.url)"
      >{{ router.name }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "index",
  data() {
    return {
      routersList: [
        {
          url: "",
          name: "首页",
          id: 0
        },
        {
          url: "page1",
          name: "页面一",
          id: 1
        },
        {
          url: "page2",
          name: "页面二",
          id: 2
        },
        {
          url: "page3",
          name: "页面三",
          id: 3
        }
      ]
    };
  },
  methods: {
    goFn(url) {
      // 多页应用跳转路由 location.href
      location.href = `${process.env.BASE_URL}` + url;
    }
  }
};
</script>

<style lang="scss">
ul {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  list-style: none;
  cursor: pointer;

  li {
    padding: 10px 30px;
    background-color: antiquewhite;
    font-weight: 700;
    font-size: 14px;

    &:hover {
      background-color: aquamarine;
      transition: .5
    }
  }
}
</style>
