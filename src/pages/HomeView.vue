<template>
  <div style="height: 84vh;" ref="home" v-if="!loading">
    <div class="d-flex align-items-stretch flex-nowrap min-height-100 h-100" v-if="!hasBond">
      <div class="bg-cover bg-img d-none d-md-inline-flex col-lg-5 col-md-4"></div>
      <div class="card card-body mb-0 rounded-0 col-sm-12 col-md-8 col-lg-7 card-initial">
        <img src="../assets/logo_black.png" alt="">
        <div class="mt-5 mb-3 text-center">
          <h5>Seja bem-vindo(a)</h5>
          <span>Você não possui vínculos, deseja vincular-se?</span>
        </div>
        <button class="btn btn-outline btn-without-bond" @click="goToBonds()">
          Vincular-se
        </button>
      </div>
    </div>
    <div class="d-flex flex-column align-items-center mt-5" v-if="hasBond">
      <h2>Registro de Aulas</h2>
      <div class="d-flex col-10">
        <div class="card card-body" v-if="this.user.tipo_usuario == 2">
          <div class="d-flex">
            <div class="col-4" style="margin-left: -15px;">
              <label>Curso</label>
              <b-form-select v-model="selectedCourse" :options="courseName" @change="onChange()">
              </b-form-select>
            </div>
            <div class="col-4">
              <label>Matéria</label>
              <b-form-select v-model="selectedSubject" @change="onChange()">
                <option v-for="(sub, index) in subjectName" :key="index" :value="subjectKey[index]">
                  {{ sub }}</option>
              </b-form-select>
            </div>
            <div class="col-4">
              <label>Turma</label>
              <b-form-select v-model="selectedClass" @change="onChange()">
                <option v-for="(clas, index) in className" :key="index" :value="classKey[index]">
                  {{ clas }}</option>
              </b-form-select>
            </div>
          </div>
          <div class="row py-3" v-for="(res, index) in registers" :key="index">
            <div class="col-3">
              <span>
                <strong>Data: </strong>{{ res.registroAula.dt_aula }}
              </span>
            </div>
            <div class="col-9">
              <span>
                <strong>Descrição: </strong>{{ res.registroAula.descricao_aula }}
              </span>
            </div>
            <div class="col-10">
              <span>
                <strong>Curso: </strong>{{ res.curso.nome_curso }}
              </span>
            </div>
            <div class="col-6">
              <span>
                <strong>Matéria: </strong>{{ res.materia.descricao_materia }}
              </span>
            </div>
            <div class="col-6">
              <span>
                <strong>Turma: </strong>{{ res.turma.descricao_turma }}
              </span>
            </div>

            <b-button v-b-modal.modalUpdate @click="selectedRaKey = res.registroAula.key" class="btn btn-outline mt-3" style="width: 20%;margin-left: auto;margin-right: auto;">
              Atualizar Registro
            </b-button>
          </div>
          <div class="pt-4" v-if="Object.keys(registers).length == 0">
            Não há registros</div>

          <div v-if="this.user.tipo_usuario == 2" class="d-flex justify-content-end mt-3">
            <b-button v-b-modal.modal class="btn btn-outline" style="width: 20%">
              Cadastrar Registro
            </b-button>
          </div>
        </div>
        <div class="card card-body" v-if="this.user.tipo_usuario == 1">
          Você não é um professor!</div>
      </div>
    </div>

    <div>
      <b-modal id="modal" title="Cadastrar Registro de Aula" hide-footer>
        <div class="form-row">
          <div class="form-group col-12">
            <label>Curso</label>
            <b-form-select v-model="selectedCourse" :options="courseName">
            </b-form-select>
          </div>

          <div class="form-group col-12">
            <label>Matéria</label>
            <b-form-select v-model="selectedSubject">
              <option v-for="(sub, index) in subjectName" :key="index" :value="subjectKey[index]">
                {{ sub }}</option>
            </b-form-select>
          </div>

          <div class="form-group col-12">
            <label>Turma</label>
            <b-form-select v-model="selectedClass">
              <option v-for="(clas, index) in className" :key="index" :value="classKey[index]">
                {{ clas }}</option>
            </b-form-select>
          </div>


          <div class="form-group col-6">
            <label>Data</label>
            <input type="date" class="form-control" name="date" autocomplete="off" v-model="date" />
          </div>

          <div class="form-group col-12">
            <label>Descrição</label>
            <textarea type="text" class="form-control" name="description" v-model="description"></textarea>
          </div>
        </div>

        <footer>
          <b-button type="button" class="btn-outline d-flex justify-content-center align-items-center mt-3"
            @click="postClassRegister()">
            Cadastrar
          </b-button>
        </footer>
      </b-modal>
    </div>

    <div>
      <b-modal id="modalUpdate" title="Atualizar Registro de Aula" hide-footer>
        <div class="form-group col-6">
          <label>Data</label>
          <input type="date" class="form-control" name="date" autocomplete="off" v-model="date" />
        </div>

        <div class="form-group col-12">
          <label>Descrição</label>
          <textarea type="text" class="form-control" name="description" v-model="description"></textarea>
        </div>

        <footer>
          <b-button type="button" class="btn-outline d-flex justify-content-center align-items-center mt-3"
            @click="putClassRegister()">
            Atualizar
          </b-button>
        </footer>
      </b-modal>
    </div>

  </div>
</template>

<script>

import axios from 'axios';

export default {
  data() {
    return {
      hasBond: true,
      token: "",
      user: {},
      response: "",
      loader: "spinner",
      courses: [],
      subjects: {},
      classes: {},
      selectedCourse: "",
      selectedSubject: "",
      selectedClass: "",
      date: "",
      description: "",
      loading: true,
      courseName: [],
      subjectName: [],
      subjectKey: [],
      className: [],
      classKey: [],
      registers: [],
      selectedRaKey: '',
      modalShow: false
    }
  },
  mounted() {
    this.token = localStorage.getItem('token');
    this.getUser();
  },
  methods: {
    goToBonds() {
      this.$router.push({ name: 'bonds' });
    },
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
    async getBonds() {
      let home = this.$refs.home;
      let loader = this.$loading.show(
        {
          container: home,
          loader: this.loader,
        }
      );
      this.response = axios
        .get('http://localhost:8000/VinculosUsuario?userType=' + this.user.tipo_usuario + '&token=' + this.token)
      var info = await this.getResponse();
      if (Object.getPrototypeOf(info) == "Error") {
        if (info.response.status === 404) {
          this.hasBond = false;
          setTimeout(() => {
            this.loading = false;
            loader.hide();
          }, 1000);
          return;
        }
      } else {
        info.data.forEach(el => {
          this.courses = el.curso;
          this.subjects = el.materias;
          this.classes = el.turmas;
        });
        this.courses.forEach(el => {
          this.courseName.push(el.nome_curso);
        });
        this.subjects.forEach(el => {
          this.subjectName.push(el.descricao_materia);
          this.subjectKey.push(el.key);
        });
        this.classes.forEach(el => {
          this.className.push(el.descricao_turma);
          this.classKey.push(el.key);
        });
        this.getAllClassRegister();
        setTimeout(() => {
          this.loading = false;
          loader.hide();
        }, 1000);
      }

    },
    async postClassRegister() {
      // var date = this.date.split('-')
      // this.date = date[2] + '/' + date[1] + '/' + date[0];
      var data = {
        dt_aula: this.date, descricao_aula: this.description, curso: this.selectedCourse, turma: this.selectedClass,
        materia: this.selectedSubject
      }
      this.response = axios.post('http://localhost:8000/CriarRegistroAula?token=' + this.token, data)
      this.getAllClassRegister();
    },
    onChange() {
      this.getAllClassRegister();
    },

    async putClassRegister() {
      var data = {
        key: this.selectedRaKey,
        dt_aula: this.date,
        descricao_aula: this.description
      }
      this.response = axios.put('http://localhost:8000/AtualizarRegistroAula?token=' + this.token, data);
      this.getAllClassRegister();
    },

    async getAllClassRegister() {
      this.registers = [];
      this.response = axios
        .get('http://localhost:8000/RegistroAula?token=' + this.token + '&curso=' + this.selectedCourse + '&turma=' + this.selectedClass + '&materia=' + this.selectedSubject);
      var info = await this.getResponse()
      info.data.forEach(el => {
        this.registers.push(el);
      });
    },
  }
}
</script>

<style scoped>
.bg-img {
  background-image: url('../assets/couch.webp');
  background-repeat: no-repeat;
  background-position: center;
}

.card-initial {
  background-color: #F7F7F7;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.card-initial img {
  width: 250px;
}

.card-initial span {
  color: #8B8787;
}

h5,
h6 {
  color: #777777;
}

.btn-without-bond {
  background: #f5f5f5 !important;
}

.btn-without-bond:hover {
  color: #f5f5f5
}

.btn-outline {
  background: #fff;
  color: #274F70 !important;
  border-color: #274F70 !important;
  border-radius: 11px !important;
  width: 30%;
}

.btn-outline:hover {
  background: #274F70 !important;
  color: #fff !important;
}

.btn-secondary:focus {
  background-color: #fff;
}

.form-control {
  border-radius: 11px;
  padding: 20px;
}
</style>