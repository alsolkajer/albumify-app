<template>
  <v-app id="inspire">
    <v-app-bar
      app
      shrink-on-scroll
      height="70"
    >
      <nuxt-link to="/upload" :style="{ marginTop:'12px' }">
        <v-app-bar-nav-icon>
          <v-icon>
            mdi-file-upload
          </v-icon>
        </v-app-bar-nav-icon>
      </nuxt-link>

      <v-toolbar-title>Dashboard -</v-toolbar-title>
      <v-toolbar-title
        :style="{
          fontSize: '14px',
          marginBottom:'6px',
          marginLeft:'6px'
        }"
      >
        Tap to download file
      </v-toolbar-title>

      <v-spacer />

      <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main :style="{ padding: 0 }">
      <v-container>
        <v-row>
          <v-col
            v-for="(file, n) in files"
            :key="n"
            cols="4"
          >
            <a :href="'/api/files/' + file.filename">
              <v-card height="300">
                <v-card-title v-if="file.isImage">
                  <v-img
                    contain
                    height="250"
                    :src="'/api/files/image/' + file.filename"
                  />
                </v-card-title>
                <v-card-title v-else>
                  {{ file.filename }}
                </v-card-title>
              </v-card>
            </a>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>

export default {
  middleware: ['auth-cookies'],
  data: () => ({
    files: null,
    filesLength: 0
  }),
  mounted () {
    this.$axios
      .get('/api/files/show')
      .then((response) => {
        this.files = response.data
      })
  }
}
</script>
