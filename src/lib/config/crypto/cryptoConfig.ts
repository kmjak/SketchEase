const cryptoConfig = {
  auth_key: process.env.AUTH_SECRET_KEY!,
  db_key: process.env.DATABASE_SECRET_KEY!,
  cookie_key: process.env.COOKIE_SECRET_KEY!,
}

export default cryptoConfig;