import React from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  StyleSheet,
  View,
  Text,
} from 'react-native';

export default class AuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props);
    this._bootstrapAsync();
  }

  _bootstrapAsync = async () => {
    const userToken = await AsyncStorage.getItem('userToken');
    this.props.navigation.navigate(userToken ? 'App' : 'Auth');
  };

  // Render any loading content that you like here
  render() {
    return (
      <View>
        <ActivityIndicator size="small" color="#00ff00" />
        <StatusBar backgroundColor="blue" barStyle="light-content" />
      </View>
    );
  }
}
