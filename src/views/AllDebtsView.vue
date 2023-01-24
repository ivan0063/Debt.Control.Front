<template>
  <div class="add-debt">
    <section class="hero is-info">
      <div class="hero-body">
        <p class="title"> Debts</p>

        <p class="subtitle">All Debts</p>
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
import FilterDebtsComponent from "@/components/FilterDebtsComponent";
import ValidUser from "@/components/ValidUserComponent";

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