<template>
  <div style="height: 84vh;">
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
        <div class="card card-body">
          <div class="row">
            <div class="col-2">
              <span>
                <strong>Data: </strong>o
              </span>
            </div>
            <div class="col-10">
              <span>
                <strong>Descrição: </strong>p
              </span>
            </div>
          </div>
          <div class="d-flex justify-content-end mt-3">
            <b-button v-b-modal.modal class="btn btn-outline" style="width: 20%">
              Cadastrar Registro
            </b-button>
          </div>
        </div>
      </div>
    </div>
    <div>
      <b-modal id="modal" title="Cadastrar Registro de Aula" hide-footer>
        <div class="form-row">
          <div class="form-group col-12">
            <b-form-group label="Curso:" v-slot="{ ariaDescribedby }">
              <b-form-checkbox-group :aria-describedby="ariaDescribedby" name="course">
              </b-form-checkbox-group>
            </b-form-group>
          </div>

          <div class="form-group col-6">
            <b-form-group label="Matéria:" v-slot="{ ariaDescribedby }">
              <b-form-checkbox-group :aria-describedby="ariaDescribedby" name="subject">
              </b-form-checkbox-group>
            </b-form-group>
          </div>

          <div class="form-group col-6">
            <b-form-group label="Turma:" v-slot="{ ariaDescribedby }">
              <b-form-checkbox-group :aria-describedby="ariaDescribedby" name="class">
              </b-form-checkbox-group>
            </b-form-group>
          </div>
          <div class="form-group col-6">
            <label>Data</label>
            <input type="date" class="form-control" name="date" autocomplete="off" />
          </div>

          <div class="form-group col-12">
            <label>Descrição</label>
            <textarea type="text" class="form-control" name="description"></textarea>
            <!-- <small v-if="v$.form.username.$error">Campo obrigatório</small> -->
          </div>
        </div>
        <footer>
          <b-button type="button" class="btn-outline d-flex justify-content-center align-items-center mt-3">
            Cadastrar
          </b-button>
        </footer>
      </b-modal>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      hasBond: true
    }
  },
  methods: {
    goToBonds() {
      this.$router.push({ name: 'bonds' });
    }
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