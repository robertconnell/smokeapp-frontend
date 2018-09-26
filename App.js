import React, { Component } from 'react';
import Header from './components/Header';
import Input from './components/Input';
import SmokeBreak from './components/SmokeBreak';
import { StyleSheet, Text, View, AppRegistry } from 'react-native';
import {Router, Scene } from 'react-native-router-flux';

export default class SmokeApp extends React.Component {
  render() {
    return (
      <View styles={styles.container}>
      <Header/>
        <Router>
        <Scene key='root' hideNavBar={true}>
          <Scene key='home' component={Input} title='Home' initial/>
          <Scene key='smokebreak' component={SmokeBreak} title='Smoke Break'/>
        </Scene>
        </Router>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#89a0c6',
  },
});