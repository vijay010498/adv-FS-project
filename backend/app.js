const express = require('express');
const { ApolloServer } = require("apollo-server-express");
const typeDefs = require("./GraphQL/typeDefs");
const resolvers = require("./GraphQL/resolvers");
const bodyParser = require('body-parser');
// mongo db using mongoose
const mongoose = require('mongoose');
// wgwMFonvzgLhPAWr
const MONGO_URL = 'mongodb+srv://vijay010498:wgwMFonvzgLhPAWr@cluster0.x4lkojc.mongodb.net/?retryWrites=true&w=majority';

const app = express();
const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
});
app.use(bodyParser.json());


(async () => {
  await apolloServer.start();
  apolloServer.applyMiddleware({ app });
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