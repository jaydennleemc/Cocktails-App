import React, { Component } from "react";
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import DrinkList from "../components/DrinkList";

export default class HomePage extends Component {
  render() {
    return (
      <View style={styles.container}>
        <SafeAreaView />
        <Text style={styles.location}>Hong Kong</Text>
        <View style={styles.header}>
          <Text style={styles.title}> Cocktails </Text>
          <TouchableOpacity style={styles.searchContainer}>
            <Icon name="search" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
        <DrinkList category={'Cocktail'} />
        <DrinkList category={'Ordinary'} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  location: {
    color: '#6e6d6f',
    fontSize: 16,
    fontWeight: '800',
    marginLeft: 12,
  },
  title: {
    color: '#fff',
    fontSize: 35,
    fontWeight: 'bold',
  },
  searchContainer: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: '#393939',
  }
})