import api from '@/apis/api'
import router from '@/router'

export const register = async ({commit}, {user}) => {
    try {
        const res = await api.post('/register', {
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            password: user.password,
            password_confirmation: user.password_confirmation
        })
        console.log(res)
        if (res.status === 201) {
            router.push({ name: 'Login' })
        }
    } catch (error) {
        if (error.response.status === 422) {
            commit('SET_ERRORS', error.response.data.errors)
        }
    }
}

export const login = async ({commit}, {credentials}) => {
    try {
        const res = await api.post('/login', {
            email: credentials.email,
            password: credentials.password
        })
        if (res.status === 200) {
            commit('SET_AUTH_VALUE', true)
            commit('SET_USER', res.data.user)
            commit('SET_TOKEN', res.data.token)
            commit('SET_ERRORS', [])
            router.push({ name: 'Dashboard' })
        }
    } catch (error) {
        if (error.response.status === 422) {
            commit('SET_ERRORS', error.response.data.errors)
        }
    }
}

export const logout = async ({commit}) => {
    try {
        const res = await api.post('/logout')
        if (res.status === 200) {
            commit('SET_AUTH_VALUE', false)
            commit('SET_USER', {})
            commit('SET_TOKEN', null)
            router.push({ name: 'Home' })
        }
    } catch (error) {
        console.log(error)
    }
}