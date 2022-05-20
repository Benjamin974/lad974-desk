<template>
	<div class="text-center">
		<v-dialog v-model="dialog" :retain-focus="false" width="800px">
			<template v-slot:activator="{ on, attrs }">
				<v-btn icon color="primary" v-bind="attrs" v-on="on"
					><v-icon>mdi-eye</v-icon></v-btn
				>
			</template>
			<v-card class="d-flex justify-space-around dialog-product">
				<div class="div-img">
					<v-img
					width="400px"
						:src="'https://app-benj.com/api' + product.picture == null ? '/storage/images/logo_img.png' : product.picture"
						height="100%"
						class="img"
					></v-img>
				</div>
				<div class="contents">
					<v-card-title class="text-h5 d-flex justify-space-between">
						{{ product.name }}

						<div class="price">{{ product.price }} €</div>
					</v-card-title>

					<v-card-text
						style="height: 160px"
						class="d-flex flex-column justify-center"
					>
						<p>{{ product.description }}</p>

						<p>Il en reste {{ product.quantite }} dans le magasin</p>
					</v-card-text>
				</div>
			</v-card>
		</v-dialog>
	</div>
</template>

<script>
export default {
	props: {
		product: {
			default: function () {
				return {};
			},
		},
	},
	data() {
		return {
			dialog: false,
		};
	},
};
</script>


<style lang="scss">
.card-product {
	position: relative;
	.product-price {
		background-color: #ff6d6d;
		color: white;
		font-size: 1rem;
		padding: 0 10px;
		position: absolute;
		top: 10px;
		left: -10px;
	}
}
.div-img {
	.img {
		.v-image__image {
			background-size: contain !important;
		}
	}
}
.contents {
	width: 100%;
	background-color: #2F53B9;
	color: white;
}
.div-img,
.contents {
	height: 300px;

	.price {
		background-color: #ff6d6d;
		color: white;
		font-size: 1rem;
		padding: 0 10px;
	}
}

@media (max-width: 700px) {
	.dialog-product {
		flex-direction: column !important;
	}
	.contents {
		height: 250px;
	}
}
</style>