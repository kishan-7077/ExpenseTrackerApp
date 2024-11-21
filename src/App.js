import { NavigationContainer } from "@react-navigation/native";
import { PaperProvider } from "react-native-paper";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "./screens/HomeScreen";
import AddExpenseScreen from "./screens/AddExpenseScreen";
import TransactionHistoryScreen from "./screens/TransactionHistoryScreen";
import Main from "./components/Main";

const Stack = createNativeStackNavigator();

export default function App() {
	return (
		<PaperProvider>
			<NavigationContainer>
				<Stack.Navigator initialRouteName="Home">
					<Stack.Screen
						name="Home"
						component={HomeScreen}
						options={{
							headerShown: false,
						}}
					/>
					<Stack.Screen
						name="Expense"
						component={AddExpenseScreen}
						options={{
							headerStyle: {
								backgroundColor: "#0A79DF",
							},
							headerTintColor: "#ffffff",
						}}
					/>
					<Stack.Screen
						name="Transaction"
						component={TransactionHistoryScreen}
						options={{
							headerStyle: {
								backgroundColor: "#0A79DF",
							},
							headerTintColor: "#ffffff",
						}}
					/>
					<Stack.Screen name="Main" component={Main} />
				</Stack.Navigator>
			</NavigationContainer>
		</PaperProvider>
	);
}
