import React from 'react';
import Header from './Header';
import Input from './Input';
import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import { Actions } from 'react-native-router-flux';

export default class SmokeBreak extends React.Component {
    takingBreak() {
        Alert.alert(
            this.props.text,
            'My Alert Msg',
            [
              {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
              {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
              {text: 'OK', onPress: () => console.log('OK Pressed')},
            ],
            { cancelable: false }
          )
    }

    componentDidMount() {
        fetch('http://localhost:3000/smoker')
        .then(response => response.json())
        .then(response => {console.log(response)})
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
                <Text
                onPress={() => Actions.home()}>Your next smoke break will be at:</Text>
                <Text>00:00</Text>
                <TouchableOpacity style={styles.button} onPress={() => Actions.home()}>
                    <Text style={styles.buttonText}>Skip this one</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => this.takingBreak()}>
                    <Text style={styles.buttonText}>Take my break</Text>
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
    }, button: {
        alignItems: 'center',
        backgroundColor: '#6d86ad',
        width: 140,
        padding: 15,
        margin: 10,
        marginTop: 20,
        borderRadius: 10
    }, buttonText: {
        fontFamily: 'AppleSDGothicNeo-SemiBold',
        fontSize: 17,
    }
});
