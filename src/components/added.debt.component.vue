<template>
  <div class="column">

    <div class="card">
      <header class="card-header">
        <p class="card-header-title">Added Debts</p>
      </header>

      <div class="card-content">
        <div class="content">

          <b-collapse
              class="card"
              animation="slide"
              v-for="(debt, index) of addedDebts"
              :key="index"
              :open="isOpen === index"
              @open="isOpen = index"
              :aria-id="'contentIdForA11y5-' + index">
            <template #trigger="props">
              <div
                  class="card-header"
                  role="button"
                  :aria-controls="'contentIdForA11y5-' + index"
                  :aria-expanded="props.open"
              >
                <p class="card-header-title">
                  {{ debt.debtName }}
                </p>
                <a class="card-header-icon">
                  <b-icon
                      :icon="props.open ? 'menu-down' : 'menu-up'">
                  </b-icon>
                </a>
              </div>
            </template>
            <div class="card-content">
              <div class="content">
                <b-table :data="[debt]" :columns="columns"></b-table>

                <b-button class="button-margin" @click="editDebtInfo(index)" type="is-primary">Editar</b-button>
                <b-button class="button-margin" @click="confirmDelete(index)" type="is-danger">Borrar</b-button>
              </div>
            </div>
          </b-collapse>

        </div>
      </div>
    </div>

    <b-modal v-model="showEditModal" :width="640" scroll="keep">
      <div class="card">
        <div class="card-content">
          <div class="content card-content-padding">

            <p class="title">Tarjeta: {{cardNickname}}</p>

            <b-field label="Nombre Deuda">
              <b-input type="text" v-model="editDebtObject.debtName"></b-input>
            </b-field>

            <b-field label="Mensualidad Actual" v-if="editDebtObject.monthlyInstallment != null">
              <b-input type="number" v-model="editDebtObject.monthlyInstallment"></b-input>
            </b-field>

            <b-field label="Mensualidades Faltantes" v-if="editDebtObject.missingMonthlyPayments != null">
              <b-input type="number" v-model="editDebtObject.missingMonthlyPayments"></b-input>
            </b-field>

            <b-field label="Total meses sin intereses">
              <b-input type="number" v-model="editDebtObject.debtDuration"></b-input>
            </b-field>

            <b-field label="Pago Mensual">
              <b-input type="text" v-model="editDebtObject.monthlyAmount"></b-input>
            </b-field>

            <b-button class="margin-top is-pulled-right" type="is-danger" @click="saveDebtInfo">Guardar</b-button>
          </div>
        </div>
      </div>
    </b-modal>


  </div>
</template>

<style>
  .card-content-padding {
    padding-bottom: 10%;
    padding-top: 5%;
  }

  .margin-top {
    margin-top: 3%;
  }

  .button-margin {
    margin-top: 5%;
    margin-right: 2%;
  }
</style>

<script>
export default {
  name: 'AddedDebts',
  props: {
    cardNickname: String,
    addedDebts: Array
  },
  data() {
    return {
      isOpen: 0,
      showEditModal: false,
      localDebts: this.addedDebts,
      columns: [
        {
          field: 'monthlyAmount',
          label: 'Pago Mensual',
        },
        {
          field: 'missingMonthlyPayments',
          label: 'Mensualidades Faltantes',
        },
        {
          field: 'monthlyInstallment',
          label: 'Mensualidad Actual',
        },
        {
          field: 'debtDuration',
          label: 'Total meses sin intereses',
        }
      ],
      editDebtObject: {
        debtName: '',
        monthlyInstallment: null,
        missingMonthlyPayments: null,
        debtDuration: null,
        monthlyAmount: null,
      },
      currentEditingIndex: -1
    }
  },
  methods: {
    editDebtInfo(index) {
      this.showEditModal = true;
      this.editDebtObject = this.localDebts[index];
      this.currentEditingIndex = index;
    },
    confirmDelete(index) {
      this.$buefy.dialog.confirm({
        message: 'Estas seguro que deseas eliminar la deuda?',
        onConfirm: () => {
          this.$buefy.toast.open('User confirmed');
          this.deleteDebtInfo(index);
        }
      });
    },
    deleteDebtInfo(index) {
      let debtToRemove = this.localDebts[index];
      this.localDebts.splice(debtToRemove, 1);
    },
    saveDebtInfo() {
      this.localDebts[this.currentEditingIndex] = this.editDebtObject;
      this.showEditModal = false;
      this.$buefy.toast.open("Datos Editados de la deuda exitosamente!")
    }
  }
}
</script>