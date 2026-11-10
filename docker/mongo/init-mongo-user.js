// Runs once on first container start (mounted into /docker-entrypoint-initdb.d/).
// Creates an application-scoped user with readWrite access to MONGODB_DATABASE,
// separate from the root credentials used to administer the instance.
const appDb = process.env.MONGODB_DATABASE;
const appUser = process.env.MONGODB_USERNAME;
const appPassword = process.env.MONGODB_PASSWORD;

if (appDb && appUser && appPassword) {
  const appDbConnection = db.getSiblingDB(appDb);
  appDbConnection.createUser({
    user: appUser,
    pwd: appPassword,
    roles: [{ role: 'readWrite', db: appDb }],
  });
}
