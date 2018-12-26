import LoginScreen from "../../Screens/Login";
import HomeScreen from "../../Screens/Home";
import AuthLoadingScreen from "../../Screens/AuthLoader";
import LogoutButton from "../../Components/Logout";

import {
  createStackNavigator,
  createAppContainer,
  createSwitchNavigator,
  createDrawerNavigator
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

const DrawerStack = createDrawerNavigator({
  Home: AppStack,
  Logout: LogoutButton
});
const AuthStack = createStackNavigator({ Login: LoginScreen });

const Navigator = createAppContainer(
  createSwitchNavigator(
    {
      AuthLoader: AuthLoadingScreen,
      App: DrawerStack,
      Auth: AuthStack
    },
    {
      initialRouteName: "AuthLoader"
    }
  )
);

export default Navigator;
