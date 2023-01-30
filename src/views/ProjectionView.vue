<template>
  <div class="projection-view">
    <b-loading v-model="loaderFlag"></b-loading>

    <section class="hero is-primary">
      <div class="hero-body">
        <p class="title"> Projection</p>

        <p class="subtitle">View a projection module</p>
      </div>
    </section>

    <div class="container">
      <valid-user :binding-email="email" @UserFoundEvent="userEmailFound($event)"/>

      <div class="columns" v-if="showProjectionType">
        <div class="column is-one-third">
          <b-field label="Tipo de proyeccion?">
            <b-select placeholder="Selecciona el tipo de proyecion" v-model="projectionType"
                      @input="projectionTypeSelected">
              <option value='savings'>Proyección de Ahorros</option>
              <option value='card'>Proyección Deudas de Tarjeta</option>
            </b-select>
          </b-field>
        </div>

        <div class="column is-one-third" v-if="showCardSelector">
          <b-field label="Selecciona Tarjeta">
            <b-select placeholder="Tarjeta" v-model="cardNickname" @input="showDateSelector = true">
              <option
                  v-for="(userCard, index) in cardsByUser"
                  :key="index"
                  :value='userCard.nickname'>{{ userCard.nickname }}
              </option>
            </b-select>
          </b-field>
        </div>

        <div class="column is-one-third" v-if="showDateSelector">
          <b-field label="Selecciona la fecha para calcular la proyeccion">
            <b-datepicker
                type="month"
                :show-week-number="showWeekNumber"
                :locale="'es-MX'"
                placeholder="fecha"
                icon="calendar-today"
                :icon-right="dateSelected ? 'close-circle' : ''"
                icon-right-clickable
                @icon-right-click="projectionDateSelected($event)"
                trap-focus
                @input="projectionDateSelected">
            </b-datepicker>
          </b-field>
        </div>
      </div>

      <div class="columns">
        <div class="column" v-if="showSavingsProjection">
          <savings-projection :email="email" :savingsProjection="projectionData"/>
        </div>

        <div class="column" v-if="showCardProjection">
          <card-debt-projection :email="email" :cardDebtsProjection="projectionData" />
        </div>
      </div>

    </div>
  </div>
</template>

<style>
.hero {
  margin-bottom: 2%;
}
</style>

<script>
import ValidUser from "@/components/ValidUserComponent";
import UserService from "@/services/UserService";
import ProjectionService from "@/services/ProjectionService";
import SavingsProjection from "@/components/SavingsProjectionComponent";
import CardDebtProjection from "@/components/CardDebtProjection";

export default {
  components: {CardDebtProjection, SavingsProjection, ValidUser},
  data() {
    return {
      email: '',
      projectionType: '',
      cardNickname: '',
      showWeekNumber: true,
      showProjectionType: false,
      showCardSelector: false,
      showCardProjection: false,
      showDateSelector: false,
      showSavingsProjection: false,
      loaderFlag: false,
      dateSelected: '',
      cardsByUser: [],
      columnsSavingsProjection: [],
      projectionData: {},
    }
  },
  methods: {
    userEmailFound(user) {
      this.email = user.email;
      this.showProjectionType = true;
    },
    projectionTypeSelected() {
      // reset
      this.showCardSelector = false;
      this.showCardProjection = false;
      this.showDateSelector = false;
      this.showSavingsProjection = false;

      // Card Projection
      if (this.projectionType === 'card') {
        UserService.getCardsByUser(this.email)
            .then(response => {
              console.log("User Cards", response.data)
              this.cardsByUser = response.data.responseObject;
              this.showCardSelector = true;
            })
            .catch(err => {
              console.error(err);
              this.$buefy.toast.open({
                duration: 5000,
                message: 'Error no pude obtener las tarjetas del usuario ',
                position: 'is-bottom',
                type: 'is-danger'
              })
            })
      }

      // Savings Projection
      if (this.projectionType === 'savings') {
        //ProjectionService.getSavingsProjection()
        this.showDateSelector = true;
      }


    },
    projectionDateSelected(date) {
      console.log("DATE: ", date)
      this.dateSelected = date.getFullYear() + "-" + ("0" + (date.getMonth() + 1)).slice(-2) + "-" + ("0" + date.getDate()).slice(-2);

      switch (this.projectionType) {
        case"savings":
          this.savingsProjection();
          break;
        case "cards":
          this.cardDebtsProjection();
          break;
      }
    },
    savingsProjection() {
      this.loaderFlag = true;
      ProjectionService.getSavingsProjection({"projectionUntil": this.dateSelected, "email": this.email})
          .then(response => {
            this.showSavingsProjection = true;
            this.projectionData = response.data.responseObject;
          })
          .catch(err => {
            console.error(err);
            this.$buefy.toast.open({
              duration: 5000,
              message: 'Error no pude calcular la proyeccion intenta mas tarde',
              position: 'is-bottom',
              type: 'is-danger'
            })
          })
          .finally(() => this.loaderFlag = false)
    },
    cardDebtsProjection() {
      this.loaderFlag = true;
      ProjectionService.getProjectionByCard({"projectionUntil": this.dateSelected, "email": this.email, "card": this.card })
          .then(response => {
            this.showCardProjection = true;
            this.projectionData = response.data.responseObject;
          })
          .catch(err => {
            console.error(err);
            this.$buefy.toast.open({
              duration: 5000,
              message: 'Error no pude calcular la proyeccion intenta mas tarde',
              position: 'is-bottom',
              type: 'is-danger'
            })
          })
          .finally(() => this.loaderFlag = false)
    }

  }
}
</script>