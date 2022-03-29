<template>
	<div class="bg-indigo-50">
		<nav class="py-6 w-90% mx-auto flex items-center justify-between">
			<router-link :to="{ name: 'Home' }" class="flex items-center space-x-2">
				<div class="p-2 bg-gradient-to-r from-indigo-400 to-blue-400 rounded-full">
					<svg class="w-6 h-6 flex-none text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M21.71,20.29,18,16.61A9,9,0,1,0,16.61,18l3.68,3.68a1,1,0,0,0,1.42,0A1,1,0,0,0,21.71,20.29ZM11,18a7,7,0,1,1,7-7A7,7,0,0,1,11,18Z"/></svg>
				</div>

				<div>
					<h1 class="text-xl uppercase font-bold -mb-1 text-gray-600">Workfinder</h1>
					<p class="text-gray-400 text-sm">Lorem ipsum dolor</p>
				</div>
			</router-link>

			<div class="flex items-center space-x-4">
				<router-link
					v-if="!is_auth"
					:to="{ name: 'Register' }"
					exact-active-class="text-indigo-400"
					class="text-sm text-gray-400 hover:text-indigo-400 transition hidden md:block">
						Registrati
				</router-link>

				<router-link
					v-if="!is_auth"
					:to="{ name: 'Login' }"
					class="text-sm text-white bg-gradient-to-r from-indigo-400 to-blue-400 rounded-lg px-3 py-2">
						Accedi
				</router-link>
				<DropdownMenu v-else />
			</div>
		</nav>
	</div>
</template>

<script>
import DropdownMenu from '@/components/User/DropdownMenu'

export default {
	name: 'TheNavbar',
	components: {
		DropdownMenu
	},
	computed: {
		is_auth() {
			return this.$store.state.auth.is_auth
		}
	}
}
</script>