<template>
  <div id="app">
    <header>
      <n-h1>
        <n-gradient-text
          :gradient="`linear-gradient(90deg, ${colors.green[600]}, ${colors.blue[600]})`"
        >
          Vue Voxer
        </n-gradient-text>
      </n-h1>

      <p>Realtime Walkie-Talkie Voice Chat</p>
    </header>

    <router-view></router-view>
  </div>
</template>

<script>
import { NGradientText, NH1 } from "naive-ui"
import colors from "./config/colors"

export default {
  name: "App",
  components: {
    NGradientText,
    NH1
  },
  data() {
    return {
      colors: colors
    }
  }
}
</script>

<style>
header {
  text-align: center;
}
button,
input {
  margin-bottom: 10px;
}
</style>
