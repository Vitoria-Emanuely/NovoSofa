<template>
    <div ref="bonds">
        <div class="d-flex flex-column align-items-center mt-5">
            <h4 style="color: rgb(95, 93, 93);">
                <i class="fa fa-user"></i>
                Meus Vínculos
            </h4>
            <div v-if="hasBonds" class="d-flex col-8">
                <div class="card card-body">
                    <div class="row">
                        <div class="col-10 d-flex justify-content-between">
                            <span>
                                <strong>Curso: </strong>{{ course.nome_curso }}
                            </span>
                            <span>Carga horária: {{ course.ch_curso}} horas</span>
                        </div>
                        
                    </div>
                    <div class="row py-4">
                        <div class="col-10">
                            <span><strong>Matérias: </strong></span>
                            <div class="d-flex justify-content-between" v-for="(sub, index) in subjects" :key="index">
                                <span>Nome: {{ sub.descricao_materia }}</span>
                                <span>Carga horária: {{sub.ch_materia}} horas</span>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-10">
                            <span><strong>Turmas: </strong></span>
                            <div class="d-flex justify-content-between" v-for="(clas, index) in classS" :key="index">
                                <span>Nome: {{ clas.descricao_turma }}</span>
                                <span>Data de início: {{clas.dt_inicio}}</span>
                                <span>Data de término: {{clas.dt_fim}}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div v-if="!hasBonds" class="card card-body">
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
                    <div class="form-group col-6 d-flex flex-column" v-if="this.user.tipo_usuario == 1">
                        <label>Matérias:</label>
                        <div v-for="(sub, index) in subjectName" :key="index">
                            <input type="checkbox" :value="subjectKey[index]" v-model="selectedSubjects">
                            <label for="checkbox"> {{ sub }}</label>
                        </div>
                        <button type="button" class="btn btn-outline" @click="getClassBySubjects()"
                            v-if="Object.keys(this.selectedSubjects).length > 0">Selecionar</button>
                        <div v-if="Object.keys(this.subjectName).length == 0 && this.selectedCourse != null">Não há
                            matérias cadastradas para
                            esse curso</div>
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
                    <button type="button" class="btn btn-outline" @click="postBond()"
                        v-if="canSend">Vincular-se</button>


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
            course: {},
            courseName: [],
            classS: {},
            subject: {},
            subjectName: [],
            subjectKey: [],
            className: [],
            selectedCourse: null,
            selectedClass: "",
            selectedSubjects: [],
            user: {},
            response: "",
            loader: "spinner",
            token: "",
            subjectKeyData: [],
            canSend: false,
            hasBonds: true,
            subjects: [],

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
                this.getSuperiorSubjects();
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
                    this.course = el.curso;
                    this.subjects = el.materias;
                    this.classS = el.turmas;
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
                this.course = el;
                this.courseName.push(this.course.nome_curso);
            });
            setTimeout(() => {
                loader.hide();
            }, 1000);
        },
        async getSuperiorSubjects() {
            this.subjectName = [];
            this.className = [];
            this.selectedSubjects = [];
            console.log(this.selectedCourse)
            this.response = axios
                .get('http://localhost:8000/SuperiorMaterias?course=' + this.selectedCourse + '&token=' + this.token)
            var info = await this.getResponse()

            info.data.forEach(el => {
                this.subject = el;
                this.subjectName.push(this.subject.descricao_materia);
                this.subjectKey.push(this.subject.key);
            });

        },
        async getClassBySubjects() {
            this.className = [];
            // this.selectedSubjects = [];
            // this.data = [];
            // Object.keys(this.selectedSubjects).length
            var data = [];
            this.subjectKeyData = [];
            this.selectedSubjects.forEach(el => {
                data.push('&names=' + el);
                this.subjectKeyData.push(el);
            });
            data = data.join('');
            console.log(this.subjectKeyData);
            // this.subjectKeyData = this.subjectKeyData.join('');
            // console.log(this.subjectKeyData);
            this.response = axios
                .get('http://localhost:8000/TurmasPorMateria?course=' + this.selectedCourse + '&token=' + this.token + data)
            var info = await this.getResponse()
            info.data.forEach(el => {
                this.classS = el;
                this.className.push(this.classS.descricao_turma);
            });
            this.canSend = true;

        },
        async postBond() {
            var data = {
                course: this.selectedCourse, materia: this.subjectKeyData
            }
            console.log(data)
            this.response = axios.post('http://localhost:8000/SuperiorVincular?token=' + this.token, data)

            this.info = await this.getResponse();
            this.$router.push({ name: 'home' });
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
    width: 40%;
    margin-left: auto;
    margin-right: auto;
}

.btn-outline:hover {
    background: #274F70 !important;
    color: #fff !important;
}
</style>