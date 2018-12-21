import React from "react";
import { ActivityIndicator, AsyncStorage, StatusBar, View } from "react-native";
import firebase from "../../Config/Firebase";
import { connect } from "react-redux";
import { updateUser } from "../../Config/Redux/Actions/authActions";

class AuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null
    };
  }

  static getDerivedStateFromProps(props) {
    console.log("IsUser_REDUX ==>", props.user ? "YES" : "NO");
    return { user: props.user };
  }

  componentDidMount() {
    this.props.updateUser();
    this.checkUser();
  }

  checkUser() {
    const { user } = this.state;
    if (user) {
      // console.log("*****USER*****", user);
      this.props.navigation.navigate("App");
    } else {
      // console.log("*****NOT SIGNED IN*****");
      this.props.navigation.navigate("Auth");
    }
  }

  // Render any loading content that you like here.
  render() {
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <ActivityIndicator size="small" color="#00ff00" />
        <StatusBar backgroundColor="blue" barStyle="light-content" />
      </View>
    );
  }
}

const mapStateToProps = state => {
  // console.log("state from component", state);
  return {
    user: state.authReducers.user
  };
};

const mapDispatchToProps = dispatch => {
  // console.log("dispatch from component", dispatch);
  return {
    updateUser: user => dispatch(updateUser(user))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthLoadingScreen);
