import { StyleSheet, Text, View, StatusBar, Pressable } from "react-native";
import Header from "../header/header";
import axios from "axios";
import Card from "../card/card";
import { FlatList } from "react-native";
import { useState, useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const MY_KEY = "3c9c15df68a789c6aaa2a839b9fc02cd";
export const MY_ACESS_TOKEN =
  "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzYzljMTVkZjY4YTc4OWM2YWFhMmE4MzliOWZjMDJjZCIsIm5iZiI6MTcyOTAxMDMxNi4xMTk0MTUsInN1YiI6IjY2YzQ3MmQzZTk2NjFkMzNmZDk2YTMwNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ksUKOcK-sBVNzC3lR54wAzewqEpyheexkftNYlxB9og";
const options = {
  method: "GET",
  url: "https://api.themoviedb.org/3/authentication",
  headers: {
    accept: "application/json",
    Authorization: MY_ACESS_TOKEN,
  },
};

const popularMovies = {
  method: "GET",
  url: "https://api.themoviedb.org/3/movie/popular",
  params: { language: "en-US", page: "1" },
  headers: {
    accept: "application/json",
    authorization: MY_ACESS_TOKEN,
  },
};

const Stack = createNativeStackNavigator();

export default function Home(props) {
  const test =
    "https://upload.wikimedia.org/wikipedia/en/9/96/Meme_Man_on_transparent_background.webp";

  const [popularMoviesList, setPopularMoviesList] = useState([]);

  const navigation = props.navigation;

  async function getPopularMovies() {
    await axios.request(popularMovies).then(function (response) {
      setPopularMoviesList(response.data.results);
    });
  }

  useEffect(() => {
    //authentication();
    getPopularMovies();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <Header />
      <View style={styles.listContainer}>
        <Text style={styles.listHeader}>Filmes Populares</Text>
        <FlatList
          data={popularMoviesList}
          horizontal={true}
          renderItem={({ item }) => (
            <Pressable
              onPress={() => {
                navigation.navigate("Details", {
                  id: item.id,
                });
              }}
            >
              <Card
                srcImg={`https://image.tmdb.org/t/p/original/${item.poster_path}`}
                id={item.id}
              />
            </Pressable>
          )}
          keyExtractor={(item) => item.id}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    backgroundColor: "#242424",
    alignItems: "center",
    //justifyContent: "center",
    width: "100vw",
    height: "100vh",
  },

  listContainer: {
    columnGap: 40,
    width: "100vw",
  },

  listHeader: {
    color: "white",
    fontSize: 28,
    fontFamily: " Helvetica, Arial, sans-serif",
    fontWeight: 700,
    marginTop: 20,
    marginLeft: 10,
  },
});
