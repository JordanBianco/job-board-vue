<template>
	<div>
		<Breadcrumb
			:routes="[
				{ name: 'Dashboard', text: 'Dashboard' },
			]"
			current="nuovo annuncio"
		/>

		<section class="w-90% md:w-1/2 lg:w-1/3 mx-auto">
			<header class="py-10 ">
				<h2 class="text-2xl text-gray-500 text-center mb-4">Pubblica un nuovo annuncio</h2>
				<p class="text-gray-400 text-center text-sm leading-tight">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquam accusantium minus quo tempore optio quos quibusdam inventore.</p>
			</header>
			
			<CreateJobForm />
		</section>
	</div>
</template>

<script>
import Breadcrumb from '@/components/Layout/Breadcrumb'
import CreateJobForm from '@/components/Job/Form/CreateJobForm'

export default {
	name: 'Job.create',
	components: {
		Breadcrumb,
		CreateJobForm
	}
}
</script>