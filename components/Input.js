import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, AppRegistry } from 'react-native';
import Header from './Header';
import SmokeBreak from './SmokeBreak';
import { Actions } from 'react-native-router-flux';

export default class Input extends React.Component {
    inputInfo() {
        fetch('https://smokeapp.herokuapp.com/smoker', {
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
            })
        });
        fetch('https://smokeapp.herokuapp.com/smoke_break', {
            method: 'POST',
            headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({
            break_interval: ((this.state.day_end-this.state.day_start)/this.state.cigarette_limit),
            breaks_left: this.state.cigarette_limit
            })
        });
        Actions.smokebreak({
            smoker_name: this.state.smoker_name,
            day_start: this.state.day_start,
            day_end: this.state.day_end,
            cigarette_limit: this.state.cigarette_limit
    })
    }
    constructor(props) {
        super(props);
        this.state={
            smoker_name: '',
            day_start: 0,
            day_end: 0,
            cigarette_limit: 0,
        }
    }
    render() {
        return (
            <View style={styles.container}>
                <View>
                    <Text style={styles.welcomeText}>Welcome to SmokeBreak!</Text>
                    <Text style={styles.welcomeText} onPress={() => Actions.smokebreak()}>What's your day looking like?</Text>
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Name:</Text>
                    <TextInput
                    style={styles.input} placeholder="Name" onChangeText={(smoker_name) => this.setState({smoker_name: smoker_name})}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Wake:</Text>
                    <TextInput
                    style={styles.input} placeholder="Ex: 0600" onChangeText={(time) => this.setState({day_start: time})}
                    />
                </View>
                    <View style={styles.inputContainer}>
                    <Text style={styles.label}>Sleep:</Text>
                    <TextInput
                    style={styles.input} placeholder="Ex: 2200" onChangeText={(time) => this.setState({day_end: time})}
                    />
                </View>
                    <View style={styles.inputContainer}>
                    <Text style={styles.label}>Limit:</Text>
                    <TextInput
                    style={styles.input} placeholder="0" onChangeText={(limit) => this.setState({cigarette_limit: limit})}
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
    }, welcomeText: {
        justifyContent: 'center',
        textAlign: 'center',
        alignItems: 'center',
        fontFamily: 'AppleSDGothicNeo-SemiBold',
        marginBottom: 15,
        fontSize: 17
    }, label: {
        justifyContent: 'center',
        textAlign: 'center',
        alignItems: 'center',
        fontFamily: 'AppleSDGothicNeo-SemiBold',
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