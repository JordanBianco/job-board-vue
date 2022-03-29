<template>
	<div class="pb-20">
		<div class="flex justify-between items-center md:space-x-6 space-x-2 mb-10 max-w-max mx-auto">
			<div :class="page === 1 ? 'text-indigo-400' : 'text-gray-400'">
				<span class="block text-sm">L'annuncio</span>
			</div>
			<svg class="w-4 h-4 flex-none text-gray-400 mt-0.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M14.83,11.29,10.59,7.05a1,1,0,0,0-1.42,0,1,1,0,0,0,0,1.41L12.71,12,9.17,15.54a1,1,0,0,0,0,1.41,1,1,0,0,0,.71.29,1,1,0,0,0,.71-.29l4.24-4.24A1,1,0,0,0,14.83,11.29Z"/></svg>
			<div :class="page === 2 ? 'text-indigo-400' : 'text-gray-400'">
				<span class="block text-sm">Il lavoro</span>
			</div>
			<svg class="w-4 h-4 flex-none text-gray-400 mt-0.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M14.83,11.29,10.59,7.05a1,1,0,0,0-1.42,0,1,1,0,0,0,0,1.41L12.71,12,9.17,15.54a1,1,0,0,0,0,1.41,1,1,0,0,0,.71.29,1,1,0,0,0,.71-.29l4.24-4.24A1,1,0,0,0,14.83,11.29Z"/></svg>
			<div :class="page === 3 ? 'text-indigo-400' : 'text-gray-400'">
				<span class="block text-sm">L'azienda</span>
			</div>
		</div>
		<ValidationObserver v-slot="{ handleSubmit }">
			<form @submit.prevent="handleSubmit(storeJob)">
				<!-- Server side validation -->
				<ErrorMessages :errors="errors" />

				<!-- Annuncio -->
				<TheAdvertisement
					v-if="page === 1"
					:job="job"
					@nextPage="nextPage"
				/>

				<!-- Lavoro -->
				<TheJob
					v-if="page === 2"
					:job="job"
					@prevPage="prevPage"
					@nextPage="nextPage"
				/>

				<!-- Azienda -->
				<TheCompany
					v-if="page === 3"
					:job="job"
					@prevPage="prevPage"
				/>
			</form>
		</ValidationObserver>
	</div>
</template>

<script>
import { mapGetters } from 'vuex'
import { ValidationObserver } from 'vee-validate'
import ErrorMessages from '@/components/ErrorMessages'
import TheAdvertisement from '@/components/Job/Form/TheAdvertisement'
import TheJob from '@/components/Job/Form/TheJob'
import TheCompany from '@/components/Job/Form/TheCompany'

export default {
	name: 'CreateJobForm',
	components: {
		ErrorMessages,
		ValidationObserver,
		TheAdvertisement,
		TheJob,
		TheCompany
	},
	watch: {
		"$route" : {
			handler() {
				this.clearErrors()
			},
			deep: true,
			immediate: true
		}
	},
	data() {
		return {
			page: 1,
			job: {
				// Annuncio
				title: '',
				description: '',
				apply_link: '',
				tags: [],

				// Lavoro
				position: '',
				location: '',
				remote_working: '',
				working_day: '',
				salary: '',
				contract_id: '',
				
				// Compagnia
				company: '',
				logo: '',
			},
		}
	},
	computed: {
	...mapGetters('userJobs', ['errors']),
	},
	methods: {
		nextPage() {
			this.page = this.page + 1
		},
		prevPage() {
			this.page = this.page - 1
		},
		storeJob() {
			let tagIds = []
			this.job.tags.forEach(tag => { tagIds.push(tag.id) })

			const formData = new FormData();
			formData.append("position", this.job.position)
			formData.append("location", this.job.location)
			formData.append("remote_working", this.job.remote_working)
			formData.append("working_day", this.job.working_day)
			formData.append("salary", this.job.salary)
			formData.append("contract_id", this.job.contract_id)
			formData.append("title", this.job.title)
			formData.append("description", this.job.description)
			formData.append("apply_link", this.job.apply_link)
			formData.append("tags", [tagIds])
			formData.append("company", this.job.company)
			formData.append("logo", this.job.logo)

			this.$store.dispatch('userJobs/storeJob', formData)
		},
		clearErrors() {
			this.$store.dispatch('userJobs/clearErrors')
		}
	}
}
</script>