<script>
import axios from 'axios';
import moment from 'moment';
import { Line, mixins } from 'vue-chartjs';

// function getTimeString(isoDate) {
//   return `${moment(isoDate).format('MM/DD HH:mm')}`;
// }

function convertBatchToDataset(batch) {
  const data = {
    labels: [],
    datasets: [
      {
        label: 'Voltage',
        data: [],
      },
    ],
  };

  for (let i = 0; i < batch.readings.length; i++) {
    const reading = batch.readings[i];
    data.labels.push(moment(reading.date).toDate());
    data.datasets[0].data.push(reading.battery);
  }

  if (batch.readings.length < 144 && batch.readings.length > 0) {
    const startTime = moment(batch.readings[batch.readings.length - 1].date);
    for (let i = 0; i < (144 - batch.readings.length); i++) {
      startTime.add(30, 'minutes');
      data.labels.push(startTime.toDate());
      data.datasets[0].data.push(null);
    }
  }

  return data;
}

function getBatch(ctx, id, callback) {
  axios.get(`${ctx.gravityConfig.apiRoot}/api/v1/batches/${id}`)
    .then((response) => {
        callback(response.data);
    },
    (response) => {
      //eslint-disable-next-line
      console.log(response);
    });
}

function receivedParam(batchID) {
  getBatch(this, batchID, (batch) => {
    this.localBatch = batch;
  });
}

function updateChart() {
  if (this.localBatch) {
    this.chartData = convertBatchToDataset(this.localBatch);
  }
}

function routeChanged(to) {
  // const self = this;
  getBatch(to.params.id, (batch) => {
    this.localBatch = batch;
  });
}

export default {
  extends: Line,
  props: ['batch'],
  mixins: [mixins.reactiveData],
  watch: {
    batch: receivedParam, // received a param from above
    $route: routeChanged, // navigated from one batch to another
    localBatch: updateChart,
  },
  data() {
    return {
      localBatch: [],
      options: {
        reactive: true,
        maintainAspectRatio: false,
        scales: {
          yAxes: [
            {
              id: 'Voltage',
              position: 'left',
              type: 'linear',
              scaleLabel: {
                labelString: 'Voltage',
                display: true,
              },
              ticks: {
                suggestedMin: 3.0,
                suggestedMax: 4.2,
              },
            },
          ],
          xAxes: [
            {
              id: 'Date',
              position: 'bottom',
              type: 'time',
              time: {
                unit: 'hour',
                displayFormats: {
                  hour: 'MM/DD HH:mm',
                },
              },
            },
          ],
        },
      },
    };
  },
  mounted() {
    this.renderChart(this.chartData, this.options);
  },
};
</script>