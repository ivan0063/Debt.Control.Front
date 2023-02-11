<template>
  <div class="savings-chart">
    <ApexChart type="line" :options="chartOptions" :series="series"></ApexChart>
  </div>
</template>

<script>
import UserService from "@/services/UserService";

export default {
  name: 'SalaryChart',
  async created() {
    let salaryUpdated = (await UserService.getSalaryUpdates('jimm0063@gmail.com')).data.responseObject;
    this.chartOptions.xaxis.categories = salaryUpdated.map(salaryUpdate => salaryUpdate.updateDate)
        .map(updateStr => new Date(updateStr)).map(date => date.getFullYear)
    let seriesData = salaryUpdated.map(salaryUpdate => salaryUpdate.newSalaryValue);

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