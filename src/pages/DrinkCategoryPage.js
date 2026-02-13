import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import PageLoader from '../components/PageLoader';
import * as apiService from '../services/APIService';

const DrinkCategoryPage = props => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [drinks, setDrinks] = useState([]);

  const fetchDrinks = () => {
    apiService
      .getDrinksByCategory(props.category)
      .then(res => {
        setLoading(false);
        setDrinks(res?.data?.drinks || []);
      })
      .catch(error => {
        console.log(error);
        setLoading(false);
      });
  };

  useEffect(() => {
    navigation.setOptions({
      title: props.category,
    });
    fetchDrinks();
  }, [navigation, props.category]);

  const renderItem = ({ item }) => {
    return (
      <View style={styles.renderItem} key={item.idDrink}>
        <TouchableOpacity
          style={styles.renderItem.imageContainer}
          onPress={() =>
            navigation.navigate('DrinkDetailPage', { drink: item })
          }>
          <Image
            resizeMode="stretch"
            style={styles.renderItem.image}
            source={{ uri: item.strDrinkThumb }}
          />
        </TouchableOpacity>
        <Text style={styles.renderItem.name}>{item.strDrink}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <PageLoader />
      ) : (
        <FlatList
          contentContainerStyle={{ paddingBottom: 20 }}
          data={drinks}
          renderItem={renderItem}
          numColumns={2}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  flatList: {
    marginTop: 12,
  },
  renderItem: {
    flex: 1,
    width: '100%',
    imageContainer: {
      margin: 10,
    },
    image: {
      width: '100%',
      height: 120,
      borderRadius: 10,
    },
    category: {
      color: 'lightgrey',
      marginLeft: 12,
      fontSize: 16,
      fontWeight: 'bold',
    },
    name: {
      color: '#fff',
      marginLeft: 16,
      fontWeight: 'bold',
    },
  },
});

export default DrinkCategoryPage;
