<template>
  <div>
    <my-head></my-head>
    <router-view></router-view>
  </div>
</template>

<script>
import MyHead from "@/components/MyHead.vue";
// import MyHead from '@/components/MyHead.vue';
export default {
  components: { MyHead },
  data() {
    return {
      components: {
        MyHead,
      },
    };
  },
};
</script>

<style>

</style>