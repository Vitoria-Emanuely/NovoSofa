<template>
    <div ref="bonds" v-if="!loading">
        <div class="d-flex flex-column align-items-center mt-5">
            <h4 style="color: rgb(95, 93, 93);">
                <i class="fa fa-user"></i>
                Meus Vínculos
            </h4>
            <div v-if="hasBonds" class="d-flex col-8">
                <div class="card card-body">
                    <div class="row">
                        <div class="col-10">
                            <span><strong>Curso: </strong></span>
                            <div class="d-flex justify-content-between" v-for="(cou, index) in course" :key="index">
                                <span>Nome: {{ cou.nome_curso }}</span>
                                <span>Carga horária: {{ cou.ch_curso }} horas</span>
                            </div>
                        </div>

                    </div>
                    <div class="row py-4">
                        <div class="col-10">
                            <span><strong>Matérias: </strong></span>
                            <div class="d-flex justify-content-between" v-for="(sub, index) in subjects" :key="index">
                                <span>Nome: {{ sub.descricao_materia }}</span>
                                <span>Carga horária: {{ sub.ch_materia }} horas</span>
                                <span>Data de início: {{ sub.dt_inicio }}</span>
                                <span>Data de término: {{ sub.dt_fim }}</span>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-10">
                            <span><strong>Turmas: </strong></span>
                            <div class="d-flex justify-content-between" v-for="(clas, index) in classes" :key="index">
                                <span>Nome: {{ clas.descricao_turma }}</span>
                                <span>Data de início: {{ clas.dt_inicio }}</span>
                                <span>Data de término: {{ clas.dt_fim }}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div v-if="!hasBonds" class="card card-body col-8">
            <!-- Estudante superior -->
                <div class="form-row" v-if="this.user.tipo_usuario == 1">
                    <div class="form-group col-12">
                        <label>Curso:</label>
                        <b-form-select v-model="selectedCourse" :options="courseName" @change="onChange()">
                        </b-form-select>
                    </div>

                    <div class="d-flex form-group col-12">
                        <label class="mr-1">Turmas:</label>
                        <div v-for="(clas, index) in className" :key="index">
                            <input type="radio" :value="classKey[index]" v-model="selectedClass">
                            <label class="ml-1 mr-3"> {{ clas }}</label>
                        </div>
                    </div>

                    <div class="d-flex form-group col-12">
                        <b-tabs content-class="mt-3">
                            <b-tab v-for="(clas, index) in subjects" :key="index" :title="clas.turma.descricao_turma">
                                <div v-for="(sub, index) in clas.materias" :key="index">
                                    <input type="checkbox" :value="sub.key" v-model="selectedSubjects">
                                    <label class="ml-1"> {{ sub.descricao_materia }}</label>
                                </div>
                            </b-tab>
                        </b-tabs>
                    </div>
                    <button v-if="canSend" type="button" class="btn btn-outline" @click="postSuperiorBind()">Vincular-se</button>
                </div>

                <!-- Prof -->
                <div class="form-row" v-if="this.user.tipo_usuario == 2">
                    <div class="form-group col-12 d-flex flex-column">
                        <b-form-group label="Cursos:" v-slot="{ ariaDescribedby }">
                            <b-form-checkbox-group v-model="selectedCourses" :options="courseName"
                                :aria-describedby="ariaDescribedby" name="course">
                            </b-form-checkbox-group>
                        </b-form-group>
                        <button class="btn btn-outline" @click="getSubjectsAndClasses()">Selecionar</button>
                    </div>

                    <div class="form-group col-12 d-flex">
                        <label class="mr-1">Turmas:</label>
                        <div v-for="(clas, index) in className" :key="index">
                            <input type="checkbox" :value="classKey[index]" v-model="selectedClasses">
                            <label class="ml-1 mr-4"> {{ clas }}</label>
                        </div>
                    </div>

                    <div class="form-group col-12">
                        <b-tabs content-class="mt-3">
                            <b-tab v-for="(clas, index) in subjects" :key="index" :title="clas.turma.descricao_turma">
                                <div v-for="(sub, index) in clas.materias" :key="index">
                                    <input type="checkbox" :value="sub.key" v-model="selectedSubjects">
                                    <label class="ml-1"> {{ sub.descricao_materia }}</label>
                                    {{ sub.key }}
                                </div>

                            </b-tab>
                        </b-tabs>
                    </div>
                    <button v-if="canSend" type="button" class="btn btn-outline" @click="postProfessorBind()">Vincular-se</button>
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
            courses: {},
            courseName: [],
            classes: [],
            subjects: [],
            subjectName: [],
            classKey: [],
            className: [],
            selectedCourses: [],
            selectedCourse: "",
            selectedClass: "",
            selectedClasses: [],
            selectedSubjects: [],
            user: {},
            response: "",
            loader: "spinner",
            token: "",
            subjectKeyData: [],
            canSend: false,
            hasBonds: true,
            loading: true,
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
                return err;
            }
        },
        async getUser() {
            var data = { usuario_ref: localStorage.getItem('usuario_ref'), token: this.token }
            this.response = axios
                .get('http://localhost:8000/Usuario?login=' + data.usuario_ref + '&token=' + data.token)
            var info = await this.getResponse()
            info.data.forEach(el => {
                this.user = el;
            });
            this.getBonds();
        },
        onChange() {
            if (this.user.tipo_usuario == 1) {
                this.selectedCourses.push(this.selectedCourse)
                this.getSubjectsAndClasses();
            }
        },
        async getBonds() {
            this.response = axios
                .get('http://localhost:8000/VinculosUsuario?userType=' + this.user.tipo_usuario + '&token=' + this.token)
            var info = await this.getResponse();
            if (Object.getPrototypeOf(info) == "Error") {
                if (info.response.status === 404) {
                    this.error_message = "Você não possui vínculos"
                    this.hasBonds = false;
                    return;
                }
            } else {
                info.data.forEach(el => {
                    console.log(el)
                    this.course = el.curso;
                    this.subjects = el.materias;
                    this.classes = el.turmas;
                });
            }
        },
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
            var info = await this.getResponse();
            info.data.forEach(el => {
                this.courses = el;
                this.courseName.push(el.nome_curso);
            });
            setTimeout(() => {
                this.loading = false;
                loader.hide();
            }, 1000);
        },
        async getSubjectsAndClasses() {
            var data = [];
            this.selectedCourses.forEach(el => {
                data.push('&names=' + el);
            });
            data = data.join('');
            this.response = axios
                .get('http://localhost:8000/CursosTurmasMaterias?token=' + this.token + data);
            var info = await this.getResponse();
            info.data.forEach(el => {
                this.classes.push(el.turmas);
            });
            this.classes.forEach(clas => {
                clas.forEach(el => {
                    this.className.push(el.turma.descricao_turma)
                    this.classKey.push(el.turma.key);
                    this.subjects.push(el);
                });
            });
            this.canSend = true;
        },
        async postSuperiorBind() {
            this.selectedCourses = this.selectedCourses.join();
            var data = {
                curso: this.selectedCourses, turma: this.selectedClass, materias: this.selectedSubjects
            }
            console.log(data)
            this.response = axios.post('http://localhost:8000/SuperiorVincular?token=' + this.token, data)

            this.info = await this.getResponse();
            this.$router.push({ name: 'home' });
        },
        async postProfessorBind() {
            var data = {
                cursos: this.selectedCourses, materias: this.selectedSubjects, turmas: this.selectedClasses
            }
            this.response = axios.post('http://localhost:8000/ProfessorVincular?token=' + this.token, data)
            this.info = await this.getResponse();
            this.$router.push({ name: 'home' });
        },

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
    width: 20%;
    margin-left: auto;
    margin-right: auto;
}

.btn-outline:hover {
    background: #274F70 !important;
    color: #fff !important;
}
</style>