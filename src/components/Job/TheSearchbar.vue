<template>
	<div class="relative flex items-center justify-center bg-gradient-to-r from-gray-900 to-gray-800" style="height: 585px">
		
		<img
			src="@/assets/bg.jpg"
			alt=""
			style="height: 585px"
			class="w-full object-cover opacity-10">

		<div class="w-90% md:w-3/5 absolute">
			<header class="mb-8 text-center">
				<h2 class="text-3xl md:text-4xl text-gray-100 mb-4">
					Il modo più semplice per ottenere il tuo <span class="text-indigo-400">nuovo lavoro</span>
				</h2>
				<p class="text-gray-400">Trova lavoro e opportunità di carriera</p>
			</header>

			<div class="flex items-center space-x-2">
				<input
					type="text"
					v-model="search"
					@keydown.enter="searchJobs()"
					placeholder="Ricerca per posizione o luogo più vicino a te..."
					class="text-gray-500 bg-white w-full rounded-lg placeholder-gray-300 p-3 focus:outline-none text-sm">

				<button
					@click="searchJobs()"
					class="bg-gradient-to-r from-indigo-400 to-blue-400 rounded-lg p-3">
						<svg class="w-5 h-5 flex-none text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M21.71,20.29,18,16.61A9,9,0,1,0,16.61,18l3.68,3.68a1,1,0,0,0,1.42,0A1,1,0,0,0,21.71,20.29ZM11,18a7,7,0,1,1,7-7A7,7,0,0,1,11,18Z"/></svg>
				</button>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'theSearchbar',
	data() {
		return {
			search: '',
		}
	},
	methods: {
		searchJobs() {
			this.$emit('searchJobs', this.search)
		}
	}
}
</script>