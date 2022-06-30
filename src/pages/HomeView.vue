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
        <button class="btn btn-outline" @click="goToBonds()">
          Vincular-se
        </button>
      </div>
    </div>
    <div class="d-flex flex-column align-items-center mt-5" v-if="hasBond">
      <h2>Registro de Aulas</h2>
      <div class="d-flex col-10">
        <div class="card card-body">
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      hasBond: false
    }
  },
  methods: {
    goToBonds() {
      this.$router.push({ name: 'bonds' });
    }
  }
}
</script>

<style>
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

h5, h6 {
    color: #777777;
}

.btn-outline {
    background: #F5F5F5;
    color: #274F70 !important;
    border-color: #274F70 !important;
    border-radius: 11px !important;
    width: 30%;
}

.btn-outline:hover {
    background: #274F70 !important; 
    color: #F5F5F5 !important;
}
</style>