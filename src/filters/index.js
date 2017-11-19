import Vue from 'vue';
import moment from 'moment';

export default function () {
  Vue.filter('longdate', isoDate => `${moment(isoDate).format('MM/DD/YYYY HH:mm')}`);

  Vue.filter('shortdate', isoDate => `${moment(isoDate).format('MM/DD HH:mm')}`);

  Vue.filter('dateonly', isoDate => `${moment(isoDate).format('MM/DD/YYYY')}`);

  Vue.filter('percentify', (decimal) => {
    if (typeof decimal !== 'undefined') {
      const percentage = decimal * 100;
      return `${percentage.toFixed(2)}%`;
    }
    return '';
  });

  Vue.filter('round2', (decimal) => {
    if (typeof decimal !== 'undefined') {
      const n = decimal;
      return `${n.toFixed(2)}`;
    }
    return '';
  });
}
