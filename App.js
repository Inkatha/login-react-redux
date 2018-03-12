import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import firebase from 'firebase';
import ReduxThunk from 'redux-thunk';
import reducers from './src/reducers';
import LoginForm from './src/components/LoginForm';
import Router from './src/Router';

export default class App extends Component {
  componentWillMount() {
    const config = {
      apiKey: "AIzaSyAuZV9WlL0khjNNkYvmJ5lz0lB32EnnBpM",
      authDomain: "auth-3c613.firebaseapp.com",
      databaseURL: "https://auth-3c613.firebaseio.com",
      projectId: "auth-3c613",
      storageBucket: "auth-3c613.appspot.com",
      messagingSenderId: "42979724528"
    };

    firebase.initializeApp(config);
  }

  render() {
    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
    
    return (
      <Provider store={store}>
        <Router />
      </Provider>
    );
  }
}
