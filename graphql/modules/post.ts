import { objectType, extendType } from 'nexus';

export const Post = objectType({
  name: 'Post',
  definition(t) {
    t.string('id');
    t.string('title');
    t.string('content');
    // t.nonNull.date('createdAt'); May have to use graphql scalars.
    // t.nonNull.date('updatedAt');
  },
});

export const PostQuery = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.list.field('posts', {
      type: 'Post',
      resolve() {
        return [{ id: 1, title: 'Nexus', body: '...', published: false }];
      },
    });
  },
});
