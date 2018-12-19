import LoginScreen from "../../Screens/Login";
import HomeScreen from "../../Screens/Home";
import AuthLoadingScreen from "../../Screens/AuthLoader";

import {
  createStackNavigator,
  createAppContainer,
  createSwitchNavigator
} from "react-navigation";

const AppStack = createStackNavigator(
  { Home: HomeScreen },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: "#aa2233"
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        fontWeight: "bold"
      }
    }
  }
);
const AuthStack = createStackNavigator({ Login: LoginScreen });

export default createAppContainer(
  createSwitchNavigator(
    {
      AuthLoader: AuthLoadingScreen,
      App: AppStack,
      Auth: AuthStack
    },
    {
      initialRouteName: "AuthLoader"
    }
  )
);
