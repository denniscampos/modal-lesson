import { enumType, intArg, objectType, stringArg } from 'nexus';
// import { extendType } from 'nexus';
// import { Link } from './Link';

export const User = objectType({
  name: 'User',
  definition(t) {
    t.string('id');
    t.string('name');
    t.string('email');
    t.string('image');
  },
});