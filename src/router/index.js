import Vue from 'vue'
import VueRouter from 'vue-router'
import GetTopGames from '../views/GetTopGames.vue'
import GetTopStreamers from '../views/GetTopStreamers.vue'
import StreamersForGame from '../views/StreamersForGame.vue'
import Streamer from '../views/Streamer.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'GetTopGames',
    component: GetTopGames
  },
  {
    path: '/GetTopStreamers',
    name: 'GetTopStreamers',
    component: GetTopStreamers,
  },
  {
    path: '/StreamersForGame/:game_name',
    name: 'StreamersForGame',
    component: StreamersForGame,
  },
  {
    path: '/streamer/:streamer_user_name',
    name: 'Streamer',
    component: Streamer,
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
