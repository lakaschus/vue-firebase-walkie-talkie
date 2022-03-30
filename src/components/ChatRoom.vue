<template>
  <main class="section">
    <h3>Welcome to ChatRoom.vue {{ chatId }}</h3>

    <router-link to="/">Back</router-link>

    <p>
      Open this link in another browser window to chat
      <code>https://your-url.com/#/chats/{{ chatId }}</code>
    </p>

    <User>
      <template #user="{ user }">
        <div v-if="user">
          <ul>
            <li v-for="message of messages" :key="message.id">
              <ChatMessage
                :message="message"
                :owner="user.uid === message.sender"
              />
            </li>
          </ul>

          <hr />
          <h5>Record Audio</h5>

          <button v-if="!recorder" @click="record()" class="button is-info">
            Record Voice
          </button>
          <button v-else @click="stop()" class="button is-danger">Stop</button>

          <br />

          <audio v-if="newAudio" :src="newAudioURL" controls></audio>

          <hr />

          <input v-model="newMessageText" class="input" />

          <button
            :disabled="(!newMessageText && !newAudio) || loading"
            class="button is-success"
            type="text"
            @click="addMessage(user.uid)"
          >
            Send
          </button>
        </div>

        <Login v-else />
      </template>
    </User>
  </main>
</template>

<script>
import User from "./User.vue"
import ChatMessage from "./ChatMessage.vue"
import Login from "./Login.vue"
import { ref } from "vue"

import getCollection from "../composables/getCollection"
import getUser from "../composables/getUser"
import { db } from "../firebase/config"
import { collection, addDoc, onSnapshot } from "@firebase/firestore"

export default {
  components: {
    User,
    Login,
    ChatMessage,
  },
  data() {
    return {
      newMessageText: "",
      loading: false,
      messages: [],
      newAudio: null,
      recorder: null,
    }
  },
  computed: {
    chatId() {
      return this.$route.params.id
    },
    newAudioURL() {
      return URL.createObjectURL(this.newAudio)
    },
  },
  mounted() {
    const { documents: messages } = this.getMessages()
    this.messages = messages
  },
  methods: {
    getMessages() {
      // Get subcollection of document
      const messagesRef = collection(
        db,
        "chats",
        this.$route.params.id,
        "messages"
      )
      const documents = ref(null)
      onSnapshot(messagesRef, (snapshot) => {
        let results = []
        snapshot.docs.forEach((doc) => {
          results.push({ ...doc.data(), id: doc.id })
        })
        // update values
        documents.value = results
      })
      return { documents }
    },
    async addMessage(uid) {
      this.loading = true

      let audioURL = null

      await addDoc(collection(db, "chats", this.$route.params.id, "messages"), {
        text: this.newMessageText,
        sender: uid,
        createdAt: Date.now(),
        audioURL,
      })

      this.loading = false
      this.newAudio = null

      this.newMessageText = ""
    },
    async record() {
      this.newAudio = null

      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: false,
      })

      const options = { mimeType: "audio/webm" }
      const recordedChunks = []
      this.recorder = new MediaRecorder(stream, options)

      this.recorder.addEventListener("dataavailable", (e) => {
        if (e.data.size > 0) {
          recordedChunks.push(e.data)
        }
      })

      this.recorder.addEventListener("stop", () => {
        this.newAudio = new Blob(recordedChunks)
        console.log(this.newAudio)
      })

      this.recorder.start()
    },
    async stop() {
      this.recorder.stop()
      this.recorder = null
    },
  },
}
</script>

<style scoped>
ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  min-width: 500px;
  background: #efefef;
  padding: 10px;
  border-radius: 0;
}

li {
  display: flex;
}
</style>
