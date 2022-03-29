<template>
	<div class="w-90% md:w-1/2 lg:w-1/3 mx-auto">
		<header class="py-10">
         <h2 class="text-2xl text-gray-500 text-center mb-4">Accedi</h2>
         <p class="text-gray-400 text-center text-sm leading-tight">Accedi per pubblicare un'offerta di lavoro, o creare il tuo profilo da sviluppatore.</p>
      </header>

		<LoginForm />
	</div>
</template>

<script>
import LoginForm from '@/components/Auth/LoginForm'

export default {
	name: 'login',
	components: {
		LoginForm
	}
}
</script>