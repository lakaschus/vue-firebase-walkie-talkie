<template>
  <div class="section">
    <h2>Home.vue</h2>

    <User>
      <template v-slot:user="{ user }">
      <div v-if="user">
          <h3>User Profile</h3>
        <UserProfile :user="user" />
          <h3>My Chat Rooms</h3>
        <ChatList :uid="user.uid" />
      </div>
      <Login v-else />
      </template>
    </User>
  </div>
</template>

<script>
import Login from './Login.vue'
import User from './User.vue'
import UserProfile from './UserProfile.vue'
import ChatList from './ChatList.vue'

export default {
    components: {
        Login, 
        User,
        UserProfile,
        ChatList
    }
}
</script>