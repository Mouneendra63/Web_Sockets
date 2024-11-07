const express = require('express');
const { ApolloServer } = require('@apollo/server');
const bodyparser = require('body-parser');
const { expressMiddleware } = require('@apollo/server/express4');
const cors = require('cors');
const axios = require('axios');

async function startServer() {
    const app = express();

    const typeDefs = `
        type User {
            id: ID!
            name: String!
            username: String!
            email: String!
            phone: String!
            website: String!
        }

        type Todo {
            id: ID!
            title: String!
            completed: Boolean
            user: User
        }

        type Query {
            getTodos: [Todo]
            getAllUsers: [User]
            getUser(id: ID!): User
        }
    `;

    const resolvers = {
        Todo: {
            user: async (todo) => {
                const response = await axios.get(`https://jsonplaceholder.typicode.com/users/${todo.userId}`);
                return response.data;
            },
        },
        Query: {
            getTodos: async () => {
                const response = await axios.get("https://jsonplaceholder.typicode.com/todos");
                return response.data;
            },
            getAllUsers: async () => {
                const response = await axios.get("https://jsonplaceholder.typicode.com/users");
                return response.data;
            },
            getUser: async (parent, { id }) => {
                const response = await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`);
                return response.data;
            },
        },
    };

    const server = new ApolloServer({
        typeDefs,
        resolvers,
    });

    await server.start();
    app.use(bodyparser.json());
    app.use(cors());
    app.use("/graphql", expressMiddleware(server));

    app.listen(8000, () => {
        console.log("Server is running on http://localhost:8000/graphql");
    });
}

startServer();