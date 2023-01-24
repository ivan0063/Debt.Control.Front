<template>
  <div class="valid-user columns">
    <div class="column is-three-fifths">
      <b-field label="Email">
        <b-input type="email" maxlength="50" v-model="email"></b-input>
      </b-field>
    </div>

    <div class="column is-pulled-left" id="button-section">
      <b-button type="is-info" @click="validEmail">Valid User</b-button>
    </div>
  </div>
</template>

<style>
  #button-section {
    padding-top: 3.6%;
  }
</style>

<script>
import UserService from "@/services/UserService";

export default {
  name: 'ValidUser',
  props: {
    bindingEmail: String
  },
  data() {
    return {
      email: this.bindingEmail
    }
  },
  methods: {
    validEmail() {
      if(this.email !== '') {
        UserService.userExist(this.email)
            .then(response => this.$emit('UserFoundEvent', response.data.responseObject))
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