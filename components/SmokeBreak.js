import React from 'react';
import Header from './Header';
import Input from './Input';
import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import { Actions } from 'react-native-router-flux';
var moment = require('moment');

export default class SmokeBreak extends React.Component {
    skippingBreak() {
        // this.setState({ timer: Math.round(timeDifference) });
        clearInterval(this.interval);
        Actions.home();
    }
    
    takingBreak() {
        // this.setState({ breaks_left: this.state.breaks_left - 1 })
        // this.setState({ timer: Math.round(timeDifference) });
        clearInterval(this.interval);
    }

    smokeBreakAlert() {
        Alert.alert(
            this.props.smoker_name + ',',
            'time for your smoke break!',
            [
                {text: 'Skip this one', onPress: () => this.skippingBreak()},
                {text: 'Take my break', onPress: () => this.takingBreak(), style: 'cancel'},
            ],
            { cancelable: false }
            )
    }
        
    componentDidMount() {
        fetch('https://smokeapp.herokuapp.com/smoke_break')
        .then(response => response.json())
        .then(responseJson => {
            this.setState({ break_interval: responseJson.data.break_interval})
            this.setState({ breaks_left: this.props.cigarette_limit})
        })

        const startHours = this.props.day_start / 100
        // const startMinutes = startHours * 60
        // const endHours = this.props.day_end / 100
        // const endMinutes = endHours * 60
        
        // const startPlusInterval = startMinutes + interval
        
        const totalHours = (this.props.day_end - this.props.day_start) / 100
        const totalMinutes = totalHours * 60

        const interval = totalMinutes / this.props.cigarette_limit

        let currentDate = new Date()
        let year = currentDate.getFullYear()
        let month = currentDate.getMonth()
        let date = currentDate.getDate()

        let startDateTime = new Date(year, month, date, startHours)

        let breakDateTime = nextBreak(startDateTime, interval)

        let timeDifference = (breakDateTime - currentDate) / 60000

        this.setState({
            break_interval: interval,
            // currentTimeinMinutes: getMinutesToday(),
            nextBreak: breakDateTime,
        })

        this.setState({ timer: Math.round(timeDifference) });

        this.interval = setInterval(
            () => this.setState({timer: --this.state.timer}),
            1000
        );

        function nextBreak(dateTime, interval) {
            let myBreak = new Date(dateTime)
            myBreak.setMinutes(myBreak.getMinutes() + interval)
            return myBreak
        }

    //     function getMinutesToday() {
    //         let now = new Date();

    //         // create an object using the current day/month/year
    //         let today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    //         let diff = now - today; // ms difference
    //         return Math.round(diff / 60000); // make minutes
    //     }

    }

    componentDidUpdate(){
        if(this.state.timer === 0){
            this.smokeBreakAlert(); 
            clearInterval(this.interval);   
        // } else if(this.state.timer < 0){
        //     this.smokeBreakAlert();
        }
    }
    
    componentWillUnmount(){
        clearInterval(this.interval);        
    }

    // convertTimesToInterval(start, end, limit) {
    //     const totalHours = (end - start) / 100
    //     const totalMinutes = totalHours * 60
    //     const interval = totalMinutes / limit
    //     return interval
    // }

    constructor(props) {
        super(props);
        this.state={
            timer: 0,
            break_interval: 0,
            breaks_left: 0,
            nextBreak: ''
        };
    }
        render() {
            return (
            <View style={styles.container}>
                <Text style={styles.label}>Your next smoke break will be at:</Text>
                <Text style={styles.timeText}>{moment(this.state.nextBreak).format('hh:mm a')}</Text>
                <Text style={styles.countdownTimer}>{this.state.timer} minutes left!</Text>
                <TouchableOpacity style={styles.button} onPress={() => console.log('Hello World')}>
                    <Text style={styles.buttonText}>{this.state.breaks_left} breaks remaining</Text>
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
        width: 180,
        padding: 15,
        margin: 10,
        marginTop: 20,
        borderRadius: 10
    }, buttonText: {
        fontFamily: 'AppleSDGothicNeo-SemiBold',
        fontSize: 17,
    }, label: {
        justifyContent: 'center',
        textAlign: 'center',
        alignItems: 'center',
        fontFamily: 'AppleSDGothicNeo-SemiBold',
        marginBottom: 15,
        fontSize: 15
    },  timeText: {
        justifyContent: 'center',
        textAlign: 'center',
        alignItems: 'center',
        fontFamily: 'AppleSDGothicNeo-SemiBold',
        marginBottom: 15,
        fontSize: 17
    }, countdownTimer: {
        justifyContent: 'center',
        textAlign: 'center',
        alignItems: 'center',
        fontFamily: 'AppleSDGothicNeo-Bold',
        marginBottom: 12,
        fontSize: 18
    }
});