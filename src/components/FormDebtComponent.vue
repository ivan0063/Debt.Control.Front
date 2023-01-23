<template>
  <section>
    <div class="columns">
      <div class="column is-four-fifths">
        <b-field label="Tarjeta">
          <b-select placeholder="Selecciona una tarjeta" v-model="cardNickname">
            <option
                v-for="(userCard, index) in cardsByUser"
                :key="index"
                :value='userCard.nickname'>{{ userCard.nickname }}</option>
          </b-select>
        </b-field>
      </div>

      <div class="column is-half">
        <p class="title">Hola {{userName}}</p>
      </div>
    </div>

    <div class="columns">
      <div class="column is-full">
        <div class="box">
          <div class="card-content">
            <div class="columns">

              <div class="column is-one-third">
                <b-field label="Nombre Deuda">
                  <b-input type="text" v-model="debtObject.debtName"></b-input>
                </b-field>

                <b-field>
                  <b-switch v-model="pendingInstallmentType">Activar modo mensualidad Faltente</b-switch>
                </b-field>

                <b-field label="Mensualidad Actual" v-if="!pendingInstallmentType">
                  <b-input type="number" v-model="debtObject.monthlyInstallment"></b-input>
                </b-field>

                <b-field label="Mensualidades Faltantes" v-if="pendingInstallmentType">
                  <b-input type="number" v-model="debtObject.missingMonthlyPayments"></b-input>
                </b-field>

                <b-field label="Total meses sin intereses">
                  <b-input type="number" v-model="debtObject.debtDuration"></b-input>
                </b-field>

                <b-field label="Pago Mensual">
                  <b-input type="text" v-model="debtObject.monthlyAmount"></b-input>
                </b-field>

                <b-button type="is-danger" @click="addDebtButton">Add Debt</b-button>
              </div>

              <added-debts :addedDebts="addedDebts" :cardNickname="cardNickname" />

            </div>
          </div>
        </div>
      </div>
    </div> <!--columns1-->

    <div class="columns">
      <div class="column is-full">
        <b-button type="is-warning" @click="saveDebt">Guardar las Deudas</b-button>
      </div>
    </div>
  </section>
</template>

<script>
import AddedDebts from "@/components/AddedDebtComponent";
import DebtService from "../services/DebtService";

export default {
  name: 'AddDebtForm',
  components: {AddedDebts},
  props: {
    email: String,
    userName: String,
    cardsByUser: Array
  },
  data() {
    return {
      cardNickname: null,
      debtObject: {
        debtName: '',
        monthlyInstallment: null,
        missingMonthlyPayments: null,
        debtDuration: null,
        monthlyAmount: null
      },
      pendingInstallmentType: false,
      addedDebts: [],
    }
  },
  methods: {
    addDebtButton() {
      if(this.validateDebt(this.debtObject)) {
        this.addedDebts.push(this.debtObject);
        this.debtObject = {
          debtName: '',
          monthlyInstallment: null,
          missingMonthlyPayments: null,
          debtDuration: null,
          monthlyAmount: null
        };
        this.$buefy.notification.open("Deuda Agregada!")
      } else {
        this.$buefy.notification.open("Errores en la informacion de la deuda :S")
      }
    },
    validateDebt(debt) {
      let valid = true;

      if(debt.debtName === '') valid = false;
      if(debt.monthlyInstallment === null && debt.missingMonthlyPayments == null) valid = false;
      if(debt.debtDuration === null) valid = false;
      if(debt.monthlyAmount === null) valid = false;
      if(this.cardNickname === null) valid = false;

      return valid;
    },
    saveDebt() {

      this.$buefy.dialog.confirm({
        message: 'Estas a punto de guardar ' + this.addedDebts.length + ' deudas, Quieres continuar?',
        onConfirm: () => {
          DebtService.addMultiDebt(this.email, this.cardNickname, this.addedDebts)
          .then(response => {
            console.log(response);
            this.debtObject = {
              debtName: '',
              monthlyInstallment: null,
              missingMonthlyPayments: null,
              debtDuration: null,
              monthlyAmount: null
            };
            this.addedDebts = [];
            this.$buefy.toast.open('All debts Added :D')
          })
          .catch(err => this.$buefy.toast.open({
            duration: 5000,
            message: `Something's not good` + JSON.stringify(err),
            position: 'is-bottom',
            type: 'is-danger'
          }))
        }
      })
    }
  }
}
</script>