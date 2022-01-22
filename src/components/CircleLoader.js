import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import ContentLoader, { Rect, Circle } from 'react-content-loader/native'

export default CircleLoader = () => (
  <View style={styles.container}>
    <ContentLoader
      backgroundColor={'#333'}
      foregroundColor={'#999'}
      speed={3} viewBox="0 0 80 80"
      style={{ marginHorizontal: 4 }}>
      <Circle cx="30" cy="30" r="30" />
    </ContentLoader>
  </View>
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    width: '100%',
  }
});
