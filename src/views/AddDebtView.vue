<template>
  <div class="add-debt">
    <section class="hero is-info">
      <div class="hero-body">
        <p class="title"> Debts</p>

        <p class="subtitle">Add new Debts</p>
      </div>
    </section>

    <div class="container">

      <div class="columns">
        <div class="column is-three-fifths">
          <b-field label="Email">
            <b-input type="email" maxlength="50" v-model="email"></b-input>
          </b-field>
        </div>

        <div class="column is-pulled-left" id="button-section">
          <b-button type="is-info" @click="validEmail">Valid User</b-button>
        </div>
      </div>

      <add-debt-form :email="email" :cardsByUser="cardsByUser" :userName="userName"  v-if="enable"/>

    </div>

  </div>
</template>

<style>
 .hero{
   margin-bottom: 2%;
 }

 #button-section {
   padding-top: 3.6%;
 }
</style>

<script>
import AddDebtForm from "@/components/FormDebtComponent";
import UserService from "../services/UserService"

export default {
  components: {AddDebtForm},
  data() {
    return {
      email: '',
      enable: false,
      userName: '',
      cardsByUser: []
    }
  },
  methods: {
    validEmail() {
      if(this.email !== '') {
        UserService.userExist(this.email)
        .then(response => {
          this.userName = response.data.responseObject.name;
          // this.$buefy.notification.open('Clicked!!');
           UserService.getCardsByUser(this.email)
          .then(response => {
            this.cardsByUser = response.data.responseObject;
            this.enable = true;
          })
          .catch(err => {
            this.$buefy.toast.open({
              duration: 5000,
              message: 'Error no pude obtener las tarjetas del usuario ' + JSON.stringify(err),
              position: 'is-bottom',
              type: 'is-danger'
            })
          })
        })
        .catch(err => {
          this.$buefy.toast.open({
            duration: 5000,
            message: 'El usuario no pudo ser identifficado! ' + JSON.stringify(err),
            position: 'is-bottom',
            type: 'is-danger'
          })
        })
      } else {
        this.$buefy.toast.open({
          duration: 5000,
          message: 'El Email no puede estar vacio',
          position: 'is-bottom',
          type: 'is-danger'
        })
      }

    }
  }
}
</script>
