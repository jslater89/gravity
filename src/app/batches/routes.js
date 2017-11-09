import BatchList from './components/BatchList';
import BatchDetail from './components/BatchDetail';
import HelloWorld from './components/HelloWorld';

// eslint-disable-next-line
export const routes = [
    { path: '/', component: HelloWorld },
    { name: 'batchlist', path: '/batches', component: BatchList },
    { name: 'batchdetail', path: '/batches/:id', component: BatchDetail, props: true }, // route => ({ id: route.params.id })
];
