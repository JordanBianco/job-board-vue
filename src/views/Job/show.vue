<template>
	<div>
		<Breadcrumb
			v-if="job"
			:routes="[{ name: 'Home', text: 'Tutti gli annunci' }]"
			:current="job.title"
		/>
		<div
			v-if="job"
			class="mx-auto w-90% py-10">
				<div class="lg:flex lg:items-start lg:justify-between lg:space-y-0 space-y-16">
					<!-- Left Side -->
					<div class="flex items-start space-x-3 lg:space-x-6 flex-1 lg:border-r lg:border-gray-200 pr-6">
						<div
							v-if="job.logo"
							class="w-10 lg:w-16 flex-none">
								<img
									alt="logo"
									:src="companyLogo"
									class="object-cover w-full h-full rounded-xl">
						</div>
						<div
							v-else
							class="w-10 lg:w-16 bg-gray-200 rounded-xl p-2 flex-none">
								<img
									src="@/assets/logo.png"
									alt="logo"
									class="object-cover w-full h-full">
						</div>

						<div class="space-y-4 w-full">
							<p class="text-gray-500 text-xl lg:text-2xl leading-tight">{{ job.title }}</p>

							<div
								v-if="!job.is_approved"
								class="flex items-center space-x-3 text-sm px-4 py-3 rounded-lg bg-blue-100 text-blue-400 my-2">
									<svg class="w-5 h-5 flex-none" id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M12,2A10,10,0,1,0,22,12,10.01114,10.01114,0,0,0,12,2Zm0,18a8,8,0,1,1,8-8A8.00917,8.00917,0,0,1,12,20Zm0-8.5a1,1,0,0,0-1,1v3a1,1,0,0,0,2,0v-3A1,1,0,0,0,12,11.5Zm0-4a1.25,1.25,0,1,0,1.25,1.25A1.25,1.25,0,0,0,12,7.5Z"/></svg>
									<span>Il tuo annuncio è in attesa di essere approvato.</span>
							</div>

							<div class="lg:flex lg:items-center lg:space-x-2 space-y-3 lg:space-y-0 text-gray-400">
								<div class="flex items-center space-x-1">
									<svg class="w-5 h-5 flex-none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M11,11.9V17a1,1,0,0,0,2,0V11.9a5,5,0,1,0-2,0ZM12,4A3,3,0,1,1,9,7,3,3,0,0,1,12,4Zm4.21,10.42a1,1,0,1,0-.42,2C18.06,16.87,19,17.68,19,18c0,.58-2.45,2-7,2s-7-1.42-7-2c0-.32.94-1.13,3.21-1.62a1,1,0,1,0-.42-2C4.75,15.08,3,16.39,3,18c0,2.63,4.53,4,9,4s9-1.37,9-4C21,16.39,19.25,15.08,16.21,14.42Z"/></svg>
									<span class="text-sm">{{ job.location }}</span>
								</div>
								<span class="text-xs hidden lg:block">&bull;</span>
								<div class="flex items-center space-x-1">
									<svg class="w-5 h-5 flex-none" xmlns="http://www.w3.org/2000/svg" data-name="Layer 1" viewBox="0 0 24 24"><path fill="currentColor" d="M14,8h1a1,1,0,0,0,0-2H14a1,1,0,0,0,0,2Zm0,4h1a1,1,0,0,0,0-2H14a1,1,0,0,0,0,2ZM9,8h1a1,1,0,0,0,0-2H9A1,1,0,0,0,9,8Zm0,4h1a1,1,0,0,0,0-2H9a1,1,0,0,0,0,2Zm12,8H20V3a1,1,0,0,0-1-1H5A1,1,0,0,0,4,3V20H3a1,1,0,0,0,0,2H21a1,1,0,0,0,0-2Zm-8,0H11V16h2Zm5,0H15V15a1,1,0,0,0-1-1H10a1,1,0,0,0-1,1v5H6V4H18Z"/></svg>
									<span class="text-sm">{{ job.company }}</span>
								</div>
								<span class="text-xs hidden lg:block">&bull;</span>
								<div class="flex items-center space-x-1">
									<svg class="w-5 h-5 flex-none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M14.58,11.3a3.24,3.24,0,0,0,.71-2,3.29,3.29,0,0,0-6.58,0,3.24,3.24,0,0,0,.71,2,5,5,0,0,0-2,2.31,1,1,0,1,0,1.84.78A3,3,0,0,1,12,12.57h0a3,3,0,0,1,2.75,1.82,1,1,0,0,0,.92.61,1.09,1.09,0,0,0,.39-.08,1,1,0,0,0,.53-1.31A5,5,0,0,0,14.58,11.3ZM12,10.57h0a1.29,1.29,0,1,1,1.29-1.28A1.29,1.29,0,0,1,12,10.57ZM18,2H6A3,3,0,0,0,3,5V16a3,3,0,0,0,3,3H8.59l2.7,2.71A1,1,0,0,0,12,22a1,1,0,0,0,.65-.24L15.87,19H18a3,3,0,0,0,3-3V5A3,3,0,0,0,18,2Zm1,14a1,1,0,0,1-1,1H15.5a1,1,0,0,0-.65.24l-2.8,2.4L9.71,17.29A1,1,0,0,0,9,17H6a1,1,0,0,1-1-1V5A1,1,0,0,1,6,4H18a1,1,0,0,1,1,1Z"/></svg>
									<span class="text-sm">{{ job.position }}</span>
								</div>
							</div>

							<div class="flex flex-wrap">
								<div
									v-for="tag in job.tags"
									:key="tag.id"
									class="text-xs text-white bg-indigo-400 rounded-xl px-2 py-1 mr-1 my-1 max-w-max">
										<span>{{ tag.name }}</span>
								</div>
							</div>

							<div>
								<p class="text-lg text-gray-500 mb-2">Descrizione</p>
								<p class="text-gray-400 leading-tight">{{ job.description }}</p>
							</div>
						</div>
					</div>

					<!-- Right Side -->
					<div class="lg:w-64 sm:pl-16 lg:pl-6">
						<div class="flex flex-col">
							<div class="flex flex-col space-y-3 text-gray-400">
								<div v-if="job.remote_working" class="flex items-center space-x-2">
									<svg class="w-5 h-5 flex-none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M21.41,8.64s0,0,0-.05a10,10,0,0,0-18.78,0s0,0,0,.05a9.86,9.86,0,0,0,0,6.72s0,0,0,.05a10,10,0,0,0,18.78,0s0,0,0-.05a9.86,9.86,0,0,0,0-6.72ZM4.26,14a7.82,7.82,0,0,1,0-4H6.12a16.73,16.73,0,0,0,0,4Zm.82,2h1.4a12.15,12.15,0,0,0,1,2.57A8,8,0,0,1,5.08,16Zm1.4-8H5.08A8,8,0,0,1,7.45,5.43,12.15,12.15,0,0,0,6.48,8ZM11,19.7A6.34,6.34,0,0,1,8.57,16H11ZM11,14H8.14a14.36,14.36,0,0,1,0-4H11Zm0-6H8.57A6.34,6.34,0,0,1,11,4.3Zm7.92,0h-1.4a12.15,12.15,0,0,0-1-2.57A8,8,0,0,1,18.92,8ZM13,4.3A6.34,6.34,0,0,1,15.43,8H13Zm0,15.4V16h2.43A6.34,6.34,0,0,1,13,19.7ZM15.86,14H13V10h2.86a14.36,14.36,0,0,1,0,4Zm.69,4.57a12.15,12.15,0,0,0,1-2.57h1.4A8,8,0,0,1,16.55,18.57ZM19.74,14H17.88A16.16,16.16,0,0,0,18,12a16.28,16.28,0,0,0-.12-2h1.86a7.82,7.82,0,0,1,0,4Z"/></svg>
									<span class="text-sm">Possibilità di lavorare da remoto</span>
								</div>

								<div class="flex items-center space-x-2">
									<svg class="w-5 h-5 flex-none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M9,10h1a1,1,0,0,0,0-2H9a1,1,0,0,0,0,2Zm0,2a1,1,0,0,0,0,2h6a1,1,0,0,0,0-2ZM20,8.94a1.31,1.31,0,0,0-.06-.27l0-.09a1.07,1.07,0,0,0-.19-.28h0l-6-6h0a1.07,1.07,0,0,0-.28-.19.32.32,0,0,0-.09,0A.88.88,0,0,0,13.05,2H7A3,3,0,0,0,4,5V19a3,3,0,0,0,3,3H17a3,3,0,0,0,3-3V9S20,9,20,8.94ZM14,5.41,16.59,8H15a1,1,0,0,1-1-1ZM18,19a1,1,0,0,1-1,1H7a1,1,0,0,1-1-1V5A1,1,0,0,1,7,4h5V7a3,3,0,0,0,3,3h3Zm-3-3H9a1,1,0,0,0,0,2h6a1,1,0,0,0,0-2Z"/></svg>
									<span class="text-sm">{{ job.contract.name }}</span>
								</div>

								<div class="flex items-center space-x-2">
									<svg class="w-5 h-5 flex-none" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M15.09814,12.63379,13,11.42285V7a1,1,0,0,0-2,0v5a.99985.99985,0,0,0,.5.86621l2.59814,1.5a1.00016,1.00016,0,1,0,1-1.73242ZM12,2A10,10,0,1,0,22,12,10.01114,10.01114,0,0,0,12,2Zm0,18a8,8,0,1,1,8-8A8.00917,8.00917,0,0,1,12,20Z"/></svg>
									<span class="text-sm">Pubblicato il: {{ $moment(job.created_at).format('DD-MM-YYYY H:mm') }}</span>
								</div>

								<div class="flex items-center space-x-2">
									<svg class="w-5 h-5 flex-none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M19.2,17.41A6,6,0,0,1,14.46,20c-2.68,0-5-2-6-5H14a1,1,0,0,0,0-2H8.05c0-.33-.05-.67-.05-1s0-.67.05-1H14a1,1,0,0,0,0-2H8.47c1-3,3.31-5,6-5A6,6,0,0,1,19.2,6.59a1,1,0,1,0,1.6-1.18A7.92,7.92,0,0,0,14.46,2c-3.76,0-7,2.84-8.07,7H4a1,1,0,0,0,0,2H6.05c0,.33,0,.67,0,1s0,.67,0,1H4a1,1,0,0,0,0,2H6.39c1.09,4.16,4.31,7,8.07,7a7.92,7.92,0,0,0,6.34-3.41,1,1,0,0,0-1.6-1.18Z"/></svg>
									<span class="text-sm">{{ job.salary }}</span>
								</div>
							</div>

							<a
								:href="job.apply_link"
								class="bg-gradient-to-r from-indigo-400 to-blue-400 text-white px-6 py-3 text-sm rounded-lg block w-full md:max-w-max mt-8 whitespace-nowrap"
								target="_blank">
									Candidati ora
							</a>
						</div>
					</div>
				</div>
		</div>
    </div>
</template>

<script>
import Breadcrumb from '@/components/Layout/Breadcrumb'
import { mapActions, mapGetters } from 'vuex'

export default {
	name: 'Job.show',
	props: {
		slug: {
			type: String,
			required: true
		}
	},
	components: {
		Breadcrumb
	},
	mounted() {
		this.getJob({ slug: this.slug })
	},
	computed: {
		...mapGetters('jobs', ['job']),
		companyLogo() {
         return 'http://localhost:8000/storage/' + this.job.logo
      }
	},
	methods: {
		...mapActions('jobs', ['getJob'])
	}
}
</script>