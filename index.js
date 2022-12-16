const prueba = require('./src/app.js');
const { conn ,Plan} = require('./src/db.js');
const { PORT } = process.env;
const PUERTO= PORT || 3001;

// Syncing all the models at once.
conn.sync({ alter: true }).then(async() => {
    prueba.listen(PUERTO, () => {
  console.log(`%s listening at ${PUERTO} ` ); // eslint-disable-line no-console
});


});
