<template>
  <div class="do-card-payment-component">
    <valid-user :binding-email="email" @UserFoundEvent="userFound($event)"/>

    <div class="columns" v-if="enableCardSelection">
      <div class="column">
        <b-field label="Selecciona la tarjeta">
          <b-select placeholder="Selecciona una tarjeta" v-model="cardNickname" @input="cardSelected">
            <option
                v-for="(userCard, index) in cardsByUser"
                :key="index"
                :value='userCard.nickname'>{{ userCard.nickname }}
            </option>
          </b-select>
        </b-field>
      </div>
    </div>

    <div class="columns" v-if="enablePaymentSection">
      <div class="column is-four-fifths">
        <div class="card padding">
          <div class="card-content">
            <div class="content">
              <b-table
                  :striped="true"
                  :hoverable="true"
                  :sticky-header="true"
                  :data="debtsData"
                  :columns="tableColumns"
              />

              <br>
              <p class="is-pulled-right has-text-weight-bold">
                Monto Total:  {{ monthPayment }}
              </p>

            </div>
          </div>
        </div>
      </div>

      <div class="column">
        <b-button @click="doPayment" v-if="buttonActive"  type="is-success">Hacer Pago</b-button>
      </div>
    </div>

    <b-modal v-model="showModal" :width="640" scroll="keep" @close="showModal = false">
      <div class="card">
        <div class="card-content">
          <div class="content">
            <p class="title">Pago aplicado a la tarjeta Tarjeta: {{cardNickname}}</p> <br>
            <p class="title"></p>

            <b-table
                :striped="true"
                :hoverable="true"
                :sticky-header="true"
                :data="updatedDebts"
                :columns="tableColumns"
            />

            <b-button class="is-pulled-right" type="is-danger" @click="showModal = false">Cerar</b-button>
          </div>
        </div>
      </div>
    </b-modal>
  </div>
</template>

<style>
 .padding {
   padding-top: 5%;
   padding-bottom: 5%;
 }
</style>

<script>
import ValidUser from "@/components/valid.user.component";
import UserService from "@/services/UserService";
import DebtService from "@/services/DebtService";
import CardService from "@/services/CardService";

export default {
  name: 'DoCardPayment',
  components: {ValidUser},
  data() {
    return {
      email: '',
      cardNickname: '',
      enablePaymentSection: false,
      enableCardSelection: false,
      showModal: false,
      buttonActive: true,
      tableColumns: [
        {
          field: 'debtName',
          label: 'Nombre',
          visible: true
        },
        {
          field: 'installmentsOf',
          label: 'Meses Sin Intereses',
          visible: true
        },
        {
          field: 'amountPaid',
          label: 'Monto Pagado',
          visible: true
        },
        {
          field: 'monthlyPayment',
          label: 'Pago Mensual',
          visible: true
        }
      ],
      cardsByUser: [],
      debtsData: [],
      updatedDebts: [],
      monthPayment: 0.0
    }
  },
  methods: {
    userFound(user) {
      this.email = user.email
      UserService.getCardsByUser(this.email)
          .then(response => {
            this.enableCardSelection = true;
            this.cardsByUser = response.data.responseObject;
          })
          .catch(err => {
            console.error(JSON.stringify(err));
            this.$buefy.toast.open({
              duration: 5000,
              message: 'Error no pude obtener las deudas asociadas a la tarjeta :S ',
              position: 'is-bottom',
              type: 'is-danger'
            })
          })
    },
    cardSelected() {
      this.buttonActive = true;
      DebtService.getDebtsByCard(this.email, this.cardNickname)
          .then(response => {
            console.log("Data debts: ", response.data);
            this.enablePaymentSection = true;
            this.debtsData = response.data.responseObject.debts;
            this.monthPayment = response.data.responseObject.monthlyPayment;
            if(this.debtsData.length === 0) this.buttonActive = false;
          })
          .catch(err => {
            console.error(JSON.stringify(err));
            this.$buefy.toast.open({
              duration: 5000,
              message: 'Error al obtener las deudas asociadas a la tarjeta :S',
              position: 'is-bottom',
              type: 'is-danger'
            })
          })
    },
    doPayment() {
      this.$buefy.dialog.confirm({
        message: 'Estas seguro que quieres efectuar el pago?',
        onConfirm: () => {
          CardService.doCardPayment(this.email, this.cardNickname)
              .then(response => {
                this.enableCardSelection = false;
                this.enablePaymentSection = false;
                this.cardsByUser = [];
                this.debtsData = [];
                this.showModal = true;
                this.updatedDebts = response.data.responseObject;
              })
          this.$buefy.toast.open('Pago realizado exitosamente!')
        }
      })
    }


  }
}
</script>