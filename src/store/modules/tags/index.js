import state from '@/store/modules/tags/state'
import * as getters from '@/store/modules/tags/getters'
import * as actions from '@/store/modules/tags/actions'
import * as mutations from '@/store/modules/tags/mutations'

export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations,
}