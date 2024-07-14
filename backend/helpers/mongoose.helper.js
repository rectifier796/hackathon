import mongoose from "mongoose";

export function isValidObjectId(id) {
  const ObjectId = mongoose.Types.ObjectId;
  if (ObjectId.isValid(id)) {
    if (String(new mongoose.Types.ObjectId(id)) === id) return true;
    return false;
  }
}
