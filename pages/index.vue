<template>
  <v-container class="text-left">
    <v-row
      :align="'center'"
      :justify="'center'"
      class="mt-12"
    >
      <v-col cols="12" md="5" lg="5">
        <div class="title">
          Hi! welcome to Albumify App
        </div>
        Social album file directory.
        Here you can upload your file, store it, and download it with others.
        <v-row v-if="!$auth.loggedIn" class="mt-3">
          <v-col cols="5" md="5" lg="5">
            <v-btn
              color="red"
              :href="'/login'"
              dark
            >
              Login
            </v-btn>
          </v-col>
          <v-col cols="5" md="5" lg="5">
            <v-btn
              color="blue"
              :href="'/register'"
              dark
            >
              Register
            </v-btn>
          </v-col>
        </v-row>
        <v-row v-else class="mt-3">
          <v-col cols="5" md="5" lg="5">
            <v-btn
              color="red"
              :href="'/login'"
              dark
            >
              Logout
            </v-btn>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12" md="5" lg="5">
        <v-img
          height="250"
          src="/albumify-logo.png"
          alt="albumify-logo.js"
          class="mb-5"
        />
      </v-col>
    </v-row>
    <snack-bar :snackbar-message.sync="snackbarMessage" />
  </v-container>
</template>
<script>

export default {
}
</script>
