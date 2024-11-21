import { FlatList, StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";

// import { userData } from "../helper/data";
import { Card, Text } from "react-native-paper";
import axios from "axios";

const Main = ({ navigation }) => {
	const [users, setUsers] = useState([]);

	useEffect(() => {
		axios
			.get("http://192.168.1.7:5000/api/users/")
			.then((res) => setUsers(res.data.reverse()))
			.catch((err) => console.error(err));
	}, []);

	const calculateTotal = (amountToGive, amountTaken) => {
		return amountTaken - amountToGive;
	};

	const renderItem = ({ item }) => {
		const totalAmount = calculateTotal(item.amountToGive, item.amountTaken);

		return (
			<Card
				mode="outlined"
				style={styles.cardContiner}
				onPress={() =>
					navigation.navigate("Transaction", {
						userId: item._id,
						userName: item.name,
					})
				}
			>
				<Card.Content style={styles.cardContent}>
					<View style={styles.cardLeftContainer}>
						<Text>{item.name}</Text>
					</View>
					<View
						style={[
							styles.cardRightContainer,
							totalAmount > 0 ? styles.colorGreen : styles.colorRed,
						]}
					>
						<Text
							style={totalAmount >= 0 ? styles.colorGreen : styles.colorRed}
						>
							₹ {totalAmount >= 0 ? totalAmount : Math.abs(totalAmount)}
						</Text>
					</View>
				</Card.Content>
			</Card>
		);
	};

	return (
		<FlatList
			data={users}
			renderItem={renderItem}
			keyExtractor={(item) => item._id}
			style={styles.list}
		/>
	);
};

export default Main;

const styles = StyleSheet.create({
	list: {
		padding: 20,
	},
	cardContiner: {
		marginBottom: 12,
	},
	cardContent: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	cardRightContainer: {
		flex: 0.45,
		alignItems: "flex-end",
		// borderWidth: 2,
		// borderColor: "red",
	},
	cardLeftContainer: {
		flex: 1,
		alignItems: "flex-start",
	},
	colorGreen: {
		textDecorationStyle: "solid",
		color: "#217352",
		backgroundColor: "#f7fdfb",
	},
	colorRed: {
		color: "#b9445f",
		backgroundColor: "#fdfbfc",
	},
});
