<template>
  <div class="filter-debts">
    <div class="columns">
      <div class="column is-two-fifths">
        <b-field label="Filtrar deudas por:">
          <b-select placeholder="Selecciona el tipo de filtro" v-model="filterType" @input="filterSelectionMade">
            <option value='user'>Usuario</option>
            <option value='card'>Tarjeta</option>
            <option value='ended'>Terminadas</option>
          </b-select>
        </b-field>
      </div>

      <div class="column is-two-fifths" v-if="cardFilter">
        <b-field label="Selecciona la tarjeta">
          <b-select placeholder="Selecciona una tarjeta" v-model="cardNickname" @input="loadDebtsByCard">
            <option
                v-for="(userCard, index) in cardsByUser"
                :key="index"
                :value='userCard.nickname'>{{ userCard.nickname }}
            </option>
          </b-select>
        </b-field>
      </div>
    </div>

    <div class="columns" v-if="enableTable">
      <div class="column">
        <b-field grouped group-multiline>
          <div v-for="(column, index) in tableColumns"
               :key="index"
               class="control-label">
            <b-checkbox v-model="column.visible">
              {{ column.label }}
            </b-checkbox>
          </div>
        </b-field>

        <b-table
            :striped="true"
            :hoverable="true"
            :sticky-header="true"
            :data="debtsData">
          <b-table-column v-for="(column, index) in tableColumns"
                          :key="index"
                          :label="column.label"
                          :visible="column.visible"
                          :searchable="column.searchable"
                          v-bind="column">
            <template v-if="column.searchable && !column.numeric" #searchable="props">
              <b-input
                  v-model="props.filters[props.column.field]"
                  placeholder="Search..."
                  icon="magnify"
                  size="is-small" />
            </template>
            <template v-slot="props">
              {{ props.row[column.field] | toCurrency }}
            </template>
          </b-table-column>
        </b-table>

      </div>
    </div>
  </div>
</template>

<script>
import UserService from "@/services/UserService";
import DebtService from "@/services/DebtService";

export default {
  name: 'FilterDebtsComponent',
  props: {
    userEmail: String
  },
  data() {
    return {
      tableColumns: [],
      debtsData: [],
      filterType: String,
      enableTable: false,
      // Card Filter
      cardFilter: false,
      cardNickname: null,
      cardsByUser: []
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
    filterSelectionMade() {
      // restarting all flags
      this.tableColumns = [
        {
          field: 'debtName',
          label: 'Nombre',
          searchable: true,
          visible: true
        },
        {
          field: 'totalAmount',
          label: 'Total de la Deuda',
          sortable: true,
          visible: true
        },
        {
          field: 'installmentsOf',
          label: 'Meses Sin Intereses',
          visible: true
        },
        {
          field: 'debtStarted',
          label: 'Deuda Inicio',
          sortable: true,
          visible: true
        },
        {
          field: 'debtEnd',
          label: 'Deuda Fin',
          sortable: true,
          visible: true
        },
        {
          field: 'amountPaid',
          label: 'Monto Pagado',
          visible: true
        },
        {
          field: 'monthlyPayment',
          label: 'Pago Mensual',
          visible: true
        }
      ]
      this.debtsData = [];
      this.enableTable = false
      this.cardFilter = false;
      // looking for the debts
      if (this.filterType === 'card') {
        this.cardFilter = true;
        UserService.getCardsByUser(this.userEmail)
            .then(response => {
              console.log(response.data.responseObject);
              this.cardsByUser = response.data.responseObject;
            })
            .catch(err => {
              console.error(JSON.stringify(err))
              this.$buefy.toast.open({
                duration: 5000,
                message: 'Error no pude obtener las tarjetas del usuario ',
                position: 'is-bottom',
                type: 'is-danger'
              })
            })
      }

      if (this.filterType === 'user') {
        DebtService.getDebtsByUser(this.userEmail)
            .then(response => {
              console.log(response.data.responseObject);
              this.enableTable=true
              this.tableColumns.push({
                field: 'card',
                label: 'Tarjeta',
                sortable: true,
                searchable: true,
                visible: true
              });
              this.tableColumns.push({
                field: 'bank',
                label: 'Banco',
                sortable: true,
                searchable: true,
                visible: true
              });
              response.data.responseObject.banks
                .forEach(bank => {
                  let debts = bank.cards.flatMap(card => {
                    card.debts.forEach(debts => debts.card = card.cardName);
                    return card.debts
                  })
                  debts.forEach(debt => {
                    debt.bank = bank.bankName;
                  })
                  this.debtsData = this.debtsData.concat(debts)
              })
            })
            .catch(err => {
              console.error(err);
              this.$buefy.toast.open({
                duration: 5000,
                message: 'Error no pude obtener las deudas asociadas al usuario :S ',
                position: 'is-bottom',
                type: 'is-danger'
              })
            })
      }

      if (this.filterType === 'ended') {
        DebtService.getFinishedDebts(this.userEmail)
            .then(response => {
              console.log(response.data.responseObject);
              this.enableTable=true
              this.debtsData = response.data.responseObject;
            })
            .catch(err => {
              console.error(err);
              this.$buefy.toast.open({
                duration: 5000,
                message: 'Error no pude obtener las deudas asociadas al usuario :S ',
                position: 'is-bottom',
                type: 'is-danger'
              })
            })
      }
    },
    loadDebtsByCard() {
      DebtService.getDebtsByCard(this.userEmail, this.cardNickname)
          .then(response => {
            console.log(response.data.responseObject);
            this.enableTable = true;
            this.debtsData = response.data.responseObject;
          })
          .catch(err => {
            console.error(JSON.stringify(err));
            this.$buefy.toast.open({
              duration: 5000,
              message: 'Error no pude obtener las deudas asociadas a la tarjeta :S ',
              position: 'is-bottom',
              type: 'is-danger'
            })
          })
    }


  }
}
</script>