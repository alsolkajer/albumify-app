<template>
  <v-app id="inspire">
    <v-app-bar
      app
      shrink-on-scroll
    >
      <v-app-bar-nav-icon />

      <v-toolbar-title>Application</v-toolbar-title>

      <v-spacer />

      <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <v-container>
        <v-row>
          <v-col
            v-for="(file, n) in files"
            :key="n"
            cols="4"
          >
            <v-card height="200">
              <v-card-title>
                {{ file.filename }}
                <v-img
                  height="250"
                  :src="'/api/upload/image/' + file.filename"
                />
              </v-card-title>
            </v-card>
          </v-col>
        </v-row>
        <snack-bar :snackbar-message.sync="snackbarMessage" />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import SnackBar from '@/components/snackBar'

export default {
  components: { SnackBar },
  middleware: ['auth-cookies'],
  data: () => ({
    files: null,
    filesLength: 0,
    snackbarMessage: ''
  }),
  mounted () {
    this.$axios
      .get('/api/upload/files')
      .then((response) => {
        this.files = response.data
      })
  }
}
</script>
