// import { objectType, extendType, intArg } from 'nexus';

// below is an example to make a query...

// export const User = objectType({
//   name: 'User',
//   definition(t) {
//     t.int('id', { description: 'Id of the user' });
//     t.string('email', { description: 'Users email' });
//     t.list.field('sessions', {
//       type: User, // or "Post"
//       resolve(root: any, __, ctx: any) {
//         return ctx.getUser(root.id).sessions();
//       },
//     });
//   },
// });

// export const UserInfo = extendType({
//   type: 'Query',
//   definition: (t) => {
//     t.field('userById', {
//       type: 'User',
//       args: { id: intArg('id of the user') },
//       resolve: (_, args, ctx) => ctx.user.getById(args?.id),
//     });
//   },
// });
