export default function ({ store , redirect}) {
  if (!store.getters.isLogin && process.client) {
    redirect({name: 'login'})
  }
}
