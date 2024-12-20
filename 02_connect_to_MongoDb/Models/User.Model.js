import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  age: {
    type: String,
    required: true,
  },
  mobile:{
    type:String,
    required:true
  },
  work: {
    type: String,
    enum: ["chef","waiter","manager"],
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  salary:{
    type:Number,
    required:true
  }
},{timestamps:true});

export const User = mongoose.model("User", UserSchema);