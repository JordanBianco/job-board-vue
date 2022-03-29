<template>
	<div class="md:flex md:justify-between md:items-center py-8">
		<div class="flex items-center justify-center md:justify-start space-x-3">
			<button
				v-if="!showFilters"
				id="toggleFilters"
				@click="toggleFilters()"
				class="flex items-center space-x-3 border border-gray-200 rounded-lg bg-white text-sm text-gray-500 px-4 py-2 focus:border-indigo-300 transition focus:outline-none">
					<h3>Filtri</h3>
					<svg class="w-5 h-5 flex-none rotate-90 text-gray-400 transform" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M20,8.18V3a1,1,0,0,0-2,0V8.18a3,3,0,0,0,0,5.64V21a1,1,0,0,0,2,0V13.82a3,3,0,0,0,0-5.64ZM19,12a1,1,0,1,1,1-1A1,1,0,0,1,19,12Zm-6,2.18V3a1,1,0,0,0-2,0V14.18a3,3,0,0,0,0,5.64V21a1,1,0,0,0,2,0V19.82a3,3,0,0,0,0-5.64ZM12,18a1,1,0,1,1,1-1A1,1,0,0,1,12,18ZM6,6.18V3A1,1,0,0,0,4,3V6.18a3,3,0,0,0,0,5.64V21a1,1,0,0,0,2,0V11.82A3,3,0,0,0,6,6.18ZM5,10A1,1,0,1,1,6,9,1,1,0,0,1,5,10Z"/></svg>
			</button>

			<select
				name="sort"
				v-model="sort"
				class="border border-gray-200 rounded-lg bg-white text-sm text-gray-500 px-4 py-2 focus:border-indigo-300 transition focus:outline-none">
					<option value="latest">Più recenti</option>
					<option value="oldest">Meno recenti</option>
			</select>
		</div>

		<p
			v-if="jobs.meta"
			class="text-gray-400 text-sm mt-3 text-center md:text-right md:mt-0">
				{{ jobs.meta.total }} annunci totali &bull; {{ jobs.meta.per_page }} per pagina
		</p>
	</div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
	name: 'TheSorting',
	props: {
		jobs: {
			type: [Object, Array],
			required: false
		}
	},
	watch: {
		sort: {
			handler() {
				this.$emit('sort', this.sort)
			}
		}
	},
	data() {
		return {
			sort: 'latest'
		}
	},
	computed: {
		...mapGetters('jobs', ['showFilters'])
	},
	methods: {
		toggleFilters() {
			this.$store.dispatch('jobs/toggleFilters')
		}
	}
}
</script>