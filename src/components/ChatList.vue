<template>
  <div>
    <ul>
      <li v-for="chat of chats" :key="chat.id">
        <router-link :to="{ name: 'chat', params: { id: chat.id } }">{{ chat.id }}</router-link>
      </li>
    </ul>

    <button @click="createChatRoom()" class="button">
      Create New Chat Room
    </button>
  </div>
</template>

<script>
import { db } from "../firebase/config";
import getCollection from "../composables/getCollection";
import getUser from "../composables/getUser";
import { addDoc, collection } from "@firebase/firestore";

export default {
  data() {
    return {
      chats: [],
    };
  },
  mounted() {
    this.chats = this.getChatRooms()
  },
  methods: {
    async createChatRoom() {
      const colRef = collection(db, 'chats')
      await addDoc(colRef, {
        createdAt: Date.now(),
        owner: this.uid,
        members: [this.uid],
      });
    },
    getChatRooms() {
      const { user } = getUser()
      const { documents: chats } = getCollection(
        "chats",
        ['owner', '==', user.value.uid]
      )
      return chats
    },
  },
  props: ["uid"],
};
</script>
