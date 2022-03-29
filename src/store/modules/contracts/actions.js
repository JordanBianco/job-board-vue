import api from '@/apis/api'

export const getContracts = async ({commit}) => {
    try {
        const res = await api.get('/contracts')
        commit('SET_CONTRACTS', res.data.data)
    } catch (error) {
        console.log(error)
    }
}