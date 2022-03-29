<template>
	<div class="fixed bottom-14 right-14 z-10">
		<NotificationMessage
			v-for="(notification, index) in notifications"
			:key="index"
			:notification="notification"
			:index="index"/>
	</div> 
</template>

<script>
import NotificationMessage from '@/components/Notifications/NotificationMessage'

export default {
	components: {
		NotificationMessage
	},
	computed: {
		notifications() {
			return this.$store.state.notifications.notifications;
		}
	}
}
</script>
