<template>
  <div>
    <div>
      <b-sidebar id="sidebar-1" title="NovoSofa" shadow>
        <b-list-group>
          <b-list-group-item href="#">Cursos</b-list-group-item>
          <b-list-group-item href="#">Turmas</b-list-group-item>
          <b-list-group-item href="#">Matérias</b-list-group-item>
        </b-list-group>
      </b-sidebar>
    </div>
    <div>
      <b-navbar toggleable="lg" type="dark" variant="info">
        <b-navbar-brand href="#">NovoSofa</b-navbar-brand>
        <button class="btn sidebar-button" v-b-toggle.sidebar-1>
          <b-icon icon="list" aria-hidden="true"></b-icon>
        </button>
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav class="ml-auto">
            <b-nav-item-dropdown right>
              <template #button-content>
                <em>Perfil</em>
              </template>
              <b-dropdown-item href="#">Minha Conta</b-dropdown-item>
              
              <b-dropdown-item href="/login">Sair
                <!-- <router-link :to="'/login'">Sair</router-link> -->
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

// import { DropdownPlugin } from 'bootstrap-vue'
// Vue.use(DropdownPlugin)
export default {
  data() {
    return {
      // sidebar: true,
      // mini: false,
      // items: [
      //   { title: "Home", icon: "mdi-account", to: "/" },
      //   { title: "Perfil", icon: "mdi-account-cog", to: "/perfil" },
      //   { title: "Sair", icon: "mdi-exit-to-app", to: "/login" },
      // ],
    }
  },
}
</script>

<style>
.sidebar-button,
.sidebar-button:hover {
  color: #fff;
}

.navbar {
  background: #d5d5d5;
}
</style>