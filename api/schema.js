'use strict';
var Dish = require('./models/dishModel.js');

const {
    GraphQLID,
    GraphQLString,
    GraphQLList,
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLInt,
} = require("graphql");

const DishType = new GraphQLObjectType({
    name: "Dish",
    fields: {
      id: { type: GraphQLID },
      name: { type: GraphQLString },
    }
  });
  
// Construct a schema, using GraphQL schema language
const schema = new GraphQLSchema({
query: new GraphQLObjectType({
    name: "Query",
    fields: {
    dishes: {
        type: GraphQLList(DishType),
        resolve: (root, args, context, info) => {
            return Dish.find().exec();
        }
    },
    dish: {
        type: DishType,
        args: {
            id: { type: GraphQLID}
        },
        resolve: (source, {id}) => {
            return Dish.findById(id).exec();
        }
    }
    }
})
});

module.exports = schema