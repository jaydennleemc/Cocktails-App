import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

const DrawerMenu = () => {
  const navigation = useNavigation();
  const [menus] = useState([
    {
      name: 'Alcoholic',
      value: 'Alcoholic',
    },
    {
      name: 'Non Alcoholic',
      value: 'Non_Alcoholic',
    },
    {
      name: 'Ordinary',
      value: 'Ordinary_Drink',
    },
    {
      name: 'Cocktail',
      value: 'Cocktail',
    },
    {
      name: 'Cocktail Glass',
      value: 'Cocktail_glass',
    },
    {
      name: 'Champagne Flute',
      value: 'Champagne_flute',
    },
  ]);

  const handleMenuPress = item => {
    navigation.navigate('DrinkCategoryPage', { category: item.name });
    navigation.closeDrawer();
  };

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.renderItem}
        key={item}
        onPress={() => handleMenuPress(item)}>
        <Text style={styles.renderItem.text}>{item.name}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cocktails</Text>
      <Image
        source={require('../assets/images/splash.png')}
        style={styles.image}
      />
      <FlatList
        contentContainerStyle={{ paddingBottom: 20 }}
        bounces={false}
        data={menus}
        style={styles.flatList}
        renderItem={renderItem}
      />
      <Text style={styles.version}>Ver: 1.0.0</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    color: '#fff',
    fontWeight: '800',
    marginLeft: 8,
    alignSelf: 'center',
  },
  image: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    marginVertical: 8,
    marginTop: 20,
  },
  flatList: {
    marginTop: 12,
  },
  renderItem: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'grey',
    margin: 8,
    text: {
      color: '#fff',
      fontSize: 16,
    },
  },
  version: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 16,
    marginBottom: 16,
  },
});

export default DrawerMenu;
