<template>
  <form class="row" @submit.prevent="greet">
    <input id="greet-input" v-model="name" placeholder="输入一个名称..." />
    <button type="submit">问候</button>
  </form>
  <p>{{ greetMsg }}</p>
  
  <button class="scanbtn tauri" @click="tauriScanQrCode()">tauri扫码</button>
  <p> tauri扫码结果:{{ codeRes_tauri }}</p>

  <button class="scanbtn h5" @click="h5scanCode()">h5扫码</button>
  <!-- <p> h5扫码结果:{{ codeRes_tauri }}</p> -->
  <router-link to="/">Go to Home</router-link>
  <router-link to="/about">Go to About</router-link>
  <!-- 路由出口 -->
  <!-- 路由匹配到的组件将渲染在这里 -->
  <router-view></router-view>

</template>

<script setup lang="ts">
import { ref } from "vue";
import { invoke } from "@tauri-apps/api/core";
import { scan, Format } from '@tauri-apps/plugin-barcode-scanner';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

const print = console.log

const greetMsg = ref("");
const name = ref("");
const codeRes_tauri = ref("");

function h5scanCode() {
  console.log('浏览器信息', navigator.userAgent);
  router.push({
    path: '/ScanCodePage'
  });
}

async function tauriScanQrCode() {
  // ' windowed: true '实际上将webview设置为透明，而不是为相机打开一个单独的视图，确保你的用户界面准备好显示透明元素下面的内容
  scan({ windowed: true, formats: [Format.QRCode] }).then((res:any) => {
    alert(`扫描结果: ${JSON.stringify(res)}`)
    codeRes_tauri.value = JSON.stringify(res);
  });
}

async function greet() {
  // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
  greetMsg.value = await invoke("greet_rust", { name: name.value });
}
</script>


<style scoped>
  .scanbtn{
    border: 2px solid burlywood;
    background-color: bisque;
    padding: 10px;

  }
  .h5{
    background-color: aqua;
  }
</style>