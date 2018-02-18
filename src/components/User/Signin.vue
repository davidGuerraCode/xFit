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
              h4(class="white--text text-xs-center") Inicia Sesión
              v-form(
                v-model="valid"
              )
                v-text-field(
                  name="correo"
                  label="Correo"
                  dark
                  prepend-icon="mail"
                  type="email"
                  class="mb-3"
                  v-model="user.name"
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
                  v-model="user.password"
                  :rules="[(v) => !!v || 'Este campo no puede estar vacío']"
                  required
                )
            v-layout(row justify-center pb-3)
              v-btn(
                class="white--text teal accent-4"
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
      user: {
        name: '',
        password: ''
      }
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
