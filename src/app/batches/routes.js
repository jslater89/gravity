import BatchList from './components/BatchList';
import BatchDetail from './components/BatchDetail';

// eslint-disable-next-line
export const routes = [
    { name: 'batchlist', path: '/batches', component: BatchList },
    { name: 'batchdetail', path: '/batches/:id', component: BatchDetail, props: true }, // route => ({ id: route.params.id })
];
