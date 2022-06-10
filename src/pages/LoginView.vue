<template>
  <!-- <v-container fill-height fluid text-center>
    <v-container>
        <v-img class="mx-auto" max-width="900" src="@/assets/images/bg.png"></v-img>
        
        <v-row>
            <v-col class="purple--text text-center mx-auto pb-7 pt-16" cols="1" sm="4" offset="4">
                <h1 class="h1">Login</h1>
            </v-col>
        </v-row>
        <v-row id="box" class="elevation-3 mx-auto">
            <v-col>
                <v-form>
                    <v-text-field label="Email" v-model="user.email"></v-text-field>
                    <v-text-field label="Senha" v-model="user.password" 
                    :type="show ? 'text' : 'password'"
                    :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'" 
                    @click:append="show = !show" @keydown.enter="login"></v-text-field> 
                    <v-btn color="purple" dark @click="login">Login</v-btn> 
                    <v-btn class="ml-2" color="red" dark @click="reset">Cancelar</v-btn>               
                </v-form>
            </v-col>
        </v-row>
    </v-container>
    
  </v-container> -->
  <div class="card-body card col-10">
    <h2 class="text-center">Login</h2>
    <form class="col-10 d-flex flex-column">
      <label for="fUsername" class="form-label">Nome de Usuário</label>
      <div class="input-group mb-3">
        <input class="form-control" v-model="form.username" type="text" />
      </div>
      <label for="fPass" class="form-label">Senha</label>
      <div  class="input-group mb-3">
        <input class="form-control" v-model="form.password" type="password" />
      </div>
      <div class="d-flex justify-content-between">
          <button type="button"  @click="login()" class="btn btn-primary">
            Entrar
          </button>
          <!-- <button v-else class="btn btn-success" type="button" disabled>
            <span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
            Loading...
          </button> -->
          <b-button @click="register()" class="btn btn-alert">Cadastre-se</b-button>
      </div>
    </form>
    <!-- <div
      v-if="errorAuth"
      class="alert alert-danger alert-dismissible"
      role="alert"
      id="liveAlert"
    >
      <strong>Alguma coisa deu errado. Tente de novo!</strong>
      <button
        @click.prevent="errorAuth = !errorAuth"
        type="button"
        class="btn-close"
        data-bs-dismiss="alert"
        aria-label="Close"
      ></button>
    </div> -->
  </div>
</template>

<script>
import UsersModel from "@/models/UsersModel";
export default {
  data() {
    return {
      form: {
        username: "",
        password: ""
      },
    }
  },
  methods: { 
    register() {
      this.$router.push({name: 'register'});
    },

    async login() {
      let user = await UsersModel.params({username: this.form.username}).get();
      if (!user || !user[0] || !user[0].username) {
        console.log("Usuário ou senha incorretos");
        this.clearForm();
        return;
      }
      user = user[0];
      if (user.password !== this.form.password) {
        alert("Usuário ou senha incorretos OPA");
        this.clearForm();
        return;
      }

      localStorage.setItem('authUser', JSON.stringify(user));
      this.$router.push({name: 'home'})
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

<style>
form {
  margin-left: auto;
  margin-right: auto;
}

.card-body {
  margin-top: 23vh;
}
</style>