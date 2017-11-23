import { routes as batches } from './batches/routes';
import { routes as auth } from './auth/routes';
import { routes as hydrometers } from './hydrometers/routes';

export default [...auth, ...batches, ...hydrometers];
