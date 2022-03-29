<template>
   <div>
      <!-- Server side validation -->
      <ErrorMessages :errors="errors" />

      <ValidationObserver v-slot="{ handleSubmit }">
			<form @submit.prevent="handleSubmit(login)">
            <div class="mb-5">
               <ValidationProvider
                  name="email"
                  rules="required|email"
                  v-slot="{ errors }">
                     <label for="email" class="block text-gray-500 text-sm mb-1">Email</label>
                     <div class="relative">
                        <input
                           id="email"
                           name="email"
                           type="email"
                           v-model="credentials.email"
                           placeholder="Inserisci il tuo indirizzo email"
                           class="text-gray-500 text-sm bg-white rounded-xl w-full border border-gray-200 placeholder-gray-300 p-3 pl-14 focus:outline-none focus:border-indigo-300 transition">

                        <svg class="w-5 h-5 flex-none text-gray-300 absolute left-4 top-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M15.71,12.71a6,6,0,1,0-7.42,0,10,10,0,0,0-6.22,8.18,1,1,0,0,0,2,.22,8,8,0,0,1,15.9,0,1,1,0,0,0,1,.89h.11a1,1,0,0,0,.88-1.1A10,10,0,0,0,15.71,12.71ZM12,12a4,4,0,1,1,4-4A4,4,0,0,1,12,12Z"/></svg>
                     </div>
                     <span id="email_error" class="block text-red-400 text-sm mt-1">{{ errors[0] }}</span>
               </ValidationProvider>
            </div>

            <div class="mb-8">
               <ValidationProvider
                  name="password"
                  rules="required|min:8"
                  v-slot="{ errors }">
                     <label for="password" class="block text-gray-500 text-sm mb-1">Password</label>
                     <div class="relative">
                        <input
                           id="password"
                           name="password"
                           type="password"
                           v-model="credentials.password"
                           placeholder="Inserisci la tua password"
                           class="text-gray-500 text-sm bg-white rounded-xl w-full border border-gray-200 placeholder-gray-300 p-3 pl-14 focus:outline-none focus:border-indigo-300 transition">

                        <svg class="w-5 h-5 flex-none text-gray-300 absolute left-4 top-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M12,13a1,1,0,0,0-1,1v3a1,1,0,0,0,2,0V14A1,1,0,0,0,12,13Zm5-4V7A5,5,0,0,0,7,7V9a3,3,0,0,0-3,3v7a3,3,0,0,0,3,3H17a3,3,0,0,0,3-3V12A3,3,0,0,0,17,9ZM9,7a3,3,0,0,1,6,0V9H9Zm9,12a1,1,0,0,1-1,1H7a1,1,0,0,1-1-1V12a1,1,0,0,1,1-1H17a1,1,0,0,1,1,1Z"/></svg>
                     </div>
                     <span id="password_error" class="block text-red-400 text-sm mt-1">{{ errors[0] }}</span>
               </ValidationProvider>
            </div>

            <button
               type="submit"
               class="bg-gradient-to-r from-indigo-400 to-blue-400 text-white px-6 py-3 text-sm rounded-xl w-full">
                  Accedi
            </button>
            <p class="mt-2 text-center text-gray-400 text-sm">Non hai un account su workfinder? <router-link class="text-indigo-400" :to="{ name: 'Register' }">Registrati</router-link> </p>
			</form>
		</ValidationObserver>
   </div>
</template>

<script>
import ErrorMessages from '@/components/ErrorMessages'
import { ValidationObserver } from 'vee-validate'
import { ValidationProvider } from 'vee-validate'
import '@/vee-validate'

import { mapGetters } from 'vuex'

export default {
   name: 'LoginForm',
   components: {
      ErrorMessages,
      ValidationObserver,
      ValidationProvider
   },
   data() {
      return {
         credentials: {
            email: '',
            password: ''
         }
      }
   },
   computed: {
      ...mapGetters('auth', ['errors']),
   },
   methods: {
      login() {
         this.$store.dispatch('auth/login', { credentials: this.credentials })
      }
   }
}
</script>