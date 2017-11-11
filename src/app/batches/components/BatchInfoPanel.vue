<template>
  <table class="table">
    <tr>
      <td class="title">Recipe</td>
      <td>{{batch.recipe}}</td>
    </tr>
    <tr>
      <td class="title">Start Date</td>
      <td>{{batch.startDate | shortdate }}</td>
    </tr>
    <tr>
      <td class="title">Last Update</td>
      </td>{{batch.lastUpdate | shortdate }}</td>
    <tr>
      <td class="title">Attenuation</td>
      <td>{{ batch.attenuation | percentify }}</td>
    </tr>
    <tr>
      <td class="title">ABV</td>
      <td>{{ batch.abv | round2 }}%</td>
    </tr>  

    <tr v-if="batch.lastReading">
      <td class="title">Hydrometer Battery</td>
      <td>{{ batch.lastReading.battery }}</td>
    </tr>
  </table>
</template>

<script>
export default {
  name: 'BatchInfoPanel',
  props: ['batch'],
};
</script>

<style scoped>
  .table {
    width:80%;
    margin-left: 10%;
    margin-right: 10%;
  }

  .title {
    font-weight: bold;
  }
</style>

