import User from '../../models/user';

export const updateMe = (_, {name, email}, {user}) => {
  if (name) {
    user.name = name;
  }
  if (email) {
    user.email = email;
  }

  return new Promise((resolve, reject) => {
    user.save((err, user) => {
      if (err) {
        reject(err);
      }
      resolve(user);
    });
  });
}
