import config from 'common/config';
import { queryClient } from 'common/repositories/query-client';

export default async function logout() {
  await localStorage.removeItem(config.authSession);
  await queryClient.invalidateQueries();
  await queryClient.clear();
}
