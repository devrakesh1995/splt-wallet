import React, { Component } from 'react';
import {
    View, Image
} from 'react-native';
export default class Splash extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    componentDidMount() {
        setTimeout(() => {
            this.props.navigation.navigate('Welcome')
        }, 2000);

    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#1e3a8a', justifyContent: 'center', alignItems: 'center' }}>
                <Image source={require('../Statics/img/Splash/spltlogo.png')}
                    style={{ flex: 1, resizeMode: 'cover', height: 250, width: 250 }} />
            </View>
        )
    }
}
