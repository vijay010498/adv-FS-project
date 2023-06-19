const express = require('express');
const bodyParser = require('body-parser');
const expressGraphQL = require('express-graphql');
const schema = require('./schema/schema');
// mongo db using mongoose
const mongoose = require('mongoose');
// wgwMFonvzgLhPAWr
const MONGO_URL = 'mongodb+srv://vijay010498:wgwMFonvzgLhPAWr@cluster0.x4lkojc.mongodb.net/?retryWrites=true&w=majority';

const app = express()
app.use(bodyParser.json());
app.use('/graphql', expressGraphQL({
  schema,
  graphiql: true
}));


(async () => {
  try {
    await mongoose.connect(MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (err) {
    console.error(err);
  }


  const PORT = process.env.PORT || 5100;
  await app.listen(PORT, (err) => {
    if (err) {
      console.log(`Error starting application,${err}`)
    }
    console.log(`Listening on port ${PORT}`);
  })
})();