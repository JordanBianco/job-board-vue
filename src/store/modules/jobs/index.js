import state from '@/store/modules/jobs/state'
import * as getters from '@/store/modules/jobs/getters'
import * as actions from '@/store/modules/jobs/actions'
import * as mutations from '@/store/modules/jobs/mutations'

export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations,
}