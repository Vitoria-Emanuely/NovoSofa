<template>
    <div>
        <div class="container">
            <div class="container">
                <div class="d-flex justify-content-center mt-5">
                    <h3>Seu Perfil</h3>
                </div>
                <div class="d-flex justify-content-center mt-2">
                    <div class="row justify-content-around">
                        <div class="col-4">
                            <div class="col-4">
                                <label for="" class="">Nome</label>
                                <p>{{ nome }}</p>
                            </div>
                        </div>
                        <div class="col-4">
                            <div class="col-4">
                                <label for="" class="">CPF</label>
                                <p>{{ cpf }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
import axios from 'axios'

export default {
    data() {
        return {
            nome: null,
            cpf: null
        }
    },

    created: function () {
        this.buscaDados();
    },

    methods: {
        buscaDados: function () {
            axios.get('http://localhost:8091/buscaDados')
                .then(function (res) {
                    this.nome = res.data.results;
                })
                .catch(function (err) {
                    console.log(err);
                })
        }
    },
}
</script>
    
<style>
</style>