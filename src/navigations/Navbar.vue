<template>
	<div>
		<v-app-bar color="white py-1" dense light absolute height="55px">
			<v-toolbar-title>Lad 974</v-toolbar-title>

			<v-spacer></v-spacer>

			<v-btn text to="/" color="primary"> Articles </v-btn>
			<v-btn text to="/dashboard/delivery" color="primary" class="ml-3">
				Livraisons
			</v-btn>
			<v-btn text to="/profil" color="primary" class="ml-3">
				<v-icon> mdi-account</v-icon>
			</v-btn>
			<v-btn text to="/login" color="primary" v-if="!isChecked">
				<v-icon> mdi-login</v-icon>
			</v-btn>
			<v-btn
				text
				@click="logout()"
				v-if="isChecked"
				class="button-text"
				color="#FF6D6D"
			>
				<v-icon>mdi-logout</v-icon>
			</v-btn>
		</v-app-bar>
	</div>
</template>


<script>
import router from "../routes";
import { authenticationService } from "../_services/authentication.service";
export default {
	data() {
		return {
			currentUser: null,
		};
	},
	created() {
		authenticationService.currentUser.subscribe((x) => (this.currentUser = x));
	},

	computed: {
		isChecked() {
			return this.currentUser;
		},
	},
	methods: {
		logout() {
			authenticationService.logout();
			router.push("/login");
		},
	},
};
</script>