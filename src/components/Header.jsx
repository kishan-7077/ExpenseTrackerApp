import { StatusBar } from "expo-status-bar";

import { StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Card, Divider, FAB, Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

// import { userData } from "../helper/data";

import axios from "axios";

const Header = () => {
	const [users, setUsers] = useState([]);

	useEffect(() => {
		const fetchUsers = async () => {
			try {
				const response = await axios.get("http://192.168.1.7:5000/api/users");
				setUsers(response.data);
			} catch (error) {
				console.error(error);
			}
		};
		fetchUsers();
	}, []);

	const total = users.map((user) => {
		return user.amountTaken - user.amountToGive;
	});

	const totalGiveArr = total.filter((item) => item > 0);
	const totalGetArr = total.filter((item) => item < 0);

	const totalGetAmt = Math.abs(
		totalGetArr.reduce((acc, currVal) => acc + currVal, 0)
	);
	const totalGiveAmt = Math.abs(
		totalGiveArr.reduce((acc, currVal) => acc + currVal, 0)
	);

	return (
		<SafeAreaView>
			<StatusBar style="light" backgroundColor="#0A79DF" />

			<View style={styles.headerContainer}>
				<Text variant="bodyLarge" style={{ color: "#ffffff", marginLeft: 10 }}>
					My Expenses
				</Text>
				<Card style={styles.card}>
					<Card.Content
						style={{
							flexDirection: "row",
							alignItems: "center",
							justifyContent: "space-evenly",
						}}
					>
						<View style={{ justifyContent: "center", alignItems: "center" }}>
							<Text variant="bodySmall" style={{ color: "#808080" }}>
								You will give
							</Text>
							<Text variant="bodyLarge" style={{ color: "#217c54" }}>
								₹ {totalGiveAmt}
							</Text>
						</View>
						<Divider
							style={{
								width: 1, // Thickness of the vertical divider
								height: "100%", // Full height of the parent container
								backgroundColor: "#000", // Optional: Divider color
								marginHorizontal: 5, // Spacing on both sides of the divider
							}}
						/>
						<View style={{ justifyContent: "center", alignItems: "center" }}>
							<Text variant="bodySmall" style={{ color: "#808080" }}>
								You will get
							</Text>
							<Text variant="bodyLarge" style={{ color: "#b9445f" }}>
								₹ {totalGetAmt}
							</Text>
						</View>
						<Divider
							style={{
								width: 1, // Thickness of the vertical divider
								height: "100%", // Full height of the parent container
								backgroundColor: "#000", // Optional: Divider color
								marginHorizontal: 5, // Spacing on both sides of the divider
							}}
						/>
						<View style={{ justifyContent: "center", alignItems: "center" }}>
							<Text variant="bodySmall" style={{ color: "#808080" }}>
								Online Collections
							</Text>
							<Text variant="bodyLarge">₹ 0</Text>
						</View>
					</Card.Content>
				</Card>
			</View>
		</SafeAreaView>
	);
};

export default Header;

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},

	headerContainer: {
		height: 150,
		backgroundColor: "#0A79DF",
		color: "#ffffff",
		padding: 10,
	},
	card: {
		marginTop: 30,
	},
});
