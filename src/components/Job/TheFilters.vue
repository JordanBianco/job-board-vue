<template>
	<div>
		<section
			:class="[ showFilters ? 'fixed bottom-0 top-0 md:relative md:w-72' : 'hidden' ]"
			class="bg-white h-full border-r border-l border-gray-200">
			<div class="flex items-start justify-between p-6 border-b border-gray-200">
				<div>
					<h3 class="text-gray-500 -mb-2">Filtri</h3>
					<button
						id="clear"
						@click="removeFilters()"
						class="text-gray-400 text-xs hover:text-indigo-400 transition">
							rimuovi tutti
					</button>
				</div>

				<svg
					id="toggleFilters"
					@click="toggleFilters()"
					class="w-6 h-6 flex-none text-gray-400 hover:text-gray-600 transition cursor-pointer" xmlns="http://www.w3.org/2000/svg" data-name="Layer 1" viewBox="0 0 24 24"><path fill="currentColor" d="M17,11H9.41l3.3-3.29a1,1,0,1,0-1.42-1.42l-5,5a1,1,0,0,0-.21.33,1,1,0,0,0,0,.76,1,1,0,0,0,.21.33l5,5a1,1,0,0,0,1.42,0,1,1,0,0,0,0-1.42L9.41,13H17a1,1,0,0,0,0-2Z"/></svg>
			</div>

			<!-- Tipo di contratto -->
			<div class="p-6 border-b border-gray-200">
				<h4 class="text-sm text-gray-500 mb-4">Tipo di contratto</h4>
				<section class="text-sm space-y-2.5">
					<div
						v-for="contract in contracts"
						:key="contract.id"
						class="flex items-center space-x-2">
							<input
								id="selectedContracts"
								type="checkbox"
								name="contract"
								v-model="filters.selectedContracts"
								:value="contract.id">
							<label
								class="whitespace-nowrap w-full flex items-center justify-between"
								:class="[ filters.selectedContracts.includes(contract.id) ? 'text-gray-500' : 'text-gray-400' ]"
								for="contract">
									<span class="block">{{ contract.name }}</span>
									<div class="flex justify-center items-center text-xs bg-gray-100 w-5 h-5 rounded">
										{{ contract.jobs_count }}	
									</div>
							</label>
					</div>
				</section>
			</div>

			<!-- Keyword Tag -->
			<div class="p-6 border-b border-gray-200">
				<h4 class="text-sm text-gray-500 mb-4">Keywords</h4>
				<div class="flex flex-wrap">
					<div
						id="keyword"
						v-for="tag in tags"
						:key="tag.id"
						@click="addSelectedTags(tag.id)"
						:class="[ filters.selectedTags.includes(tag.id) ? 'bg-indigo-400 text-white' : 'bg-white border-gray-200 text-gray-400' ]"
						class="border text-xs px-2 py-1 rounded-lg max-w-max mr-2 mb-2 cursor-pointer transition">
							{{ tag.name }}
					</div>
				</div>
			</div>

			<!-- Tipo di giornata lavorativa -->
			<div class="p-6 border-b border-gray-200">
				<h4 class="text-sm text-gray-500 mb-4">Giornata lavorativa</h4>
				<section class="text-sm space-y-1">
					<div class="flex items-center space-x-2">
						<input
							id="working_day"
							type="radio"
							value="full-time"
							name="working_day"
							v-model="filters.working_day">
						<label
							:class="[ filters.working_day === 'full-time' ? 'text-gray-500' : 'text-gray-400' ]"
							for="full-time">
								Tempo pieno
						</label>
					</div>
					<div class="flex items-center space-x-2">
						<input
							type="radio"
							value="part-time"
							name="working_day"
							v-model="filters.working_day">
						<label
							:class="[ filters.working_day === 'part-time' ? 'text-gray-500' : 'text-gray-400' ]"
							for="part-time">
								Part-time
						</label>
					</div>
				</section>
			</div>

			<!-- Lavoro da remoto -->
			<div class="p-6">
				<h4 class="text-sm text-gray-500 mb-4">Lavoro da remoto</h4>
				<section class="text-sm space-y-1">
					<div class="flex items-center space-x-2">
						<input
							id="remote_working"
							type="radio"
							:value="1"
							name="remote_working"
							v-model="filters.remote_working">
						<label
							:class="[ filters.remote_working === 1 ? 'text-gray-500' : 'text-gray-400' ]"
							for="1">
								Si
						</label>
					</div>
					<div class="flex items-center space-x-2">
						<input
							type="radio"
							:value="0"
							name="remote_working"
							v-model="filters.remote_working">
						<label
							:class="[ filters.remote_working === 0 ? 'text-gray-500' : 'text-gray-400' ]"
							for="0">
								No
						</label>
					</div>
				</section>
			</div>
        </section>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
	name: 'TheFilters',
	data() {
		return {
			filters: {
				selectedContracts: [],
				selectedTags: [],
				working_day: '',
				remote_working: '',
			}
		}
	},
	watch: {
		filters: {
			handler() {
				this.$emit('applyFilters', this.filters)
			},
			deep: true,
			immediate: true
		}
	},
	mounted() {
		this.getContracts()
		this.getTags()
	},
	computed: {
		...mapGetters('contracts', ['contracts']),
		...mapGetters('tags', ['tags']),
		...mapGetters('jobs', ['showFilters'])
	},
	methods: {
		...mapActions('contracts', ['getContracts']),
		...mapActions('tags', ['getTags']),
		removeFilters() {
			Object.keys(this.filters).forEach(i => {
				if (i === 'selectedContracts' || i === 'selectedTags') {
					this.filters[i] = []
				} else {
					this.filters[i] = ''
				}
			});
		},
		addSelectedTags(id) {
			if (! this.filters.selectedTags.includes(id)) {
				this.filters.selectedTags.push(id)
			} else {
				this.filters.selectedTags.splice(this.filters.selectedTags.indexOf(id), 1)
			}
		},
		toggleFilters() {
			this.$store.dispatch('jobs/toggleFilters')
		}
	}
}
</script>