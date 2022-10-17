import React, { Component } from 'react';
import {
  View, Text, ImageBackground, StatusBar,
  Image, Dimensions
} from 'react-native';
const { height, width } = Dimensions.get('window')

export default class Splash extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  componentDidMount() {
  }

  render() {

    return (

      // <ImageBackground
      //   source={require('../Statics/img/Splash/Splash11.png')}
      //   style={{ flex: 1, justifyContent: 'center', alignItems: 'center', height: height, width: width }}
      //   imageStyle={{
      //     resizeMode: 'stretch' // works only here!
      //   }}>

      <View style={{ flex: 1, backgroundColor: '#1e3a8a' }}>
        <View style={{ alignItems: 'center', justifyContent: 'center', alignSelf: 'center', marginVertical: 160 }}>
          <Image style={{ height: 260, width: 260 }} source={require('../Statics/img/Wallet/spltwhite.png')} />
          {/* <Text style={{ color: '#FFF', fontSize: 25, fontWeight: 'bold', marginTop: 5, textShadowOffset: { width: 1, height: 1 }, textShadowRadius: 1, textShadowColor: 'lightgray' }}> SPLT</Text> */}
        </View>
      </View>

      // <StatusBar hidden={true} />
      // </ImageBackground>
    )
  }
}
