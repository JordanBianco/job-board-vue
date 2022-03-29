<template>
	<div class="bg-gray-50 min-h-screen" style="font-family: 'Poppins', sans-serif;">
		<TheNavbar />
		<router-view/>

		<NotificationList />
	</div>
</template>

<script>
import TheNavbar from '@/components/Layout/TheNavbar'
import NotificationList from '@/components/Notifications/NotificationList'

export default {
	components: {
		TheNavbar,
		NotificationList
	}
}
</script>

<style>
	@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap');
</style>