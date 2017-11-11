
import Login from './components/Login';
import Authentication from './components/Authentication';

// eslint-disable-next-line
export const routes = [
  { name: 'login', path: '/', component: Login },
  { name: 'authentication', path: '/authenticated', component: Authentication, props: route => ({ bearer: route.query.bearer, redirect: route.query.redirect }) },
];
