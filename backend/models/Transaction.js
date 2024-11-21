const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: true,
	},
	action: {
		type: String,
		enum: ["gave", "got"],
		required: true,
	},
	amount: {
		type: Number,
		required: true,
		min: 0,
	},
	date: {
		type: Date,
		default: Date.now,
	},
});

module.exports = mongoose.model("Transaction", transactionSchema);
