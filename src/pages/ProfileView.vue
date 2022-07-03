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
                <div class="card card-body">
                    <div class="row">
                        <div class="col-6">
                            <span>
                                <strong>Curso: </strong>{{ form.nome_usuario }}
                            </span>
                        </div>
                        <div class="col-6">
                            <span>
                                <strong>Matéria: </strong>{{ form.cpf }}
                            </span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-6">
                            <span>
                                <strong>Turma: </strong>{{ form.email_usuario }}
                            </span>
                        </div>
                    </div>
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
            form: {

            },
            loader: "spinner",
        }
    },
    async mounted() {
        let login = this.$refs.profile;
        let loader = this.$loading.show(
            {
                container: login,
                loader: this.loader,
            }
        );
        var data = { usuario_ref: localStorage.getItem('usuario_ref'), token: localStorage.getItem('token') }
        var response = axios
            .get('http://localhost:8000/Usuario?login=' + data.usuario_ref + '&token=' + data.token)

        async function getResponse() {
            try {
                const value = await response;
                return value;
            } catch (err) {
                console.log(err);
            }
        }

        this.info = await getResponse()
        this.info.data.forEach(el => {
            this.form = el;
        });
        setTimeout(() => {
            loader.hide();
        }, 1000);
    },
    methods: {
    },
}
</script>
    
<style>
</style>