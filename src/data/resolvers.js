import {
  Posts,
  Authors
} from './data';
import { find, filter } from 'lodash';
import { createPost, updatePost, deletePost } from '../resolvers/mutation/post';
import { allPosts } from '../resolvers/query/post';
import { me } from '../resolvers/query/user';

const resolverMap = {
  Query: {
    allPosts,
    me,
  },
  Mutation: {
    createPost,
    updatePost,
    deletePost
  },
  User: {
    posts() {
      return [];
    },
  },
};

export default resolverMap;
