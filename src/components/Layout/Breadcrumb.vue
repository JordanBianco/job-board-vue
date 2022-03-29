<template>
	<header class="text-sm bg-indigo-50 py-8">
		<div class="w-90% mx-auto flex items-start">
			<div
				v-for="route, index in routes"
				:key="index"
				class="flex items-center mr-1">
					<router-link
						:to="{ name: route.name, params: route.params }"
						class="text-gray-400 hover:text-gray-500 transition mr-1"
					>
						{{ route.text }}
					</router-link>
					<svg class="w-4 h-4 flex-none text-gray-400 mt-0.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M14.83,11.29,10.59,7.05a1,1,0,0,0-1.42,0,1,1,0,0,0,0,1.41L12.71,12,9.17,15.54a1,1,0,0,0,0,1.41,1,1,0,0,0,.71.29,1,1,0,0,0,.71-.29l4.24-4.24A1,1,0,0,0,14.83,11.29Z"/></svg>
			</div>
			<span
				id="current"
				class="text-indigo-400">
					{{ current }}
			</span>
		</div>
	</header>
</template>

<script>
export default {
	name: 'Breadcrumb',
	props: {
		routes: {
			type: Array,
			required: true
		},
		current: {
			type: String,
			required: true
		}
	}
}
</script>