const server = require('./src/app.js');
const { conn } = require('./src/db.js');
const { PORT } = process.env;
const PUERTO= PORT || 3001;

// Syncing all the models at once.
conn.sync({ force: true }).then(async() => {
    server.listen(PUERTO, () => {
  console.log(`%s listening at ${PUERTO} ` ); // eslint-disable-line no-console
});


});
