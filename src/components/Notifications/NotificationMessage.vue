<template>
	<div>
		<div class="text-sm bg-green-100 text-green-500 rounded-xl p-3">
			<div class="w-90% mx-auto flex items-start space-x-3">
				<svg class="w-6 h-6 flex-none text-green-c-100" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M14.72,8.79l-4.29,4.3L8.78,11.44a1,1,0,1,0-1.41,1.41l2.35,2.36a1,1,0,0,0,.71.29,1,1,0,0,0,.7-.29l5-5a1,1,0,0,0,0-1.42A1,1,0,0,0,14.72,8.79ZM12,2A10,10,0,1,0,22,12,10,10,0,0,0,12,2Zm0,18a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z"/></svg>

				<div class="flex justify-between items-start w-full">
					<span class="">{{ notification.message }}</span>
				
					<div class="flex-shrink-0">
						<svg
							@click="removeNotification()"
							class="w-4 h-4 cursor-pointer mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		notification: {
			type: Object,
			required: true
		},
		index: {
			type: Number,
			required: true
		}
	},
	data() {
		return {
			timeout: null
		}
	},
	created() {
		this.timeout = setTimeout(() => {
			this.removeNotification();
		}, 350000)
	},
	beforeDestroy() {
		clearTimeout(this.timeout);
	},
	methods: {
		removeNotification() {
			this.$store.dispatch('notifications/removeNotification', this.index)
		}
	}
}
</script>