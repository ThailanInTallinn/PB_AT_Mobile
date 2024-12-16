import { StyleSheet, Text, View, StatusBar, Pressable } from "react-native";
import Header from "../header/header";
import axios from "axios";
import Card from "../card/card";
import { FlatList } from "react-native";
import { useState, useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ScrollView } from "react-native";
import SeriesDetails from "../seriesDetails/seriesDetails";

export const MY_ACESS_TOKEN =
  "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzYzljMTVkZjY4YTc4OWM2YWFhMmE4MzliOWZjMDJjZCIsIm5iZiI6MTcyOTAxMDMxNi4xMTk0MTUsInN1YiI6IjY2YzQ3MmQzZTk2NjFkMzNmZDk2YTMwNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ksUKOcK-sBVNzC3lR54wAzewqEpyheexkftNYlxB9og";

const popularMovies = {
  method: "GET",
  url: "https://api.themoviedb.org/3/movie/popular",
  params: { language: "en-US", page: "1" },
  headers: {
    accept: "application/json",
    authorization: MY_ACESS_TOKEN,
  },
};

const upcoming = {
  method: "GET",
  url: "https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzYzljMTVkZjY4YTc4OWM2YWFhMmE4MzliOWZjMDJjZCIsIm5iZiI6MTcyOTAxMDMxNi4xMTk0MTUsInN1YiI6IjY2YzQ3MmQzZTk2NjFkMzNmZDk2YTMwNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ksUKOcK-sBVNzC3lR54wAzewqEpyheexkftNYlxB9og",
  },
};

const topRated = {
  method: "GET",
  url: "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzYzljMTVkZjY4YTc4OWM2YWFhMmE4MzliOWZjMDJjZCIsIm5iZiI6MTcyOTAxMDMxNi4xMTk0MTUsInN1YiI6IjY2YzQ3MmQzZTk2NjFkMzNmZDk2YTMwNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ksUKOcK-sBVNzC3lR54wAzewqEpyheexkftNYlxB9og",
  },
};

const popularSeries = {
  method: "GET",
  url: "https://api.themoviedb.org/3/tv/popular?language=en-US&page=1",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzYzljMTVkZjY4YTc4OWM2YWFhMmE4MzliOWZjMDJjZCIsIm5iZiI6MTczMjUyOTMyMi42NDIzNTEsInN1YiI6IjY2YzQ3MmQzZTk2NjFkMzNmZDk2YTMwNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.1ABgAh2WXlIkArGQwAKX8L26J50GTKmW8S0wK4vKmrM",
  },
};

const topRatedSeries = {
  method: "GET",
  url: "https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=1",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzYzljMTVkZjY4YTc4OWM2YWFhMmE4MzliOWZjMDJjZCIsIm5iZiI6MTczMjUyOTMyMi42NDIzNTEsInN1YiI6IjY2YzQ3MmQzZTk2NjFkMzNmZDk2YTMwNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.1ABgAh2WXlIkArGQwAKX8L26J50GTKmW8S0wK4vKmrM",
  },
};

const onTheAir = {
  method: "GET",
  url: "https://api.themoviedb.org/3/tv/on_the_air?language=en-US&page=2",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzYzljMTVkZjY4YTc4OWM2YWFhMmE4MzliOWZjMDJjZCIsIm5iZiI6MTczMjUyOTMyMi42NDIzNTEsInN1YiI6IjY2YzQ3MmQzZTk2NjFkMzNmZDk2YTMwNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.1ABgAh2WXlIkArGQwAKX8L26J50GTKmW8S0wK4vKmrM",
  },
};

const Stack = createNativeStackNavigator();

export default function Home(props) {
  const test =
    "https://upload.wikimedia.org/wikipedia/en/9/96/Meme_Man_on_transparent_background.webp";

  const [popularMoviesList, setPopularMoviesList] = useState([]);
  const [upcomingList, setUpcomingList] = useState([]);
  const [topRatedList, setTopRatedList] = useState([]);
  const [popularSeriesList, setPopularSeriesList] = useState([]);
  const [topRatedSeriesList, setTopRatedSeriesList] = useState([]);
  const [onTheAirList, setOnTheAirList] = useState([]);

  const navigation = props.navigation;

  async function getPopularMovies() {
    await axios.request(popularMovies).then(function (response) {
      setPopularMoviesList(response.data.results);
    });
  }

  async function getUpcoming() {
    await axios.request(upcoming).then(function (response) {
      setUpcomingList(response.data.results);
    });
  }

  async function getTopRated() {
    await axios.request(topRated).then(function (response) {
      setTopRatedList(response.data.results);
    });
  }

  async function getPopularSeries() {
    await axios.request(popularSeries).then(function (response) {
      setPopularSeriesList(response.data.results);
    });
  }

  async function getTopRatedSeries() {
    await axios.request(topRatedSeries).then(function (response) {
      setTopRatedSeriesList(response.data.results);
    });
  }

  async function getOnTheAir() {
    await axios.request(onTheAir).then(function (response) {
      setOnTheAirList(response.data.results);
    });
  }

  useEffect(() => {
    //authentication();
    getPopularMovies();
    getUpcoming();
    getTopRated();
    getPopularSeries();
    getTopRatedSeries();
    getOnTheAir();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <Header />
      <ScrollView style={styles.categoriesContainer}>
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
        <View style={styles.listContainer}>
          <Text style={styles.listHeader}>Próximos lançamentos</Text>
          <FlatList
            data={upcomingList}
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
        <View style={styles.listContainer}>
          <Text style={styles.listHeader}>Filmes aclamados pela crítica</Text>
          <FlatList
            data={topRatedList}
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
        <View style={styles.listContainer}>
          <Text style={styles.listHeader}>Séries populares</Text>
          <FlatList
            data={popularSeriesList}
            horizontal={true}
            renderItem={({ item }) => (
              <Pressable
                onPress={() => {
                  navigation.navigate("SeriesDetails", {
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
        <View style={styles.listContainer}>
          <Text style={styles.listHeader}>Séries aclamadas pela crítica</Text>
          <FlatList
            data={topRatedSeriesList}
            horizontal={true}
            renderItem={({ item }) => (
              <Pressable
                onPress={() => {
                  navigation.navigate("SeriesDetails", {
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
        <View style={styles.listContainer}>
          <Text style={styles.listHeader}>No ar agora</Text>
          <FlatList
            data={onTheAirList}
            horizontal={true}
            renderItem={({ item }) => (
              <Pressable
                onPress={() => {
                  navigation.navigate("SeriesDetails", {
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
      </ScrollView>
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
    height: 420,
    marginBottom: 15,
  },

  listHeader: {
    color: "white",
    fontSize: 28,
    fontFamily: " Helvetica, Arial, sans-serif",
    fontWeight: 700,
    marginTop: 20,
    marginLeft: 10,
  },

  categoriesContainer: {
    height: "82%",
  },
});
