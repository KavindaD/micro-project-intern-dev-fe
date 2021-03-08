<template>
  <v-card class="mx-auto my-5 px-10 py-3" width="400px">
    <form  @submit.prevent="submit">
      <v-text-field
        v-model="formData.username"
        :error-messages="userNameErrors"
        :counter="10"
        label="Username"
        required
        @input="$v.formData.username.$touch()"
        @blur="$v.formData.username.$touch()"
      ></v-text-field>

      <v-text-field
        v-model="formData.email"
        :error-messages="emailErrors"
        label="E-mail"
        required
        @input="$v.formData.email.$touch()"
        @blur="$v.formData.email.$touch()"
      ></v-text-field>

      <v-text-field
        prefix="+94"
        v-model="formData.contactNumber"
        :error-messages="contactNoErrors"
        label="Contact Number"
        required
        @input="$v.formData.contactNumber.$touch()"
        @blur="$v.formData.contactNumber.$touch()"
      ></v-text-field>

      <v-text-field
        v-model="formData.password"
        :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
        :type="showPassword ? 'text' : 'password'"
        @click:append="showPassword = !showPassword"
        :error-messages="passwordErrors"
        label="Password"
        required
        @input="$v.formData.password.$touch()"
        @blur="$v.formData.password.$touch()"
      ></v-text-field>

      <v-text-field
        v-model="formData.repeatedPassword"
        :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
        :type="showPassword ? 'text' : 'password'"
        @click:append="showPassword = !showPassword"
        :error-messages="repeatedPasswordErrors"
        label="Repeat Password"
        required
        @input="$v.formData.repeatedPassword.$touch()"
        @blur="$v.formData.repeatedPassword.$touch()"
      ></v-text-field>

      <v-btn class="mr-4" @click="submit"> submit </v-btn>
      <v-btn @click="clear"> clear </v-btn>
      <v-btn class="ml-4" route-link to="/dashboard"> cancel </v-btn>
    </form>
  </v-card>
</template>

<script>
  import { validationMixin } from 'vuelidate'
  import { required, maxLength, minLength, email, sameAs } from 'vuelidate/lib/validators'
  import axios from 'axios'

  export default {
    name: "newAdmin",

    mixins: [validationMixin],

    validations: {
      formData: {
        username: { required, maxLength: maxLength(10) },
        email: { required, email },
        contactNumber: { required, minLength: minLength(9) },
        password: { required, minLength: minLength(8) },
        repeatedPassword: { sameAsPassword: sameAs('password') }
      },
    },

    data() {
      return{
        formData:{
          username: '',
          email: '',
          contactNumber: '',
          password: '',
          repeatedPassword: '',
        },
        showPassword: false
      }
    },

    computed: {
      userNameErrors () {
        const errors = []
        if (!this.$v.formData.username.$dirty) return errors
        !this.$v.formData.username.maxLength && errors.push('username must be at most 10 characters long')
        !this.$v.formData.username.required && errors.push('username is required.')
        return errors
      },
      emailErrors () {
        const errors = []
        if (!this.$v.formData.email.$dirty) return errors
        !this.$v.formData.email.email && errors.push('Must be valid e-mail')
        !this.$v.formData.email.required && errors.push('E-mail is required')
        return errors
      },
      contactNoErrors () {
        const errors = []
        if (!this.$v.formData.contactNumber.$dirty) return errors
        // !this.$v.contactNumber.MaxLength && errors.push('Must be valid Contact Number')
        !this.$v.formData.contactNumber.minLength && errors.push('Must be valid Contact Number')
        !this.$v.formData.contactNumber.required && errors.push('Contact Number is required.')
        return errors
      },
      passwordErrors () {
        const errors = []
        if (!this.$v.formData.password.$dirty) return errors
        !this.$v.formData.password.minLength && errors.push('username must be at least 8 characters long')
        !this.$v.formData.password.required && errors.push('Password is required.')
        return errors
      },
      repeatedPasswordErrors () {
        const errors = []
        if (!this.$v.formData.repeatedPassword.$dirty) return errors
        !this.$v.formData.repeatedPassword.sameAsPassword && errors.push('Passwords does not match')
        return errors
      },
    },

    methods: {
      submit () {
        this.$v.$touch()
        if (this.$v.$invalid) {
          this.submitStatus = 'ERROR'
        } else {
          axios.post('http://localhost:5000/insert', this.formData)
            .then(response => console.log(response))
            .catch(error => console.log(error))

          this.submitStatus = 'PENDING'
          setTimeout(() => {
            this.submitStatus = 'OK'
          }, 500)
          this.$router.push('/dashboard')
        }
      },
      clear () {
        this.$v.$reset()
        this.formData.username = ''
        this.formData.email = ''
        this.formData.contactNumber = ''
        this.formData.password = ''
        this.formData.repeatedPassword = ''
      },
    },
  }
</script>

<style lang="scss" scoped>

</style>