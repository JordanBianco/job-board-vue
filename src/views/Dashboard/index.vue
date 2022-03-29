<template>
	<div v-if="user">
		<section class="bg-white border-b border-gray-100 py-8">
			<div class="w-90% mx-auto">
				<h2 class="text-2xl text-gray-500">{{ user.first_name + ' ' + user.last_name }}</h2>
			</div>
		</section>

		<section class="w-90% mx-auto py-8">
			<div v-if="jobs">
				<JobItem
					v-for="job in jobs.data"
					:key="job.id"
					:job="job"
				/>
			</div>
			<div v-else class="text-gray-400">
				Non hai ancora pubblicato un annuncio. <router-link class="text-indigo-400" :to="{ name: 'Job.create' }">Inizia ora!</router-link>
			</div>
		</section>
	</div>
</template>

<script>
import JobItem from '@/components/Job/JobItem'
import { mapGetters } from 'vuex'

export default {
	name: 'Dashboard.index',
	components: {
		JobItem
	},
	mounted() {
		this.getJobs()
	},
	computed: {
		...mapGetters('auth', ['user']),
		...mapGetters('userJobs', ['jobs'])
	},
	methods: {
		getJobs() {
			this.$store.dispatch('userJobs/getJobs')
		}
	}
}
</script>