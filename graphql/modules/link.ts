import { objectType, extendType } from 'nexus';

// all of this is boilerplate for now..

export const Link = objectType({
  name: 'Link',
  definition(t) {
    t.string('id');
    t.int('index');
    t.int('userId');
    t.string('title');
    t.string('url');
    t.string('description');
    t.string('imageUrl');
    t.string('category');
  },
});

export const Post = objectType({
  name: 'Post',            // <- Name of your type
  definition(t) {
    t.int('id')            // <- Field named `id` of type `Int`
    t.string('title')      // <- Field named `title` of type `String`
    t.string('body')       // <- Field named `body` of type `String`
    t.boolean('published') // <- Field named `published` of type `Boolean`
  },
})

export const PostQuery = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.list.field('drafts', {
      type: 'Post',
      resolve() {
        return [{ id: 1, title: 'Nexus', body: '...', published: false }]
      },
    })
  },
})