<template>
    <div class="d-flex align-items-stretch min-height-100" style="height:100%" ref="register">
        <div class="bg-cover bg-img-login d-none d-md-inline-flex col-lg-8 col-md-6"></div>
        <div class="card card-body mb-0 rounded-0 col-sm-12 col-md-6 col-lg-4 bg-login">
            <form>
                <div class="d-flex flex-column justify-content-center align-items-center mb-3">
                    <img src="../assets/logo_white.png" class="logo mb-3" alt="NovoSofaLogo">

                    <div class="form-group mt-3" v-if="this.error_message != '' && this.validate_pass">
                        <small class="alert alert-danger text-center" role="alert">
                            {{ this.error_message }}
                        </small>
                    </div>

                    <div class="form-group mt-3" v-if="!this.validate_pass && this.validate_pass !== ''">
                        <small class="alert alert-danger text-center" role="alert">
                            As senhas não concidem
                        </small>
                    </div>

                    <div class="form-row">
                        <div class="form-group col-12">
                            <input type="text" class="form-control" name="completeName" v-model="form.completeName"
                                @blur="v$.form.completeName.$touch" placeholder="Nome completo" autocomplete="off"
                                :class="{ 'error-boarder': v$.form.completeName.$error }" />
                            <small v-if="v$.form.completeName.$error">Campo obrigatório</small>
                        </div>

                        <div class="form-group col-6">
                            <input type="text" class="form-control" name="username" v-model="form.username"
                                @blur="v$.form.username.$touch" placeholder="Login do usuário" autocomplete="off"
                                :class="{ 'error-boarder': v$.form.username.$error }" />
                            <small v-if="v$.form.username.$error">Campo obrigatório</small>
                        </div>

                        <div class="form-group col-6">
                            <input type="text" class="form-control" name="cpf" v-model="form.cpf"
                                @blur="v$.form.cpf.$touch" placeholder="CPF" autocomplete="off"
                                :class="{ 'error-boarder': v$.form.cpf.$error }" v-mask="'###.###.###-##'" />
                            <small v-if="v$.form.cpf.$error">Campo obrigatório</small>
                        </div>

                        <div class="form-group col-12">
                            <input type="email" class="form-control" name="email" v-model="form.email"
                                @blur="v$.form.email.$touch" placeholder="Email"
                                :class="{ 'error-boarder': v$.form.email.$error }" />
                            <small v-if="v$.form.email.$error">Campo obrigatório</small>
                        </div>

                        <div class="form-group col-12 row justify-content-around" style="margin-left:7.5px">
                            <!-- <b-form-radio v-model="form.type" value="0">Estudante Ensino Médio
                            </b-form-radio> -->
                            <b-form-radio v-model="form.type" value="1">Estudante
                            </b-form-radio>
                            <b-form-radio v-model="form.type" value="2">Professor
                            </b-form-radio>
                        </div>

                        <div class="form-group col-6">
                            <input type="password" class="form-control" name="password" v-model="form.password"
                                @blur="v$.form.password.$touch" placeholder="Senha"
                                :class="{ 'error-boarder': v$.form.password.$error }" />
                            <small v-if="v$.form.password.$error">Campo obrigatório</small>
                        </div>

                        <div class="form-group col-6">
                            <input type="password" class="form-control" name="confirm_password"
                                v-model="form.confirm_password" @blur="v$.form.confirm_password.$touch"
                                placeholder="Confirme sua senha"
                                :class="{ 'error-boarder': v$.form.confirm_password.$error }"
                                @keydown.enter="register()" />
                            <small v-if="v$.form.confirm_password.$error">Campo obrigatório</small>
                        </div>
                    </div>

                    <div type="button" class="btn-login d-flex justify-content-center align-items-center mt-3"
                        @click="register()">
                        Cadastrar
                    </div>

                    <div class="d-flex justify-content-center mt-4">
                        <p class="mr-1">Tem uma conta?</p>
                        <a @click="goToLogin()" class="float-right cursor-pointer">
                            Conecte-se!
                        </a>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script>

import { required, email } from '@vuelidate/validators'
import useVuelidate from '@vuelidate/core'
import axios from 'axios'

export default {
    setup() {
        return {
            v$: useVuelidate()
        }
    },
    data() {
        return {
            form: {
                completeName: "",
                username: "",
                type: 1,
                cpf: "",
                password: "",
                email: "",
                confirm_password: ""
            },
            info: "",
            error_message: "",
            response: "",
            loader: "spinner",
            validate_pass: ""
        }
    },
    validations() {
        return {
            form: {
                completeName: { required },
                username: { required },
                type: { required },
                cpf: { required },
                password: { required },
                email: { required, email },
                confirm_password: { required }
            },
        }
    },
    methods: {
        goToLogin() {
            this.$router.push({ name: 'login' });
        },
        validatePassword() {
            if (this.form.password === this.form.confirm_password)
                return true;
            return false;
        },

        async register() {
            this.validate_pass = this.validatePassword();
            let register = this.$refs.register;
            let loader = this.$loading.show(
                {
                    container: register,
                    loader: this.loader,
                }
            );
            const isFormCorrect = this.v$.$validate()
            this.form.type = parseInt(this.form.type);
            if (isFormCorrect && this.validate_pass) {
                var data = {
                    cpf: this.form.cpf, login_usuario: this.form.username, nome_usuario: this.form.completeName,
                    email_usuario: this.form.email, senha_usuario: this.form.password, tipo_usuario: this.form.type
                }
                this.response = axios.post('http://localhost:8000/CriarNovoUsuario', data)

                this.info = await this.getResponse()

                if (Object.getPrototypeOf(this.info) == "Error") {
                    if (this.info.response.status === 400) {
                        this.error_message = "Erro ao cadastrar o usuário. Verifique se o usuário já existe"
                        this.clearForm();
                        setTimeout(() => {
                            loader.hide();
                        }, 1000);
                        return;
                    }

                } else {
                    this.goToLogin();

                }
            }
            setTimeout(() => {
                loader.hide();
            }, 1000);
        },
        async getResponse() {
            try {
                const value = await this.response;
                return value;
            } catch (err) {
                return err;
            }
        },

        clearForm() {
            this.form = {
                completeName: "",
                username: "",
                type: 0,
                cpf: "",
                password: "",
                email: "",
                confirm_password: ""
            }
        },

    }
}
</script>

<style scoped>
.error-boarder {
    border-color: #fff !important;
}

.alert-danger {
    color: #721c24 !important;
}

small {
    color: #fff;
}

a,
a:hover {
    color: #fff;
}

.bg-img-login {
    background-image: url('../assets/couch.webp');
    background-repeat: no-repeat;
    background-position: center;
}

.cursor-pointer {
    cursor: pointer;
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
    color: #fff !important;
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
    outline: none;
}

.btn-login:hover {
    background-color: #FDFDFD;
    color: #223F68;
}

.btn-login::-moz-focus-inner {
    border: 0;
}
</style>