<template>
  <v-container >
    <v-card>
      <v-card-title>
        <h1>Trade or View your Portfolio</h1>
      </v-card-title>
      <v-card-text>
        <p>You may Save & Load your Data</p>
        <p>Click on 'End Day' to begin a new Day!</p>
        <hr>
        <strong>Your Funds: {{ funds }}</strong>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
import * as types from "../store/types";

export default {
	computed: {
		funds() {
			return this.$store.getters.formattedFunds;
		}
	}
}
</script>

