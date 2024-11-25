import { Image, Pressable, StyleSheet, View } from "react-native";

export default function Card({ srcImg, id, action }) {
  return (
    <View style={styles.cardContainer}>
      <Image source={{ uri: srcImg }} style={styles.img} />
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    height: "30%",
    width: 200,
    backgroundColor: "white",
    marginLeft: 8,
    marginRight: 8,
    marginTop: 20,
  },

  img: {
    height: "100%",
    width: "auto",
  },
});
