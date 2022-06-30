<template>
  <div>
    <div>
      <b-navbar toggleable="lg" type="white" class="nav-up">
        <b-navbar-brand href="/">
          <img src="../assets/logo_white.png" alt="" style="width: 28vh;">
        </b-navbar-brand>
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
        <b-collapse id="nav-collapse" is-nav>

          <b-navbar-nav class="ml-auto">
            <b-navbar-brand href="/" right>
              <span class="p-2" style="color:white;font-size: 16px">Registro de Aulas</span>
            </b-navbar-brand>
            <b-navbar-brand href="/bonds" right>
              <span class="p-2" style="color:white;font-size: 16px">Vínculos</span>
            </b-navbar-brand>

            <b-nav-item-dropdown right>
              <template #button-content>
                <span>Minha Conta</span>
              </template>
              <b-dropdown-item href="/profile">Meus dados</b-dropdown-item>
              <b-dropdown-item @click="logout()">Sair
              </b-dropdown-item>
            </b-nav-item-dropdown>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </div>

    <router-view></router-view>

    <footer class="navbar fixed-bottom d-flex justify-content-center">
      <span class="p-1"><small>Copyright &amp; 2022 NovoSofa. All Rights Reserved.</small></span>
    </footer>
  </div>

</template>

<script>

export default {
  data() {
    return {
    }
  },
  methods: {
    logout() {
      localStorage.removeItem('token');
      localStorage.removeItem('usuario_ref');
      this.$router.push({ name: 'login' });
    }
  }
}
</script>

<style scoped>
>>>nav ul {
  top: 125%;
}

>>>.navbar-nav .nav-link {
  color: white;
}

.navbar {
  background: #d5d5d5;
}

.nav-up {
  background: #43C6AC;
  /* fallback for old browsers */
  background: -webkit-linear-gradient(to left, #191654, #43C6AC);
  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to left, #191654, #43C6AC);
  /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}

.cursor-pointer {
  cursor: pointer;
}
</style>