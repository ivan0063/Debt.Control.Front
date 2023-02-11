<template>
  <div class="add-debt">
    <section class="hero is-info">
      <div class="hero-body">
        <p class="title"> Deudas</p>

        <p class="subtitle">Ver todas las deudas</p>
      </div>
    </section>

    <div class="container">
      <valid-user :binding-email="userInfo.email" @UserFoundEvent="setUserInfo($event)"/>

      <filter-debts-component :user-email="userInfo.email" v-if="enableFilterSelection"/>
    </div>

  </div>
</template>

<style>
  .hero{
    margin-bottom: 2%;
  }
</style>
<script>
import FilterDebtsComponent from "@/components/filter.debts.component";
import ValidUser from "@/components/valid.user.component";

export default {
  components: {ValidUser, FilterDebtsComponent},
  data() {
    return {
      userInfo: {},
      enableFilterSelection: false
    }
  },
  methods: {
    setUserInfo(userInfo) {
      console.log(userInfo);
      this.userInfo = userInfo;
      this.enableFilterSelection = true;
    }
  }

}
</script>