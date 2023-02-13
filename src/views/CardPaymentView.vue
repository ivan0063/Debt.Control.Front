<template>
  <div class="card-payment-component">

    <section class="hero is-success">
      <div class="hero-body">
        <p class="title"> Pagos</p>

        <p class="subtitle">Hacer un pago</p>
      </div>
    </section>

    <section class="container">
      <do-card-payment-component />
    </section>

  </div>
</template>

<style>
  .hero{
    margin-bottom: 2%;
  }
</style>

<script>
import DoCardPaymentComponent from "@/components/do.card.payment.component";

export default {
  components: {DoCardPaymentComponent},
}
</script>