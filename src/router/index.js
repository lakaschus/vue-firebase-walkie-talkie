import { createRouter, createWebHistory } from 'vue-router'
// import HomeView from '../views/HomeView.vue'

import Home from '../components/Home.vue'
import ChatRoom from '../components/ChatRoom.vue'

const router = createRouter({
    history: createWebHistory(
        import.meta.env.BASE_URL),
    routes: [
        { path: '/', component: Home },
        { path: '/chats/:id', component: ChatRoom, name: 'chat' }
    ]
})

export default router