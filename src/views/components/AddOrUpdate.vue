<template>
	<div>
		<v-tooltip top>
			<template v-slot:activator="{ on }">
				<v-btn
					v-on="on"
					@click.stop="drawerRight = !drawerRight"
					text
					v-if="!isUpdate"
				>
					<v-icon class="red--text">mdi-account-multiple-plus</v-icon>
				</v-btn> </template
			><span>Ajouter un produit</span>
		</v-tooltip>
		<v-tooltip bottom>
			<template v-slot:activator="{ on }">
				<v-btn
					v-on="on"
					@click.stop="(drawerRight = !drawerRight), update(product)"
					icon
					class="success--text"
					v-if="isUpdate"
				>
					<v-icon>mdi-lead-pencil</v-icon>
				</v-btn>
			</template>
			<span> Modifier le produit </span>
		</v-tooltip>
		<v-navigation-drawer v-model="drawerRight" app temporary hide-overlay right>
			<v-btn
				@click="drawerRight = !drawerRight"
				icon
				class="red--text mr-5 mt-2"
			>
				<v-icon>mdi-close</v-icon>
			</v-btn>
			<v-form v-model="valid" :lazy-validation="lazy">
				<v-list-item>
					<v-list-item-content>
						<v-list-item-title v-if="!isUpdate" class="title mt-3 text-center"
							>Ajouter un produit</v-list-item-title
						>
						<v-list-item-title v-if="isUpdate" class="title mt-3 text-center"
							>Modifier un produit</v-list-item-title
						>
					</v-list-item-content>
				</v-list-item>

				<v-divider></v-divider>
				<v-row class="mr-5 ml-5">
					<v-text-field
						v-model="name"
						label="Nom"
						required
						:rules="rules.field_required"
					></v-text-field>
				</v-row>
				<v-row class="mr-5 ml-5">
					<v-text-field
						v-model="description"
						label="Description"
						required
						:rules="rules.field_required"
					></v-text-field>
				</v-row>
				<v-row class="mr-5 ml-5">
					<v-text-field
						v-model="quantite"
						label="Quantité"
						required
						:rules="rules.field_required"
					></v-text-field>
				</v-row>
				<v-row class="mr-5 ml-5">
					<v-text-field
						v-model="price"
						label="prix"
						required
						:rules="rules.field_required"
					></v-text-field>
				</v-row>
				<v-row class="mr-5 ml-5 field-img">
					<v-file-input
						v-on:change="onFileChange"
						:rules="rules.field_required"
						required
					></v-file-input>
					<v-img
						v-if="!isUpdate"
						:src="picture"
						width="100px"
						height="100px"
					></v-img>
					<v-img
						v-if="isUpdate"
						:src="product.picture"
						width="100px"
						height="100px"
					></v-img>
					<br />
					<v-btn icon v-on:click="removeImg">
						<v-icon>mdi-close-circle</v-icon>
					</v-btn>
				</v-row>
			</v-form>

			<template v-slot:append>
				<v-row>
					<v-col cols="12" md="6" sm="6">
						<v-btn
							class="success--text"
							text
							@click="addUpdate()"
							@keyup.enter="addUpdate()"
							:disabled="!valid"
						>
							Valider
							<v-icon class="ml-3">mdi-check</v-icon>
						</v-btn>
					</v-col>
					<v-col cols="12" md="6" sm="6">
						<v-btn class="red--text" text @click="drawerRight = !drawerRight">
							Annuler
						</v-btn>
					</v-col>
				</v-row>
			</template>
		</v-navigation-drawer>
		<v-snackbar v-model="snackbar" :timeout="timeout">
			{{ text }}
			<v-btn color="blue" text @click="snackbar = false">Close</v-btn>
		</v-snackbar>
	</div>
</template>
<script src="./addOrUpdate.js" />

<style lang="scss">
	.field-img {
		.v-image {
			.v-image__image {
				background-size: contain;
			}
		}
	}
</style>