<template>
  <v-main class="grey lighten-3">
    <v-container>
      <v-row>
        <!-- 侧边导航栏 -->
        <v-col cols="2">
          <v-sheet rounded="lg">
            <v-list color="transparent">
              <!-- 集合项 -->
              <v-list-item
                v-for="(tag, index) in this.favoriteList"
                :key="index"
                link
                ref="side_list_item"
                class="list_item"
                style="justify-content: center"

                @click="getContentList(index)"
              >
                <!-- 小于 768px -->
                <v-btn color="primary" icon class="list_item_btn">
                  <v-icon dark>
                    {{ getFirstLetter(tag.name) }}
                  </v-icon>
                </v-btn>
                <!-- 列图标 -->
                <v-list-item-icon class="list_item_icon">
                  <v-icon color="blue darken-2">
                    {{ index + 1 }}
                  </v-icon>
                </v-list-item-icon>
                <!-- 列文本 -->
                <v-list-item-content class="list_item_content">
                  <v-list-item-title> {{ tag.name }} </v-list-item-title>
                </v-list-item-content>
              </v-list-item>

              <!-- 分割线 -->
              <v-divider class="my-2"></v-divider>

              <!-- 添加按钮 -->
              <v-list-item
                color="grey lighten-4"
                style="justify-content: center"
              >
                <v-dialog v-model="dialog" persistent>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn color="pink" icon small v-bind="attrs" v-on="on">
                      <v-icon dark> mdi-plus </v-icon>
                    </v-btn>
                  </template>
                </v-dialog>
              </v-list-item>
            </v-list>
          </v-sheet>
        </v-col>

        <!-- 收藏列表 -->
        <router-view :favoriteListInfo="favoriteListInfo"></router-view>
      </v-row>

      <!-- 表单 -->
      <v-row justify="center">
        <v-dialog v-model="dialog" persistent max-width="600px">
          <v-card>
            <!-- 表单名 -->
            <v-card-title>
              <span class="text-h5">添加标签集合</span>
            </v-card-title>
            <!-- 表单项 -->
            <v-card-text>
              <v-container>
                <!-- name -->
                <v-row>
                  <v-col cols="12">
                    <v-text-field label="标签名*" required v-model="addTagListFrom.name"></v-text-field>
                  </v-col>
                </v-row>


              </v-container>
              <small>* 必填</small>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="dialog = false">
                关闭
              </v-btn>
              <v-btn color="blue darken-1" text @click="addTagList()">
                添加
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data: () => ({
    // 添加标签列表表单 开关
    dialog: false,
    // 添加标签列表 表单
    addTagListFrom:{
      id:'',
      name:'default',
      collectionList:[]
    },
    // index （对应的contentList的序列数）
    index:0
  }),
  methods:{
    // 点击 侧边导航栏 获取内容列表
    getContentList(itemIndex){
      // 获取当前侧边导航栏元素
      let currentItem = this.$refs.side_list_item[itemIndex].$refs.link
      // console.log(currentList.className)
      // 清除之前 的 active class
      let sideList = this.$refs.side_list_item
      for(let sideItem of sideList){
        // console.log(sideItem)
        sideItem.$refs.link.className = 'list_item v-list-item v-list-item--link theme--light'
      }
      // 根据 itemIndex 为元素加上 active
      currentItem.className = 'list_item v-list-item v-list-item--link theme--light active'
      // 修改 传给contentList的index
      this.index = itemIndex
      console.log(this.$route)
      // 路由跳转
      this.$router.push({path:`${this.$route.path}` + `/contentList`})
    },
    
    // 获取首字母
    getFirstLetter(word){
      let wordArr = [...word]
      let want = wordArr[0]
      return want
    },

    // 添加tagList
    addTagList(){
      this.addTagListFrom.id = `010${this.favoriteList[0].collectionList.length + 1}`
      console.log(this.addTagListFrom)
      // 提交 表单到仓库
      this.$store
        .dispatch('addTagList',this.addTagListFrom)

      // 刷新数据？
        .then(respone=>{
          console.log("addTagList",respone.data)
          if(respone.status == 200){
            // 获取 仓库中favoriteList数据
            this.$store.dispatch('favoriteList')
            // 关闭表单
            this.dialog = false
          }else{
            // 
            alert(respone.status)
            // 关闭表单
            this.dialog = false
          }
        },
        reject=>{
          console.log(reject)
          // 关闭表单
          this.dialog = false
        })
    }
  },
  computed:{
    // 获取 仓库 favoriteList 数据
    ...mapState({favoriteList:(state)=>state.favoriteList}),
    
    // 处理 仓库 favoriteList 数据
    favoriteListInfo:{
      get(){
        return {
          index:this.index,
          list:this.favoriteList[this.index]
        }
      },
      set(value){
        console.log('@favoriteListInfo/set', value)
      }
    }
  },
  watch:{
    // 添加标签列表 表单
    addTagListFrom:{
      handler(newVal, oldVal){
        console.log("addTagListFrom 数据发生变化", newVal)
      },
      deep:true
    }
  },


  // 生命周期钩子函数
  created(){
    // 向仓库发送请求
    this.$store.dispatch('favoriteList')
  },
  mounted(){
    // console.log("@mounted",this.favoriteList)
    // console.log("@mounted",this.$router)
    // console.log("@mounted",this.$route)
  },
  updated(){
    // console.log("updated",this.favoriteList)
    // console.log(this.getFavoriteList())
  }
}
</script>

<style>
@media screen and (min-width: 768px) {
  .list_item_btn {
    display: none;
  }
}
@media screen and (max-width: 768px) {
  .list_item_btn {
    display: block;
  }
  .list_item_content,
  .list_item_icon {
    display: none;
  }
}

/* 侧边导航栏选中效果 */
.active {
  background: #385F73;
}
</style>