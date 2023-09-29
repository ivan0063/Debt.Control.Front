<template>
  <div class="user-financial-status-view">
    <b-loading v-model="loaderFlag"></b-loading>

    <section class="hero is-link">
      <div class="hero-body">
        <p class="title">Inicio</p>

        <p class="subtitle">Estatus Financiero</p>
      </div>
    </section>

    <div class="container">
      <div class="tile is-ancestor">
        <div class="tile is-vertical is-8">
          <div class="tile">
            <div class="tile is-parent is-vertical">
              <article class="tile is-child notification">
                <p class="title">Ahorros</p>
                <div class="content">
                  <savings-chart/>

                  <section class="is-pulled-right">
                    <br>
                    <b-button
                        type="is-success"
                        @click="openModalSavings">Actualizar Ahorros</b-button>
                  </section>
                </div>
              </article>
              <article class="tile is-child notification">
                <p class="title">Salario</p>
                <div class="content">
                  <salary-chart />

                  <section class="is-pulled-right">
                    <br>
                    <b-button
                        type="is-success"
                        @click="openModalSalary">Actualizar Salario</b-button>
                  </section>
                </div>
              </article>
            </div>
            <div class="tile is-parent has-shadow">
              <article class="tile is-child notification">
                <p class="title">Ingresos</p>
                <hr>
                <div class="content">
                  <div class="content">
                    <b-table
                        :striped="true"
                        :hoverable="true"
                        :sticky-header="true"
                        :data="userFinancialStatus.incomes">
                      <b-table-column v-for="(column, index) in columnsIncomes"
                                      :key="index"
                                      :label="column.label"
                                      v-bind="column">
                        <template v-slot="props">
                          {{ props.row[column.field] | toCurrency }}
                        </template>
                      </b-table-column>
                    </b-table>
                  </div>
                </div>
                <p class="title">Información de Deudas</p>
                <hr>

                <div class="columns">
                  <div class="column subtitle">Usuario:</div>
                  <div class="column has-text-weight-bold">{{ userFinancialStatus.email }}</div>
                </div>

                <div class="columns">
                  <div class="column subtitle">Pago Mensual de Deudas:</div>
                  <div class="column has-text-weight-bold">{{
                      userFinancialStatus.totalMonthlyDebtPayment | toCurrency
                    }}
                  </div>
                </div>

                <div class="columns">
                  <div class="column subtitle">Deuda total:</div>
                  <div class="column has-text-weight-bold">{{ userFinancialStatus.totalDebt | toCurrency }}</div>
                </div>

                <div class="columns">
                  <div class="column subtitle">Deudas en total:</div>
                  <div class="column has-text-weight-bold">{{ userFinancialStatus.debtCount }} deudas</div>
                </div>
              </article>
            </div>
          </div>
        </div>
        <div class="tile is-parent">
          <article class="tile is-child notification">
            <div class="content">
              <p class="title">Pagos para el dia {{ ((new Date()).getDay() <= 15) ? '15' : '30' }}</p>
              <div class="content">
                <hr>
                <div class="content">
                  <b-field v-for="(cardInfo, index) in nextCards" v-bind:key="index">
                    <b-checkbox type="is-danger" :value="true">
                      <b>{{cardInfo.bankName}}</b> on day <b>{{cardInfo.payday}}</b>
                    </b-checkbox>
                  </b-field>
                  <hr>
                  <p class="is-pulled-right">
                    <b>PAGO MESES SIN INTERESES: </b> {{totalPagoMes | toCurrency}}
                  </p>
                </div>
              </div>

              <br><hr>
              <p class="title">Pagos Fijos para el dia {{ ((new Date()).getDay() <= 15) ? '15' : '30' }}</p>
              <div class="content">
                <hr>
                <div class="content">
                  <b-field v-for="(fixedExpense, index) in nextFixedExpenses" v-bind:key="index">
                    <b-checkbox type="is-danger" :value="true">
                      <b>{{fixedExpense.serviceName}}</b> on day <b>{{fixedExpense.payDay}}</b> cost <b>{{fixedExpense.monthlyAmount | toCurrency}}</b>
                    </b-checkbox>
                  </b-field>
                  <hr>
                  <p class="is-pulled-right">
                    <b>PAGO GASTOS FIJOS: </b> {{TotalNextFixedExpenses | toCurrency}}
                  </p>
                </div>
              </div>

              <div class="final_total card is-pulled-left">
                <b>PAGO ESTIMADO DEL MES: </b> {{TotalNextFixedExpenses + totalPagoMes | toCurrency}}
              </div>

            </div>
          </article>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="tile is-ancestor">

        <div class="tile is-4 is-vertical is-parent">
          <div class="tile is-child box notification">
            <div class="content">
              <p class="title">Deudas que terminan este mes</p>
              <div class="content">
                <b-table :striped="true"
                         :hoverable="true"
                         :sticky-header="true"
                         :columns="columnDebtToFinish" :data="debtsAboutToEnd" />
              </div>
            </div>
          </div>
        </div>

        <div class="tile is-parent">
          <div class="tile is-child box notification">
            <div class="content">
              <div class="title">Resumen Pagos de Tarjetas</div>
              <div class="content">
                <b-table
                    :striped="true"
                    :hoverable="true"
                    :sticky-header="true"
                    :data="userFinancialStatus.debtSpecification">
                  <b-table-column v-for="(column, index) in columnDebtSpecs"
                                  :key="index"
                                  :label="column.label"
                                  v-bind="column">
                    <template v-slot="props">
                      {{ props.row[column.field] | toCurrency }}
                    </template>
                  </b-table-column>
                </b-table>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>

    <!--MODALS-->
    <b-modal v-model="modalFlag" width="40%" scroll="keep">
      <div class="card">
        <div class="card-content">
          <div class="content">
            <update-savings-form v-if="modalType === 'savings'" :email="email" @closeModalEvent="closeReload"/>

            <update-salary-form v-if="modalType === 'salary'" :email="email" @closeModalEvent="closeReload" />
          </div>
        </div>
      </div>
    </b-modal>

  </div>
</template>

<style>
.hero {
  margin-bottom: 2%;
}

.final_total {
  padding: 5%;
  margin-top: 20%;
}
</style>

<script>
import UserService from "@/services/UserService";
import ExpenseService from "@/services/ExpenseService"
import DebtService from "@/services/DebtService";

import UpdateSalaryForm from "@/components/update.salary.component";
import UpdateSavingsForm from "@/components/update.savings.component";
import SalaryChart from "@/components/salary.chart.component";
import SavingsChart from "@/components/savings.chart.component";

export default {
  name: 'UserFinancialStatusView',
  components: {SalaryChart, UpdateSavingsForm, UpdateSalaryForm, SavingsChart},
  async created() {
    this.loaderFlag = true;
    // Setting up the data
    this.userFinancialStatus = (await UserService.getFinancialStatus(this.email)).data.responseObject;

    // Setting up the next cards to be paid
    this.nextCards = (await UserService.getNextCardsToBePaid(this.email)).data.responseObject;
    this.totalPagoMes = this.nextCards.map(card => card.msiPayment).reduce((partialSum, a) => partialSum + a, 0);

    let fixedExpensesPerUser = (await ExpenseService.nextFixedExpenses(this.email)).data.responseObject;
    this.nextFixedExpenses = fixedExpensesPerUser.nextFixedExpenses;
    this.TotalNextFixedExpenses = fixedExpensesPerUser.total;

    this.debtsAboutToEnd = (await DebtService.getDebtAboutFinish(this.email)).data.responseObject;

    this.loaderFlag = false;
  },
  data() {
    return {
      loaderFlag: false,
      totalPagoMes: 0,
      nextCards: [],
      columnsIncomes: [
        {
          field: 'incomeName',
          label: 'Nombre',
        },
        {
          field: 'Amount',
          label: 'Monto',
        }
      ],
      columnDebtSpecs: [
        {
          field: 'card_nick_name',
          label: 'Tarjeta',
        },
        {
          field: 'monthly_payment',
          label: 'Pago Mensual',
          sortable: true
        },
        {
          field: 'bank_total_debt',
          label: 'Deuda total',
          sortable: true,
        }
      ],
      columnDebtToFinish: [
        {
          field: 'debtName',
          label: 'Nombre de la Deuda',
        },
        {
          field: 'installmentsOf',
          label: 'Mensualidad',
          sortable: true
        },
        {
          field: 'debtEnd',
          label: 'Deuda Termina',
          sortable: true,
        }
      ],
      userFinancialStatus: {},
      nextFixedExpenses: [],
      TotalNextFixedExpenses: 0.0,
      modalFlag: false,
      email: 'jimm0063@gmail.com',
      modalType: '',
      debtsAboutToEnd: []
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
    openModalSavings() {
      this.modalType = 'savings'
      this.modalFlag = true;
    },
    openModalSalary() {
      this.modalType = 'salary'
      this.modalFlag = true;
    },
    closeReload () {
      this.modalFlag = false;
      location.reload();
    }

  }
}

</script>
