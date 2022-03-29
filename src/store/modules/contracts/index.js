import state from '@/store/modules/contracts/state'
import * as getters from '@/store/modules/contracts/getters'
import * as actions from '@/store/modules/contracts/actions'
import * as mutations from '@/store/modules/contracts/mutations'

export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations,
}