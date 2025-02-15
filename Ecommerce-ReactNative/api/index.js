import express from "express";
import bodyParser from "body-parser";
import { connect } from "mongoose";
import { randomBytes } from "crypto";
import { createTransport } from "nodemailer";
import cors from "cors";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import User from "./models/User.js";
import Order from "./models/Order.js";

const app = express();
const port = 8000;

// Replace with your IP address
const ipAddress = "192.168.198.54";

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// MongoDB connection
connect("mongodb+srv://satya:satya@cluster0.hjev8lw.mongodb.net/ecpmmerece", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB", err);
  });

// Start the server
app.listen(port, ipAddress, () => {
  console.log(`Server is running on http://${ipAddress}:${port}`);
});

// Mongoose models

// Nodemailer configuration
const transporter = createTransport({
  service: "Gmail",
  auth: {
    user: "mishrasatyapriya9@gmail.com",
    pass: "gdst wmel andl qkja",
  },
});

// Function to send verification email to the user
const sendVerificationEmail = async (email, verificationToken) => {
  try {
    const mailOptions = {
      from: "ShopKaro.com",
      to: email,
      subject: "Email Verification",
      text: `Please click the following link to verify your email: http://${ipAddress}:8000/verify/${verificationToken}`,
    };

    await transporter.sendMail(mailOptions);
    console.log("Verification email sent successfully");
  } catch (error) {
    console.error("Error sending verification email", error);
    throw error;
  }
};

// Endpoint to register a new user
app.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const newUser = new User({ name, email, password });
    newUser.verificationToken = randomBytes(20).toString("hex");

    await newUser.save();
    await sendVerificationEmail(newUser.email, newUser.verificationToken);

    res.status(200).json({ message: "Registration successful" });
  } catch (error) {
    console.error("Error registering user", error);
    res
      .status(500)
      .json({ message: "Registration failed", error: error.message });
  }
});

// Endpoint to verify the email
app.get("/verify/:token", async (req, res) => {
  try {
    const token = req.params.token;

    const user = await findOne({ verificationToken: token });
    if (!user) {
      return res.status(404).json({ message: "Invalid verification token" });
    }

    user.verified = true;
    user.verificationToken = undefined;
    await user.save();

    res.status(200).json({ message: "Email verified successfully" });
  } catch (error) {
    console.error("Error verifying email", error);
    res
      .status(500)
      .json({ message: "Email verification failed", error: error.message });
  }
});

//function to generate secret key
const generateSecretKey = () => {
  const secretKey = randomBytes(32).toString("hex");
  return secretKey;
};

const secretKey = generateSecretKey();

// Endpoint to login the user
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    //check if the user exists
    const user = await User.findOne({ email }); //Here, { email } is equivalent to { email: email }. This is a shorthand syntax in JavaScript for creating an object where the key and the value are the same.
    // console.log(user);
    if (!user) {
      console.error(`User not found: ${email}`);
      return res.status(401).json({ message: "Invalid email" });
    }

    //check if the password is correct
    if (user.password !== password) {
      console.error(`Invalid password for user: ${email}`);
      return res.status(401).json({ message: "Invalid password" });
    }

    //generate a token
    const token = jwt.sign({ userId: user._id }, secretKey);
    console.log(token);
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: "Login Failed", error: error.message });
  }
});

//endpoint to store a new address to the backend

app.post("/addresses", async (req, res) => {
  try {
    const { userId, address } = req.body;

    //find the user by the Userid
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    //add the new address to the user's address array
    user.addresses.push(address);

    //save the updated user
    await user.save();

    res.status(200).json({ message: "Address added succesfully" });
  } catch (error) {
    res.status(500).json({ message: "Error adding address" });
  }
});

// end point to get address of the user
app.get("/addresses/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const addresses = user.addresses;
    res.status(200).json(addresses);
  } catch (error) {
    res.status(500).json({ message: "Error retriving the address" });
  }
});

// end point to store all the orders
app.post("/orders", async (req, res) => {
  try {
    const { userId, cartItems, totalPrice, shippingAddress, paymentMethod } =
      req.body;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    //create an array of product objects from the cart Items
    const products = cartItems.map((item) => ({
      name: item?.title,
      quantity: item.quantity,
      price: item.price,
      image: item?.image,
    }));

    //create a new Order
    const order = new Order({
      user: userId,
      products: products,
      totalPrice: totalPrice,
      shippingAddress: shippingAddress,
      paymentMethod: paymentMethod,
    });

    await order.save();

    res.status(200).json({ message: "Order created successfully!" });
  } catch (error) {
    console.log("error creating orders", error);
    res.status(500).json({ message: "Error creating order" });
  }
});

//get the user profile
app.get("/profile/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving the user profile" });
  }
});

app.get("/orders/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;

    const orders = await Order.find({ user: userId }).populate("user");

    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: "No orders found for this user" });
    }

    res.status(200).json({ orders });
  } catch (error) {
    res.status(500).json({ message: "Error" });
  }
});
