import Cart from "../models/cart.model.js";
import stripePackage from "stripe";

export const fetchCart = async (req, res, next) => {
  const { userId } = req.body;

  try {
    const cart = await Cart.findOne({ userId }).select("products totalPrice");
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    res.status(200).json(cart);
  } catch (error) {
    next(error);
  }
};

export const addProductToCart = async (req, res, next) => {
  const { userId, product } = req.body;
  try {
    let cart = await Cart.findOne({ userId });

    // Check if the product is already in the cart
    const existingProductIndex = cart.products.findIndex(
      (p) => p.product.id === product.id
    );

    if (existingProductIndex === -1) {
      cart.products.push({ product, quantity: 1 });
      cart.totalPrice += product.price;
      await cart.save();
      res.status(200).json(cart);
    }
  } catch (error) {
    next(error);
  }
};

export const increaseProductQuantity = async (req, res, next) => {
  const { userId, item } = req.body;
  try {
    const cart = await Cart.findOne({ userId });

    const existingProduct = cart.products.find(
      (p) => p.product.id === item.product.id
    );
    if (existingProduct) {
      existingProduct.quantity += 1;

      cart.totalPrice += item.product.price;
      await cart.save();
      res.status(200).json(existingProduct);
    }
  } catch (error) {
    next(error);
  }
};

export const decreaseProductQuantity = async (req, res, next) => {
  const { userId, item } = req.body;

  try {
    const cart = await Cart.findOne({ userId });
    const existingProduct = cart.products.find(
      (p) => p.product.id === item.product.id
    );

    if (existingProduct) {
      if (existingProduct.quantity > 1) {
        existingProduct.quantity -= 1;
        cart.totalPrice -= item.product.price;
        await cart.save();
        res.status(200).json(existingProduct);
      }
    }
  } catch (error) {
    next(error);
  }
};

export const removeProductFromCart = async (req, res, next) => {
  const { userId, item } = req.body;
  try {
    const cart = await Cart.findOne({ userId });
    const productToRemove = cart.products.find(
      (p) => p.product.id === item.product.id
    );
    cart.products = cart.products.filter(
      (p) => p.product.id !== item.product.id
    );
    cart.totalPrice -= productToRemove.product.price * productToRemove.quantity;
    await cart.save();
    res.status(200).json(productToRemove);
  } catch (error) {
    next(error);
  }
};

export const clearCart = async (req, res, next) => {
  const { userId } = req.body;

  try {
    // Find the cart by userId and update it to clear the products array and reset the total price
    const cart = await Cart.findOneAndUpdate(
      { userId },
      {
        $set: {
          products: [],
          totalPrice: 0,
        },
        $currentDate: {
          updatedAt: true,
        },
      },
      { new: true }
    );
    res.status(200).json({ message: "Cart cleared successfully", cart });
  } catch (error) {
    console.error("Error clearing cart:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deleteCart = async (req, res, next) => {
  const { userId } = req.body;
  console.log(userId);
  try {
    // Find the cart by userId and delete it
    const result = await Cart.findOneAndDelete({ userId });

    if (result) {
      res.status(200).json({ message: 'Cart deleted successfully' });
    } else {
      res.status(404).json({ error: 'Cart not found' });
    }
  } catch (error) {
    console.error('Error deleting cart:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const singleProductPayment = async (req, res, next) => {
  const stripe = stripePackage(process.env.STRIPE_SECRET);
  const { email, product } = req.body;

  try {
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: "inr",
            product_data: {
              name: product.wine,
              description: product.winery,
              images: [product.image],
            },
            unit_amount: product.price * 100,
          },
          quantity: 1,
        },
      ],
      payment_method_types: ["card"],
      mode: "payment",
      success_url: `${process.env.FRONTEND_URL}/paymentsuccess?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL}/paymentcancel`,
      customer_email: email,
    });

    res.json({ url: session.url });
  } catch (error) {
    console.error("Error creating payment session:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
export const cartProductPayment = async (req, res, next) => {
  const stripe = stripePackage(process.env.STRIPE_SECRET);
  const { email, products } = req.body;
  try {
    // Prepare line items for Stripe Checkout session
    const lineItems = products.map((items) => ({
      price_data: {
        currency: "inr",
        product_data: {
          name: items.product.wine,
          description: items.product.winery,
          images: [items.product.image],
        },
        unit_amount: items.product.price * 100,
      },
      quantity: items.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      line_items: lineItems,
      payment_method_types: ["card"],
      mode: "payment",
      success_url: `${process.env.FRONTEND_URL}/paymentsuccess?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL}/paymentcancel`,
      customer_email: email,
    });

    res.json({ url: session.url });
  } catch (error) {
    console.error("Error creating payment session:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const verifyPayment = async (req, res) => {
  const stripe = stripePackage(process.env.STRIPE_SECRET);
  const { sessionId } = req.body;
  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status === 'paid') {
      res.json({ success: true });
    } else {
      res.json({ success: false });
    }
  } catch (error) {
    console.error('Error verifying payment session:', error);
    res.status(500).json({ success: false });
  }
};