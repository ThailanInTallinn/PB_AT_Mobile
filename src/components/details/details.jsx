import { View, Text, StyleSheet, Image } from "react-native";
import Header from "../header/header.jsx";
import { useState, useEffect } from "react";
import { MY_ACESS_TOKEN } from "../home/home";
import axios from "axios";

export default function Details(props) {
  const navigation = props.navigation;
  const route = props.route;
  const params = route.params;

  const [movieInfo, setMovieInfo] = useState({
    title: "",
    genre: [],
    releaseDate: "",
    overview: "",
    poster_path: "",
  });
  async function getMovie() {
    const accessOptions = {
      method: "GET",
      url: `https://api.themoviedb.org/3/movie/${params.id}`,
      headers: {
        accept: "application/json",
        Authorization: MY_ACESS_TOKEN,
      },
    };
    const genresNames = [];
    await axios.request(accessOptions).then(function (response) {
      const genresList = response.data.genres;
      const releaseYear = response.data.release_date.slice(0, 4);

      for (let genreObject in genresList) {
        genresNames.push(genresList[genreObject].name);
      }
      setMovieInfo({
        title: response.data.title,
        poster_path: `https://image.tmdb.org/t/p/original/${response.data.poster_path}`,
        genre: genresNames,
        releaseDate: releaseYear,
      });
    });
  }

  useEffect(() => {
    getMovie();
  }, []);
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: movieInfo.poster_path }}
        style={{ width: 300, height: 300 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    backgroundColor: "#242424",
  },
});
