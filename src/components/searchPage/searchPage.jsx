import axios from "axios";
import { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  FlatList,
  Pressable,
} from "react-native";

import SearchCard from "../searchCards/searchCard";

export default function SearchPage({ navigation }) {
  const [searchWord, setSearchWord] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const formatString = (oldStr) => {
    const newStr = oldStr.replaceAll(" ", "%20");
    return newStr;
  };

  const options = {
    method: "GET",
    url: `https://api.themoviedb.org/3/search/movie?query=${formatString(
      searchWord
    )}&include_adult=false&language=en-US&page=1`,
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzYzljMTVkZjY4YTc4OWM2YWFhMmE4MzliOWZjMDJjZCIsIm5iZiI6MTcyOTAxMDMxNi4xMTk0MTUsInN1YiI6IjY2YzQ3MmQzZTk2NjFkMzNmZDk2YTMwNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ksUKOcK-sBVNzC3lR54wAzewqEpyheexkftNYlxB9og",
    },
  };

  const optionsSeries = {
    method: "GET",
    url: `https://api.themoviedb.org/3/search/multi?query=${formatString(
      searchWord
    )}&include_adult=false&language=en-US&page=1`,
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzYzljMTVkZjY4YTc4OWM2YWFhMmE4MzliOWZjMDJjZCIsIm5iZiI6MTcyOTAxMDMxNi4xMTk0MTUsInN1YiI6IjY2YzQ3MmQzZTk2NjFkMzNmZDk2YTMwNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ksUKOcK-sBVNzC3lR54wAzewqEpyheexkftNYlxB9og",
    },
  };

  async function getSearch() {
    await axios.request(optionsSeries).then(function (response) {
      setSearchResults(response.data.results);
    });
  }

  async function getSearchSeries() {
    await axios.request(optionsSeries).then(function (response) {
      setSearchResults((current) => [...current, response.data.results]);
    });
  }

  return (
    <View style={styles.outerContainer}>
      <View style={styles.searchBarContainer}>
        <TextInput
          placeholder="Buscar"
          style={styles.searchField}
          onChangeText={(value) => {
            if (value.length > 0) {
              setSearchWord(value);
              getSearch();
            } else {
              setSearchResults([]);
            }
          }}
        />
      </View>
      <View style={styles.listContainer}>
        <FlatList
          data={searchResults}
          style={{ width: "100vw", height: "50vh" }}
          contentContainerStyle={{
            alignItems: "center",
            width: "100vw",
          }}
          renderItem={({ item }) => {
            return (
              <Pressable
                onPress={() => {
                  if (item.name) {
                    navigation.navigate("Home", {
                      screen: "SeriesDetails",
                      params: {
                        id: item.id,
                      },
                    });
                  } else {
                    navigation.navigate("Home", {
                      screen: "Details",
                      params: {
                        id: item.id,
                      },
                    });
                  }
                }}
              >
                <SearchCard
                  name={item.name ? item.name : item.title}
                  srcImg={`https://image.tmdb.org/t/p/original/${item.poster_path}`}
                />
              </Pressable>
            );
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    height: "100%",
    width: "100%",
    backgroundColor: "black",
    alignItems: "center",
  },

  searchBarContainer: {
    height: "10%",
    width: "90%",
    backgroundColor: "#242424",
    marginTop: 10,
    borderRadius: 10,
    alignItems: "center",
    padding: 20,
    justifyContent: "center",
  },

  searchField: {
    backgroundColor: "white",
    width: "98%",
    borderRadius: 15,
    fontSize: 20,
    paddingLeft: 10,
  },

  listContainer: {
    width: "100%",
    height: "90%",
    marginTop: 20,
  },
});
