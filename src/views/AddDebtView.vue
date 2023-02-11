<template>
  <div class="add-debt">
    <section class="hero is-info">
      <div class="hero-body">
        <p class="title"> Debts</p>

        <p class="subtitle">Add new Debts</p>
      </div>
    </section>

    <div class="container">
      <valid-user :binding-email="email" @UserFoundEvent="getAllCardsByUser($event)"/>

      <add-debt-form :email="email" :cardsByUser="cardsByUser" :userName="userName"  v-if="enable"/>
    </div>

  </div>
</template>

<style>
 .hero{
   margin-bottom: 2%;
 }
</style>

<script>
import AddDebtForm from "@/components/form.add.debt.component";
import ValidUser from "@/components/valid.user.component";
import UserService from "../services/UserService"

export default {
  components: {ValidUser, AddDebtForm},
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

    },
    getAllCardsByUser(userInfo) {
      console.log(userInfo);
      this.userName = userInfo.name;
      this.email = userInfo.email;
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
    }
  }
}
</script>
