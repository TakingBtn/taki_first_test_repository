<template>
        <v-col>
            <!-- contentList -->
            <v-sheet min-height="70vh" rounded="lg">
                <!-- vontents -->
                <v-col cols="12" v-for="(collection, index) in favoriteListInfo.list.collectionList" :key = index>
                    <v-card color="#385F73" dark>
                        <v-card-title class="text-h5">
                            {{collection.name}}
                        </v-card-title>

                        <v-card-subtitle>
                            {{collection.collectionTime}}
                        </v-card-subtitle>

                        <v-card-actions>
                        <v-btn text>
                            <a :href="collection.url">Go Now</a>
                        </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-col>

                <!-- addContentBtn -->
                <v-col cols="12">
                    <v-card color="#FFFFFF" dark>
                        <v-card-actions style="justify-content:center">
                        <v-dialog v-model="addContentDialog" persistent>
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn color="pink" icon small v-bind="attrs" v-on="on">
                            <v-icon dark> mdi-plus </v-icon>
                            </v-btn>
                        </template>
                        </v-dialog>
                        </v-card-actions>
                    </v-card>
                </v-col>
            </v-sheet>

            <!-- 表单 -->
            <v-row justify="center">
                <v-dialog v-model="addContentDialog" persistent max-width="600px">
                <v-card>
                    <!-- 表单名 -->
                    <v-card-title>
                    <span class="text-h5">添加收藏</span>
                    </v-card-title>
                    <!-- 表单项 -->
                    <v-card-text>
                    <v-container>
                        <!-- name -->
                        <v-row>
                        <!-- 收藏项 -->
                        <v-col cols="12"><v-text-field label="收藏项*" required v-model="addContentFrom.name"></v-text-field></v-col>
                        <!-- 收藏时间 -->
                        <v-col cols="12" md="6"><v-text-field label="收藏时间*" required v-model="addContentFrom.collectionTime"></v-text-field></v-col>
                        <!-- url -->
                        <v-col cols="12" md="6"><v-text-field label="Url*" required v-model="addContentFrom.url"></v-text-field></v-col>
                        </v-row>
                    </v-container>
                    <small>* 必填</small>
                    </v-card-text>
                    <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="addContentDialog = false">
                        关闭
                    </v-btn>
                    <v-btn color="blue darken-1" text @click="addContent()">
                        添加
                    </v-btn>
                    </v-card-actions>
                </v-card>
                </v-dialog>
            </v-row>
        </v-col>
</template>

<script>
export default {
    props:["favoriteListInfo"],
    data:()=>({
        // 添加收藏项表单 开关
        addContentDialog:false,
        // addContentFrom:{
        //     id:'',
        //     // 收藏项
        //     name:'default',
        //     // 收藏时间
        //     collectionTime:this.getCollectionTime(),
        //     // Url
        //     url:'default'
        // }
    }),
    methods:{
        addContent(){
            // 设置 新增收藏项 id
            this.addContentFrom.id = this.collectionInfo.list.length + 1
            // 输出 添加收藏 表单
            console.log(this.addContentFrom)
            // 发送请求
            // 发送表单 到 仓库
            this.$store.dispatch('addContent',this.addContentFrom)
                // 处理返回结果
                .then(respone=>{
                    console.log("addContent",respone.data)
                    if(respone.status == 200){
                        // 刷新数据 更新页面
                        this.$store.dispatch('favoriteList')
                        // 关闭表单
                        this.addContentDialog = false
                    }else{
                        alert(respone.status)
                        this.addContentDialog =false
                    }
                },
                reject=>{
                    console.log(reject)
                    this.addContentDialog = false
                })
        },
        
        // 获取当前时间
        getCollectionTime(){
            let nowTime = new Date()
            // 获取 年份
            let nowYear = nowTime.getFullYear()
            // 获取 月份
            let nowMonth = nowTime.getMonth() + 1
            // 获取 日期
            let nowDay = nowTime.getDate()
            // 获取 当前时间
            let nowHour = nowTime.getHours()
            // 获取 当前分钟数
            let nowMin = nowTime.getMinutes()
            // 获取 当前秒数
            let nowSecond = nowTime.getSeconds()
            let collectionTime 
            = `${nowYear}${nowMonth}${nowDay}${nowHour}${nowMin}${nowSecond}`
            return collectionTime
        },
    },
    computed:{
        collectionInfo:{
            get(){
                return{
                    index: this.favoriteListInfo.index,
                    list: this.favoriteListInfo.list
                }
            }
        },
        addContentFrom:{
            get(){
                return{
                    id:'',
                    // 收藏项
                    name:'default',
                    // 收藏时间
                    collectionTime: this.getCollectionTime(),
                    // Url
                    url:'default'
                }
            },
            set(newVal){
                console.log('@addContentFrom/set', newVal)
            }
        }
    },
    watch:{
        // favoriteListInfo:{
        //     get(){
        //         return{
        //             index:this.favoriteListInfo.index,
        //             list:this.favoriteListInfo.list
        //         }
        //     }
        // }
    },
    // 生命周期函数
    created(){},
    mounted(){},
    updated(){},
    beforeDestroy(){}
}
</script>

<style>

</style>