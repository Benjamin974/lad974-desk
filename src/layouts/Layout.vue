<template>
	<v-app>
		<link
			href="https://cdn.jsdelivr.net/npm/@mdi/font@4.x/css/materialdesignicons.min.css"
			rel="stylesheet"
		/>
		<div class="container mb-10">
			<navbar></navbar>
		</div>
		<div class="main mb-10">
			<router-view></router-view>
		</div>
		<baseSnackbar />
		<div class="footer" style="position: absolute; bottom: 0; width: 100%">
			<footerLayout />
		</div>
	</v-app>
</template>

<script>
import Navbar from "../navigations/Navbar";
import FooterLayout from "../navigations/Footer";
import BaseSnackbar from '../components/baseSnackbar/BaseSnackbar.vue'
export default {
	components: {
		Navbar,
		FooterLayout,
		BaseSnackbar
	},
};
</script>

<style lang="scss">
</style>