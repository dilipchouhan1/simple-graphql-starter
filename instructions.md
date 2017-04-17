# Obtaining JWT by logging in with facebook
- Go to http://graphql-facebook.herokuapp.com/auth/facebook
- login to facebook with
  email: `dilipchouhan133@gmail.com`
  password: `qwer123`

  Have not published the app right now so only the development account can be used as of now.
- You will be redirected back to our app with a JSON containing the JWT to access the GraphQL endpoint.
  https://gyazo.com/f2b3e95df5bf73fcf6475f8739898222 (Example screenshot)


# Limitaion as of now.

Currently the graphiql interfce provided by graphqlHTTP does not support the custome headers that is why we will have to use a custome Chrome plugin for this. Also the GraphiQl still ca not be rendered untill we pass a valid Authorization header in the request. I know its a deadly situation for development environment I will figure it out if you wish, have left it as it is because of time constraints.

For current situation we can use Modify Header chrome plugin to

# install and configure Modify header Chrome plugin:-
- Go to https://chrome.google.com/webstore/detail/modheader/idgpnmonknjnojddfkpgkljpfnnfcklj?hl=en and install it on chrome browser.

- Set the Header:
  `Authorization` `JWT <token obtained via facebook login>`
- It will look like
  https://gyazo.com/8c613efbda45276ff4cdc20966de18d1

# Navigate to GraphQL explorer
- make sure that Modify header Chrome plugin is configured properly otherwise this route will not work. (I know this is bad, I will figure-out this.)
- go to http://graphql-facebook.herokuapp.com/graphql

# Further Enhancements
- Add ESLint
- separate GraphiQL and graphql endpoints so the jwt authntication middlware can be applied only to graphql endpoint only.
- Replace the GraphiQL interface with a custome one that supports headers so that we do not have to be dependent on the Chrome plugin.
- Add test-cases
- Use some promise library(BlueBird) to promesify normal callback apis
- Figureout a better authentication mechanism so we do not have to use endpoints out of graphql(Like we did).

# Note
Disable the Modify header Chrome plugin when done evaluting this. otherwise website like Facebook, github etc won't work because these are dependent on the `Authorization` which is tampered by the plugin.
