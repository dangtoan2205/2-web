import Vuex from 'vuex'
// import axios from 'axios'

const store = () => {
  return new Vuex.Store({
    state: {
      user: {
        data: {},
        token: null,
      },
      cart: [],
    },
    mutations: {
      setUser(state, user) {
        state.user.data = user
      },
      setToken(state, token) {
        state.user.token = token
      },
      logout(state) {
        state.user.token = null
        state.user.data = {}
        state.cart = []
      },
      // them gio hang
      setCart(state, data) {
        const existProduct = state.cart.find((item) => item.id === data.id)
        if (existProduct) {
          existProduct.quantity += data.quantity
          return
        }
        state.cart.push(data)
      },
      deleteItem(state, index) {
        state.cart.splice(index, 1)
      },
      // tang so luong
      incrementQuantity(state, productID) {
        const existProduct = state.cart.find((item) => item.id === productID)
        existProduct.quantity++
      },
      // giam so luong
      decrementQuantity(state, productID) {
        const existProduct = state.cart.find((item) => item.id === productID)
        existProduct.quantity--
      },
      clearCart(state) {
        state.cart = []
      },
    },
    actions: {
      async login({ commit }, user) {
        await this.$axios.$post(`login`, user).then((res) => {
          commit('setUser', res.user)
          commit('setToken', res.token)
        })
      },
      logout({ commit }) {
        commit('logout')
      },
      addToCart({ commit }, data) {
        commit('setCart', data)
      },
      deleteItem({ commit }, index) {
        commit('deleteItem', index)
      },
      incrementQuantity({ commit }, productID) {
        commit('incrementQuantity', productID)
      },
      decrementQuantity({ commit }, productID) {
        commit('decrementQuantity', productID)
      },
      clearCart({ commit }) {
        commit('clearCart')
      },
    },
    getters: {
      hasToken(state) {
        return state.user.token
      },
      isLogin(state) {
        return state.user.token !== null
      },
      getRole(state) {
        return state.user.data.roles
      },
      getCart(state) {
        return state.cart
      },
      // tong gia
      totalPrice(state) {
        const result = state.cart.reduce((total, item) => {
          return total + item.quantity * item.price
        }, 0)
        return result
      },
      // lay so luong trong gio hang
      cartQuantity(state) {
        return state.cart.length
      },
      //  lay ID user
      userID(state) {
        return state.user.data.id
      },

      // lay thong tin user
      getUser(state) {
        return state.user.data
      }
    },
  })
}
export default store
