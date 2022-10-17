import React, { Component } from 'react';
import { connect } from 'react-redux';
import { userActions } from '../_actions';
import {
    View, Text, Dimensions,
    Image, TouchableOpacity, BackHandler, Alert
} from 'react-native';

const { height, width } = Dimensions.get('window')


class initialSelectionscreen extends Component {
    constructor(props) {
        super(props);
        this.props.dispatch(userActions.logout());
        this.state = {
        }
    }

    gotoNextScreen = (router) => {
        this.props.navigation.navigate(router)
    }

    onButtonPress = () => {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);

        navigate('NewScreen');
    }

    handleBackButton = () => {
        Alert.alert(
            'Exit App',
            'Exiting the application?', [{
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel'
            }, {
                text: 'OK',
                onPress: () => BackHandler.exitApp()
            },], {
            cancelable: false
        }
        )
        return true;
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    }
    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    }

    render() {

        return (
            <View style={{ flex: 1, backgroundColor: '#1e3a8a', }}>
                <View style={{ flex: 1, borderWidth: 3, borderColor: '#FFF' }} >
                    <View style={{ marginTop: 30, height: 50, width: width, flexDirection: 'row', alignItems: 'center' }}>
                        <View style={{ height: '100%', width: 20, backgroundColor: '#FFF', borderTopRightRadius: 6, borderBottomRightRadius: 6 }} />
                        <Text style={{ fontSize: 30, color: '#FFF', textShadowOffset: { width: 1, height: 1 }, textShadowRadius: 1, textShadowColor: 'lightgray' }}> WELCOME </Text>
                    </View>

                    <View style={{ flex: 0.9, marginTop: 55}}>
                        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                            <Image style={{ height: 250, width: 250 }} source={require('../images/spltlogo.png')} />
                            {/* <Text style={{ fontSize: 22, color: 'white', textShadowOffset: { width: 1, height: 1 }, textShadowRadius: 1, textShadowColor: 'lightgray' }}> SPLT </Text> */}
                        </View>

                        <View style={{ borderRadius: 10, marginHorizontal: 20, marginTop: 40, marginBottom: 20, elevation: 8 }}>
                            <View style={{ backgroundColor: '#3498eb', height: 40, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: '#3498eb', borderRadius: 10 }}>
                                <TouchableOpacity style={{ width: '100%' }}
                                    onPress={() => this.gotoNextScreen('Login')}
                                >
                                    <Text style={{ fontSize: 19, color: 'white', textAlign: 'center', color: '#FFF', textShadowOffset: { width: 1, height: 1 }, textShadowRadius: 1, textShadowColor: 'lightgray' }}> Login </Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={{ borderRadius: 11, marginHorizontal: 20, marginBottom: 20, elevation: 8 }}>
                            <View style={{ backgroundColor: '#3498eb', height: 40, borderRadius: 10, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: '#3498eb' }}>
                                <TouchableOpacity style={{ width: '100%' }}
                                    onPress={() => this.gotoNextScreen('Register')}>
                                    <Text style={{ fontSize: 19, color: 'white', textAlign: 'center', color: '#FFF', textShadowOffset: { width: 1, height: 1 }, textShadowRadius: 1, textShadowColor: 'lightgray' }}> Register </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}
function mapStateToProps(state) {
    const { loggingIn } = state.authentication;
    const { users } = state;
    return {
        loggingIn,
        users
    };
}
export default connect(mapStateToProps)(initialSelectionscreen);