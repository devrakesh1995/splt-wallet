import React, { Component } from 'react';
import { connect } from 'react-redux';
import { userActions } from '../../_actions';
import { dashboardActions } from '../../_actions';

import { scaleRatio, Images } from '../../helpers/index';
import {
  View, Text, Dimensions, SafeAreaView, ScrollView,
  TouchableOpacity, TextInput, Image
} from 'react-native';
// import { ScrollView } from 'react-native-gesture-handler';
// conimport { history } from '../../_helpers/history';
const { height, width } = Dimensions.get('window')


class ContactUs extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      otp_code: '',
      showLogin: true,
      failureMSG: '',
      failureOTPMSG: '',
      formData: {
        "name": "",
        "mobile": "",
        "email": "",
        "message": ""
      }
    }
  }
  componentDidMount() {

  }
  static getDerivedStateFromProps(nextProps) {

    if (nextProps.dashboard.submitEnquirySuccess) {
      return {
        ...nextProps,
        formData: {
          "name": "",
          "mobile": "",
          "email": "",
          "message": ""
        }

      }
    }
    if (nextProps.dashboard.getEmployeeHappinessSuccess) {
      return {
        ...nextProps,
        trackMessage: 'You can see getEmployeeHappinessSuccess here!'

      }
    } else {
      return {
        ...nextProps
      }
    }

  }
  handleInput = (text, name) => {
    let { formData } = this.state;
    formData[name] = text;
    this.setState({ formData });
  }
  gotoIntroScreen = () => {
    this.props.navigation.navigate('Intro1')
  }

  handleLoginInput = (text) => {
    this.setState({ email: text })
  }

  submitContactDetails = () => {
    let { formData } = this.state
    this.props.dispatch(dashboardActions.saveEnqiry(formData, this.props));
  }

  onSubmitOTP = () => {
    const { users } = this.props;
    const { UserEmailToken } = users;
    if (this.state.otp !== 'NaN') {
      let data = {
        token: UserEmailToken,
        otp: this.state.otp
      }

      this.props.dispatch(userActions.validateOtp(data, this.props));
      this.props.navigation.navigate('Welcome')
    }
  }

  handleVerificationInput = (text) => {
    this.setState({ otp: text })
  }


  render() {
    let { formData } = this.state;
    let { dashboard } = this.props;
    let { clientProfile, getEmployeeHistoryData, getEmployeeTrackerListData } = dashboard;

    return (
      <SafeAreaView>
        <View style={{ height: '100%', backgroundColor: '#fff' }}>

          <View style={{ height: 50, paddingHorizontal: 20, width: '100%', flexDirection: 'row', alignItems: 'center', elevation: 8, backgroundColor: '#1e3a8a' }}>
            <TouchableOpacity onPress={() => this.props.navigation.goBack()} style={{ width: 30, }}>
              <Image source={require('../../Statics/img/Profile/goback.png')} style={{ height: 26, width: 26 }} />
            </TouchableOpacity>
            <Text style={{ fontSize: 20, marginLeft: 10, color: '#FFF', textShadowOffset: { width: 1, height: 1 }, textShadowRadius: 1, textShadowColor: 'lightgray' }}>Contact Us</Text>
          </View>
          {/* <View style={{ height: 50, paddingHorizontal: 20, width: '100%', flexDirection: 'row', alignItems: 'center', elevation: 8, backgroundColor: '#1e3a8a' }}>
              <TouchableOpacity onPress={() => this.props.navigation.goBack()} style={{}}>
                <Image source={require('../../Statics/img/Profile/back-arrow.png')} style={{ height: scaleRatio(3), width: scaleRatio(3), resizeMode: 'contain' }} />
              </TouchableOpacity>
              <Text style={{ fontSize: 20, marginLeft: 10, color: 'black', textShadowOffset: { width: 1, height: 1 }, textShadowRadius: 1, textShadowColor: 'lightgray' }}>Send  Coin</Text>
            </View> */}

          <>
            <ScrollView>
              <View style={{ height: height - 50 }}>
                <View >
                  <Text style={{ fontSize: 22, marginTop: 15, paddingLeft: 25, textShadowOffset: { width: 1, height: 1 }, }}>ContactUs</Text>
                </View>

                <View style={{ alignItems: 'center', backgroundColor: '#fff', }}>

                  <View style={{ backgroundColor: '#F6F6F6', width: width - 40, borderRadius: 18, elevation: 8, borderWidth: 1, borderColor: 'lightgray', marginTop: 20 }}>
                    <View style={{ borderRadius: 17, }}>
                      <View style={{ marginHorizontal: 20, height: 45, backgroundColor: '#E5E5E5', marginTop: 30, borderRadius: 10 }}>
                        <TextInput
                          style={{ marginHorizontal: 10, fontSize: 15 }}
                          placeholder="Name"
                          name="name"
                          value={formData.name}
                          onChangeText={(text) => this.handleInput(text, "name")}
                        />
                      </View>
                      <View style={{ marginHorizontal: 20, height: 45, backgroundColor: '#E5E5E5', marginTop: 20, borderRadius: 10 }}>
                        <TextInput
                          style={{ marginHorizontal: 10, fontSize: 15 }}
                          placeholder="Email Address"
                          name="email"
                          value={formData.email}
                          onChangeText={(text) => this.handleInput(text, "email")}
                        />
                      </View>
                      <View style={{ marginHorizontal: 20, height: 45, backgroundColor: '#E5E5E5', marginTop: 20, borderRadius: 10 }}>
                        <TextInput
                          style={{ marginHorizontal: 10, fontSize: 15 }}
                          placeholder="Mobile Number"
                          name="mobile"
                          keyboardType='numeric'
                          value={formData.mobile}
                          onChangeText={(text) => this.handleInput(text, "mobile")}
                        />
                      </View>

                      <View style={{ marginHorizontal: 20, height: 60, backgroundColor: '#E5E5E5', marginTop: 20, borderRadius: 10 }}>
                        <TextInput
                          style={{ marginHorizontal: 10, fontSize: 15 }}
                          placeholder="Message"
                          name="message"
                          value={formData.message}
                          onChangeText={(text) => this.handleInput(text, "message")}
                        />
                      </View>

                      <View style={{ borderRadius: 11, marginHorizontal: 20, marginBottom: 30, marginTop: 40, elevation: 8 }}>
                        <View
                          style={{ backgroundColor: '#1E90FF', height: 40, borderRadius: 10, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: 'lightgray' }}>

                          <TouchableOpacity style={{ width: '100%' }}
                            onPress={() => this.submitContactDetails()}>
                            <Text style={{
                              textAlign: 'center',
                              color: '#fff',
                              fontWeight: 'bold',
                              fontSize: 17,
                              textShadowOffset: { width: 1, height: 1 }, textShadowRadius: 1, textShadowColor: 'lightgray'

                            }}>Submit</Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </ScrollView>
          </>
        </View>
      </SafeAreaView >
    )
  }
}
function mapStateToProps(state) {
  // //console.log("state Home::::::::::::  ", state);
  const { loggingIn } = state.authentication;
  const { users, dashboard } = state;
  return {
    loggingIn,
    users,
    dashboard
  };
}
export default connect(mapStateToProps)(ContactUs);
