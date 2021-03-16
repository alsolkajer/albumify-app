<!-- eslint-disable vue/no-mutating-props -->
<template>
  <v-form
    ref="form"
    v-model="form.valid"
    lazy-validation
  >
    <v-text-field
      v-model="form.email"
      :rules="emailRules"
      label="E-mail"
      required
    />

    <v-text-field
      v-model="form.password"
      :counter="20"
      :rules="passwordRules"
      :type="'password'"
      label="Password"
      required
    />
    <v-btn
      :disabled="!form.valid"
      color="indigo lighten-1"
      class="mr-4"
      @click="validate"
    >
      {{ buttonTitle }}
    </v-btn>
  </v-form>
</template>

<script>
/* eslint-disable vue/no-mutating-props */
export default {
  name: 'AuthenticationForm',
  props: {
    buttonTitle: {
      type: String,
      required: true
    },
    form: {
      type: Object,
      required: true
    }
  },
  data: () => ({
    emailRules: [
      v => !!v || 'E-mail is required',
      v => /.+@.+\..+/.test(v) || 'E-mail must be valid'
    ],
    passwordRules: [
      v => !!v || 'Password is required'
      // v => (v &amp;amp;amp;amp;amp;amp;amp;amp;amp;&amp;amp;amp;amp;amp;amp;amp;amp;amp; v.length <= 20) || 'Password must be less than 20 characters',
    ]
  }),
  mounted () {
    this.form.valid = false
    this.form.finish = true
  },
  methods: {
    validate () {
      if (this.$refs.form.validate()) {
        this.form.finish = true
        this.$emit('update:form', this.form)
      }
    }
  }
}
</script>
