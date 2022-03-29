<template>
   <div class="relative">
      <img
         @click="toggleDropdown()"
         id="avatar"
         :src="'https://eu.ui-avatars.com/api/?name=' + user.first_name"
         class="rounded-full w-10 cursor-pointer"
         alt="user avatar">

      <div
         id="dropdown"
         v-if="showDropdown"
         class="absolute bg-white z-10 top-12 -right-5 shadow-sm rounded-lg pb-4">
            <p
               id="username"
               class="px-6 py-4 text-gray-500">
                  {{ user.first_name + ' ' + user.last_name }}   
            </p>
            <router-link
               @click.native="toggleDropdown()"
               :to="{ name: 'Dashboard' }"
               class="flex items-center space-x-3 text-gray-400 hover:bg-gray-100 hover:text-gray-500 transition px-6 py-2 text-sm">
                  <svg class="w-5 h-5 flex-none" xmlns="http://www.w3.org/2000/svg" data-name="Layer 1" viewBox="0 0 24 24"><path fill="currentColor" d="M22.60107,2.062a1.00088,1.00088,0,0,0-.71289-.71289A11.25224,11.25224,0,0,0,10.46924,4.97217L9.35431,6.296l-2.6048-.62848A2.77733,2.77733,0,0,0,3.36279,7.0249L1.1626,10.9248A.99989.99989,0,0,0,1.82422,12.394l3.07275.65869a13.41952,13.41952,0,0,0-.55517,2.43409,1.00031,1.00031,0,0,0,.28466.83642l3.1001,3.1001a.99941.99941,0,0,0,.707.293c.02881,0,.05762-.00147.08692-.00391a12.16892,12.16892,0,0,0,2.49157-.49l.64368,3.00318a1.0003,1.0003,0,0,0,1.46924.66162l3.90527-2.20264a3.03526,3.03526,0,0,0,1.375-3.30371l-.6687-2.759,1.23706-1.13751A11.20387,11.20387,0,0,0,22.60107,2.062ZM3.57227,10.72314,5.12842,7.96338a.82552.82552,0,0,1,1.06982-.37549l1.71741.4162-.65.77179A13.09523,13.09523,0,0,0,5.67633,11.174Zm12.47021,8.22217L13.32666,20.477l-.4295-2.00464a11.33992,11.33992,0,0,0,2.41339-1.61987l.74353-.68366.40344,1.66462A1.041,1.041,0,0,1,16.04248,18.94531ZM17.65674,11.98l-3.68457,3.38623a9.77348,9.77348,0,0,1-5.17041,2.3042l-2.4043-2.4043a10.932,10.932,0,0,1,2.40088-5.206l1.67834-1.99268a.9635.9635,0,0,0,.07813-.09277L11.98975,6.271a9.27757,9.27757,0,0,1,8.80957-3.12012A9.21808,9.21808,0,0,1,17.65674,11.98Zm-.923-6.16376a1.5,1.5,0,1,0,1.5,1.5A1.49992,1.49992,0,0,0,16.7337,5.81622Z"/></svg>
                  <span>Dashboard</span>
            </router-link>
            <router-link
               @click.native="toggleDropdown()"
               :to="{ name: 'Job.create' }"
               class="flex items-center space-x-3 text-gray-400 hover:bg-gray-100 hover:text-gray-500 transition px-6 py-2 text-sm">
                  <svg class="w-5 h-5 flex-none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M19,6.5H16v-1a3,3,0,0,0-3-3H11a3,3,0,0,0-3,3v1H5a3,3,0,0,0-3,3v9a3,3,0,0,0,3,3H19a3,3,0,0,0,3-3v-9A3,3,0,0,0,19,6.5Zm-9-1a1,1,0,0,1,1-1h2a1,1,0,0,1,1,1v1H10Zm10,13a1,1,0,0,1-1,1H5a1,1,0,0,1-1-1V13a21.27,21.27,0,0,0,3,.94v.59a1,1,0,0,0,2,0v-.21a23,23,0,0,0,3,.21,23,23,0,0,0,3-.21v.21a1,1,0,0,0,2,0v-.59A21.27,21.27,0,0,0,20,13Zm0-7.69a20.39,20.39,0,0,1-3,1V11.5a1,1,0,0,0-2,0v.74a20.11,20.11,0,0,1-6,0V11.5a1,1,0,0,0-2,0v.33a20.39,20.39,0,0,1-3-1V9.5a1,1,0,0,1,1-1H19a1,1,0,0,1,1,1Z"/></svg>
                  <span class="whitespace-nowrap">Pubblica un annuncio</span>
            </router-link>
            <button
               id="logout"
               @click="logout()"
               class="w-full flex items-center space-x-3 text-gray-400 hover:bg-gray-100 hover:text-gray-500 transition px-6 py-2 text-sm">
                  <svg class="w-5 h-5 flex-none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M4,12a1,1,0,0,0,1,1h7.59l-2.3,2.29a1,1,0,0,0,0,1.42,1,1,0,0,0,1.42,0l4-4a1,1,0,0,0,.21-.33,1,1,0,0,0,0-.76,1,1,0,0,0-.21-.33l-4-4a1,1,0,1,0-1.42,1.42L12.59,11H5A1,1,0,0,0,4,12ZM17,2H7A3,3,0,0,0,4,5V8A1,1,0,0,0,6,8V5A1,1,0,0,1,7,4H17a1,1,0,0,1,1,1V19a1,1,0,0,1-1,1H7a1,1,0,0,1-1-1V16a1,1,0,0,0-2,0v3a3,3,0,0,0,3,3H17a3,3,0,0,0,3-3V5A3,3,0,0,0,17,2Z"/></svg>
                  <span>Logout</span>
            </button>
      </div>
   </div>
</template>

<script>
export default {
   name: 'UserMenu',
   data() {
      return {
         showDropdown: false
      }
   },
   computed: {
      user() {
			return this.$store.state.auth.user
		}
   },
   methods: {
      toggleDropdown() {
         this.showDropdown = ! this.showDropdown
      },
      logout() {
         this.$store.dispatch('auth/logout')
         this.toggleDropdown()
      }
   }
}
</script>