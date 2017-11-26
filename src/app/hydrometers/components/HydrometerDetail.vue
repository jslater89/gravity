<template>
  <div class="panel">
    <h3>Hydrometer Detail</h3>
    <hydrometer-edit-modal :new="false" :show="showHydrometerEdit" :hydrometer="hydrometer" @close="showHydrometerEdit = false"></hydrometer-edit-modal>
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

    <button @click="showHydrometerEdit = true">Edit</button>
    <button v-if="!hydrometer.archived" @click="archiveHydrometer(true)">Archive</button>
    <button v-if="hydrometer.archived" @click="archiveHydrometer(false)">Unarchive</button>

  </div>

</template>

<script>
import axios from 'axios';
import HydrometerEditModal from './HydrometerEditModal';

export default {
  name: 'HydrometerDetail',
  props: ['id', 'hydrometer'],
  components: {
    'hydrometer-edit-modal': HydrometerEditModal,
  },

  data() {
    return {
      showHydrometerEdit: false,
    };
  },

  methods: {
    archiveHydrometer(archive) {
      this.hydrometer.archived = archive;

      axios.put(`${this.gravityConfig.apiRoot}/api/v1/hydrometers/${this.id}`, this.hydrometer)
        .then()
        .catch((error) => {
          this.hydrometer.archived = !archive;

          //eslint-disable-next-line
          console.log(error);
        });
    },
  },
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
