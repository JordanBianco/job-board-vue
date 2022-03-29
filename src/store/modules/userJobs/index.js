import state from '@/store/modules/userJobs/state'
import * as getters from '@/store/modules/userJobs/getters'
import * as actions from '@/store/modules/userJobs/actions'
import * as mutations from '@/store/modules/userJobs/mutations'

export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations,
}