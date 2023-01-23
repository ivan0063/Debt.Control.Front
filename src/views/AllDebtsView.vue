<template>
  <div class="add-debt">
    <section class="hero is-info">
      <div class="hero-body">
        <p class="title"> Debts</p>

        <p class="subtitle">All Debts</p>
      </div>
    </section>

    <div class="container">
      <filter-debts-component />
    </div>

  </div>
</template>

<style>
  .hero{
    margin-bottom: 2%;
  }
</style>
<script>
import FilterDebtsComponent from "@/components/FilterDebtsComponent";
export default {
  components: {FilterDebtsComponent}
}
</script>