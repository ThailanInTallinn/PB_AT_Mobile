import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
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
    <ScrollView style={styles.container}>
      <Image
        source={{ uri: movieInfo.poster_path }}
        style={{ width: "100%", height: 600 }}
      />
      <Text style={styles.text}>{movieInfo.title}</Text>

      <Text style={styles.genresText}>
        {`Gênero: `}
        {movieInfo.genre.map((item, index) => {
          if (index == movieInfo.genre.length - 1) {
            return item;
          } else {
            return `${item}, `;
          }
        })}
      </Text>
      <Text style={{ color: "lightgray", textAlign: "center", marginTop: 15 }}>
        {movieInfo.releaseDate}
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    backgroundColor: "#242424",
  },

  text: {
    color: "white",
    textAlign: "center",
    marginTop: 15,
    fontSize: 28,
    fontWeight: 700,
  },

  genresText: {
    color: "lightgrey",
    marginTop: 25,
    textAlign: "center",
  },
});
