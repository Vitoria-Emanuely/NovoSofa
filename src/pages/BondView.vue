<template>
    <div ref="bonds">
        <div class="d-flex flex-column align-items-center mt-5">
            <h4 style="color: rgb(95, 93, 93);">
                <i class="fa fa-user"></i>
                Meus Vínculos
            </h4>
            <div class="d-flex col-7">
                <div class="card card-body">
                    <div class="form-row">
                        <div class="form-group col-12" v-if="this.user.tipo_usuario !== 2">
                            <label>Curso</label>
                            <b-form-select v-model="selectedCourse" :options="courseName" @change="onChange()">
                            </b-form-select>
                            <!-- <small>Campo obrigatório</small> -->
                        </div>

                        <!-- Estudante medio -->
                        <div class=" form-group col-6" v-if="this.user.tipo_usuario == 0">
                            <label>Turma</label>
                            <b-form-select v-model="selectedClass" :options="classS"></b-form-select>
                        </div>

                        <div class="form-group col-6" v-if="this.user.tipo_usuario == 0">
                            <div v-for="i in subject" :key="i">
                                <span>{{ i }}</span>
                            </div>
                        </div>

                        <!-- Estudante superior -->
                        <div class="form-group col-6" v-if="this.user.tipo_usuario == 1">
                            <label>Matérias:</label>
                            <div v-for="(sub, index) in subjectName" :key="index">
                                <!-- <input type="checkbox" @change="check(index)" /> -->
                                <input type="checkbox" :value="subjectKey[index]" v-model="selectedSubjects">
                                <label for="checkbox"> {{ sub }}</label>
                            </div>
                            <button type="button" class="btn btn-outline" @click="getClassBySubjects()"
                                v-if="Object.keys(this.selectedSubjects).length > 0">Selecionar</button>
                        </div>

                        <div class=" form-group col-6" v-if="this.user.tipo_usuario == 1">
                            <label>Turma</label>
                            <div v-for="i in className" :key="i">
                                <span>{{ i }}</span>
                            </div>
                        </div>

                        <!-- Prof -->
                        <div class="form-group col-6" v-if="this.user.tipo_usuario == 2">
                            <b-form-group label="Cursos:" v-slot="{ ariaDescribedby }">
                                <b-form-checkbox-group v-model="selectedCourses" :options="courseName"
                                    :aria-describedby="ariaDescribedby" name="course">
                                </b-form-checkbox-group>
                            </b-form-group>
                        </div>

                        <div class="form-group col-6" v-if="this.user.tipo_usuario == 2">
                            <b-form-group label="Matérias:" v-slot="{ ariaDescribedby }">
                                <b-form-checkbox-group v-model="selectedSubjects" :options="subjectName"
                                    :aria-describedby="ariaDescribedby" name="subject">
                                </b-form-checkbox-group>
                            </b-form-group>
                        </div>

                        <div class="form-group col-6" v-if="this.user.tipo_usuario == 2">
                            <b-form-group label="Turmas:" v-slot="{ ariaDescribedby }">
                                <b-form-checkbox-group v-model="selectedClass" :options="className"
                                    :aria-describedby="ariaDescribedby" name="class">
                                </b-form-checkbox-group>
                            </b-form-group>
                        </div>
                        {{ this.user.type }}


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
            course: {},
            courseName: [],
            classS: {},
            subject: {},
            subjectName: [],
            subjectKey: [],
            className: [],
            selectedCourse: "",
            selectedClass: "",
            selectedSubjects: [],
            user: {},
            response: "",
            loader: "spinner",
            token: "",
            teste: {}

        }
    },
    validations() {
        return {
            selectedCourse: { required },
            selectedClass: { required },
            selectedSubjects: { required }
        }
    },
    mounted() {
        this.token = localStorage.getItem('token');
        this.getUser();
        this.getCourses();
    },
    methods: {
        async getResponse() {
            try {
                const value = await this.response;
                return value;
            } catch (err) {
                console.log(err);
            }
        },
        async getUser() {
            var data = { usuario_ref: localStorage.getItem('usuario_ref'), token: localStorage.getItem('token') }
            this.response = axios
                .get('http://localhost:8000/Usuario?login=' + data.usuario_ref + '&token=' + data.token)
            var info = await this.getResponse()
            info.data.forEach(el => {
                this.user = el;
            });

        },
        onChange() {
            if (this.user.tipo_usuario == 1) {
                this.getSuperiorSubjects();
            }
        },
        // check(index) {
        //     this.selectedSubjects.push(this.subjectKey[index])
        //     // console.log(this.selectedSubjects.lenght());
        // },
        async getCourses() {
            let bonds = this.$refs.bonds;
            let loader = this.$loading.show(
                {
                    container: bonds,
                    loader: this.loader,
                }
            );
            this.response = axios
                .get('http://localhost:8000/Cursos?token=' + this.token)
            var info = await this.getResponse()
            info.data.forEach(el => {
                this.course = el;
                this.courseName.push(this.course.nome_curso);
            });
            setTimeout(() => {
                loader.hide();
            }, 1000);
        },
        async getSuperiorSubjects() {
            // this.subjectName = [];
            this.response = axios
                .get('http://localhost:8000/SuperiorMaterias?course=' + this.selectedCourse + '&token=' + this.token)
            var info = await this.getResponse()

            info.data.forEach(el => {
                this.subject = el;
                this.subjectName.push(this.subject.descricao_materia);
                this.subjectKey.push(this.subject.key);
            });
            // console.log(this.teste)
            // console.log(this.subjectName)

        },
        async getClassBySubjects() {
            this.className = [];
            // this.selectedSubjects = [];
            // this.data = [];
            // Object.keys(this.selectedSubjects).length
            var data = [];
            this.selectedSubjects.forEach(el => {
                data.push('&names=' + el)
            });
            console.log(data);
            this.response = axios
                .get('http://localhost:8000/TurmasPorMateria?course=' + this.selectedCourse + '&token=' + this.token + data)
            var info = await this.getResponse()
            // console.log(info.data)
            info.data.forEach(el => {
                this.classS = el;
                this.className.push(this.classS.descricao_turma);
            });
            // this.selectedSubjects = [];
            console.log(this.className);
        }
    },
}
</script>
    
<style scoped>
.error-boarder {
    border-color: red !important;
}

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