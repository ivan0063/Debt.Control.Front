<template>
  <div class="view-payments-made">
    <section class="hero is-success">
      <div class="hero-body">
        <p class="title"> Pagos</p>

        <p class="subtitle">Pagos Realizados</p>
      </div>
    </section>
    <br>

    <div class="container">
      <valid-user :binding-email="email" @UserFoundEvent="userFound" />

      <b-table :striped="true" :sticky-header="true" :columns="columns" :data="paymentsMade" v-if="showTable" />
    </div>
  </div>
</template>

<script>
import ValidUser from "@/components/valid.user.component";
import PaymentService from "@/services/payment.service";

export default {
  name: 'ViewPaymentsMade',
  components: {ValidUser},
  data() {
    return {
      email: '',
      showTable: false,
      paymentsMade: [],
      columns: [
        {
          field: 'nickname',
          label: 'Card Nickname',
          visible: true
        },
        {
          field: 'cutOffDay',
          label: 'Dia de Corte',
          visible: true
        },
        {
          field: 'paymentsMade',
          label: 'Fecha de Pagos',
          visible: true
        }
      ]
    }
  },
  methods: {
    async userFound(usr) {
      console.log(usr)
      this.paymentsMade = (await PaymentService.findAllPaymentsMade(usr.email)).data.responseObject
      this.showTable = true;
      console.log(this.paymentsMade)
    }
  }
}
</script>