<template>
  <div class="card-payment-component">

    <section class="hero is-success">
      <div class="hero-body">
        <p class="title"> Payments</p>

        <p class="subtitle">Do a card payment</p>
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