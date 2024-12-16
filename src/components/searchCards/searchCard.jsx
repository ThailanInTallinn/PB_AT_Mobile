import { Image, StyleSheet, View, Text } from "react-native";

export default function SearchCard({ id, name, srcImg }) {
  return (
    <View style={styles.cardContainer}>
      <Image
        source={{ uri: srcImg }}
        style={{ width: "100%", height: "80%", paddingTop: 30 }}
        resizeMode="cover"
      />

      <View style={styles.textContainer}>
        <Text style={styles.text}>{name}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    height: 230,
    width: 350,
    backgroundColor: "#242424",

    marginBottom: 15,
  },

  text: {
    color: "white",
    textAlign: "center",
    fontSize: 16,
    width: "100%",
    marginBottom: 50,
  },

  textContainer: {
    height: 100,
    alignItems: "center",
    justifyContent: "center",
  },
});
