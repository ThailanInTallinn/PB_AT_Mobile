import { StyleSheet, Text, View, StatusBar } from "react-native";
import Header from "../header/header";

export default function Home() {
  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <Header />
    </View>
  );
}

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
