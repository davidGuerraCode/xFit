<template lang="pug">
v-app
  v-content(class="gradient")
    v-container()
      v-layout(row justify-center align-center)
        v-flex(xs4)
          v-card(class="blue-grey darken-3" flat)
            v-container
              v-card-media(
                src="/static/img/LogoAnastasisLogin.png"
                height="220"
                contain
              )
        v-flex(xs4)
          v-card(class="blue-grey darken-2")
            v-container
              v-card-media(
                src="/static/img/LogoAtreusLogin.png"
                height="150"
                contain
              )
              h4(class="white--text text-xs-center headline") Inicia Sesión
              v-form(
                v-model="valid"
                @submit.prevent="onSignIn"
                ref="form"
                lazy-validation
              )
                v-text-field(
                  name="correo"
                  label="Correo"
                  dark
                  prepend-icon="mail"
                  type="email"
                  class="mb-3"
                  v-model="userData.email"
                  :rules="[(v) => !!v || 'Este campo no puede estar vacío']"
                  required
                )
                v-text-field(
                  name="contraseña"
                  label="Contraseña"
                  prepend-icon="lock"
                  type="password"
                  dark
                  class="input-group"
                  v-model="userData.password"
                  :rules="[(v) => !!v || 'Este campo no puede estar vacío']"
                  required
                )
            v-layout(row justify-center pb-3)
              v-btn(
                class="white--text teal accent-4"
                @click="submit"
                :disabled="!valid"
              ) Ingresar
      v-footer(
        class="pa-3 teal accent-4"
        fixed
        app
      )
        v-layout(row justify-center)
          p(class="white--text ma-0") Desarrollado por ÁtlasisDev © | 2018
</template>

<script>
export default {
  name: 'signin',
  data () {
    return {
      valid: true,
      userData: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    submit () {
      if (this.$refs.form.validate()) {
        this.onSignIn()
      }
    },
    onSignIn () {
      this.$store.dispatch('user/signUserIn', this.userData)
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
