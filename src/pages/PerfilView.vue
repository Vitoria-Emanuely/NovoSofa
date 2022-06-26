<template>
    <div>
        <div class="card card-body col-12">
            <div class="d-flex justify-content-center mt-5">
                <h3>Seu Perfil</h3>
            </div>
            <div class="d-flex justify-content-center mt-2 d-flex flex-column align-items-center">
                <div class="row">
                    <span for="" class=""><strong>Nome Completo:</strong> {{ form.completeName }}</span>
                </div>
                <div class="row">
                    <span for="" class=""><strong>Email:</strong> {{ form.email }}</span>
                </div>
                <div class="row">
                    <span for="" class=""><strong>CPF:</strong> {{ form.cpf }}</span>
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
                completeName: "",
                cpf: "",
                email: ""
            }
        }
    },
    async mounted() {
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
            this.form.completeName = el.nome_usuario;
            this.form.cpf = el.cpf;
            this.form.email = el.email;
        });
    },
    methods: {
    },
}
</script>
    
<style>
</style>