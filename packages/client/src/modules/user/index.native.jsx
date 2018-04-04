import React from 'react';
import PropTypes from 'prop-types';
import { SimpleLineIcons, Ionicons } from '@expo/vector-icons';
import { StackNavigator } from 'react-navigation';

import auth from './auth';
import resolvers from './resolvers';
import UserScreenNavigator from './containers/UserScreenNavigator';
import { createTabBarIconWrapper } from '../common/components/native';
import Profile from './containers/Profile';
import Login from './containers/Login';
import ForgotPassword from './containers/ForgotPassword';
import Logout from './containers/Logout';
import UsersList from './containers/UsersList';
import modules from '..';
import Feature from '../connector';

class LoginScreen extends React.Component {
  static navigationOptions = () => ({
    title: 'Sign In',
    header: false
  });

  render() {
    return <Login navigation={this.props.navigation} />;
  }
}

LoginScreen.propTypes = {
  navigation: PropTypes.object
};

class ForgotPasswordScreen extends React.Component {
  static navigationOptions = () => ({
    title: 'Forgot Password'
  });
  render() {
    return <ForgotPassword navigation={this.props.navigation} />;
  }
}

ForgotPasswordScreen.propTypes = {
  navigation: PropTypes.object
};

const AuthScreen = StackNavigator({
  Login: { screen: LoginScreen },
  ForgotPassword: { screen: ForgotPasswordScreen }
});

class LogoutScreen extends React.Component {
  static navigationOptions = () => ({
    title: 'Logout'
  });
  render() {
    return <Logout navigation={this.props.navigation} />;
  }
}

LogoutScreen.propTypes = {
  navigation: PropTypes.object
};

class UsersLisScreen extends React.Component {
  static navigationOptions = () => ({
    title: 'Users'
  });
  render() {
    return <UsersList navigation={this.props.navigation} />;
  }
}

UsersLisScreen.propTypes = {
  navigation: PropTypes.object
};

class ProfileScreen extends React.Component {
  static navigationOptions = () => ({
    title: 'Profile'
  });
  render() {
    return <Profile navigation={this.props.navigation} />;
  }
}

ProfileScreen.propTypes = {
  navigation: PropTypes.object
};

export * from './containers/Auth';

export default new Feature(auth, {
  tabItem: {
    Profile: {
      screen: ProfileScreen,
      userInfo: {
        showOnLogin: true,
        role: ['user', 'admin']
      },
      navigationOptions: {
        tabBarIcon: createTabBarIconWrapper(SimpleLineIcons, {
          name: 'user',
          size: 30
        })
      }
    },
    Auth: {
      screen: AuthScreen,
      userInfo: {
        showOnLogin: false
      },
      navigationOptions: {
        tabBarIcon: createTabBarIconWrapper(SimpleLineIcons, {
          name: 'login',
          size: 30
        })
      }
    },
    Users: {
      screen: UsersLisScreen,
      userInfo: {
        showOnLogin: true,
        role: 'admin'
      },
      navigationOptions: {
        tabBarIcon: createTabBarIconWrapper(Ionicons, {
          name: 'ios-browsers-outline',
          size: 30
        })
      }
    },
    Logout: {
      screen: LogoutScreen,
      userInfo: {
        showOnLogin: true
      },
      navigationOptions: {
        tabBarIcon: createTabBarIconWrapper(SimpleLineIcons, {
          name: 'logout',
          size: 30
        })
      }
    }
  },
  resolver: resolvers,
  routerFactory: () => {
    return UserScreenNavigator(modules.tabItems);
  }
});
