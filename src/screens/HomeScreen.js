import { View, StyleSheet } from "react-native";
import React from "react";
import { FAB } from "react-native-paper";

import Header from "../components/Header";
import Main from "../components/Main";

const HomeScreen = ({ navigation }) => {
	return (
		<View style={styles.container}>
			<Header />
			<Main navigation={navigation} />
			<FAB
				icon="plus"
				style={styles.fab}
				onPress={() => {
					navigation.navigate("Expense");
				}}
			/>
		</View>
	);
};

export default HomeScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	fab: {
		position: "absolute",
		margin: 16,
		right: 15,
		bottom: 50,
	},
});
