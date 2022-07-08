<template>
    <div ref="profile">
        <div class="d-flex flex-column align-items-center mt-5">
            <h4 style="color: rgb(95, 93, 93);">
                <i class="fa fa-user"></i>
                Meus Dados
            </h4>
            <div class="d-flex col-10">
                <div class="card card-body">
                    <div class="row">
                        <div class="col-6">
                            <span>
                                <strong>Nome Completo: </strong>{{ form.nome_usuario }}
                            </span>
                        </div>
                        <div class="col-6">
                            <span>
                                <strong>CPF: </strong>{{ form.cpf }}
                            </span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-6">
                            <span>
                                <strong>Email: </strong>{{ form.email_usuario }}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

        </div>
        <div class="d-flex flex-column align-items-center mt-5">
            <h4 style="color: rgb(95, 93, 93);">
                <i class="fa fa-user"></i>
                Meus Vínculos
            </h4>
            <div class="d-flex col-10">
                <div v-if="error_message == ''" class="card card-body">
                    <div class="row">
                        <div class="col-6">
                            <span>
                                <strong>Curso: </strong>{{ course.nome_curso }}
                            </span>
                        </div>
                        <div class="col-6">
                            <span><strong>Matérias: </strong></span>
                            <div v-for="(sub, index) in subjects" :key="index">
                                <span>{{ sub.descricao_materia }}</span>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-6">
                            <span><strong>Turmas: </strong></span>
                            <div v-for="(clas, index) in classS" :key="index">
                                <span>{{ clas.descricao_turma }}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-else class="card card-body d-flex align-items-center">
                    <div>{{ error_message }}</div>
                    <button class="btn btn-outline mt-2" @click="goToBonds()">
                        Vincular-se
                    </button>
                </div>
            </div>
        </div>
    </div>

</template>

<script>


import axios from 'axios';

export default {
    data() {
        return {
            form: {},
            loader: "spinner",
            response: "",
            token: "",
            user: {},
            bonds: {},
            subjects: [],
            classS: [],
            course: {},
            error_message: ""
        }
    },
    beforeMount() {

    },
    mounted() {
        this.token = localStorage.getItem('token');
        this.getUser();
    },
    methods: {
        async getResponse() {
            try {
                const value = await this.response;
                return value;
            } catch (err) {
                return err;
            }
        },
        goToBonds() {
            this.$router.push({ name: 'bonds' });
        },
        async getUser() {
            var data = { usuario_ref: localStorage.getItem('usuario_ref'), token: this.token }
            this.response = axios
                .get('http://localhost:8000/Usuario?login=' + data.usuario_ref + '&token=' + data.token)
            var info = await this.getResponse();
            info.data.forEach(el => {
                this.user = el;
            });
            this.getProfile();
        },
        async getProfile() {
            let login = this.$refs.profile;
            let loader = this.$loading.show(
                {
                    container: login,
                    loader: this.loader,
                }
            );
            var data = { usuario_ref: localStorage.getItem('usuario_ref'), token: this.token }
            this.response = axios
                .get('http://localhost:8000/Usuario?login=' + data.usuario_ref + '&token=' + data.token)

            var info = await this.getResponse();
            info.data.forEach(el => {
                this.form = el;
            });
            setTimeout(() => {
                loader.hide();
            }, 1000);
            this.getBonds();
        },
        async getBonds() {
            this.response = axios
                .get('http://localhost:8000/VinculosUsuario?userType=' + this.user.tipo_usuario + '&token=' + this.token)
            var info = await this.getResponse();
            if (Object.getPrototypeOf(info) == "Error") {
                if (info.response.status === 404) {
                    this.error_message = "Você não possui vínculos"

                    return;
                }

            } else {
                info.data.forEach(el => {
                    this.course = el.curso;
                    this.subjects = el.materias;
                    this.classS = el.turmas;
                });
            }
        },

    },
}
</script>
    
<style scoped>
.btn-outline {
    background: #fff;
    color: #274F70 !important;
    border-color: #274F70 !important;
    border-radius: 11px !important;
    /* width: 30%; */
}

.btn-outline:hover {
    background: #274F70 !important;
    color: #fff !important;
}
</style>