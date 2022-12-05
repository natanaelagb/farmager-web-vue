<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="290">
      <v-card>
        <v-card-title class="text-h5">
          Confirmar Exclusão
        </v-card-title>
        <v-card-text>
            Você têm certeza que deseja excluir o registro de id: {{id}}
        </v-card-text
        >
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1" text @click="cancel()">
            Cancelar
          </v-btn>
          <v-btn color="green darken-1" text @click="confirm()">
            Confirmar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  name:"ConfirmDialog",
  data() {
    return {
      
    };
  },
  props: {
    dialog: Boolean,
    id: Number,
  },
  methods: {
    confirm() {
        this.$emit("confirm-event", {value: true, id: this.id})
    },
    cancel() {
        this.$emit("confirm-event", {value: false, id: this.id})
    },
  },
  created() {
  }
};
</script>