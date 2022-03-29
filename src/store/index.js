import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";
import SecureLS from "secure-ls";

var ls = new SecureLS({ isCompression: false });

Vue.use(Vuex)

import auth from '@/store/modules/auth'
import jobs from '@/store/modules/jobs'
import contracts from '@/store/modules/contracts'
import tags from '@/store/modules/tags'
import userJobs from '@/store/modules/userJobs'
import notifications from '@/store/modules/notifications'

const dataState = createPersistedState({
	paths: [
		'auth.is_auth',
		'auth.user',
		'auth.token',
		'jobs.showFilters',
		'userJobs.jobs' // rimuovere al logout
	],
	storage: {
		getItem: (key) => ls.get(key),
		setItem: (key, value) => ls.set(key, value),
		removeItem: (key) => ls.remove(key),
	},
})

export default new Vuex.Store({
	state: {
	},
	mutations: {
	},
	actions: {
	},
	modules: {
		auth,
		jobs,
		contracts,
		tags,
		userJobs,
		notifications
	},
	plugins: [dataState],
})
