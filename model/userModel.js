import mongoose from "mongoose";
import bcrypt from "bcrypt";

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  ID: { type:String, required: true },
  password: { type: String, required: true },
  tasks: [
    {
      title: String,
      description: String,
      date: String,
      ID: String,
      category: String,
      status: { type: String, default: "Pending" }, 
      priority: String
    }
  ],
  role: { type: String, enum: ["Admin", "Employee"], default: "Employee" },
});

// Hash password before saving
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Compare password
UserSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

export default mongoose.model("User", UserSchema);