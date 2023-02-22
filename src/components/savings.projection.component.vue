<template>
  <div class="savings-projection-template">
    <div class="columns size-financial-detail">
      <div class="column">

        <div class="card">
          <div class="card-content">
            <div class="content">
              <p class="black">Salario:</p> {{ salary | toCurrency }}
            </div>
          </div>
        </div>

        <div class="card">
          <div class="card-content">
            <div class="content">
              <p class="black">Ahorro Actual:</p> {{ currentSavings  | toCurrency }}
            </div>
          </div>
        </div>

        <b-collapse
            class="card"
            animation="slide"
            :open="false"
            @open="fixedExpensesOpenEvent"
            :aria-id="'contentIdForA11y5-' + 0">
          <template #trigger="props">
            <div
                class="card-header"
                role="button"
                :aria-controls="'contentIdForA11y5-' + 0"
                :aria-expanded="props.open">
              <p class="card-header-title">
                Gastos Fijos: {{ fixedMonthlyPayment | toCurrency }}
              </p>
              <a class="card-header-icon">
                <b-icon :icon="props.open ? 'menu-down' : 'menu-up'"/>
              </a>
            </div>
          </template>
          <div class="card-content">
            <div class="content">
              <b-table :data="fixedExpenses" :columns="fixedExpensesColumn"></b-table>
            </div>
          </div>
        </b-collapse>

      </div>
    </div>

    <div class="card">
      <div class="card-content">
        <div class="content">

          <b-table
              :data="savingsProjection"
              ref="table"
              detailed
              detail-key="month"
              @details-open="(row) => $buefy.toast.open(`Expanded ${row.month}`)"
              :show-detail-icon="true">

            <b-table-column field="month" label="MES" numeric v-slot="props">
              {{ props.row.month }}
            </b-table-column>

            <b-table-column field="monthlyDebtPayment" label="Pago de Deudas del mes" sortable v-slot="props">
              {{ props.row.monthlyDebtPayment | toCurrency }}
            </b-table-column>

            <b-table-column field="extraMonthSaving" label="Ahorro del mes" sortable v-slot="props">
              {{ props.row.extraMonthSaving | toCurrency }}
            </b-table-column>

            <b-table-column field="savingsTotal" label="Total Ahorrado del Mes" sortable centered v-slot="props">
                <span class="tag is-success has-text-weight-bold" style="font-size: 1.2em">
                    {{ props.row.savingsTotal | toCurrency}}
                </span>
            </b-table-column>

            <template #detail="props">
              <ul class="is-card-list">
                <li class="has-text-weight-bold">BANAMEX: {{ props.row.debts['BANAMEX'] }}</li>
                <li class="has-text-weight-bold">HSBC: {{ props.row.debts['HSBC'] }}</li>
                <li class="has-text-weight-bold">BBVA: {{ props.row.debts['BBVA'] }}</li>
                <li class="has-text-weight-bold">PALACIO: {{ props.row.debts['PALACIO'] }}</li>
                <li class="has-text-weight-bold">LIVERPOOL: {{ props.row.debts['LIVERPOOL'] }}</li>
                <li class="has-text-weight-bold">MERCADO PAGO: {{ props.row.debts['MERCADO_PAGO'] }}</li>
                <li class="has-text-weight-bold">RAPPI: {{ props.row.debts['RAPPI'] }}</li>
              </ul>
            </template>
          </b-table>


        </div>
      </div>
    </div>

  </div>
</template>

<style>
.size-financial-detail {
  width: 50%;
}

.black {
  font-weight: bold;
  size: 5em;
}
</style>

<script>
import CatalogService from "@/services/CatalogService";
import UserService from "@/services/UserService";

export default {
  name: 'SavingsProjection',
  props: {
    savingsProjection: Object,
    email: String
  },
  async created() {
    let userFinancialStatus = (await UserService.getFinancialStatus(this.email)).data.responseObject;
    this.fixedExpenses = (await CatalogService.getFixedExpensesByUser(this.email)).data.responseObject;
    this.salary = userFinancialStatus.incomes.find(element => element.incomeName === "Sueldo").Amount;
    this.currentSavings = userFinancialStatus.incomes.find(element => element.incomeName === "Ahorro").Amount;
    this.fixedExpenses.forEach(elem => this.fixedMonthlyPayment += elem.amount);


    console.log(this.fixedMonthlyPayment)
    console.log(this.fixedExpenses)
  },
  data() {
    return {
      fixedExpensesColumn: [
        {
          field: 'expenseName',
          label: 'Nombre del gasto',
        },
        {
          field: 'company',
          label: 'Compañia',
        },
        {
          field: 'amount',
          label: 'Cantidad a pagar',
        },
        {
          field: 'paymentDate',
          label: 'Dia de pago',
        }
      ],
      fixedExpenses: [],
      defaultOpenedDetails: [1],
      showDetailIcon: true,
      useTransition: true,
      salary: 0.0,
      currentSavings: 0.0,
      fixedMonthlyPayment: 0.0
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
    fixedExpensesOpenEvent() {}
  }
}
</script>