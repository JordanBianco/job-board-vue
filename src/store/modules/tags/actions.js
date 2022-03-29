import api from '@/apis/api'

export const getTags = async ({commit}) => {
    try {
        const res = await api.get('/tags')
        commit('SET_TAGS', res.data.data)
    } catch (error) {
        console.log(error)
    }
}