import React, { Component } from 'react';
import { connect } from 'react-redux';
import { userActions } from '../../_actions';

import {
  View, Text, Dimensions, TouchableOpacity, ImageBackground, TextInput,
  SafeAreaView, ScrollView
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { height, width } = Dimensions.get('window')

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      otp_code: '',
      showLogin: true,
      failureMSG: '',
      failureOTPMSG: ''
    }
  }
  static getDerivedStateFromProps(nextProps, prevState) {

    if (nextProps.users.UserLoginFailure) {
      return {
        ...nextProps,
        failureMSG: 'Please enter valid username!'
      }
    }
    if (nextProps.users.UserLoginOTPFailure) {
      return {
        ...nextProps,
        failureOTPMSG: 'Invalid OTP or expired!'
      }
    }
    if (nextProps.users.UserLoginEmailSuccess) {
      return {
        ...nextProps,
        showLogin: false
      }
    }
    else {
      return {
        ...nextProps
      }
    }
  }
  async componentDidMount() {
    await AsyncStorage.removeItem('UserData');
  }
  handleLoginInput = (text) => {
    this.setState({ email: text })
  }
  handleLoginInputPassword = (text) => {
    this.setState({ password: text })
  }
  submitLogin = () => {
    let data = {
      email: this.state.email,
      password: this.state.password,
    }
    this.props.dispatch(userActions.register(data, this.props));
  }

  // onSubmitOTP = () => {
  //   const { users } = this.props;
  //   const { UserEmailToken } = users;
  //   if (this.state.otp !== 'NaN') {
  //     let data = {
  //       email: this.state.email,
  //       password: this.state.password,
  //       otp: this.state.otp
  //     }
  //     this.props.dispatch(userActions.validateOtp(data, this.props));
  //   }
  // }
  
  handleVerificationInput = (text) => {
    this.setState({ otp: text })
  }
  gotoIntroScreen = (router) => {
    this.props.navigation.navigate(router)
  }
  render() {
    let { email, password, failureMSG } = this.state;

    return (
      <SafeAreaView>
        <View style={{ width: width, height: '100%', backgroundColor: '#1e3a8a', }}>
          <View style={{ height: '100%', borderWidth: 2, borderColor: '#FFF' }} >
            <ScrollView>

              <View style={{ marginTop: 30, height: 50, width: width, flexDirection: 'row', alignItems: 'center' }}>
                <View style={{ height: '100%', width: 20, backgroundColor: '#FFF', borderTopRightRadius: 6, borderBottomRightRadius: 6 }} />
                <Text style={{ fontSize: 30, color: '#fff', textShadowOffset: { width: 1, height: 1 }, textShadowRadius: 1, textShadowColor: 'lightgray' }}> SIGN UP </Text>
              </View>

              <View style={{ alignItems: 'center', marginTop: 55, alignSelf: 'center' }}>
                {this.state.showLogin ?
                  <>

                    <View style={{ justifyContent: 'space-between', height: height - (height / 2 - 35), paddingBottom: 10 }}>
                      <View style={{ backgroundColor: '#1e3a8a', width: width - 40, borderRadius: 15, elevation: 8, }}>
                        <View style={{ borderRadius: 12, backgroundColor: '#F6F6F6' }}>

                          <View style={{ marginHorizontal: 20, height: 45, backgroundColor: '#E5E5E5', marginTop: 30, borderRadius: 10 }}>
                            <TextInput
                              style={{ marginHorizontal: 10, fontSize: 15 }}
                              placeholder="Email"
                              name="email"
                              onChangeText={(text) => this.handleLoginInput(text)}
                              value={email}
                            />
                          </View>

                          <View style={{ marginHorizontal: 20, height: 45, backgroundColor: '#E5E5E5', marginTop: 20, borderRadius: 10 }}>
                            <TextInput
                              style={{ marginHorizontal: 10, fontSize: 15 }}
                              placeholder="Password"
                              name="password"
                              secureTextEntry={true}
                              onChangeText={(text) => this.handleLoginInputPassword(text)}
                              value={password} />
                          </View>
                          <View style={{ borderWidth: 1, borderColor: 'lightgray', borderRadius: 11, marginHorizontal: 20, marginBottom: 30, marginTop: 60, elevation: 8 }}>
                            <View style={{ backgroundColor: '#3498eb', height: 40, borderRadius: 10, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: '#3498eb' }}>

                              <TouchableOpacity style={{ width: '100%' }}
                                onPress={() => this.submitLogin()}>
                                <Text style={{ fontSize: 19, color: 'white', textAlign: 'center', textShadowOffset: { width: 1, height: 1 }, textShadowRadius: 1, textShadowColor: 'lightgray' }}> Register </Text>

                              </TouchableOpacity>
                            </View>
                          </View>
                        </View>
                      </View>

                      <TouchableOpacity style={{ height: 35, flexDirection: 'row', justifyContent: 'center' }}
                        onPress={() => this.gotoIntroScreen('Login')}>
                        <Text style={{ fontSize: 17, textAlign: 'center', color: '#FFF', textShadowOffset: { width: 1, height: 1 }, textShadowRadius: 1, textShadowColor: 'lightgray' }}> Already have an Account? </Text>
                        <Text style={{ fontSize: 17, textAlign: 'center', color: '#3498eb', textShadowOffset: { width: 1, height: 1 }, textShadowRadius: 1, textShadowColor: '#3498eb' }}> Sign In </Text>
                      </TouchableOpacity>
                    </View>
                  </>
                  :
                  <>

                    <View style={{ backgroundColor: '#fff', width: width - 40, borderRadius: 15, elevation: 8, }}>
                      <View style={{ borderRadius: 25, }}>

                        <Text style={{ padding: 19, color: '#000', fontSize: 22, fontWeight: 'bold', textShadowOffset: { width: 1, height: 1 }, textShadowRadius: 1, textShadowColor: 'lightgray' }}>Verification</Text>
                        <Text style={{ paddingLeft: 20, fontSize: 14, color: '#000', fontWeight: 'bold', textShadowOffset: { width: 1, height: 1 }, textShadowRadius: 1, textShadowColor: 'lightgray' }}>
                          OTP sent to <Text style={{ fontWeight: 'bold' }}>{email}</Text>
                        </Text>

                        <View style={{ marginHorizontal: 20, height: 45, backgroundColor: '#E5E5E5', marginTop: 20, borderRadius: 10 }}>
                          <TextInput style={{ marginHorizontal: 10, fontSize: 15 }}
                            placeholder="Enter OTP"
                            name="otp"
                            keyboardType='numeric'
                            onChangeText={(text) => this.handleVerificationInput(text)}
                            value={this.state.otp} />
                        </View>

                        <Text style={{
                          fontSize: 14,
                          fontWeight: 'bold',
                          marginTop: 15,
                          textAlign: 'center',
                          color: '#1e3a8a', textShadowOffset: { width: 1, height: 1 }, textShadowRadius: 1, textShadowColor: 'lightgray'
                        }}>Expire in: 1:20</Text>

                        <View style={{ borderWidth: 1, borderColor: 'lightgray', borderRadius: 11, marginHorizontal: 20, marginBottom: 30, marginTop: 50, elevation: 8 }}>
                          <View
                            style={{ backgroundColor: '#1e3a8a', height: 40, borderRadius: 10, alignItems: 'center', justifyContent: 'center', }}>

                            <TouchableOpacity style={{ width: '100%' }} onPress={() => this.onSubmitOTP()}>
                              <Text style={{
                                textAlign: 'center',
                                color: '#fff',
                                fontWeight: 'bold',
                                fontSize: 15, textShadowOffset: { width: 1, height: 1 }, textShadowRadius: 1, textShadowColor: 'lightgray'
                              }}>VERIFY AND PROCEED</Text>
                            </TouchableOpacity>
                          </View>
                        </View>
                      </View>
                    </View>
                  </>
                }
              </View>
            </ScrollView>
          </View >
        </View >
      </SafeAreaView >
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
export default connect(mapStateToProps)(Login);