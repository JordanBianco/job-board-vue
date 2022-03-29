<template>
	<div v-if="errors.length != 0" class="mb-8 text-center">
		<div
			v-for="error, index in errors"
			:key="index"
			class="text-red-400 text-sm">
				{{ error[0] }}
		</div>
	</div>
</template>

<script>
export default {
	name: 'ErrorMessages',
	props: {
		errors: {
			type: [Array, Object]
		}
	}
}
</script>