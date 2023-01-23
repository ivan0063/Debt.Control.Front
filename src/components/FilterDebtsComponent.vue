<template>
  <div class="columns">
    <div class="column">
      <b-field label="Filtrar deudas por:">
        <b-select placeholder="Selecciona el tipo de filtro" v-model="filterType" >
          <option value='user'>Usuario</option>
          <option value='card'>Tarjeta</option>
          <option value='ended'>Terminadas</option>
        </b-select>
      </b-field>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FilterDebtsComponent',
  props: {

  },
  data() {
    return {
      filterType: String
    }
  }
}
</script>