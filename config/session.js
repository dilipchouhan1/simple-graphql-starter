const jwtSecret = {
  tokenBodyField: "MY_CUSTOM_BODY_FIELD",
  secretOrKey: process.env.JWT_SECRET || 'secret',
  issuer: "accounts.examplesoft.com",
  audience: "yoursite.net"
}

export default jwtSecret;
