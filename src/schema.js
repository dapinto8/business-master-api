const { searchBusinesses, getBusiness, getReviews } = require('./axios');

const typeDefs = `
  type User {
    id: ID!
    profile_url: String
    image_url: String
    name: String
  }

  type Review {
    id: ID!
    text: String
    rating: Int
    time_created: String
    user: User
  }

  type Schedule {
    is_overnight: Boolean
    start: Int
    end: Int
    day: Int
  }

  type Hour {
    open: [Schedule]
    hours_type: String
    is_open_now: Boolean
  }

  type Location {
    city: String
    state: String
    country: String
    address1: String
    address2: String
    zip_code: String
    display_address: [String]
  }

  type Category {
    alias: String
    title: String
  }

  type Business {
    id: ID!
    name: String
    alias: String
    url: String
    photos: [String]
    image_url: String
    rating: Float
    categories: [Category]
    is_closed: Boolean
    location: Location
    price: String
    review_count: Int
    phone: String
    display_phone: String
    transactions: [String]
    hours: [Hour]
    reviews: [Review]
  }

  type Search {
    total: Int
    businesses: [Business]
  }

  type Query {
    search(term: String, category: String, location: String!, offset: Int!, limit: Int!): Search
    business(alias: String): Business
  }
`;

const resolvers = {
  Query: {
    search: async (root, { term, category, location, offset, limit }) => {
      const { data } = await searchBusinesses(term, category, location, offset, limit);
      return data;
    },
    business: async (root, { alias }) => {

      if (!alias) return null;

      const { data } = await getBusiness(alias);
      const { data: { reviews } } = await getReviews(alias);
      data.reviews = reviews.slice(0, 5);

      return data;
    }
  }
};

module.exports = {
  typeDefs,
  resolvers
};
