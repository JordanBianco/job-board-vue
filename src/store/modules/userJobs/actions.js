import api from '@/apis/api'
import router from '@/router'

export const getJobs = async ({commit}) => {
	try {
		const res = await api.get('/user/jobs')
		if (res.status === 200) {
			commit('SET_JOBS', res.data)
		}
	} catch (error) {
		console.log(error)
	}
}

export const storeJob = async ({commit}, formData) => {
	try {
		const res = await api.post('/jobs/', formData)        
		if (res.status === 201) {
			router.push({ name: 'Job.show', params: { slug: res.data.data.slug } })
			commit('notifications/ADD_NOTIFICATION', { message: 'Annuncio aggiunto correttamente' }, { root:true})
		}
	} catch (error) {
		if (error.response.status === 422) {
			commit('SET_ERRORS', error.response.data.errors)
		}
	}
}
 
export const updateJob = async ({commit}, formData) => {
	try {
		const res = await api.post('/jobs/' + formData.get('id') + '/update', formData)
		if (res.status === 200) {
			router.push({ name: 'Job.show', params: { slug: res.data.data.slug } })
			commit('notifications/ADD_NOTIFICATION', { message: 'Annuncio aggiornato correttamente' }, { root:true})
		}
	} catch (error) {
		if (error.response.status === 422) {
			commit('SET_ERRORS', error.response.data.errors)
		}
	}
}
 
export const deleteJob = async ({commit}, {job}) => {
	try {
		const res = await api.delete('/jobs/' + job.id + '/delete')
		if (res.status === 200) {
			commit('DELETE_JOB', job)
			commit('notifications/ADD_NOTIFICATION', { message: 'Annuncio eliminato correttamente' }, { root:true})
		}
	} catch (error) {
		console.log(error)
	}
}

export const clearErrors = ({commit}) => {
	commit('SET_ERRORS', [])
}