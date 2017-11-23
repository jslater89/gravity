import HydrometerList from './components/HydrometerList';
import HydrometerDetail from './components/HydrometerDetail';

// eslint-disable-next-line
export const routes = [
    { name: 'hydrometerlist', path: '/hydrometers', component: HydrometerList },
    { name: 'hydrometerdetail', path: '/hydrometers/:id', component: HydrometerDetail, props: true }, // route => ({ id: route.params.id })
];
