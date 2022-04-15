<template>
	<v-row align="center">
		<v-switch v-model="isDelivered" :label="'Livré'"></v-switch>
	</v-row>
</template>

<script>
import { apiService } from "../../_services/api.service";
export default {
	props: {
		item: {
			default: function () {
				return {};
			},
		},
	},
	data() {
		return {
			isDelivered: false,
		};
	},

	watch: {
		isDelivered(val) {
			const data = {
				id: this.item.id,
				id_delivery_man: this.item.deliveryMan.id,
				id_command: this.item.command.id,
				id_status: val == true ? 3 : 1,
			};
			apiService.post("https://app-benj.com/api/delivery/update", data).then(({data}) => {
				console.log(data);
			});
			console.log(val);
		},
	},

	created() {
		this.isDelivered = this.item.status.status == "en cours" ? false : true; 
	}
};
</script>