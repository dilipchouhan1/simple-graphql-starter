import { getAllPosts } from '../../fb'

export const allPosts = (_, {}, {user}) => {
  return new Promise((resolve, reject) => {
    getAllPosts(user.facebook.token, (err, res) => {
      if (err) {
        reject(err);
      }
      resolve(res.data);
    });
  });
}
