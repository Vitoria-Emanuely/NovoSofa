<template>
  <div class="d-flex align-items-stretch min-height-100" style="height:100%" ref="login">
    <div class="bg-cover bg-img-login d-none d-md-inline-flex col-lg-8 col-md-6"></div>
    <div class="card card-body mb-0 rounded-0 col-sm-12 col-md-6 col-lg-4 bg-login">
      <form>
        <div class="d-flex flex-column justify-content-center align-items-center">
          <img src="../assets/logo_white.png" class="logo mb-1" alt="YuSocial">
          <div class="form-group mt-3" v-if="this.error_message != ''">
            <small class="alert alert-danger text-center" role="alert">
              {{ this.error_message }}
            </small>
          </div>

          <div class="col-md-12 form-group mt-3">
            <input type="text" class="form-control mb-2" name="username" placeholder="Digite seu nome de usuário"
              v-model="form.username" />
          </div>

          <div class="col-md-12 form-group">
            <input type="password" class="form-control" name="password" placeholder="Digite sua senha"
              v-model="form.password" @keydown.enter="login()" />
          </div>

          <div class="col-md-12 mb-2">
            <button type="button" class="btn-login mt-4" id="btn-grad" @click="login()">
              Entrar
            </button>
          </div>
        </div>
      </form>


      <div class="d-flex justify-content-center mt-3">
        <span class="mr-1">Não tem uma conta?</span>
        <a class="float-right cursor-pointer" @click="register()">Criar conta</a>
      </div>

    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      form: {
        username: "",
        password: ""
      },
      info: "",
      error_message: "",
      loader: "spinner",
    }
  },
  methods: {
    register() {
      this.$router.push({ name: 'register' });
    },

    async login() {
      let login = this.$refs.login;
      let loader = this.$loading.show(
        {
          container: login,
          loader: this.loader,
        }
      );

      var data = { login_usuario: this.form.username, senha_usuario: this.form.password };
      var response = axios.post('http://localhost:8000/Login', data);

      async function getResponse() {
        try {
          const value = await response;
          return value;
        } catch (err) {
          return err;
        }
      }

      this.info = await getResponse()

      if (Object.getPrototypeOf(this.info) == "Error") {
        if (this.info.response.status === 403) {
          this.error_message = "Usuário ou senha incorretos"
          this.clearForm();
          setTimeout(() => {
            loader.hide();
          });
          return;
        }
      } else {
        this.info.data.forEach(el => {
          localStorage.setItem('token', el.token);
          localStorage.setItem('usuario_ref', el.usuario_ref);
        });
      }

      console.log(localStorage)
      console.log(this.error_message)

      this.$router.push({ name: 'home' })
      setTimeout(() => {
        loader.hide();
      }, 1000);
    },

    clearForm() {
      this.form = {
        username: "",
        password: ""
      }
    }
  }
}
</script>

<style scoped>
a,
a:hover {
  color: #fff;
}

.cursor-pointer {
  cursor: pointer;
}

.bg-img-login {
  background-image: #fff;
}

.bg-login {
  /* background: rgb(138, 11, 74); */
  /* background: linear-gradient(58deg, rgba(138, 11, 74, 0.8) 2%, rgba(176, 16, 71, 0.8) 17%, rgba(219, 18, 49, 0.8) 49%, rgba(220, 56, 91, 0.8) 75%); */
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: #fff;
  background: #191654;
  /* fallback for old browsers */
  background: -webkit-linear-gradient(to top, #43C6AC, #191654);
  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to top, #43C6AC, #191654);
  /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

}

.logo {
  width: 250px;
}

.form-control {
  background-color: rgb(245, 245, 245, 0.4);
  border-color: rgb(245, 245, 245, 0.4);
  border-radius: 11px;
  color: #fff;
  padding: 20px;
}

input:focus {
  box-shadow: 0 0 0 0;
  border: 0 none;
  outline: 0;
}

::-webkit-input-placeholder {
  color: #fff;
}

.btn-login {
  width: 100%;
  border: 1px solid #FDFDFD;
  border-radius: 11px;
  height: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  color: #FDFDFD;
  background-color: transparent;
}

.btn-login:hover {
  background-color: #FDFDFD;
  color: #223F68;
}

.btn-login {
  outline: none;
}

.btn-login::-moz-focus-inner {
  border: 0;
}
</style>