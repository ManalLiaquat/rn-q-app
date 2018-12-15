import * as React from 'react';
import { Text, View, StyleSheet, Button, AsyncStorage } from 'react-native';
import { Constants, Facebook } from 'expo';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View>
        <Text>You're looged in successfully</Text>
        <Button
          onPress={async () => {
            await AsyncStorage.removeItem('userToken');
            this.props.navigation.navigate('Auth');
          }}
          title="Logout"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({});
