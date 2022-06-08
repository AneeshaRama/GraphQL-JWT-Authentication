const { ApolloServer } = require("apollo-server");
const {
  ApolloServerPluginLandingPageGraphQLPlayground,
} = require("apollo-server-core");
const connectDatabase = require("./connectDB");
const { resolvers } = require("./resolvers");
const { typeDefs } = require("./schema");

//dotenv config
require("dotenv").config();

//connecting to database
connectDatabase();

//server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
});

//listener
server.listen(4000).then(() => console.log(`Server is running on port 4000`));
