<template lang="pug">
v-app
  v-content(class="gradient")
    v-container()
      v-layout(row justify-center align-center)
        v-flex(xs4)
          v-card(class="blue-grey darken-3")
            v-container
              v-card-media(
                src="/static/img/LogoAnastasisLogin.png"
                height="220"
                contain
              )
        v-flex(xs4)
          v-card(class="blue-grey darken-2 elevation-4")
            v-container
              v-card-media(
                src="/static/img/LogoAtreusLogin.png"
                height="150"
                contain
              )
              h4(class="white--text text-xs-center headline") Registrate
              v-form(
                @submit.prevent="onSignUp"
                v-model="valid"
                ref="form"
                lazy-validation
              )
                v-text-field(
                  name="correo"
                  label="Correo"
                  prepend-icon="email"
                  type="email"
                  class="mb-3"
                  dark
                  v-model="userData.email"
                  :rules="emailRules"
                  required
                )
                v-text-field(
                  name="contraseña"
                  label="Contraseña"
                  prepend-icon="lock"
                  type="password"
                  v-model="userData.password"
                  :rules="[(v) => !!v || 'Este campo no puede estar vacío']"
                  required
                  dark
                )
                v-text-field(
                  name="repetirContraseña"
                  label="Confirmar Contraseña"
                  prepend-icon="lock"
                  type="password"
                  class="mt-3"
                  :rules="[comparePasswords]"
                  v-model="confirmPassword"
                  dark

                )
            v-layout(row justify-center pb-3)
              v-btn(
                class="white--text teal accent-4"
                @click="submit"
                :disabled="!valid"
              ) Registrar
      v-footer(
        class="pa-3 teal accent-4"
        fixed
        app
      )
        v-layout(row justify-center)
          p(class="white--text ma-0") Desarrollado por ÁtlasisDev © | 2018
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'signup',
  data () {
    return {
      valid: true,
      userData: {
        email: '',
        password: ''
      },
      confirmPassword: '',
      emailRules: [
        v => !!v || 'El correo es requerido!',
        v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'Debes ingresar un correo válido!'
      ]
    }
  },
  computed: {
    ...mapGetters({
      user: 'user/currentUser'
    }),
    comparePasswords () {
      return (this.userData.password !== this.confirmPassword) ? 'Las contraseñas no coinciden!' : true
    }
  },
  /* watch: {
    user (value) {
      if (value !== null && value !== undefined) this.$router.push('/')
    }
  }, */
  methods: {
    submit () {
      if (this.$refs.form.validate()) {
        this.onSignUp()
      }
    },
    onSignUp () {
      this.$store.dispatch('user/signUserUp', this.userData)
        .then(() => this.$router.push('/'))
    }
  }
}
</script>
<style scoped>
.gradient {
  display: flex;
  /* justify-content: space-around; */
  align-items: center;
  background: linear-gradient(to right, #16222A, #3A6073);
  min-height: 100vh;
}
.media {
  position: relative;
  left: 50%;
}
</style>
