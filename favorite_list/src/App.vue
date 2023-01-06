<template>
  <v-app id="inspire">
    <router-view></router-view>
  </v-app>
</template>

<script>
// import MyHead from "./components/MyHead";

export default {
  name: "App",

  components: {
    // MyHead,
  },

  data: () => ({}),
  methods: {},
  created() {},
  mounted() {},
  updated() {},
  beforeDestroy() {},
};
</script>

<style>
/* 通用 */
* {
  margin: 0;
  padding: 0;
}

html {
  font-size: 16px;
}
li {
  list-style: none;
}
a:hover,
a:link,
a:visited,
a:active {
  text-decoration: none;
}
</style>
