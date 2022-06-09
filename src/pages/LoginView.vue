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
    <v-snackbar color="red" v-model="errorLogin" danger multline timeout="2000">Usuario ou senha inválidos</v-snackbar>
    <v-dialog v-model="novaConta" persistent max-width="300">
        <v-card>
            <v-card-title>Conta não encontrada</v-card-title>
            <v-card-text>A conta não foi localizada. Deseja criar uma nova conta com os dados informados?</v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="green darken-1" text @click="criarNovaConta">Sim</v-btn>
                <v-btn color="red darken-1" text @click="novaConta = false">Não</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
  </v-container> -->
  <div>
    <h2 class="text-center">Login</h2>
    <form id="form">
      <label for="fEmail" class="form-label">Email</label>
      <div id="formEmail" class="input-group mb-3">
        <input
          id="fEmail"
          class="form-control"
          v-model="user.email"
          type="email"
        />
      </div>
      <label for="fPass" class="form-label">Password</label>
      <div id="formPass" class="input-group mb-3">
        <input
          id="fPass"
          class="form-control"
          v-model="user.password"
          type="password"
        />
      </div>
      <div class="d-flex justify-content-between">
        <div id="formButton">
          <button
            v-if="!loadingAuth"
            @click.prevent="authentication"
            class="btn btn-success"
          >
            Login
          </button>
          <button v-else class="btn btn-success" type="button" disabled>
            <span
              class="spinner-grow spinner-grow-sm"
              role="status"
              aria-hidden="true"
            ></span>
            Loading...
          </button>
        </div>
        <div>
          <p id="changeState" @click="changeState(false)">
            Não tem uma conta. Clique aqui!
          </p>
        </div>
      </div>
    </form>
    <div
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
    </div>
    <aaa/>
  </div>
</template>

<script>
// import * as fb from '@/plugins/firebase'
export default {
    data() {
        return {
          aaa:"aaa",
        //     user: {},
        //     show: false,
        //     errorLogin: false,
        //     novaConta: false,
        }
    },
    methods: {
        // reset() {
        //     this.user = {}
        // },
        // async login() {
        //     try {
        //         await fb.auth.signInWithEmailAndPassword(this.user.email, this.user.password)
        //         this.$router.push({name: "Home"})
        //     } catch(error) {
        //         const errorCode = error.code
        //         switch(errorCode) {
        //             case "auth/wrong-password":
        //                 this.errorLogin = true
        //                 break
        //             case "auth/invalid-email":
        //                 this.errorLogin = true
        //                 break
        //             case "auth/user-not-found":
        //                 this.novaConta = true
        //                 break
        //             default:
        //                 this.errorLogin = true
        //                 break 
        //         }
        //     }
        // },
        // async criarNovaConta(){
        //     this.novaConta = false
        //     await fb.auth.createUserWithEmailAndPassword(this.user.email, this.user.password)
        //     this.login()
        // },
    }
}
</script>

<style>
#box{
    max-width: 50%;
}
</style>