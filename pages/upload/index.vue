<template>
  <v-container class="text-center">
    <v-row
      :align="'center'"
      :justify="'center'"
      class="mt-12"
    >
      <v-col cols="12" md="6" lg="3">
        <v-file-input
          ref="file"
          v-model="file"
          type="file"
          name="file"
          show-size
          label="File input"
        />
        <v-btn
          color="indigo lighten-1"
          class="mr-4"
          @click="submit"
        >
          Upload
        </v-btn>
      </v-col>
    </v-row>
    <snack-bar :snackbar-message.sync="snackbarMessage" />
  </v-container>
</template>

<script>
import SnackBar from '@/components/snackBar'

export default {
  components: { SnackBar },
  middleware: ['auth-cookies'],
  data: () => ({
    file: null,
    snackbarMessage: ''
  }),
  methods: {
    async submit () {
      if (this.file) {
        const formData = new FormData()
        formData.append('file', this.file, this.file.name)

        await this.$axios.post('/api/files/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
          .then((response) => {
            this.$router.replace('/dashboard')
          })
          .catch((error) => {
            throw error
          })
      } else {
        this.snackbarMessage = "There's no file"
      }
    }
  }
}
</script>
