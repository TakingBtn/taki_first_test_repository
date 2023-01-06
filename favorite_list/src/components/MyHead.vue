<template>
    <v-app-bar
        color="deep-purple accent-4"
        absolute
        dark
        flat
        app
        prominent
        shrink-on-scroll
        fade-img-on-scroll
        elevate-on-scroll
        src="https://picsum.photos/1920/1080?random"
    >
      <v-container class="py-0 fill-height">
        <!-- 用户头像 -->
        <v-avatar
          class="mr-10"
          color="grey darken-1"
          size="50"
        >
        <img
          src="https://cdn.vuetifyjs.com/images/john.jpg"
          alt="John"
        >
        </v-avatar>

        <!-- 头部导航栏 -->
        <v-btn
          v-for="link in links"
          :key="link"
          text
          @click="changeRoute(link)"
        >
          {{ link }}
        </v-btn>

        <v-spacer></v-spacer>

        <v-responsive max-width="260">
          <v-text-field
            dense
            flat
            hide-details
            rounded
            solo-inverted
            label="Search"
            :rules = "rules"
          ></v-text-field>
        </v-responsive>
      </v-container>
    </v-app-bar>
</template>

<script>
export default {
    data: ()=>({
        links: [
            '时间线排序',
            '内容分集',
        ],

        // 搜索框 规则
        rules:[
            value => (value && value.length >= 3) || 'Min 3 characters',
        ]
    }),
    methods:{
      changeRoute(link){
        if(link == '时间线排序'){
          console.log(this.$router)
          this.$router.push(
            {path:`/favoriteList/myAnotherMain`}
          )
        }else{
          this.$router.push(
            {path:`/favoriteList/myMain`}
          )
        }
      }
    }
}
</script>

<style>

</style>