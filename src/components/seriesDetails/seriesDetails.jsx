import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import Header from "../header/header.jsx";
import { useEffect, useState } from "react";
import { MY_ACESS_TOKEN } from "../home/home";
import axios from "axios";

export default function SeriesDetails(props) {
  const navigation = props.navigation;
  const route = props.route;
  const params = route.params;

  const [seriesInfo, setSeriesInfo] = useState({
    name: "",
    genre: [],
    releaseDate: "",
    overview: "",
    poster_path: "",
  });
  async function getSeries() {
    const options = {
      method: "GET",
      url: `https://api.themoviedb.org/3/tv/${params.id}?language=en-US`,
      headers: {
        accept: "application/json",
        Authorization: MY_ACESS_TOKEN,
      },
    };

    const genresNames = [];
    await axios.request(options).then(function (response) {
      const genresList = response.data.genres;
      const releaseYear = response.data.first_air_date.slice(0, 4);

      for (let genreObject in genresList) {
        genresNames.push(genresList[genreObject].name);
      }

      setSeriesInfo({
        name: response.data.name,
        genre: genresNames,
        releaseDate: releaseYear,
        overview: response.data.overview,
        poster_path: `https://image.tmdb.org/t/p/original/${response.data.poster_path}`,
      });
    });
  }

  useEffect(() => {
    getSeries();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Image
        source={{ uri: seriesInfo.poster_path }}
        style={{ width: "100%", height: 600 }}
      />

      <Text style={styles.text}>{seriesInfo.name}</Text>

      <Text style={styles.genresText}>
        {`Gênero: `}
        {seriesInfo.genre.map((item, index) => {
          if (index == seriesInfo.genre.length - 1) {
            return item;
          } else {
            return `${item}, `;
          }
        })}
      </Text>
      <Text style={styles.dateText}>{seriesInfo.releaseDate}</Text>
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

  dateText: {
    color: "lightgrey",
    marginTop: 15,
    textAlign: "center",
  },
});
