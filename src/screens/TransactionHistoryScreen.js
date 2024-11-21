import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { Card, Text } from "react-native-paper";
import axios from "axios";

const TransactionHistoryScreen = ({ route }) => {
	const { userId, userName } = route.params;
	const [transactions, setTransactions] = useState([]);

	useEffect(() => {
		const fetchUserTransactions = async () => {
			try {
				const response = await axios.get(
					`http://192.168.1.7:5000/api/users/${userId}/transactions`
				);
				setTransactions(response.data);
			} catch (error) {
				console.error(error);
			}
		};

		fetchUserTransactions();
	}, [userId]);

	const renderTransaction = ({ item }) => (
		<Card style={styles.card}>
			<Card.Content>
				<View style={styles.transactionRow}>
					<Text variant="bodyMedium" style={styles.transactionText}>
						{item.action === "gave" ? "You gave" : "You got"}
					</Text>
					<Text
						variant="bodyLarge"
						style={[
							styles.amountText,
							item.action === "gave" ? styles.colorRed : styles.colorGreen,
						]}
					>
						₹ {item.amount}
					</Text>
				</View>
				<Text variant="bodySmall" style={styles.dateText}>
					{new Date(item.date).toLocaleDateString()}
				</Text>
			</Card.Content>
		</Card>
	);

	return (
		<View style={styles.container}>
			<Text variant="headlineMedium" style={styles.headerText}>
				Transactions with {userName}
			</Text>
			<FlatList
				data={transactions}
				renderItem={renderTransaction}
				keyExtractor={(item) => item._id}
				contentContainerStyle={styles.listContainer}
			/>
		</View>
	);
};

export default TransactionHistoryScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 15,
		backgroundColor: "#f9f9f9",
	},
	headerText: {
		marginBottom: 15,
		fontWeight: "600",
		color: "#0A79DF",
	},
	listContainer: {
		paddingBottom: 20,
	},
	card: {
		marginBottom: 10,
		padding: 10,
		borderRadius: 8,
		backgroundColor: "#ffffff",
		elevation: 2, // For shadow on Android
		shadowColor: "#000", // For shadow on iOS
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.2,
		shadowRadius: 4,
	},
	transactionRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginBottom: 5,
	},
	transactionText: {
		fontSize: 16,
		color: "#4a4a4a",
	},
	amountText: {
		fontSize: 18,
		fontWeight: "bold",
	},
	colorRed: {
		color: "#e74c3c", // Brighter red for better contrast
	},
	colorGreen: {
		color: "#27ae60", // Brighter green for better contrast
	},
	dateText: {
		fontSize: 14,
		color: "#7f8c8d", // Softer gray for date
		textAlign: "right",
		marginTop: 5,
	},
});
