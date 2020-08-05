<template>
  <section class="hero is-success is-fullheight">
    <div class="hero-body">
      <div class="container has-text-centered">
        <div class="column is-4 is-offset-4">
          <h3 class="title has-text-grey">Kirjaudu sisään</h3>
          <p class="subtitle has-text-grey">Kirjaudu sisään jatkaaksesi.</p>
          <div class="box">
            <figure class="avatar">
              <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAABaFBMVEUnO3r///8SEUn/f0/TWTPqoi//xhvQ0dMAAEr0dkj/gk+pVkwABEklOHbupS6uejf/yxj/VBkAAEIAH27ppjCaeDWZbDoAIm8iN3gAADYcM3btqCzXWjIACUoOD0mfRj0ULnQANXwYF0f8YRwJKXIAAEAAADOKiprl5evKztsAADqXnrk/T4azuMt/gJL5vCGIkK80RoFMWo0YHVZ4gaTs7vPS0cudo73Lz9yDjKzjdVZQXo7RUjS8wNBcaZa2u81qdZ22VUjteVPYcVlZSHONP0BAQXedXWfFa15uTnDNXDp9SmNTRnS8aGDFWD6GS1+ST1ueUVQ6J1QAFlhWKEKrYmRsMUJ+OkFhLUQ/IkiQWWo/Q26ZQz0tLVlnZ3+4ucGdnqs2Nl5VN1tXV3RfX3x1UG9fFS7VTBX67OiCgY3bby/jhSsnIEfNjzJZQUL0iCX5bB/tliv0fiSGXz3hryPClyw4LUV4VkCo2b2pAAAO0klEQVR4nNXd+X/TRhYAcMlxNiEYCkpbj4Ut5FR2fAbbWBuH4MQQoC0UWnpAs2kONnSP7tHtbnf77+/Il66Z0Vw68n4EPom+vDnejEaSosYfjdG42+4NDwadTl9RlH6nMzgY9trd8aiRwG9X4vzh9qi7t983i5Zl6roOgLIIAHTdNC2raPb397ojO86LiEtoj9v7VhHKXBY6gG7Cf7ffHsfFjENoHw77MG1RNp8TJrQ/PIxDKV3Y7HU2rcjMYbK52ek1ZV+QXOF4YvLpXKVlTcZSr0misDmxLF1AtwjdMicSMylL2OjpUngLpN6TNZPIEXb3i6Y03izM4n5XyrVJENptyxLpe7gAltWWMLgKCxtDy4yBNwvTGgo3VkFhY7Ipr/ehQt+cCBqFhI1JMV7f1FgUMwoI7bjztzRuTgT6I7+wl0D+lsZiL3FhVzcT8zlh6rxzB5+w0bES9Tlhdfi6I5dwrxjH/BcVgK+pcgibwEzB54QJOOpVduGwmJLPieIwduGob6YIhGnsj+IVtlPpgd4AxXaMQnuQ/BAaDmvANP+zCEd6cnM8KXSdpaUyCHc306YtY3M3DuFBFlroIqwD6UK7Y6at8oXZoe2MlMKG0A5aHAF0yiKOTtiMZZtCLIBFV+BQCbvZGWO8sUm13KARZmgQ9QcVkUK4m2YhSo4ixawRLWxnFwiJ0SVcpDDTQBpilDDDTXQWkQ01QpjRUdQbUcMNWXiYfSAkHvILR1cBCInEpQZJ2MhSrU0Ki1TAEYQ2yF6phg4ACGU4QdjJxnqXJvQOj3BydYCQiF8vYoW7V6UTzsLCTos44RUZRt3ADqgYoW2mfcXMYWJGG4ywc1WGUTfAgEXYNtO+Xo4w0UU4UjjKermNjiKyKyKFytVro04ANAbxZ0Mz7WvlDBN1ZwohbF7NNupEEbH9hhBKq2UAqM4CJFbhAhrhninnd1WVJ59+9uDx4/zzR9dfPEvIaO5FC+WMo6D6xcuVjY2VlZVr+XwZxqsvkxm+wuNpSNiXcSHVJ0dT3kzoBER+lYQR9KOEXQkFNwAv5zxX6CCff14V/+FRYQW3bYJCCcMM+OKxC/QIofF1AlnUycKeKfwbqp97fH5hvvwofqLZIwlt8WEG+IF+ISTG31CLNkEovq4Hz/zAgDBfvh47UZ/ghQ3xZS94vEIU5stfxt5QNxtYoXgKqy83IoT58tcyFKTwJ9ErbAj3QvBFEIgQvvpGBoMUxQZGeCCewqMgMCzMl7+9L4NBCF8SPULxXgiehFKIEr5aj5vo7Yke4TCGXogS5svHRsxEfYgS2uL1Ggj50MKnlbiJlo0Qiu8+BSd7nDD/qpDLxUv07Eq5QvEUVr+jFJYNIxdzFq2wUMKiovoZXSuFo6mRizmL7hJjKRyIlxrVYD2DFb5xhLFm0d0fXgjFZ3tExYYVPq3k4iYuZ/2FsCdjYYgAkoSxEvVeQGhK+KHgGqMwXqJfOJZxt5C+H76dC+MkWmOfUMoN3+oDWuH3Ri524qI4VeQ1Ujhb0M6Hx0uhj+i8X8GyTFPOiXnTK5TSSBXwB1rhei4XIgLTGvR2x6Pzi4vesC/hwfB5M1XkNVLU6hBdlz6q5IJEfXO/O6sl16Zxvtdneu0EIubltyKvkaKHGpTwjU8IiaDoPtG8togL0cPzpitsSjp3AT6lWz3lDJ8w1zrxrOfW3GiLpXF2EFyRNd3PgiaH5R/8KcyVdlQVKVw774tc2WzSnwqlnUtArC4Qwi1fCo36uYoTrq3tm/xXAzoLoS3v7Ey4cAvvRD31jzOlwF3Nhp94IEDctOdCGXdjFsIfo3YTy88rvhSWPBm0z3dOTk9PzrbPvVnkb6jTJZQjFN+gcSO0VRMSHvuArW03eWelllYwjIqmtd5duET+LjSdLxxhXx7Q2VAk3beABZuvjWonS+B2SfO03dq7ZR7P+ZtYfyaUsAXlDfAAf+8JToUF/zC6mCbs05Z/gK20thfEM5P3WpwNKUVWyeaGP4u++4eBDOZqi3nCNrRcMFxi7QbnpTiFmyJzNpyHb87wCMvPjwMzYX2x6XcaBkLiojPuaJxE514iFO5LvxlU/aN7F/iam8AfjEAto53NgTs1BBB2xmUSDT4i2J8K4zgq+82bx/OjCtfmvPLdrysBYG4xFa7VUUD4P3A5F14WcnxEyxHK2IMKx/3C8XWIhEznrEn+1dutkC9nVOYpvES10el/wXxA3YY55iIWG1Aoq+wOxP1aYX3r+9evrz99++bbXCHsgyl6P58IMSl0mvF8wnAGWh4iLL4VddeUjZvFfQMmqVKowAj2v3nULmbCC2QvnGY5N2+mBYOPaO5CocyKxhf30S43WucRjdT5JzPhyXQQZifCqkaRsdmNiShiaW0mDC4XfWleDjVOSpmJYACFcdjmEUFcFDQa/p9p81n/bJZmjklDVSTXbN4A4P60G8J+iDQwCHcWDZmVaNlKLJOFc7IUPHvy44uvXj99C8fSYziYhscbHiErsdhQ5E8WUOecLF3Z2FjOh+X887tPv3WyKSxkJFpN5dCUzHv26ZGDC1ZtjvPR26+9EyOfkI1oHipSp8MqeHG0gV8fOidp3+aWRk4hE9HcVdrypsNq/7uVyJ0oWKAeFwwhIQtRbyvS1k7VZy83qPa8YWs9nuaRW8hA1HuKpJIGgO9QPsx9i/LdXEVESD8v6kPlQEpJU/0x3D7xQmjMv6kY/EJ6IjhQZBRtQDnC+HBC5+zXloCQuqGCgdIRB+ITSBDCpvonESEtsSNBiDwoFC3M5//8FxEhJbGjiG6WAoBvofEK6YjCm8FAeUAE0gmx4QpR1TsNUTiDymMyECN8+NArXPdGbssTte3fT+Ovta0t+HdBJO8+KhOQ7EMLH/5053e4uHXnJi5WPyhUEs9iJBAlfPi3W7cIwlVs3Fz9eyCL0fNiX2gsrUb0QYzwJ7wPBkG4evMf6zlGotBsgTw/Ey18eIdbuHrzn8F2GtVQO8qAH4g6PkMjJPmihB8HkxhBhDUNd12KPD1DJSSmMEL4QVhIJMK6dMgtjB5l0MK8bCGpL4Khsse5ekI9eZBSDklZhOtDzjU+6uGR9IT4LMI1Puc+DfKkZWpCfBbNXc69NvCCMoVJCXFE85BzvxR5HDhVIYZoNfn2vJEnSeUISVUbUYgmFht89y3oU8gqvHfv559/+ZBLiBxuLJvr3hPyAScZwnurqx9+cvv2J1gjSYjOIt/9w+oRNZBJ6DRQR3j7No5IFoazOL1/yHECOvi8tiThtAfOhLd/4RGGs6hPuO7jo44CyxCueoT/QicxShjM4vQ+Pvt0QT3bswnveIW3+XIYzOL0LAb7dNFnSCGD8KZP+DMyidFCP3F6nkZlFTJMhkzCVTlCH9HiOtdGtbRPL4de4vxcG+v9NYbpnkno74fowZRK6A43eo/rfCnLXMEivOcVfsI3lgayOD9fyli3sRQ0TELffIhupLTCRRbnZ4QZz3kzzYZsNY0r/DdXTRPK4vycN+PJNtrtCw6hk8WpEAekF06zuDyr3zWZhEcsQL7KG7u4oBZOs7h83oLtmRmmiiZFISQun5lhe+6JbbJIUZhzn3timxGrTMA0hZr77BpT8V3dYIpr5VAkJZyd0OV4hvQ6W9wNxg8JCY2W7QqZVsF6Yb3AEJVgrCck1C5VV8hWuN2gbyio/9qkhK2uR8jWTMWIiQlLtlfIuFkjQiQJfzcTYksaFuG8kfK+F0OASBTec4SYPRpG4eJZB953m/ATiUJoJG0IMwiNkuoXMh8z5SZGCPl39f2xfC6O/x1DvMQIIfedmUAsHlcReU8UJzEZoXGqBoUcj6zzEZMRLp4aE3xfGxcxGWFdDQt53rnHQ0xEWNtBCLluJPIQkxCWGggh34OIHMT1XwWE/6ESLp5ODQj53l/KTlz/SOBcW/BwIjrqa0gh57uUmInG+q8kIkl4hzKFJypayPmgHgfxv7fwgT9Be3P1N8peOMIIeV+IxUH830fY+Bgbvxl0wMWqAiHkfZMwe1+srHNEgaoP+nuhrHeyi636JYc/hbLeq58lYqlBEPJ/GyE7xNqZShLyf98iK0SjZpOF/G/FygixdaGShQLvbssE0dgKgkJCgefzs0AsRX8rSOR7T+kTtbOQJyxUBR4qTZto1MIchFDku2spE0vnVEKhb+elSvQuC4lCoe8fpkg0NCQG9YdC315Ljxh8iyZBKPYliLSItR2kBS0Ue7VSOkTtFE3BCMW+B5wGMVSPRggFv+mcArE+xkhwQsHvcidO9LzplVYo+PWnhIm1S6wDL1Q7V4eIG2UihLYu9NqTBInYUSZCqDbEXgOWGNEorREUJKHaFHvRd1JE7DAaLVS7V4FYD+5bsAjVrtgb+ZIglsjAKKG6m3ViCTsRUgrVdraJJXS5zSLMdhYjM0gjVHezO9zUo4E0wuyOqBGjKL1QPcwk0aAC0gnVkZW9As4oESd6RqHayFyNqtVIpRq7ULXFPk0knVg7JRTbXEK4XszSkriFXw/yCwVnDZlEg2aW4BCqTaEPTMkjajW6MYZdKNgZZRFb1F2QXehUqWlv+Bv1yEpUSKiOFIE0SiBqGnLrXqJQVYcCaRQlGiXU3SXZQrUpkEYxolZD3B+MQaiqPf40ijyKUgrfwo5LqDY6iR9KMVpboUMIMQrhigqYiRJrNaqFhESh01STO+anlXaY5kA5QtWebCZzHlWrXzaiLycGIeyOE748MhG10iXlOikGITQecOWRnqjVT4R8wkJoHFpmbMRa6b2gT4IQ9se2xb7JQUGs1Eo7Av1PohBGd1BkTWQE0dBKp7zzgz/kCGFj7emMn9ImEbVWa0e4ec5DlhDGeGIxITFEQ2uVLjnqT1xIFKoO0rTod+UQRMhrXXa5Z3dUyBXCaPY6m7SpvBHQ1eq5nXOpPDUGIQy7O+xbFs2mzpKowaaZe38hYegMRRxCJ+xxe98qWmZEm71haFqtVaq/2zmPQ+dEXMJp2M3d4UCBUMs0dR24WAB0XTct+DfKu/fb57KGTWTEKpyF3RiNu+3e8GDQ6TivFet3OoODYa/dHY8asjsdIv4PE0yDNLz3f8UAAAAASUVORK5CYII=">
            </figure>
            <form>
              <div class="field">
                <div class="control">
                  <input class="input is-large"
                    v-model="form.email"
                    @blur="$v.form.email.$touch()"
                    type="email"
                    placeholder="Your Email"
                    autofocus=""
                    autocomplete="email">
                  <div v-if="$v.form.email.$error" class="form-error">
                    <span v-if="!$v.form.email.required" class="help is-danger">Sähköpostiosoite on pakollinen</span>
                    <span v-if="!$v.form.email.emailValidator" class="help is-danger">Sähköpostiosoite ei ole kunnollinen</span>
                  </div>
                </div>
              </div>
              <div class="field">
                <div class="control">
                  <input
                    v-model="form.password"
                    @blur="$v.form.password.$touch()"
                    class="input is-large"
                    type="password"
                    placeholder="Your Password"
                    autocomplete="current-password">
                  <div v-if="$v.form.password.$error" class="form-error">
                    <span v-if="!$v.form.password.required" class="help is-danger">Salasana on pakollinen</span>
                  </div>
                </div>
              </div>
              <!-- Login Button -->
              <button
                @click.prevent="login"
                :disabled="$v.form.$invalid"
                class="button is-block is-info is-large is-fullwidth">
                Kirjaudu sisään
              </button>
            </form>
          </div>
          <p class="has-text-grey">
            <nuxt-link to="/register">Puuttuuko tunnukset? -Rekisteröidy</nuxt-link>
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { required, email } from 'vuelidate/lib/validators'
export default {
  middleware: 'guest',
  data() {
    return {
      form: {
        email: null,
        password: null
      }
    }
  },
  validations: {
    form: {
      email: {
        emailValidator: email, 
        required
      },
      password: {
        required
      }
    }
  },
  computed: {
    isFormValid() {
      return !this.$v.$invalid
    }
  },
  methods: {
    login() {
      this.$v.form.$touch()

      if (this.isFormValid) {
        this.$store.dispatch('auth/login', this.form)
          .then(() =>  this.$router.push('/'))
          .catch(() => this.$toasted.error('Wrong email or password', {duration: 3000}))
      }
    }
  }
}
</script>

<style scoped>
  .hero.is-success {
    background: #F2F6FA;
  }
  .hero .nav, .hero.is-success .nav {
    -webkit-box-shadow: none;
    box-shadow: none;
  }
  .box {
    margin-top: 5rem;
  }
  .avatar {
    margin-top: -70px;
    padding-bottom: 20px;
  }
  .avatar img {
    height: 128px;
    width: 128px;
    padding: 5px;
    background: #fff;
    border-radius: 50%;
    -webkit-box-shadow: 0 2px 3px rgba(10,10,10,.1), 0 0 0 1px rgba(10,10,10,.1);
    box-shadow: 0 2px 3px rgba(10,10,10,.1), 0 0 0 1px rgba(10,10,10,.1);
  }
  p.subtitle {
    padding-top: 1rem;
  }
</style>
