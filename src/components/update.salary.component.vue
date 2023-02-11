<template>
  <div class="modal-update component">
    <div class="is-center">
      <p class="title">Actualizar Salario</p>
      <hr>
    </div>

    <div class="card-content">
      <div class="columns">
        <div class="column is-two-fifths">
          <b-field label="Cantidad Actualizada">
            <b-input type="input" v-model="updateAmount"></b-input>
          </b-field>
        </div>
      </div>

      <div class="columns">
        <div class="column">
          <b-field label="Descripcion">
            <b-input maxlength="200" type="textarea" v-model="description"></b-input>
          </b-field>
        </div>
      </div>

      <div class="columns">
        <div class="column">
          <b-button type="is-danger" @click="updateSavings">Actualizar Salario</b-button>
        </div>
      </div>

    </div>

  </div>
</template>

<script>
import UserService from "@/services/UserService";

export default {
  name: 'UpdateSalaryForm',
  props: {
    modalControl: Boolean,
    email: String
  },
  data() {
    return {
      updateAmount: 0.0,
      description: ''
    }
  },
  methods: {
    updateSavings() {
      if(this.updateAmount === 0.0 && this.description === '') {
        this.$buefy.toast.open({
          duration: 5000,
          message: 'Debes llenar todos los valores correctamente!',
          position: 'is-bottom',
          type: 'is-danger'
        })
        return;
      }

      UserService.updateSalary(this.email, this.updateAmount, this.description)
      .then(resp => {
        console.log(resp)
        this.$buefy.toast.open({
          duration: 5000,
          message: 'Se actualizo el salario!',
          position: 'is-bottom',
          type: 'is-success'
        })
        this.$emit('closeModalEvent', false);
      })
      .catch(err => {
        console.error(err);
        this.$buefy.toast.open({
          duration: 5000,
          message: 'ERROR no pude actualizar los ahorros intenta mas tarde...',
          position: 'is-bottom',
          type: 'is-danger'
        })
      })
      this.updateAmount = 0.0;
      this.description = '';
    }
  }

}
</script>