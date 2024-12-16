import { StyleSheet, Text, View, StatusBar } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./src/components/home/home";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { BlurView } from "expo-blur";
import HomeIcon from "@mui/icons-material/Home";
import Entypo from "@expo/vector-icons/Entypo";
import SearchPage from "./src/components/searchPage/searchPage";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Details from "./src/components/details/details";
import SeriesDetails from "./src/components/seriesDetails/seriesDetails";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: { position: "absolute", backgroundColor: "black" },
        }}
      >
        <Tab.Screen
          name="Home"
          component={InternalApp}
          options={{
            tabBarIcon: () => <Entypo name="home" size={24} color="#f9f9f9" />,
          }}
        />
        <Tab.Screen
          name="Buscar"
          component={SearchPage}
          options={{
            tabBarIcon: () => (
              <FontAwesome name="search" size={24} color="#f9f9f9" />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );

  function InternalApp() {
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Details" component={Details} />
        <Stack.Screen name="SeriesDetails" component={SeriesDetails} />
      </Stack.Navigator>
    );
  }
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#242424",
    alignItems: "center",
    //justifyContent: "center",
    width: "100vw",
    height: "100vh",
  },
});
