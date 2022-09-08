export default function ({ store,app }) {
 if(store.getters.isLogin){
    const token = store.getters.hasToken;
    app.$axios.setToken(token, 'Bearer')
 }
}
