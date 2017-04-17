export const createPost = (_, {message}) => {
  console.log(message);
  console.log("--");
}

export const updatePost = (_, {postId, message}) => {
  console.log(postId);
  console.log(message);
  console.log("--");
}

export const deletePost = (_, {postId}) => {
  console.log(postId);
  console.log("--");
}
