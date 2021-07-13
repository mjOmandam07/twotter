import { createStore } from 'vuex'
import { UserModule } from './User'

export default createStore({
  state: {},

  mutations: {}, //Are Functions that directly affects/change the state 

  actions: {}, //Are functions that is called thorughout the app that calls the mutations

  modules: {
    User: UserModule
  }
})
