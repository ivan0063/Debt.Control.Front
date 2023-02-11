<template>
  <div class="savings-projection-template">
    <div class="columns size-financial-detail">
      <div class="column">

        <div class="card">
          <div class="card-content">
            <div class="content">
              <p class="black">Salario:</p> {{ savingsProjection.salary  | toCurrency }}
            </div>
          </div>
        </div>

        <div class="card">
          <div class="card-content">
            <div class="content">
              <p class="black">Ahorro Actual:</p> {{ savingsProjection.currentSavings  | toCurrency }}
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
                Gastos Fijos: {{ savingsProjection.fixedMonthlyPayment | toCurrency }}
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
              :striped="true"
              :hoverable="true"
              :sticky-header="true"
              :data="savingsProjection.monthRows">
            <b-table-column v-for="(column, index) in projectionColumns"
                            :key="index"
                            :label="column.label"
                            :visible="column.visible"
                            :searchable="column.searchable"
                            v-bind="column">
              <template v-slot="props">
                {{ props.row[column.field] | toCurrency}}
              </template>
            </b-table-column>
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

export default {
  name: 'SavingsProjection',
  props: {
    savingsProjection: Object,
    email: String
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
      projectionColumns: [
        {
          field: 'month',
          label: 'Mes',
        },
        {
          field: 'monthlyDebtPayment',
          label: 'Pago de Deudas del mes',
        },
        {
          field: 'extraMonthSaving',
          label: 'Ahorro del mes',
        },
        {
          field: 'savingsTotal',
          label: 'Total Ahorrado del Mes',
        }
      ],
      fixedExpenses: []
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
    fixedExpensesOpenEvent() {
      CatalogService.getFixedExpensesByUser(this.email)
          .then(response => {
            console.log("fixed-expenses", response.data)
            this.fixedExpenses = response.data.responseObject;
          })
          .catch(err => {
            console.log("fixed-expenses error", err);
            this.$buefy.toast.open({
              duration: 5000,
              message: 'No pude obtener los gastos fijos del usuario',
              position: 'is-bottom',
              type: 'is-danger'
            })
          })
    }
  }
}
</script>