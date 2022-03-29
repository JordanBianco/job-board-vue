<template>
   <div v-if="job">
      <div
         :class="[ user.id === job.user_id ? 'border-indigo-200' : 'border-gray-200' ]"
         class="p-5 border shadow-sm rounded-xl bg-white mb-6">

         <div
            v-if="!job.is_approved"
            class="flex items-center space-x-3 text-sm px-4 py-3 rounded-lg bg-blue-100 text-blue-400 mb-5">
               <svg class="w-5 h-5 flex-none" id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M12,2A10,10,0,1,0,22,12,10.01114,10.01114,0,0,0,12,2Zm0,18a8,8,0,1,1,8-8A8.00917,8.00917,0,0,1,12,20Zm0-8.5a1,1,0,0,0-1,1v3a1,1,0,0,0,2,0v-3A1,1,0,0,0,12,11.5Zm0-4a1.25,1.25,0,1,0,1.25,1.25A1.25,1.25,0,0,0,12,7.5Z"/></svg>
               <span>Il tuo annuncio è in attesa di essere approvato.</span>
         </div>

         <div class="flex items-start space-x-4">
            <div
               v-if="job.logo"
               class="w-10 lg:w-16 flex-none">
                  <img
                     alt="logo"
                     :src="companyLogo"
                     class="object-cover w-full h-full rounded-xl">
            </div>
            <div
               v-else
               class="w-10 lg:w-16 bg-gray-200 rounded-xl p-2 flex-none">
                  <img
                     src="@/assets/logo.png"
                     alt="logo"
                     class="object-cover w-full h-full">
            </div>

            <div class="w-full">
               <div class="md:flex md:items-start md:justify-between md:space-x-4">
                  <div>
                     <router-link
                        :to="{ name: 'Job.show', params: { slug: job.slug } }"
                        class="text-gray-600 leading-tight block">
                           {{ job.title }}
                     </router-link>
                     <p class="text-gray-400 text-xs">{{ $moment(job.created_at).fromNow(true) }}</p>
                  </div>
                  <div
                     :class="[ 'bg-' + background(job.contract.id) + '-400' ]"
                     class="text-xs whitespace-nowrap text-white text-center rounded-xl px-4 py-1 max-w-max my-4 md:my-0">
                        {{ job.contract.name }}
                  </div>
               </div>

               <div class="lg:flex lg:items-center lg:space-x-2 space-y-3 lg:space-y-0 text-gray-400 my-3">
                  <div class="flex items-center space-x-1">
                     <svg class="w-5 h-5 flex-none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M11,11.9V17a1,1,0,0,0,2,0V11.9a5,5,0,1,0-2,0ZM12,4A3,3,0,1,1,9,7,3,3,0,0,1,12,4Zm4.21,10.42a1,1,0,1,0-.42,2C18.06,16.87,19,17.68,19,18c0,.58-2.45,2-7,2s-7-1.42-7-2c0-.32.94-1.13,3.21-1.62a1,1,0,1,0-.42-2C4.75,15.08,3,16.39,3,18c0,2.63,4.53,4,9,4s9-1.37,9-4C21,16.39,19.25,15.08,16.21,14.42Z"/></svg>
                     <span class="text-sm">{{ job.location }}</span>
                  </div>
                  <span class="text-xs hidden lg:block">&bull;</span>
                  <div class="flex items-center space-x-1">
                     <svg class="w-5 h-5 flex-none" xmlns="http://www.w3.org/2000/svg" data-name="Layer 1" viewBox="0 0 24 24"><path fill="currentColor" d="M14,8h1a1,1,0,0,0,0-2H14a1,1,0,0,0,0,2Zm0,4h1a1,1,0,0,0,0-2H14a1,1,0,0,0,0,2ZM9,8h1a1,1,0,0,0,0-2H9A1,1,0,0,0,9,8Zm0,4h1a1,1,0,0,0,0-2H9a1,1,0,0,0,0,2Zm12,8H20V3a1,1,0,0,0-1-1H5A1,1,0,0,0,4,3V20H3a1,1,0,0,0,0,2H21a1,1,0,0,0,0-2Zm-8,0H11V16h2Zm5,0H15V15a1,1,0,0,0-1-1H10a1,1,0,0,0-1,1v5H6V4H18Z"/></svg>
                     <span class="text-sm">{{ job.company }}</span>
                  </div>
                  <span class="text-xs hidden lg:block">&bull;</span>
                  <div class="flex items-center space-x-1">
                     <svg class="w-5 h-5 flex-none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M14.58,11.3a3.24,3.24,0,0,0,.71-2,3.29,3.29,0,0,0-6.58,0,3.24,3.24,0,0,0,.71,2,5,5,0,0,0-2,2.31,1,1,0,1,0,1.84.78A3,3,0,0,1,12,12.57h0a3,3,0,0,1,2.75,1.82,1,1,0,0,0,.92.61,1.09,1.09,0,0,0,.39-.08,1,1,0,0,0,.53-1.31A5,5,0,0,0,14.58,11.3ZM12,10.57h0a1.29,1.29,0,1,1,1.29-1.28A1.29,1.29,0,0,1,12,10.57ZM18,2H6A3,3,0,0,0,3,5V16a3,3,0,0,0,3,3H8.59l2.7,2.71A1,1,0,0,0,12,22a1,1,0,0,0,.65-.24L15.87,19H18a3,3,0,0,0,3-3V5A3,3,0,0,0,18,2Zm1,14a1,1,0,0,1-1,1H15.5a1,1,0,0,0-.65.24l-2.8,2.4L9.71,17.29A1,1,0,0,0,9,17H6a1,1,0,0,1-1-1V5A1,1,0,0,1,6,4H18a1,1,0,0,1,1,1Z"/></svg>
                     <span class="text-sm">{{ job.position }}</span>
                  </div>
               </div>

               <p class="text-gray-400 text-sm leading-tight">{{ job.description.slice(0, 200) + '...' }}</p>

               <div class="flex flex-wrap my-3">
                  <div
                     v-for="tag in job.tags"
                     :key="tag.id"
                     class="text-xs text-white bg-indigo-400 rounded-xl px-2 py-1 mr-1 my-1 max-w-max">
                        <span>{{ tag.name }}</span>
                  </div>
               </div>

               <div
                  v-if="job.user_id === user.id"
                  class="flex items-center space-x-3">
                     <router-link
                        :to="{ name: 'Job.edit', params: { slug: job.slug }}"
                        class="text-gray-400 text-sm block">
                           modifica
                     </router-link>

                     <button
                        id="deleteJob"
                        @click="deleteJob(job)"
                        class="text-gray-400 text-sm block">
                           elimina
                     </button>
               </div>
            </div>
         </div>
      </div>
   </div>
</template>

<script>
export default {
   name: 'JobItem',
   props: {
      job: {
         type: [Object, Array],
         required: true
      }
   },
   computed: {
      companyLogo() {
         return 'http://localhost:8000/storage/' + this.job.logo
      },
      user() {
			return this.$store.state.auth.user
		}
   },
   methods: {
      background(id) {
         switch (id) {
            case 1:
               return 'red'
            case 2:
               return 'blue'
            case 3:
               return 'yellow'
            case 4:
               return 'green'
            case 5:
               return 'purple'
         }
      },
      deleteJob(job) {
         if (confirm('Eliminare l\' annuncio?')) {
            this.$store.dispatch('userJobs/deleteJob', { job: job })
         }
      }
   }
}
</script>