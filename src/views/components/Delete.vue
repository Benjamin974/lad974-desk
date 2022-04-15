<template>
  <v-dialog v-model="dialog" persistent max-width="290">
    <template v-slot:activator="{ on }">
      <v-btn v-on="on" icon class="red--text">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-card-title class="headline text-center"
        >Supprimer le produit {{ product.name }}?</v-card-title
      >
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="red darken-1" text @click="dialog = false">Annuler</v-btn>
        <v-btn color="green darken-1" text @click="deleteProduct(product)"
          >Continuer</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script src='./delete.js' />
