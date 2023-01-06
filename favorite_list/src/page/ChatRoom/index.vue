<template>
  <el-container>
    <el-header height="40px" style="background: #b3c0d1">
      <div style="padding: 5px; display: flex; justify-content: flex-end">
        <el-button
          type="primary"
          circle
          icon="el-icon-minus"
          size="mini"
        ></el-button>
        <el-button
          type="danger"
          circle
          icon="el-icon-close"
          size="mini"
        ></el-button>
      </div>
    </el-header>
    <el-container>
      <el-aside style="background: #d3dce6">
        <el-collapse v-model="activeName" accordion>
          <el-collapse-item title="朋友" name="1">
            <div>
              与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；
            </div>
            <div>
              在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。
            </div>
          </el-collapse-item>
          <el-collapse-item title="设置" name="2">
            <div>
              控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；
            </div>
            <div>页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。</div>
          </el-collapse-item>
        </el-collapse>
      </el-aside>
      <el-container style="background: #e9eef3">
        <div
          style="
            width: 100%;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
          "
        >
          <div>
            <ul id="chatList" style="padding: 10px">
              <li class="left">
                <div class="chat_item">hello</div>
              </li>
            </ul>
          </div>
          <div>
            <el-input
              type="textarea"
              autofocus="true"
              resize="none"
              :autosize="{ minRows: 9, maxRows: 12 }"
              placeholder="请输入内容"
              v-model="textarea"
            >
            </el-input>
            <el-button
              type="primary"
              size="mini"
              style="float: right"
              @click="sendMessage()"
            >
              发送
            </el-button>
          </div>
        </div>
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      // 手风琴
      activeName: "1",
      //文本框
      textarea: "",
      //websocket
      socket: null,
    };
  },
  methods: {
    initWebSocket() {
      if ("WebSocket" in window) {
        this.socket = new WebSocket(`ws://localhost:8082?token=${localStorage.getItem("token")}`);
      } else {
        console.log("您的浏览器不支持 websocket");
      }
      this.socket.onopen = () => {
        console.log("open");
      };
      this.socket.onmessage = (evt) => {
        console.log(evt.data);
        this.receiveMessage(evt.data)
      };
    },
    // 发送消息
    sendMessage() {
      // 获取 ul 聊天列表
      let chatRoom = document.getElementById("chatList")
      // console.log(chatRoom)
      if (this.textarea) {
        let dataV = document.querySelector("#chatList").attributes[0].name;
        // 新建元素节点
        let chatBox = document.createElement("li");
        let chatVal = document.createElement("div");
        // 设置属性
        chatBox.setAttribute(dataV,"")
        chatVal.setAttribute(dataV,"")
        // 新的 msg 设置样式 和 内容
        chatBox.className = "right"
        chatVal.className = "chat_item"
        chatVal.innerText = this.textarea;
        chatBox.appendChild(chatVal)
        // console.log(chatBox)
        // 加入到 ul 聊天列表中
        chatRoom.appendChild(chatBox);
        // 发送消息
        if (this.socket.readyState === 1) {
          this.socket.send(this.textarea);
          // console.log(this.socket.send(this.textarea));
        }
      } else {
        alert("输入信息为空");
      }

      //   清空textarea
      this.textarea = "";
    },
    // 接收消息
    receiveMessage(msg){
      // 获取 聊天列表
      let chatRoom = document.getElementById('chatList')
      let dataV = chatRoom.attributes[0].name
      // 新建 元素节点
      let chatBox = document.createElement('li')
      let chatVal = document.createElement('div')
      // 设置属性
      chatBox.setAttribute(dataV,"")
      chatVal.setAttribute(dataV,"")
      // 设置样式 和 内容
      chatBox.className = 'left'
      chatVal.className = 'chat_item'
      chatVal.innerText = msg
      chatBox.appendChild(chatVal)
      // 加入到 ul聊天列表中
      chatRoom.appendChild(chatBox)
    }
  },
  watch: {},
  computed: {},
  // 生命周期钩子函数
  created() {},
  mounted() {
    this.initWebSocket();
    console.log(this.socket);
  },
  destroyed() {
    this.socket.close();
  },
};
</script>

<style scoped>
.left{
  height: 2rem;
  line-height: 2rem;
  margin-bottom: 0.5rem;

  display: flex;
  justify-content: flex-start;
}
.chat_item{
  color: #333;
  background: #d3dce6;
  border-radius: 4px;
  padding: 0 0.5rem;
}
.right{
  height: 2rem;
  line-height: 2rem;
  margin-bottom: 0.5rem;

  display: flex;
  justify-content: flex-end;
}
</style>