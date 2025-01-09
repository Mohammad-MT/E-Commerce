import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    orderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      required: true,
    },
    amount: { type: Number, required: true },
    currency: { type: String, default: "USD" },
    paymentMethod: { type: String, required: true },
    paymentStatus: { type: String, default: "Pending" },
    transactionId: { type: String, required: true },
  },
  { timestamps: true }
);

export const Payment = mongoose.model("Payment", paymentSchema);
