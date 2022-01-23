import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ListLoader from './ListLoader';

const PageLoader = () => {
  const loaders = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  return (
    <View style={styles.container}>
      {loaders.map((loader, index) => (
        <ListLoader key={index} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default PageLoader;
