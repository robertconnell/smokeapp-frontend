import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Actions } from 'react-native-router-flux';

export default class App extends React.Component {
    render() {
        return (
            <View style={styles.container}>
            <Text style={styles.title} onPress={() => Actions.home()}>Smoke Break</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        height: 80,
        width: 380,
        backgroundColor: '#6d86ad',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomColor: 'rgba(0, 0, 0, 0.35)',
        borderBottomWidth: 0.5,
        padding: 10,
    }, title: {
        fontSize: 30,
        fontWeight: 'bold',
        fontFamily: 'AppleSDGothicNeo-Regular',
        shadowColor: 'rgba(255, 255, 255, 0.75)',
        shadowOffset: {width: 0, height: 1},
        shadowRadius: 3,
        shadowOpacity: 1
    }
});
