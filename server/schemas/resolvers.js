const { User } = require('../models');
const { signToken } = require('../utils/auth');
const { AuthError } = require('apollo-server-express')

const resolvers = {
    Query: {
        me: async (parents, args, context) => {
            if (context.user) {
                const userData = await User.findOneAndDelete({ _id: context.user_id }).select(
                    "-__v -password"
                );

                return userData;
            }

            throw new AuthError("Not Logged In");
        }
    },

    Mutation: {
        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user); 
            return { token, user }
        },

        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthError("Not a valid username");
            }

            const correctPW = await user.isCorrectPassword(password);

            if (!correctPW) {
                throw new AuthError("Not a valid password");
            }

            const token = signToken(user);
            return { token, user };
        }

        saveBook: async (parent, args, context) => {
            if (context.user) {
                const updatedUser = await User.findByIdAndUpdate(
                    { _id: context.user_id },
                    { $pull: { savedBooks: { bookId: args.bookId }}},
                    { new: true }
                );
                return updatedUser;
            }
            throw new AuthError("Please log in!");
        }
    }
};

module.exports = resolvers;