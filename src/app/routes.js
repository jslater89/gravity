import { routes as batches } from './batches/routes';
import { routes as auth } from './auth/routes';

export default [...auth, ...batches];
