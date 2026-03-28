import { Book } from "../models/Book.js";
import { Author } from "../models/Author.js";
import { Metadata } from "../models/metadata.js";
import { Op } from "sequelize";

export const resolvers = {
  Query: {
    books: async (_, { page = 1, limit = 10, title }) => {
      return Book.findAll({
        where: title ? { title: { [Op.iLike]: `%${title}%` } } : {},
        offset: (page - 1) * limit,
        limit,
      });
    },

    authors: async (_, { page = 1, limit = 10, name }) => {
      return Author.findAll({
        where: name ? { name: { [Op.iLike]: `%${name}%` } } : {},
        offset: (page - 1) * limit,
        limit,
      });
    },
  },

  Mutation: {
    createAuthor: (_, args) => Author.create(args),

    updateAuthor: async (_, { id, ...rest }) => {
      const author = await Author.findByPk(id);
      return author.update(rest);
    },

    deleteAuthor: async (_, { id }) => {
      await Author.destroy({ where: { id } });
      return true;
    },

    createBook: (_, args) => Book.create(args),

    updateBook: async (_, { id, ...rest }) => {
      const book = await Book.findByPk(id);
      return book.update(rest);
    },

    deleteBook: async (_, { id }) => {
      await Book.destroy({ where: { id } });
      return true;
    },

    addReview: async (_, { bookId, user, comment, rating }) => {
     let metadata = await Metadata.findOne({ where: { bookId: String(bookId) } });

     
      if (!metadata) {
        metadata = await Metadata.create({
          bookId,
          reviews: [],
          avgRating: 0,
        });
      }

      
      metadata.reviews.push({ user, comment, rating });

      
      const total = metadata.reviews.reduce((sum, r) => sum + r.rating, 0);
      metadata.avgRating = total / metadata.reviews.length;

      await metadata.save();

      return metadata;
    }
  },

  Book: {
    author: (book) => Author.findByPk(book.author_id),
    metadata: async (book) => {
  return await Metadata.findOne({ bookId: String(book.id) });
}
  },

  Author: {
    books: (author) => Book.findAll({ where: { author_id: author.id } }),
  },
};
