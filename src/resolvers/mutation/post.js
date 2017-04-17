import { createFbPost, deleteFbPost, editFbPost } from '../../fb'

export const createPost = (_, {message}, {user}) => {
  return new Promise((resolve, reject) => {
    createFbPost(user.facebook.token, message, (err, res) => {
      if (err) {
        reject(err);
      }
      resolve({
        message,
        id: res.id
      });
    });
  });
}

export const updatePost = (_, {postId, message}, {user}) => {
  return new Promise((resolve, reject) => {
    editFbPost(user.facebook.token, postId, message, (err, res) => {
      if (err) {
        reject(err);
      }
      resolve({
        message,
        id: postId
      });
    });
  });
}

export const deletePost = (_, {postId}, {user}) => {
  return new Promise((resolve, reject) => {
    deleteFbPost(user.facebook.token, postId, (err, res) => {
      if (err) {
        reject(err);
      }
      resolve({success: true});
    });
  });
}
