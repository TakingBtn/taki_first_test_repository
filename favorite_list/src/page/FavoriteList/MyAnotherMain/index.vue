<template>
    <v-main class="grey lighten-3">
        <v-container>
            <v-row>
                <v-col>
                    <!-- 工具栏 -->
                    <v-toolbar dense>
                
                        <v-spacer></v-spacer>

                        <v-col cols="3">
                            <v-text-field
                            hide-details
                            single-line
                            placeholder="搜索"
                            ></v-text-field>
                        </v-col>
                
                        <v-btn icon>
                        <v-icon>mdi-plus</v-icon>
                        </v-btn>
                        
                    </v-toolbar>
                    <!-- 时间线 -->
                    <v-timeline>
                    <v-timeline-item
                        v-for="(collection, i) in timeLine"
                        :key="i"
                        :color="collection.color"
                        small
                    >
                        <template v-slot:opposite>
                        <span
                            :class="`headline font-weight-bold ${collection.color}--text`"
                            v-text="collection.collectionTime"
                        ></span>
                        </template>
                        <v-card class="elevation-2">
                        <v-card-title :class="`headline ${collection.color}--text`">{{collection.name}}</v-card-title>
                        <v-card-text>
                            <a :href="`${collection.url}`">{{collection.url}}</a>
                        </v-card-text>
                        </v-card>
                    </v-timeline-item>
                    </v-timeline>
                </v-col>
            </v-row>
        </v-container>
    </v-main>

</template>

<script>
import { mapState } from 'vuex'
export default {
    data(){
        return{}
    },
    methods:{
        // 去除时间字符串分隔符
        removeSep(timeStr){
            let arr = timeStr.split(/-| |:/)
            let newTimeStr = ''
            for(let item of arr){
                newTimeStr = newTimeStr + item
            }
            return newTimeStr
        },
        // 归并排序 数组
        // O(nlog(n))

        // 归类（拆分）
        sortArray(arr){
            // console.log(arr)
            const len = arr.length
            // 结束递归的条件
            if(len <= 1){
                return arr
            }
            // 获取 数组长度的一半
            const mid = Math.floor(len / 2)
            // 左边数组
            let leftArr = this.sortArray(arr.slice(0,mid))
            // 右边数组
            let rightArr = this.sortArray(arr.slice(mid,len))

            // 合并两个有序数组
            arr = this.mergeArr(leftArr, rightArr)
            return arr
        },
        // 合并
        mergeArr(arr1, arr2){
            let i=0, j=0
            // 结果数组
            const res = []
            const len1 = arr1.length
            const len2 = arr2.length

            // 排序 获得新数组
            while(i<len1 && j<len2){
                if(arr1[i] < arr2[j]){
                    res.push(arr1[i])
                    i++
                }else{
                    res.push(arr2[j])
                    j++
                }
            }

            // 将剩下那个数组的剩余元素 加入 结果数组
            if(i < len1){
                return res.concat(arr1.slice(i))
            }else{
                return res.concat(arr2.slice(j))
            }
        }

    },
    computed:{
        // 获取 仓库 favoriteList 数据
        ...mapState({collectionTimeList:(state)=>state.collectionTimeList}),
        /* 
        首先 获取收藏时间（去除分隔符，获得时间字符串） 组成 时间数组（时间+json数组中的index）
        其次 排序时间数组 获得 新时间数组
        然后 提取新时间数组的末尾index 获得 时间序列数组
        最后 根据时间序列数组 排序 json数组 返回新数组
        */
        timeLine(){
            // 新的时间数组
            let timeArr = []
            // 时间数组序列长度 数组
            let timeIndexArr = []
            // 时间字符串长度(格式：xxxx-xx-xx xx:xx:xx)
            let timeStrLength = 14

            // 根据时间字符串 获得 新的时间数组
            for(let item of this.collectionTimeList){
                let timeStr = this.removeSep(item.collectionTime)
                // 输出时间字符串
                // console.log(timeStr)
                timeArr.push(timeStr)
            }
            // 输出时间数组
            // console.log(timeArr)
            let i = 0
            // 新时间数组元素 加上 序列数
            for(let itemIndex in this.collectionTimeList){
                timeArr[i] = timeArr[i] + itemIndex
                i++
            }
            // 排序完成的时间数组
            let newTiemArr = this.sortArray(timeArr).reverse()
            // 获取排序后的 时间序列数组
            for(let item of newTiemArr){
                // console.log(item.substr(timeStrLength))
                timeIndexArr.push(item.substr(timeStrLength))
            }

            // 根据 时间序列数组 重新排序 收藏时间排序
            newTiemArr = []
            for(let item of timeIndexArr){
                newTiemArr.push(this.collectionTimeList[item])
            }

            return newTiemArr
        }
    },
    watch:{},
    // 生命周期钩子
    created(){
        // 向仓库发送请求
        this.$store.dispatch('collectionTimeList')
    },
    mounted(){
        // console.log("/myAnotherMain",this.favoriteList)
        // console.log('sortArray',this.sortArray)
    }
}
</script>

<style>

</style>