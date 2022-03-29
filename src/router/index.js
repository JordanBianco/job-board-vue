import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'

Vue.use(VueRouter)

const routes = [
	{
		path: '/',
		name: 'Home',
		component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue')
	},
	{
		path: '/job/:slug',
		name: 'Job.show',
		component: () => import(/* webpackChunkName: "job.show" */ '../views/Job/show.vue'),
		props: true
	},
	{
		path: '/register',
		name: 'Register',
		component: () => import(/* webpackChunkName: "register" */ '../views/Auth/register.vue'),
		meta: { guest: true }
	},
	{
		path: '/login',
		name: 'Login',
		component: () => import(/* webpackChunkName: "login" */ '../views/Auth/login.vue'),
		meta: { guest: true }
	},
	{
		path: '/job/:slug/edit',
		name: 'Job.edit',
		component: () => import(/* webpackChunkName: "job.edit" */ '../views/Job/edit.vue'),
		props: true,
		meta: { auth: true, user: true },
	},
	{
		path: '/create',
		name: 'Job.create',
		component: () => import(/* webpackChunkName: "job.create" */ '../views/Job/create.vue'),
		meta: { auth: true }
	},
	{
		path: '/dashboard',
		name: 'Dashboard',
		component: () => import(/* webpackChunkName: "dashboard" */ '../views/Dashboard/index.vue'),
		meta: { auth: true }
	},
]

const router = new VueRouter({
	routes,
	mode: 'history',
	scrollBehavior: (to, from, savedPosition) => {
		if (savedPosition) {
			return savedPosition;
		} else if (to.hash) {
			return {
				selector: to.hash
			};
		} else {
			return { x: 0, y: 0 };
		}
	},
})

router.beforeEach((to, from, next) => {
	if (to.meta.auth) {

		if (store.getters['auth/is_auth']) {
			next()
		} else {
			next({ name: 'Login' })
		}

		if (to.meta.user) {
			let slugs = []

			store.state.userJobs.jobs.data.filter(job => {
				slugs.push(job.slug)
			})

			if (slugs.includes(to.params.slug)) {
				next()
			} else {
				next({ name: 'Dashboard' })
			}
		}

	} else if (to.meta.guest) {
		if (store.getters['auth/is_auth']) {
			next({ name: 'Home' })
		} else {
			next()
		}
	} else {
		next()
	}
})

export default router

// 	let slugs = []

// 	store.state.userJobs.jobs.data.filter(job => {
// 		slugs.push(job.slug)
// 	})

// 	if (slugs.includes(to.params.slug)) {
// 		console.log(true)
// 		return true
// 	} else {
// 		console.log(false)
// 		return false
// 	}
