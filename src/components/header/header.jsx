import { StyleSheet, View, Text } from "react-native";

export default function Header() {
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.logoPara}>ArleteFlix</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: "black",
    justifyContent: "center",
    width: "100%",
    height: "10%",
    padding: 10,
  },

  logoPara: {
    color: "rgb(172, 19, 19)",
    fontFamily: " Helvetica, Arial, sans-serif",
    fontSize: 28,
    fontWeight: "bold",
  },
});
