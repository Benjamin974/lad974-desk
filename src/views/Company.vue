<template>
	<div
		style="
			display: flex;
			justify-content: center;
			margin-top: 3vh;
			overflow: auto;
			margin-bottom: 4vh;
		"
	>
		<v-card
			width="60%"
			height="530px"
			class="elevation-0 d-flex flex-column justify-space-between"
		>
			<v-card-title>
				<h3>Tout mes articles</h3>
				<v-spacer></v-spacer>
				<v-text-field
					v-model="search"
					append-icon="mdi-magnify"
					label="Rechercher"
					single-line
					hide-details
				></v-text-field>
			</v-card-title>
			<v-data-table
				:headers="headers"
				:items="products"
				:search="search"
				:page.sync="page"
				:items-per-page="itemsPerPage"
				class="elevation-1"
				hide-default-footer
				@page-count="pageCount = $event"
			>
				<template v-slot:header.name="{ header }">
					<div style="width: 125px !important">
						{{ header.text }}
					</div>
				</template>
				<template v-slot:header.actions="{ header }">
					<div style="width: 125px !important">
						{{ header.text }}
					</div>
				</template>
				<template v-slot:item.name="{ item }">{{ item.name }}</template>
				<template v-slot:item.description="{ item }">{{
					item.description
				}}</template>
				<template v-slot:item.quantite="{ item }">{{ item.quantite }}</template>
				<template v-slot:item.price="{ item }">{{ item.price }}</template>
				<template v-slot:item.actions="{ item }">
					<v-row align="center" class="d-flex">
						<ViewProduct :product="item" />
						<AddOrUpdate
							:isUpdate="true"
							:product="item"
							:idCompany="company.id"
							@updateProduct="updateProduct($event)"
						/>
						<Delete :product="item" :products="products" />
					</v-row>
				</template>
			</v-data-table>
			<div class="text-center pt-2">
				<v-pagination v-model="page" :length="pageCount"></v-pagination>
			</div>
		</v-card>
	</div>
</template>

<script src="./company.js" />