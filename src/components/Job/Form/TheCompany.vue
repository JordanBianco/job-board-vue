<template>
   <div>
      <ValidationObserver v-slot="{ invalid }">
         <ValidationProvider
            name="company"
            rules="required"
            v-slot="{ errors }"
            class="block mb-5">
               <label for="company" class="block text-gray-400 mb-1 text-sm">Nome</label>
               <input
                  name="company"
                  id="company"
                  type="text"
                  v-model="job.company"
                  placeholder="Il nome della tua azienda"
                  class="text-gray-500 text-sm bg-white rounded-xl w-full border border-gray-200 placeholder-gray-300 p-3 focus:outline-none focus:border-indigo-300 transition">
               <span class="block text-red-400 text-sm mt-1">{{ errors[0] }}</span>
         </ValidationProvider>

         <ValidationProvider
            name="logo"
            rules="image"
            v-slot="{ errors }"
            class="block mb-5">
               <label for="logo" class="block text-gray-400 mb-1 text-sm">Logo</label>
               <input
                  @change="onFileChange"
                  name="logo"
                  id="logo"
                  type="file"
                  class="text-gray-500 text-sm bg-white rounded-xl w-full border border-gray-200 placeholder-gray-300 p-3 focus:outline-none focus:border-indigo-300 transition">
               <span class="block text-red-400 text-sm mt-1">{{ errors[0] }}</span>

               <div class="mt-6">
                  <img
                     class="w-20"
                     v-if="job.logo && ! preview"
                     :src="companyLogo"
                  />
                  <img
                     class="w-20"
                     v-if="preview"
                     :src="preview"
                  />
               </div>
         </ValidationProvider>

         <div class="flex items-center justify-between mt-5">
            <button
               id="prevPage"
               @click="prevPage()"
               class="text-white px-4 py-2 text-sm rounded-xl bg-gradient-to-r from-indigo-400 to-blue-400">
                  Indietro
            </button>

            <button
               id="submit"
               :disabled="invalid"
               type="submit"
               :class="[ invalid ? 'bg-gray-300' : 'bg-gradient-to-r from-indigo-400 to-blue-400' ]"
               class="text-white px-4 py-2 text-sm rounded-xl">
                  Conferma
            </button>
         </div>
      </ValidationObserver>
   </div>
</template>

<script>
import { ValidationObserver } from 'vee-validate'
import { ValidationProvider } from 'vee-validate'
import '@/vee-validate'

export default {
   name: 'TheCompany',
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
   data() {
      return {
         preview: ''
      }
   },
   computed: {
      companyLogo() {
         return 'http://localhost:8000/storage/' + this.job.logo
      }
   },
   methods: {
      prevPage() {
         this.$emit('prevPage')
      },
      onFileChange(e) {
			this.job.logo = e.target.files[0];
			this.preview = URL.createObjectURL(this.job.logo);
		}
   }
}
</script>