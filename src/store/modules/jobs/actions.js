import api from '@/apis/api'

export const getJobs = async ({commit}, {search, filters, sort, page}) => {
	try {
		if (filters != null) {
			const res = await api.get(
				'/jobs?search=' + search
				+ '&sort=' + sort
				+ '&contract=' + filters.selectedContracts
				+ '&working_day=' + filters.working_day
				+ '&remote_working=' + filters.remote_working
				+ '&tags=' + filters.selectedTags
				+ '&page=' + page
			)
			commit('SET_JOBS', res.data)
		} else {
			const res = await api.get('/jobs?search=' + search + '&sort=' + sort + '&page=' + page)
			commit('SET_JOBS', res.data)
		}
	} catch (error) {
		console.log(error)
	}
}

export const getJob = async ({commit}, {slug}) => {
	try {
		commit('SET_JOB', null)
		const res = await api.get('/jobs/'+ slug)
		commit('SET_JOB', res.data.data)
	} catch (error) {
		console.log(error)
	}
}

export const toggleFilters = ({ commit }) => {
	commit('TOGGLE_FILTERS')
}