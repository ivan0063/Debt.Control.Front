<template>
  <div class="card-debt-component">
    <div class="columns">
    </div>
  </div>
</template>

<script>
export default {
  name: 'CardDebtProjection',
  props: {
    email: String,
    cardDebtsProjection: Object
  },
  data() {
    return {

    }
  },
  filters: {
    toCurrency(value) {
      if (typeof value !== "number") {
        return value;
      }
      let formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
      });
      return formatter.format(value);
    }
  },
  methods: {

  }
}
</script>