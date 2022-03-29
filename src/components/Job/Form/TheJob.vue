<template>
   <div>
      <ValidationObserver v-slot="{ invalid }">

         <ValidationProvider
            name="position"
            rules="required"
            v-slot="{ errors }"
            class="block mb-5">
               <label for="position" class="block text-gray-400 mb-1 text-sm">Posizione</label>
               <input
                  id="position"
                  name="position"
                  type="text"
                  v-model="job.position"
                  placeholder="ex. Web Developer, UX Designer"
                  class="text-gray-500 text-sm bg-white rounded-xl w-full border border-gray-200 placeholder-gray-300 p-3 focus:outline-none focus:border-indigo-300 transition">
               <span class="block text-red-400 text-sm mt-1">{{ errors[0] }}</span>
         </ValidationProvider>

         <ValidationProvider
            name="location"
            rules="required"
            v-slot="{ errors }"
            class="block mb-5">
               <label for="location" class="block text-gray-400 mb-1 text-sm">Luogo</label>
               <input
                  name="location"
                  id="location"
                  type="text"
                  v-model="job.location"
                  placeholder="ex. Roma, Milano"
                  class="text-gray-500 text-sm bg-white rounded-xl w-full border border-gray-200 placeholder-gray-300 p-3 focus:outline-none focus:border-indigo-300 transition">
               <span class="block text-red-400 text-sm mt-1">{{ errors[0] }}</span>
         </ValidationProvider>

         <div class="mb-5">
            <ValidationProvider
               name="remote working"
               rules="required"
               v-slot="{ errors }">
                  <div class="flex items-center space-x-8">
                     <span class="block text-sm text-gray-400">Lavoro da remoto</span>
                     <label for="remote_working" class="text-gray-500 text-sm items-center flex space-x-2">
                        <input
                           name="remote working"
                           id="remote_working"
                           type="radio"
                           :value="true"
                           v-model="job.remote_working">
                              <span>Sì</span>
                     </label>
                     <label for="remote_working" class="text-gray-500 text-sm items-center flex space-x-2">
                        <input
                           name="remote working"
                           id="remote_working"
                           type="radio"
                           :value="false"
                           v-model="job.remote_working">
                              <span>No</span>
                     </label>
                  </div>
                  <span class="block text-red-400 text-sm">{{ errors[0] }}</span>
            </ValidationProvider>
         </div>

         <ValidationProvider
            name="salary"
            rules="required"
            v-slot="{ errors }"
            class="block mb-5">
               <label for="salary" class="block text-gray-400 mb-1 text-sm">Salario</label>
               <input
                  name="salary"
                  id="salary"
                  type="text"
                  v-model="job.salary"
                  placeholder="ex. 50.000 - 70.0000€ / anno"
                  class="text-gray-500 text-sm bg-white rounded-xl w-full border border-gray-200 placeholder-gray-300 p-3 focus:outline-none focus:border-indigo-300 transition">
               <span class="block text-red-400 text-sm mt-1">{{ errors[0] }}</span>
         </ValidationProvider>

         <ValidationProvider
            name="contract type"
            rules="required"
            v-slot="{ errors }"
            class="block mb-5">
               <label for="contract_id" class="block text-gray-400 mb-1 text-sm">Tipo di contratto</label>
               <select
                  name="contract type"
                  id="contract_id"
                  v-model="job.contract_id"
                  class="text-gray-500 text-sm bg-white rounded-xl w-full border border-gray-200 placeholder-gray-300 p-3 focus:outline-none focus:border-indigo-300 transition">
                     <option
                        v-for="contract in contracts"
                        :key="contract.id"
                        :value="contract.id">
                           {{ contract.name }}
                     </option>
               </select>
               <span class="block text-red-400 text-sm mt-1">{{ errors[0] }}</span>
         </ValidationProvider>

         <ValidationProvider
            name="working day"
            rules="required"
            v-slot="{ errors }">
               <div class="flex items-center space-x-8">
                  <span class="block text-gray-400 text-sm">Giornata lavorativa</span>
                  <label for="working_day" class="text-gray-500 text-sm items-center flex space-x-2">
                     <input
                        name="working day"
                        id="working_day"
                        type="radio"
                        value="full-time"
                        v-model="job.working_day">
                           <span>Tempo pieno</span>
                  </label>
                  <label for="working_day" class="text-gray-500 text-sm items-center flex space-x-2">
                     <input
                        name="working day"
                        id="working_day"
                        type="radio"
                        value="part-time"
                        v-model="job.working_day">
                           <span>Part time</span>
                  </label>
               </div>
               <span class="block text-red-400 text-sm mt-1">{{ errors[0] }}</span>
         </ValidationProvider>

         <div class="flex items-center justify-between mt-5">
            <button
               id="prevPage"
               @click="prevPage()"
               class="text-white px-4 py-2 text-sm rounded-xl bg-gradient-to-r from-indigo-400 to-blue-400">
                  Indietro
            </button>

            <button
               id="nextPage"
               :disabled="invalid"
               @click="nextPage()"
               :class="[ invalid ? 'bg-gray-300' : 'bg-gradient-to-r from-indigo-400 to-blue-400' ]"
               class="text-white px-4 py-2 text-sm rounded-xl">
                  Avanti
            </button>
         </div>
      </ValidationObserver>
   </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { ValidationObserver } from 'vee-validate'
import { ValidationProvider } from 'vee-validate'
import '@/vee-validate'

export default {
   name: 'TheJob',
   props: {
      job: {
         type: Object,
         required: true
      }
   },
   components: {
      ValidationObserver,
      ValidationProvider
   },
   mounted() {
		this.getContracts()
	},
   computed: {
      ...mapGetters('contracts', ['contracts']),
   },
   methods: {
      prevPage() {
         this.$emit('prevPage')
      },
      nextPage() {
         this.$emit('nextPage')
      },
      getContracts() {
			this.$store.dispatch('contracts/getContracts')
		}
   }
}
</script>