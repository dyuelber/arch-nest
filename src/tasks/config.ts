import { ActiveUsersService } from './services/users/active-users.service';
import { DisableUsersService } from './services/users/disable-users.service';

export async function handle(name: string) {
  const tasks = {
    ['activeUsers']: ActiveUsersService,
    ['disableUsers']: DisableUsersService,
  };

  return tasks[name] ?? '';
}
