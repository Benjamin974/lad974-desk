<template>
	<div style="display: flex; justify-content: center; margin-top: 3vh">
		<v-card
			width="60%"
			height="530px"
			class="elevation-0 d-flex flex-column justify-space-between"
		>
			<v-card-title>
				<h3>Toutes les livraisons</h3>
			</v-card-title>
			<v-data-table
				:headers="headers"
				:items="deliveries"
				item-key="name"
				class="elevation-1"
				hide-default-footer
				:page.sync="page"
				:items-per-page="itemsPerPage"
				@page-count="pageCount = $event"
			>
				<template v-slot:item.name="{ item }">Livraison_{{ item.id }}</template>
				<template v-slot:item.actions="{ item }">
					<DeliveredOrNot :item="item" />
				</template>
			</v-data-table>
			<div class="text-center pt-2">
				<v-pagination v-model="page" :length="pageCount"></v-pagination>
			</div>
		</v-card>
		<v-navigation-drawer
			floating
			permanent
			right
			class="px-10"
			style="border-left: 1px solid #ececec"
		>
			<template v-slot:prepend>
				<v-list-item two-line>
					<v-list-item-content>
						<v-list-item-title>Livraisons Dispo</v-list-item-title>
					</v-list-item-content>
				</v-list-item>
			</template>

			<v-divider></v-divider>

			<v-list dense>
				<v-list-item v-if="commands.length == 0">
					<v-list-item-content class="delivery pa-3 my-3">
						<v-list-item-title> Pas de livraison</v-list-item-title>
					</v-list-item-content>
				</v-list-item>
				<v-list-item v-else v-for="item in commands" :key="item.id">
					<v-dialog transition="dialog-bottom-transition" max-width="600">
						<template v-slot:activator="{ on, attrs }">
							<v-list-item-content
								class="delivery pa-3 my-3"
								v-bind="attrs"
								v-on="on"
							>
								<v-list-item-title> Livraison {{ item.id }}</v-list-item-title>
							</v-list-item-content>
						</template>
						<template v-slot:default="dialog">
							<v-card>
								<v-toolbar color="primary" dark
									>Livraison pour le client
									{{ item.deliveryAddress.name }}</v-toolbar
								>
								<v-card-text>
									<div class="pa-3">
										<span style="font-weight: bold">Adresse</span> : {{ item.deliveryAddress.address }}
									</div>
									<div class="pa-3">
										<span style="font-weight: bold">Code postal</span> : {{ item.deliveryAddress.postal_code }}
									</div>
									<div class="pa-3">
										<span style="font-weight: bold">ville</span> : {{ item.deliveryAddress.city }}
									</div>
									<div class="pa-3">
										<span style="font-weight: bold">pays</span> : {{ item.deliveryAddress.address }}
									</div>
								</v-card-text>
								<v-card-actions class="justify-end">
									<v-btn text @click="addCommandToDeliveryMan(item)" color="primary">Prendre</v-btn>
									<v-btn text @click="dialog.value = false" color="error">Fermer</v-btn>
								</v-card-actions>
							</v-card>
						</template>
					</v-dialog>
				</v-list-item>
			</v-list>
		</v-navigation-drawer>
	</div>
</template>
<script src="./delivery.js" />

<style lang="scss">
.delivery {
	cursor: pointer;
	transition: 0.2s ease all;
	&:hover {
		color: white;
		background-color: lightblue;
	}
}
</style>