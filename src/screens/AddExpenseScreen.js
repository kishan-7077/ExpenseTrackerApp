import {
	Keyboard,
	KeyboardAvoidingView,
	Platform,
	StyleSheet,
	TouchableWithoutFeedback,
	View,
} from "react-native";
import React, { useState } from "react";
import {
	TextInput,
	Text,
	Button,
	Portal,
	Dialog,
	ActivityIndicator,
} from "react-native-paper";

import axios from "axios";

const AddExpenseScreen = ({ navigation }) => {
	const [name, setName] = useState("");
	const [amount, setAmount] = useState(0);

	const [loading, setLoading] = useState(false);

	const dismissKeyboard = () => {
		Keyboard.dismiss();
	};

	const gaveBtnPressed = async (name, amount) => {
		// console.log(
		// 	"if user exists then subtract it from the amountToGive section otherwise create a new user"
		// );
		setLoading(true);
		try {
			await axios.post("http://192.168.1.7:5000/api/users/gave", {
				name,
				amount: parseInt(amount),
			});
			navigation.navigate("Home");
		} catch (error) {
			console.error(error);
		} finally {
			setLoading(false);
		}
	};

	const gotBtnPressed = async (name, amount) => {
		// console.log(
		// 	"if user exists then subtract it from the amountTaken section otherwise create a new user"
		// );
		setLoading(true);
		try {
			await axios.post("http://192.168.1.7:5000/api/users/got", {
				name,
				amount: parseInt(amount),
			});
			navigation.navigate("Home");
		} catch (error) {
			console.error(error);
		} finally {
			setLoading(false);
		}
	};

	return (
		<>
			<TouchableWithoutFeedback onPress={dismissKeyboard}>
				<KeyboardAvoidingView
					behavior={Platform.OS === "ios" ? "padding" : undefined}
					// keyboardVerticalOffset={80}
					style={styles.container}
				>
					<View style={styles.innerContainer}>
						<Text variant="titleLarge" style={{ marginBottom: 15 }}>
							Add Expenses
						</Text>
						<TextInput
							mode="outlined"
							label="Name"
							value={name}
							placeholder="Enter customer name"
							onChangeText={(text) => setName(text)}
							style={{ marginBottom: 15 }}
						/>
						<TextInput
							mode="outlined"
							label="Amount"
							value={amount}
							placeholder="Enter Amount in ₹"
							onChangeText={(text) => setAmount(text)}
							style={{ marginBottom: 15 }}
							keyboardType="numeric"
						/>

						<View style={styles.transContainer}>
							<Button
								mode="contained"
								onPress={() => gaveBtnPressed(name, amount)}
								// style={styles.gaveButton}
								buttonColor="#bb2a4e"
							>
								You gave
							</Button>
							<Button
								mode="contained"
								buttonColor="#217352"
								textColor="#ffffff"
								onPress={() => gotBtnPressed(name, amount)}
							>
								You got
							</Button>
						</View>
					</View>
				</KeyboardAvoidingView>
			</TouchableWithoutFeedback>

			{/* Pregress Dialog */}
			<Portal>
				<Dialog visible={loading} dismissable={false}>
					<Dialog.Content style={styles.dialogContent}>
						<ActivityIndicator animating={true} size="large" color="#217352" />
						<Text style={{ marginTop: 10 }}>Processing...</Text>
					</Dialog.Content>
				</Dialog>
			</Portal>
		</>
	);
};

export default AddExpenseScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
	},
	innerContainer: {
		width: 350,
		marginTop: 30,
	},
	transContainer: {
		flexDirection: "row",
		justifyContent: "space-evenly",
		marginTop: 20,
	},
	gaveButton: {
		backgroundColor: "#bb2a4e",
	},
	gotButton: {
		color: "#217352",
		borderColor: "#217352",
	},
	dialogContent: {
		alignItems: "center",
		justifyContent: "center",
	},
});
