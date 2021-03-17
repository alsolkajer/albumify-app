<template>
  <v-snackbar
    v-model="snackbar"
    :top="true"
    :color="'error'"
    :timeout="5000"
  >
    {{ snackbarMessage }}
    <v-btn
      dark
      text
      title="close"
      @click="snackbar = false"
    >
      Close
    </v-btn>
  </v-snackbar>
</template>

<script>
export default {
  name: 'SnackBar',
  props: {
    snackbarMessage: {
      type: String,
      required: true
    }
  },
  data: () => ({
    snackbar: false
  }),
  watch: {
    snackbarMessage (val) {
      if (val.length > 1) {
        this.snackbar = true
      }
    },
    snackbar (newVal) {
      if (newVal === false) {
        this.$emit('update:snackbarMessage', '')
      }
    }
  }
}
</script>
