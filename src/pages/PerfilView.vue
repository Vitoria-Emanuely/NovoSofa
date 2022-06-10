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
                    <span for="" class=""><strong>CPF:</strong> {{ form.cpf }}</span>
                </div>
            </div>
        </div>

    </div>
</template>

<script>

import UsersModel from "@/models/UsersModel";

export default {
    data() {
        return {
            form: {
                completeName: "",
                cpf: "",
                userId: ""
            }

        }
    },
    async mounted() {
        this.form.userId = JSON.parse(localStorage.getItem('authUser')).id;
        let user = await UsersModel.params({ id: this.form.userId }).get();
        this.form = {
            completeName: user[0].completeName,
            cpf: user[0].cpf
        }
    },
    methods: {
    },
}
</script>
    
<style>
</style>