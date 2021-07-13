export const UserModule = {
    namespaced: true,

    state: {
        user: null
    },
    
    mutations: { //Are Functions that directly affects/change the state
        SET_USER(state, user){
          state.user = user;
        }
    },
    
    actions: { //Are functions that is called thorughout the app that calls the mutations
        setUser({ commit }, user){
          commit('SET_USER', user);
        }
    },
}