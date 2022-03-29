<template>
   <section>
      <ValidationObserver v-slot="{ invalid }">

         <ValidationProvider
            name="title"
            rules="required"
            v-slot="{ errors }"
            class="block mb-5">
               <label for="title" class="block text-gray-400 mb-1 text-sm">Titolo</label>
               <input
                  name="title"
                  id="title"
                  type="text"
                  v-model="job.title"
                  placeholder="ex. Ricerca full stack developer"
                  class="text-gray-500 text-sm bg-white rounded-lg w-full border border-gray-200 placeholder-gray-300 p-3 focus:outline-none focus:border-indigo-300 transition">
               <span class="block text-red-400 text-sm mt-1">{{ errors[0] }}</span>
         </ValidationProvider>

         <ValidationProvider
            name="description"
            rules="required"
            v-slot="{ errors }"
            class="block mb-5">
               <label for="description" class="block text-gray-400 mb-1 text-sm">Descrizione</label>
               <textarea
                  name="description"
                  id="description"
                  v-model="job.description"
                  placeholder="ex. Ricerchiamo figura per..."
                  rows="6"
                  class="resize-y text-gray-500 text-sm bg-white rounded-lg w-full border border-gray-200 placeholder-gray-300 p-3 focus:outline-none focus:border-indigo-300 transition"></textarea>
               <span class="block text-red-400 text-sm mt-1">{{ errors[0] }}</span>
         </ValidationProvider>

         <ValidationProvider
            name="tags"
            v-slot="{ errors }"
            class="block mb-8 relative">
               <label for="tags" class="block text-gray-400 mb-1 text-sm">Tags</label>
               <!-- Lista tag selezionati -->
               <div
                  :class="[ job.tags && job.tags.length === 0 ? 'p-6' : 'pl-3 pr-10 py-1' ]"
                  class="relative text-gray-500 text-sm bg-white rounded-lg w-full border border-gray-200 placeholder-gray-300 focus:outline-none focus:border-indigo-300 transition">
                     <div class="flex flex-wrap">
                        <div
                           v-for="tag in job.tags"
                           :key="tag.id"
                           class="flex items-center space-x-1 text-sm text-white bg-indigo-400 rounded-lg px-2 py-1 mr-1 my-1">
                              <span>{{ tag.name }}</span>
                              <svg
                                 @click="removeTagFromSelected(tag)"
                                 class="w-3.5 h-3.5 text-indigo-800 flex-none cursor-pointer hover:text-white transition" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M13.41,12l4.3-4.29a1,1,0,1,0-1.42-1.42L12,10.59,7.71,6.29A1,1,0,0,0,6.29,7.71L10.59,12l-4.3,4.29a1,1,0,0,0,0,1.42,1,1,0,0,0,1.42,0L12,13.41l4.29,4.3a1,1,0,0,0,1.42,0,1,1,0,0,0,0-1.42Z"/></svg>
                        </div>
                     </div>
                     <div
                        id="toggleTagsListButton"
                        @click="toggleTagsList()"
                        class="bg-gray-100 rounded-full p-1 absolute right-3 top-2.5 cursor-pointer">
                           <svg
                              :class="{ 'rotate-180' : showTagsList }"
                              class="w-5 h-5 text-gray-400 transform transition flex-none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M17,9.17a1,1,0,0,0-1.41,0L12,12.71,8.46,9.17a1,1,0,0,0-1.41,0,1,1,0,0,0,0,1.42l4.24,4.24a1,1,0,0,0,1.42,0L17,10.59A1,1,0,0,0,17,9.17Z"/></svg>
                     </div>
               </div>

               <!-- Lista di tutti i tag presenti -->
               <div v-if="showTagsList">
                  <div class="absolute bottom-14 bg-white z-10 w-full shadow-sm overflow-y-auto" style="height: 305px">
                     <div
                        v-for="tag in tags"
                        :key="tag.id"
                        @click="addTagToSelected(tag)"
                        class="text-gray-400 text-sm">
                           <p
                              class="hover:text-white px-4 py-2 cursor-pointer transition duration-100"
                              :class="[ job.tags && job.tags.includes(tag) ? 'bg-gray-100 hover:bg-red-200' : 'hover:bg-indigo-400' ]">
                                 {{ tag.name }}
                           </p>
                     </div>
                  </div>
               </div>
               <span class="block text-red-400 text-sm mt-1">{{ errors[0] }}</span>
         </ValidationProvider>

         <ValidationProvider
            name="apply link"
            rules="required"
            v-slot="{ errors }"
            class="block mb-5">
               <label for="apply_link" class="block text-gray-400 mb-1 text-sm">Sito dove candidarsi</label>
               <input
                  name="apply link"
                  id="apply_link"
                  type="text"
                  v-model="job.apply_link"
                  placeholder="ex. https://mywebsite.com"
                  class="text-gray-500 text-sm bg-white rounded-lg w-full border border-gray-200 placeholder-gray-300 p-3 focus:outline-none focus:border-indigo-300 transition">
               <span class="block text-red-400 text-sm mt-1">{{ errors[0] }}</span>
         </ValidationProvider>

         <button
            :disabled="invalid"
            @click="nextPage()"
            :class="[ invalid ? 'bg-gray-300' : 'bg-gradient-to-r from-indigo-400 to-blue-400' ]"
            class="text-white px-4 py-2 text-sm rounded-lg">
               Avanti
         </button>
      </ValidationObserver>
   </section>
</template>

<script>
import { mapGetters } from 'vuex'
import { ValidationObserver } from 'vee-validate'
import { ValidationProvider } from 'vee-validate'
import '@/vee-validate'

export default {
   name: 'TheAdvertisement',
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
      this.getTags()
   },
   data() {
      return {
         showTagsList: false,
      }
   },
   computed: {
      ...mapGetters('tags', ['tags']),
   },
   methods: {
      getTags() {
			this.$store.dispatch('tags/getTags')
		},
      nextPage() {
         this.$emit('nextPage')
      },
      addTagToSelected(tag) {
         if (this.job.tags.includes(tag)) {
            this.job.tags.splice(this.job.tags.indexOf(tag), 1)
         } else {
            this.job.tags.push(tag)
         }

         this.showTagsList = false
      },
      toggleTagsList() {
         this.showTagsList = !this.showTagsList
      },
      removeTagFromSelected(tag) {
         this.job.tags.splice(this.job.tags.indexOf(tag), 1)
         this.showTagsList = false
      }
   }
}
</script>