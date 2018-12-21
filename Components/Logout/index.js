import * as React from "react";
import firebase from "../../Config/Firebase";
import { ActivityIndicator, AsyncStorage, StatusBar, View } from "react-native";
import { removeUser } from "../../Config/Redux/Actions/authActions";
import { connect } from "react-redux";

class Logout extends React.Component {
  componentDidMount() {
    this.props.removeUser();
    firebase
      .auth()
      .signOut()
      .then(async () => {
        console.log("LOGOUT SUCCESS");
        this.props.navigation.navigate("Auth");
        // await AsyncStorage.setItem("user", null);
      })
      .catch(err => console.log("LOGOUT ERROR", err));
  }
  render() {
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <ActivityIndicator size="small" color="#ff0000" />
        <StatusBar backgroundColor="blue" barStyle="light-content" />
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.authReducers.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    removeUser: () => dispatch(removeUser())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Logout);
