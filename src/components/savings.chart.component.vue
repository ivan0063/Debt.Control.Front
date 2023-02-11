<template>
  <div class="savings-chart">
    <ApexChart type="line" :options="chartOptions" :series="series"></ApexChart>
  </div>
</template>

<script>
import UserService from "@/services/UserService";

export default {
  name: 'SavingsChart',
  async created() {
    let salaryUpdate = (await UserService.getSavingsUpdates('jimm0063@gmail.com')).data.responseObject;
    this.chartOptions.xaxis.categories = salaryUpdate.map(salaryUpdate => salaryUpdate.updateDate)
        .map(updateStr => new Date(updateStr)).map(date => date.getFullYear)
    let seriesData = salaryUpdate.map(salaryUpdate => salaryUpdate.newSavingsValue);

    let serie = {
      name: 'Salary Update',
      data: seriesData
    }
    this.series.push(serie);
  },
  data() {
    return {
      chartOptions: {
        chart: {
          id: 'salary update',
        },
        xaxis: {
          categories: []
        },
      },
      series: []
    }
  }
}
</script>