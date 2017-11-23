<template>
  <div class="panel">
    <h3>Hydrometer Detail</h3>
    <table class="table">
      <tr>
        <td class="title">Name</td>
        <td>{{hydrometer.name}}</td>
      </tr>
      <tr>
        <td class="title">Description</td>
        <td>{{hydrometer.description}}</td>
      </tr>
    </table>
  </div>

</template>

<script>
export default {
  name: 'HydrometerDetail',
  props: ['hydrometer'],
};
</script>

<style scoped>
  .panel {
    width: 100%;
    height: 100%;
  }
  .content {
    width: 70%;
    height: 100%;
    float: left;
  }

  .sidebar{
    width: 30%;
    height: 100%;
    float: left;  
  }

  .table {
    width:50%;
    margin: 0 auto;
  }

  .title {
    font-weight: bold;
  }
</style>
