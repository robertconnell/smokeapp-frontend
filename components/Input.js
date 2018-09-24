import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, AppRegistry } from 'react-native';
import Header from './Header';
import SmokeBreak from './SmokeBreak';
import { Actions } from 'react-native-router-flux';

export default class Input extends React.Component {
    inputInfo() {
        fetch('http://localhost:3000/smoker', {
            method: 'POST',
            headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({
            name: this.state.name,
            day_start: this.state.day_start,
            day_end: this.state.day_end,
            cigarette_limit: this.state.cigarette_limit
            }),
        });
        Actions.smokebreak({text: 'Hello World'})
    }
    constructor(props) {
        super(props);
        this.state={
            name: '',
            day_start: '',
            day_end: '',
            cigarette_limit: '',
        }
    }
    render() {
        return (
            <View style={styles.container}>
                <View>
                    <Text style={styles.label}>Welcome to SmokeBreak!</Text>
                    <Text style={styles.label}>What's your day looking like?</Text>
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Name:</Text>
                    <TextInput
                    style={styles.input} onChangeText={(name) => this.setState({name: name})}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Wake:</Text>
                    <TextInput
                    style={styles.input} onChangeText={(time) => this.setState({day_start: time})}
                    />
                </View>
                    <View style={styles.inputContainer}>
                    <Text style={styles.label}>Sleep:</Text>
                    <TextInput
                    style={styles.input} onChangeText={(time) => this.setState({day_end: time})}
                    />
                </View>
                    <View style={styles.inputContainer}>
                    <Text style={styles.label}>Limit:</Text>
                    <TextInput
                    style={styles.input} onChangeText={(limit) => this.setState({cigarette_limit: limit})}
                    />
                </View>
                <TouchableOpacity style={styles.button} onPress={() => this.inputInfo()}>
                    <Text style={styles.buttonText}>Calculate</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        height: 587,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#89a0c6',
    }, input: {
        backgroundColor: 'rgba(255, 255, 255, 0.15)',
        fontSize: 15,
        height: 30,
        width: 100,
        textAlign: 'center',
        margin: 10,
        fontFamily: 'AppleSDGothicNeo-Regular'
    }, inputContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    }, label: {
        justifyContent: 'center',
        textAlign: 'center',
        alignItems: 'center',
        fontFamily: 'AppleSDGothicNeo-SemiBold'
    }, button: {
        alignItems: 'center',
        backgroundColor: '#6d86ad',
        width: 120,
        padding: 15,
        margin: 10,
        marginTop: 20,
        borderRadius: 10
    }, buttonText: {
        fontFamily: 'AppleSDGothicNeo-SemiBold',
        fontSize: 17,
    }
});

AppRegistry.registerComponent('Input', () => Input)