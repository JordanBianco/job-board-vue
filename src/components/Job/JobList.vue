<template>
   <div>
		<TheSearchbar
			@searchJobs="searchJobs"
		/>

		<div class="bg-indigo-50 py-14">
			<div class="w-90% mx-auto flex  flex-col justify-center items-center md:flex-row md:items-center md:justify-between">
				<p class="text-lg md:text-2xl text-gray-600 mb-4 md:mb-0">Sfoglia gli ultimi annunci di lavoro</p>
				<router-link
					:to="{ name: 'Job.create' }"
					class="text-sm text-white bg-gradient-to-r from-indigo-400 to-blue-400 rounded-lg px-3 py-2 max-w-max block">
						Pubblica un annuncio
				</router-link>
			</div>
		</div>

      <div v-if="jobs.data" class="flex">
			<TheFilters @applyFilters="applyFilters" />
         
         <div class="flex-1">
				<section class="w-90% mx-auto">
					<TheSorting
						@sort="sortJobs"
						:jobs="jobs"
					/>
            
					<JobItem
						v-for="job in jobs.data"
						:key="job.id"
						:job="job"
					/>

					<div class="flex justify-center py-10">
						<pagination
							:data="jobs"
							class="flex items-center space-x-4 text-gray-400 p-4"
							:limit="5"
							@pagination-change-page="getJobs">
								<div slot="prev-nav">
									<svg class="w-5 h-5 flex-none text-indigo-300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M11.29,12l3.54-3.54a1,1,0,0,0,0-1.41,1,1,0,0,0-1.42,0L9.17,11.29a1,1,0,0,0,0,1.42L13.41,17a1,1,0,0,0,.71.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41Z"/></svg>
								</div>
								<div slot="next-nav">
									<svg class="w-5 h-5 flex-none text-indigo-300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M14.83,11.29,10.59,7.05a1,1,0,0,0-1.42,0,1,1,0,0,0,0,1.41L12.71,12,9.17,15.54a1,1,0,0,0,0,1.41,1,1,0,0,0,.71.29,1,1,0,0,0,.71-.29l4.24-4.24A1,1,0,0,0,14.83,11.29Z"/></svg>
								</div>
						</pagination>
					</div>
				</section>
         </div>
      </div>
      <div v-else class="flex justify-center items-center pt-10">
			<img
				class="animate-spin w-8 h-8 text-gray-400"
				src="https://img.icons8.com/ios/50/BBBBBB/spinning-circle--v1.png"/>
		</div>
   </div>
</template>

<script>
import TheFilters from '@/components/Job/TheFilters'
import TheSearchbar from '@/components/Job/TheSearchbar'
import TheSorting from '@/components/Job/TheSorting'
import JobItem from '@/components/Job/JobItem'
import pagination from 'laravel-vue-pagination'

export default {
   name: 'JobList',
   components: {
      TheFilters,
		TheSearchbar,
		TheSorting,
		JobItem,
		pagination
   },
   mounted() {
		this.getJobs()
	},
	watch: {
		sort() {
			this.getJobs()
		},
		search() { 
			this.getJobs()
		},
		page() {
			this.getJobs()
		},
		filters: {
			handler() {
				this.getJobs()
			},
			deep: true,
			immediate: true
		}
	},
   data() {
		return {
			sort: 'latest',
			search: '',
			filters: null
		}
	},
   computed: {
      jobs() {
         return this.$store.state.jobs.jobs
      }
	},
   methods: {
      getJobs(page = 1) {
			this.$store.dispatch('jobs/getJobs', {
				sort: this.sort,
				search: this.search,
				filters: this.filters,
				page: page
			})
		},
		applyFilters(filters) {
			this.filters = filters
		},
		searchJobs(search) {
			this.search = search
		},
		sortJobs(sort) {
			this.sort = sort
		}
   }
}
</script>

<style>
	.active {
		background-color: rgba(129, 140, 248);
		padding: 1px 10px;
		color: white;
		border-radius: 8px;
	}
</style>
