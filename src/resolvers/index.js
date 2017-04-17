import {
  createPost,
  updatePost,
  deletePost
} from './mutation/post';
import { updateMe } from './mutation/user';
import { allPosts } from './query/post';
import { me } from './query/user';

const resolverMap = {
  Query: {
    allPosts,
    me,
  },
  Mutation: {
    updateMe,
    createPost,
    updatePost,
    deletePost
  },
  User: {
    posts: allPosts,
  },
};

export default resolverMap;
