import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    cartData: {
      type: [
        {
          productId: { type: String, required: true },
          name: { type: String, required: true },  // Add the name field
          price: { type: Number, required: true }, // Add the price field
          quantity: { type: Number, required: true },
          size: { type: String, required: true },  // Add the size field
          image: { type: String, required: true },
        },
      ],
      default: [],
    },
    orders: {
      type: [
        {
          orderId: { type: String, required: true },
          items: [
            {
              productId: { type: String, required: true },
              quantity: { type: Number, required: true },
            },
          ],
          totalAmount: { type: Number, required: true },
          date: { type: Date, default: Date.now },
        },
      ],
      default: [], 
    },
  },
  { minimize: false, timestamps: true }
); //Prevents mongoose from removing empty data

userSchema.pre("save", async function (next) { // Middleware that runs before a document is saved to db
if(!this.isModified("password")) return next(); // Checks if the password hasnt been modified and moves on to save
this.password = await bcrypt.hash(this.password, 10);
next();
})

// const userModel = mongoose.models.user || mongoose.model('User', userSchema);


// export default userModel;

export const User = mongoose.models.User || mongoose.model("User", userSchema);
