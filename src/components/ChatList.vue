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
import { db } from "../firebase";
import { ref } from "vue";

export default {
  data() {
    return {
      chats: [],
    };
  },
  mounted() {
    console.log("mounted");
    this.updateChats();
  },
  firestore() {
    return {
      chats: db.collection("chats").where("owner", "==", this.uid),
    };
  },
  methods: {
    updateChats() {
      return this.getChatRooms().then(chats => {this.chats = chats})
    },
    async createChatRoom() {
      const newChat = await db.collection("chats").add({
        createdAt: Date.now(),
        owner: this.uid,
        members: [this.uid],
      });
    },
    getChatRooms() {
      var user_id = this.uid;
      return db.collection("chats")
        .get()
        .then(function (snapshot) {
          var chats = [];
          snapshot.forEach(function (childSnapshot) {
            var id = childSnapshot.id;
            var data = childSnapshot.data();

            if (data.owner == user_id) {
              chats.push({
                id: id,
                owner: data.owner,
              });
            }
          });
          return chats;
        });
    },
  },
  props: ["uid"],
};
</script>
