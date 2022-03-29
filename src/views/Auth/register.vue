<template>
    <div class="w-90% md:w-1/2 lg:w-1/3 mx-auto">
        <header class="py-10">
            <h2 class="text-2xl text-gray-500 text-center mb-4">Registrati</h2>
            <p class="text-gray-400 text-center text-sm leading-tight">Registrati per pubblicare un'offerta di lavoro, o creare il tuo profilo da sviluppatore.</p>
        </header>

        <RegisterForm />
    </div>
</template>

<script>
import RegisterForm from '@/components/Auth/RegisterForm'

export default {
    name: 'register',
    components: {
        RegisterForm
    }
}
</script>