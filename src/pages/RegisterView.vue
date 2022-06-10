<template>
    <!-- <div class="card-body card col-10">
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
      <div class="d-flex justify-content-center">
          <button type="button" @click="register()" class="btn btn-primary">
            Cadastrar
          </button>
      </div>
    </form>
  </div> -->

    <div class="card-body card col-10">
        <form class="col-10 d-flex flex-column">
            <label for="fName" class="form-label">Nome Completo</label>
            <div id="formName" class="input-group mb-3">
                <input id="fName" class="form-control" v-model="form.completeName" type="text" />
            </div>
            <div class="row justify-content-around mb-3">
                <b-form-radio v-model="form.type" value="Professor">Professor
                </b-form-radio>
                <b-form-radio v-model="form.type" value="Estudante">Estudante
                </b-form-radio>
            </div>
            <label for="fUsername" class="form-label">Nome de Usuário</label>
            <div id="formUsername" class="input-group mb-3">
                <input id="fUsername" class="form-control" v-model="form.username" type="text" />
            </div>
            <label for="fCPF" class="form-label">CPF</label>
            <div id="formCPF" class="input-group mb-3">
                <input id="fCPF" class="form-control" v-model="form.cpf" type="text" />
            </div>
            <label for="fPass" class="form-label">Senha</label>
            <div id="formPass" class="input-group mb-3">
                <input id="fPass" class="form-control" v-model="form.password" type="password" />
            </div>
            <div class="d-flex justify-content-center">
            <button @click="register()" class="btn btn-primary">Enviar</button>
            </div>
        </form>
    </div>
</template>

<script>
import UsersModel from "@/models/UsersModel";

// import axios from 'axios';

// import * as fb from '@/plugins/firebase'
export default {
    data() {
        return {
            form: {
                completeName: "",
                username: "",
                type: "",
                cpf:"",
                password: "",
            }



        }
    },
    methods: {
        goToLogin() {
            this.$router.push({name: 'login'});
        },
        register() {
            const user = new UsersModel(this.form);
            user.save();
            this.goToLogin();
        },
        
    }
}
</script>

<style>
form {
    margin-left: auto;
    margin-right: auto;
}
</style>