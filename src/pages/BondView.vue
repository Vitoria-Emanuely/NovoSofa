<template>
    <div>
        <div class="d-flex flex-column align-items-center mt-5">
            <h4 style="color: rgb(95, 93, 93);">
                <i class="fa fa-user"></i>
                Meus Vínculos
            </h4>
            <div class="d-flex col-7">
                <div class="card card-body">
                    <div class="form-row">
                        <div class="form-group col-12">
                            <label>Curso</label>
                            <b-form-select v-model="selectedCourse" :options="course" @blur="v$.selectedCourse.$touch"
                                :class="{ 'error-boarder': v$.selectedCourse.$error }"></b-form-select>
                            <small v-if="v$.selectedCourse.$error">Campo obrigatório</small>
                        </div>

                        <!-- Estudante medio -->
                        <div class=" form-group col-6" v-if="this.user.type == 0">
                            <label>Turma</label>
                            <b-form-select v-model="selectedClass" :options="classS"></b-form-select>

                            <small>Campo obrigatório</small>
                        </div>

                        <div class="form-group col-6" v-if="this.user.type == 0">
                            <b-form-group label="Matérias:" v-slot="{ ariaDescribedby }">
                                <b-form-checkbox-group id="checkbox-group-1" v-model="selectedSubjects"
                                    :options="subject" :aria-describedby="ariaDescribedby" name="subject">
                                </b-form-checkbox-group>
                            </b-form-group>
                        </div>

                        <!-- Estudante superior -->
                        <div class="form-group col-6" v-if="this.user.type == 1">
                            <b-form-group label="Matérias:" v-slot="{ ariaDescribedby }">
                                <b-form-checkbox-group id="checkbox-group-1" v-model="selectedSubjects"
                                    :options="subject" :aria-describedby="ariaDescribedby" name="subject">
                                </b-form-checkbox-group>
                            </b-form-group>
                        </div>

                        <div class=" form-group col-6" v-if="this.user.type == 1">
                            <label>Turma</label>
                            <b-form-select v-model="selectedClass" :options="classS"></b-form-select>

                            <small>Campo obrigatório</small>
                        </div>

                        <!-- Prof -->
                        <div class="form-group col-6" v-if="this.user.type == 2">
                            <b-form-group label="Matérias:" v-slot="{ ariaDescribedby }">
                                <b-form-checkbox-group id="checkbox-group-1" v-model="selectedSubjects"
                                    :options="subject" :aria-describedby="ariaDescribedby" name="subject">
                                </b-form-checkbox-group>
                            </b-form-group>
                        </div>

                        <div class=" form-group col-6" v-if="this.user.type == 2">
                            <label>Turma</label>
                            <b-form-select v-model="selectedClass" :options="classS"></b-form-select>

                            <small>Campo obrigatório</small>
                        </div>
                    {{this.user.type}}


                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script>

import { required } from '@vuelidate/validators'
import useVuelidate from '@vuelidate/core'
import axios from 'axios';

export default {
    setup() {
        return {
            v$: useVuelidate()
        }
    },
    data() {
        return {
            course: ['pl', 'lo', 'ko'],
            classS: ['oi', 'op', 'io'],
            subject: ['op', 'po', 'aaa'],
            selectedCourse: "",
            selectedClass: "",
            selectedSubjects: [],
            user: {
                type: ""
            },
            info: ""
            // loader: "spinner",
        }
    },
    validations() {
        return {
            selectedCourse: { required },
            selectedClass: { required },
            selectedSubjects: { required }
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
        console.log(this.info.data)
        this.info.data.forEach(el => {
            this.user.type = el.tipo_usuario;
        });
        setTimeout(() => {
        loader.hide();
      }, 1000);
    },
    methods: {
    },
}
</script>
    
<style scoped>
.error-boarder {
    border-color: red !important;
}
</style>