<template>
  <div class="message" :class="{ 'from-user': owner }">
    {{ message.text }}
    <br />

    <audio v-if="message.audioURL" :src="message.audioURL" controls></audio>
    <br />

    <span class="sender">from UID {{ message.sender }}</span>
    <br />
    <span class="text-black from-neutral-100 text-xs">{{
      getDate(message.createdAt)
    }}</span>
  </div>
</template>

<script>
export default {
  props: ["message", "owner"],
  methods: {
    getDate(date) {
      const time = new Date(date * 1000)
      return time.toUTCString()
    },
  },
}
</script>
<style>
.message {
  background: #dddddd;
  color: black;
  margin-left: 10px;
  margin-right: auto;
  border-radius: 5px;
  padding: 12px;
  display: inline-block;
}
.from-user {
  margin-right: 10px;
  margin-left: auto;
  background: #91bbff;
}
.sender {
  font-size: 0.5rem;
}
</style>
