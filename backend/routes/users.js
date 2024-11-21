const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Transaction = require("../models/Transaction");

// Get all users
router.get("/", async (req, res) => {
	try {
		const users = await User.find();
		res.json(users);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

// Add or Update a User
router.post("/", async (req, res) => {
	const { name, amountToGive, amountTaken } = req.body;

	try {
		// check if user exists
		let user = await User.findOne({ name });

		if (user) {
			// Update user
			user.amountToGive += amountToGive || 0;
			user.amountTaken += amountTaken || 0;
		} else {
			// create a new user
			user = new User({ name, amountToGive, amountTaken });
		}

		await user.save();
		res.status(200).json(user);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
});

router.post("/gave", async (req, res) => {
	const { name, amount } = req.body;

	if (!name || amount <= 0) {
		return res.status(400).send("Invalid input");
	}

	try {
		let user = await User.findOne({ name });

		// If the user doesn't exist, create a new one
		if (!user) {
			user = new User({ name, amountToGive: amount, amountTaken: 0 });
		} else {
			// Update the amountToGive if the user exists
			user.amountToGive += amount;
		}
		await user.save();

		// Create a transaction
		const transaction = new Transaction({
			user: user._id,
			action: "gave",
			amount,
		});

		await transaction.save();

		res.status(200).json({ user, transaction });
	} catch (error) {
		console.error(error);
		res.status(500).send("Server error");
	}
});

// Add amount to 'amountTaken' for a user
router.post("/got", async (req, res) => {
	const { name, amount } = req.body;

	if (!name || amount <= 0) {
		return res.status(400).send("Invalid input");
	}

	try {
		let user = await User.findOne({ name });

		// If the user doesn't exist, create a new one
		if (!user) {
			user = new User({ name, amountToGive: 0, amountTaken: amount });
		} else {
			// Update the amountTaken if the user exists
			user.amountTaken += amount;
		}
		await user.save();

		// Create a transaction
		const transaction = new Transaction({
			user: user._id,
			action: "got",
			amount,
		});

		await transaction.save();
		res.status(200).json(user);
	} catch (error) {
		console.error(error);
		res.status(500).send("Server error");
	}
});

router.get("/:id/transactions", async (req, res) => {
	const { id } = req.params;

	try {
		const transactions = await Transaction.find({ user: id }).sort({
			date: -1,
		});
		res.status(200).json(transactions);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Server error" });
	}
});

// delete a user
router.delete("/:id", async (req, res) => {
	try {
		await User.findByIdAndDelete(req.params.id);
		res.status(200).json({ message: "User deleted successfully" });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

module.exports = router;
