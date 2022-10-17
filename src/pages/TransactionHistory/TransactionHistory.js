import React, { Component } from 'react';
import { connect } from 'react-redux';
import { userActions } from '../../_actions';
import { dashboardActions } from '../../_actions';
import moment from 'moment';

import {
  View, Text, Dimensions, Linking,
  TouchableOpacity, TextInput, Image, FlatList
} from 'react-native';
const { height, width } = Dimensions.get('window')


class TransactionHistory extends Component {
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

    // this.props.dispatch(userActions.getTransactions());
    this.props.dispatch(dashboardActions.getClientProfile());
    this.props.dispatch(userActions.getTransactions());
    this.props.dispatch(dashboardActions.getClientProfile());
    this.props.dispatch(dashboardActions.getPriceHistory())

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
    let { dashboard, users } = this.props;
    let { getPriceHistory, clientProfile, getEmployeeHistoryData, getEmployeeTrackerListData, getTransactions } = dashboard;
    let { transaction, } = clientProfile ? clientProfile : {};
    let { getTxData } = users;

    // console.log('transaction=====================', transaction);

    return (

      <View style={{ width: width, height: height, backgroundColor: '#FFF', }}>
        <View style={{ flex: 1, }} >

          <View style={{ height: 50, paddingHorizontal: 15, flexDirection: 'row', alignItems: 'center', elevation: 8, backgroundColor: '#1e3a8a', paddingBottom: 5 }}>
            <TouchableOpacity onPress={() => this.props.navigation.goBack()} style={{ width: 30, }}>
              <Image style={{ height: 26, width: 26 }} source={require('../../Statics/img/Profile/goback.png')} />
            </TouchableOpacity>
            <Text style={{ fontSize: 20, fontWeight: 'bold', marginLeft: 10, color: '#FFF', textShadowOffset: { width: 1, height: 1 }, textShadowRadius: 1, textShadowColor: 'lightgray' }}>Transaction History</Text>
          </View>

          <View style={{}}>
            <Text style={{ fontSize: 18, marginTop: 18, paddingLeft: 20, color: '#000', textShadowOffset: { width: 1, height: 1 }, textShadowRadius: 1, textShadowColor: 'lightgray' }}>Transactions History</Text>
            <Text style={{ fontSize: 13, marginLeft: 22, }}>(Last 5 transaction)</Text>

            <View style={{ width: width - 30, alignSelf: 'center', height: '54%', marginTop: 10, borderTopLeftRadius: 10, borderTopRightRadius: 10, borderWidth: 1, borderColor: 'lightgray', marginBottom: 40 }}>
              <View style={{ flex: 1, borderTopLeftRadius: 9, borderTopRightRadius: 9, borderWidth: 1, borderColor: 'lightgray', justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFF' }}>

                <View style={{ flexDirection: 'row', marginHorizontal: 0, marginTop: 40, backgroundColor: '#1e3a8a', height: 40, borderTopLeftRadius: 9, borderTopRightRadius: 9 }}>

                  <View style={{ height: '100%', width: '30%', justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontSize: 12, fontWeight: 'bold', color: 'white', textShadowOffset: { width: 1, height: 1 }, textShadowRadius: 1, textShadowColor: 'lightgray' }}>TXID</Text>
                  </View>

                  <View style={{ height: '100%', width: '25%', borderLeftColor: 'lightgray', borderLeftWidth: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontSize: 12, fontWeight: 'bold', color: 'white', textShadowOffset: { width: 1, height: 1 }, textShadowRadius: 1, textShadowColor: 'lightgray' }}>TYPE</Text>
                  </View>

                  <View style={{ height: '100%', width: '45%', borderLeftColor: 'lightgrey', borderLeftWidth: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontSize: 12, fontWeight: 'bold', color: 'white', textShadowOffset: { width: 1, height: 1 }, textShadowRadius: 1, textShadowColor: 'lightgray' }}>TIME(GMT)</Text>
                  </View>
                </View>

                <View style={{ borderBottomColor: 'lightgrey', marginBottom: 5 }}>
                  <FlatList
                    data={transaction}
                    keyExtractor={(transaction) => transaction.txid.toString()}
                    numColumns={1}
                    renderItem={({ item, index }) => (

                      <View style={{ flexDirection: 'row', height: 40, borderTopWidth: 1, borderTopColor: 'lightgrey' }}>
                        <View style={{ height: '100%', width: '30%', justifyContent: 'center', alignItems: 'center' }}   >
                          <Text onPress={() => { Linking.openURL('https://explorer.splt.live/tx/' + item.txid) }} style={{ fontSize: 12, fontWeight: 'bold', color: '#1E90FF', textShadowOffset: { width: 1, height: 1 }, textShadowRadius: 1, textShadowColor: 'white' }}>{item && item.txid ? item.txid.substring(0, 8) + "..." : "XXX"}</Text>
                        </View>

                        <View style={{ height: '100%', width: '25%', borderLeftColor: 'lightgrey', borderLeftWidth: 1, justifyContent: 'center', alignItems: 'center' }}>
                          <Text style={{ fontSize: 12, fontWeight: 'bold', color: item.category == 'send' ? 'gray' : '#32CD32', textShadowOffset: { width: 1, height: 1 }, textShadowRadius: 1, textShadowColor: 'lightgray' }}>{item && item.category ? item.category : ""}</Text>
                        </View>

                        <View style={{ height: '100%', width: '45%', borderLeftColor: 'lightgrey', borderLeftWidth: 1, justifyContent: 'center', alignItems: 'center' }}>
                          <Text style={{
                            fontSize: 12, color: 'gray',
                            fontWeight: 'bold', textShadowOffset: { width: 1, height: 1 }, textShadowRadius: 1, textShadowColor: 'white'
                          }}>{moment(item.time * 1000).format('YYYY-MM-DD  HH:MM')}</Text>
                        </View>
                      </View>
                    )}
                  />

                </View>
              </View>
            </View>
            
          </View>
        </View>
      </View >
    )
  }
}
function mapStateToProps(state) {

  const { loggingIn } = state.authentication;
  const { users, dashboard } = state;
  return {
    loggingIn,
    users,
    dashboard
  };
}
export default connect(mapStateToProps)(TransactionHistory);
