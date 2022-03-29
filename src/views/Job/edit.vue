<template>
	<div v-if="job">
		<Breadcrumb
			:routes="[
				{ name: 'Dashboard', text: 'Dashboard' },
				{ name: 'Job.show', params: { slug: job.slug } , text: job.title }
			]"
			current="modifica annuncio"
		/>

		<section class="w-90% md:w-1/2 lg:w-1/3 mx-auto">			
			<header class="py-10">
				<h2 class="text-2xl text-gray-500 text-center mb-4">Modifica il tuo annuncio</h2>
				<p class="text-gray-400 text-center text-sm leading-tight">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquam accusantium minus quo tempore optio quos quibusdam inventore.</p>
			</header>

			<EditJobForm
				:job="job"
			/>
		</section>
	</div>
</template>

<script>
import Breadcrumb from '@/components/Layout/Breadcrumb'
import EditJobForm from '@/components/Job/EditForm/EditJobForm'

export default {
	name: 'Job.edit',
	components: {
		Breadcrumb,
		EditJobForm
	},
	props: {
		slug: {
			type: String,
			required: true
		}
	},
	mounted() {
		this.getJob()
	},
	computed: {
		job() {
			return this.$store.state.jobs.job
		}
	},
	methods: {
		getJob() {
			this.$store.dispatch('jobs/getJob', { slug: this.slug })
		}
	}
}
</script>