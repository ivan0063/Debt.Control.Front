<template>
  <div>
    <b-navbar>
      <template #brand>
        <b-navbar-item tag="router-link" :to="{ path: '/' }">
          <img
              src="https://cdn-icons-png.flaticon.com/512/5116/5116025.png"
              alt="Lightweight UI components for Vue.js based on Bulma"
              class="image is-64x64"
          >
        </b-navbar-item>
      </template>
      <template #start>
        <b-navbar-item href="#">
          <router-link to="/">Home</router-link>
        </b-navbar-item>

        <b-navbar-item href="#">
          <router-link to="/debt/projection">Proyecion de Pagos</router-link>
        </b-navbar-item>

        <b-navbar-dropdown label="Deudas">
          <b-navbar-item href="#">
            <router-link to="/debt/add">Agregar Deudas</router-link>
          </b-navbar-item>
          <b-navbar-item href="#">
            <router-link to="/debt/all">Ver Deudas</router-link>
          </b-navbar-item>
        </b-navbar-dropdown>

        <b-navbar-dropdown label="Pagos">
          <b-navbar-item href="#">
            <router-link to="/payment/do">Hacer Pago</router-link>
          </b-navbar-item>
          <b-navbar-item href="#">
            <router-link to="/payments/made">Ver pagos realizados</router-link>
          </b-navbar-item>
        </b-navbar-dropdown>

      </template>

      <template #end>
        <b-navbar-item tag="div">
          <div class="buttons">
            <a class="button is-light">
              Log in
            </a>
          </div>
        </b-navbar-item>
      </template>
    </b-navbar>

    <router-view/>
  </div>
</template>

<style>
</style>
