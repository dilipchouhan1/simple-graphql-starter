var graph = require('fbgraph');

export const createFbPost = (access_token, message, callback) => {
  graph.post(`/feed?access_token=${access_token}`, { message }, function(err, res) {
    callback(err, res);
  });
}

export const deleteFbPost = (access_token, postId, callback) => {
  graph.del(`/${postId}?access_token=${access_token}`, function(err, res) {
    callback(err, res);
  });
}

export const editFbPost = (access_token, postId, message, callback) => {
  graph.post(`/${postId}?access_token=${access_token}`, {message}, function(err, res) {
    callback(err, res);
  });
}

export const getAllPosts = (access_token, callback) => {
  graph.get(`me/feed?access_token=${access_token}`, function(err, res) {
    callback(err, res);
  });
}
