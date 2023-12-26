import { User } from './interface';

export const admin: User = {
  id: 1,
  name: 'Siemhong',
  email: 'siemhong.em@pse.ngo',
  avatar: './assets/images/avatar.jpg',
};

export const guest: User = {
  name: 'unknown',
  email: 'unknown',
  avatar: './assets/images/avatar-default.jpg',
};
