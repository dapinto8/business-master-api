const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { ApolloServer } = require('apollo-server-express');
const { typeDefs, resolvers } = require('./schema');
const dotenv = require('dotenv');
dotenv.config();

const app = express();

const server = new ApolloServer({
  typeDefs,
  resolvers
});

server.applyMiddleware({ app });

app.use(cors());
app.use(bodyParser.json());

app.use((req, res) => {
  res.status(200);
  res.send('Hello!');
  res.end();
});


app.listen({ port: process.env.PORT }, () =>
  console.log(`🚀 Server ready at http://localhost:5000${server.graphqlPath}`)
);
