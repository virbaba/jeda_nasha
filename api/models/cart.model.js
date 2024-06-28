import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    products: [
      {
        product: {
          winery: {
            type: String,
            required: true,
          },
          wine: {
            type: String,
            required: true,
          },
          rating: {
            average: {
              type: String,
              required: true,
            },
            reviews: {
              type: String,
              required: true,
            },
          },
          location: {
            type : String,
          },
          image: {
            type: String,
            required: true,
          },
          id: {
            type: Number,
            required: true
          },
          price: {
            type: Number,
            required: true,
          },
        },
        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],
    totalPrice: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const Cart = mongoose.model('Cart', cartSchema);

export default Cart;
