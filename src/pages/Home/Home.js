import React, { Component } from 'react';
import moment from 'moment';
import Clipboard from '@react-native-community/clipboard';
import { connect } from 'react-redux';
import { CONST } from '../../_config';
import { dashboardActions } from '../../_actions';
import { userActions } from '../../_actions';
import { alertActions } from '../../_actions';
import {
  StyleSheet, View, Text, ScrollView,
  Image, TouchableOpacity, FlatList, Linking, SafeAreaView, Dimensions, RefreshControl
} from 'react-native';
import { scaleRatio } from '../../helpers/index';
import colors from '../../config/colors';

const screenWidth = Dimensions.get("window").width;

const { width, height } = Dimensions.get('window');

const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      address: '',
      amount: '',
      otp_code: '',
      showLogin: true,
      failureMSG: '',
      failureOTPMSG: '',
      showDetails: false,
      showQRScanner: false,
      refreshing: false
    }
  }


  onRefresh = () => {
    this.setState({ refreshing: true })
    this.props.dispatch(dashboardActions.getClientProfile());

    setTimeout(() => {
      this.setState({ refreshing: false })

    }, 3000);
    // wait(1000).then(() => refreshing(false));
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.users.sendCoinSuccess) {
      return {
        ...nextProps,
        address: '',
        amount: '',
        otp_code: '',

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

  onSuccess = e => {
    this.setState({ showQRScanner: false, address: e.data });
  };

  handleLoginInput = (name, text) => {
    this.setState({ [name]: text })
  }

  onGetOTP = () => {
    let data = {
      username: this.state.email
    }
    this.props.dispatch(userActions.userlogin(data, this.props));
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
    }
  }

  async componentDidMount() {

    this.props.dispatch(dashboardActions.getClientProfile());
    this.props.dispatch(dashboardActions.getPriceHistory())
    this.props.dispatch(userActions.getTransactions());

    this.props.dispatch(userActions.navigationSave(this.props));
    const { navigation } = this.props;

    this._unsubscribe = navigation.addListener('focus', async () => {
      let { users } = this.props;



      let header = new Headers({
        'Content-Type': 'application/json',
        "Authorization": users ? "Bearer " + users.token : null
      });
      const requestOptions = {
        method: "POST",
        headers: header
      }
      fetch(CONST.BACKEND_URL + `/overView`, requestOptions)
        .then(response => response.json())
        .then(data => {
          if (data && data.code === 3) {
            this.props.navigation.navigate("Login")
          }
        });

      this.props.dispatch(userActions.getTransactions());
      this.props.dispatch(dashboardActions.getPriceHistory())
    });
    let { users } = this.props;

    let header = new Headers({
      'Content-Type': 'application/json',
      "Authorization": users ? "Bearer " + users.token : null
    });
    const requestOptions = {
      method: "POST",
      headers: header
    }
    fetch(CONST.BACKEND_URL + `/overView`, requestOptions)
      .then(response => response.json())
      .then(data => {
        if (data && data.code === 3) {
          this.props.navigation.navigate("Login")
        }
      });

  }
  componentWillUnmount() {
    this._unsubscribe();
  }

  sendFrom = (e) => {
    let { address, amount } = this.state;
    this.props.dispatch(userActions.sendOtpTX({ address, amount, comment: "Send" }, this));
    this.setState({ temp: "asdf" })
  }

  sendFromWithOTP = (e) => {
    let { address, amount, otp } = this.state;
    this.props.dispatch(userActions.sendFromWithOTP({ address, amount, otp, comment: "Send" }, this));
    this.setState({ temp: "asdf" })
  }

  handleVerificationInput = (text) => {
    this.setState({ otp: text })
  }

  copyClipBoard = (text) => {
    Clipboard.setString(text);
    this.props.dispatch(alertActions.success("Copied successfully!"));

  }

  render() {
    let { dashboard, users } = this.props;
    let { address, amount, failureMSG } = this.state;
    let { clientProfile } = dashboard;
    let { transaction, } = clientProfile ? clientProfile : {};
    let { getPriceHistory } = dashboard;
    let { getTxData } = users;

    // console.log("transactiontransaction-----------------------", getTxData);

    return (

      <SafeAreaView >
        <View style={{ width: width, height: height - 55, backgroundColor: '#1e3a8a', }}>
          <View style={{ flex: 1, }} >

            <View style={{ height: 50, paddingHorizontal: 20, width: '100%', flexDirection: 'row', alignItems: 'center', elevation: 8, backgroundColor: '#1e3a8a' }}>
              <TouchableOpacity onPress={() => this.props.navigation.toggleDrawer()} style={{ width: 25 }}>
                <Image source={require('../../Statics/img/Wallet/menu.png')} style={{ height: scaleRatio(3), width: scaleRatio(3), resizeMode: 'contain', backgroundColor: '#1e3a8a' }} />
              </TouchableOpacity>
              <Text style={{ fontSize: 19, marginLeft: 10, color: '#fff', textShadowOffset: { width: 1, height: 1 }, textShadowRadius: 1, textShadowColor: 'lightgray' }}>SPLT</Text>
            </View>

            <ScrollView
              style={{ flex: 1 }}
              refreshControl={
                <RefreshControl
                  refreshing={this.state.refreshing}
                  onRefresh={this.onRefresh}
                />
              }
            >

              <View style={{ flex: 1, backgroundColor: '#fff' }}>
                <Text style={{ fontSize: 19, marginLeft: 22, marginTop: 15, color: 'black', textShadowOffset: { width: 1, height: 1 }, textShadowRadius: 1, textShadowColor: 'lightgray' }}>Wallet</Text>

                <View style={{ backgroundColor: '#1e3a8a', width: width - 40, alignSelf: 'center', height: 160, marginTop: 15, borderRadius: 10, elevation: 8, borderWidth: 1, borderColor: '#131313' }}>
                  <View style={{ flex: 1, borderRadius: 9, borderWidth: 1, borderColor: '#1e3a8a', justifyContent: 'center', alignItems: 'center' }}>
                    <Image style={{ width: 50, height: 50 }} source={require('../../images/spltwhite.png')} />
                    <View style={{ flexDirection: 'row' }}>
                      <Text style={{ fontSize: 24, fontWeight: 'bold', marginTop: 5, color: '#fff', textShadowOffset: { width: 1, height: 1 }, textShadowRadius: 1, textShadowColor: 'lightgray' }}>{clientProfile ? clientProfile.balance : 0}</Text>
                      <Text style={{ fontSize: 14, fontWeight: 'normal', marginLeft: 5, marginTop: 15, color: '#FFF', textShadowOffset: { width: 1, height: 1 }, textShadowRadius: 1, textShadowColor: 'lightgray' }}>SPLT</Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%', paddingHorizontal: 15 }}>
                      <Text style={{ fontSize: 13, fontWeight: 'normal', marginTop: 10, color: 'white', textShadowOffset: { width: 1, height: 1 }, textShadowRadius: 1, textShadowColor: 'lightgray' }}>Estimated total amount: </Text>
                      <Text style={{ fontSize: 13, fontWeight: 'normal', marginTop: 10, color: 'white', textShadowOffset: { width: 1, height: 1 }, textShadowRadius: 1, textShadowColor: 'lightgray' }}>{clientProfile ? clientProfile.dollerbalance : 0} USD</Text>
                    </View>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%', paddingHorizontal: 15 }}>
                      <Text style={{ fontSize: 13, fontWeight: 'normal', marginTop: 10, color: 'white', textShadowOffset: { width: 1, height: 1 }, textShadowRadius: 1, textShadowColor: 'lightgray' }}>Last Txid: </Text>
                      <Text style={{ fontSize: 13, fontWeight: 'normal', marginTop: 10, color: '#fff', textShadowOffset: { width: 1, height: 1 }, textShadowRadius: 1, textShadowColor: 'lightgray' }}>

                        {
                          getTxData && getTxData.lastTxData && getTxData.lastTxData.txId ?
                            <Text onPress={() => { Linking.openURL('https://explorer.splt.live/tx/' + getTxData.lastTxData.txId) }}
                              style={{
                                fontSize: 12, fontWeight: 'bold', color: '#FFFF', textShadowOffset:
                                  { height: 1 }, textShadowRadius: 1, textShadowColor: 'lightgray'
                              }}>
                              {getTxData && getTxData.lastTxData.txId ? getTxData.lastTxData.txId.substring(0, 17) + "..." : "XXX"}</Text>
                            : null}
                      </Text>
                    </View>
                  </View>
                </View>

                <Text style={{ fontSize: 19, marginLeft: 22, marginTop: 15, color: '#000', textShadowOffset: { width: 1, height: 1 }, textShadowRadius: 1, textShadowColor: 'lightgray' }}>Transactions</Text>
                <Text style={{ fontSize: 13, marginLeft: 22, }}>(Last 5 transaction)</Text>

                <View style={{ width: width - 30, alignSelf: 'center', marginTop: 10, borderTopLeftRadius: 10, borderTopRightRadius: 10, borderWidth: 1, borderColor: 'lightgray', marginBottom: 40 ,}}>
                  <View style={{ height:242, borderTopLeftRadius: 9, borderTopRightRadius: 9, borderWidth: 1, borderColor: 'lightgray', justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFF' }}>

                    <View style={{ flexDirection: 'row', marginTop: 40, backgroundColor: '#1e3a8a', height: 40, borderTopLeftRadius: 9, borderTopRightRadius: 9 }}>

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

                    <View style={{ borderBottomColor: 'lightgrey', }}>
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
                              }}>{moment(item.time * 1000).format('YYYY-MM-DD  HH:mm')}</Text>
                            </View>
                          </View>
                        )}
                      />
                    </View>
                  </View>
                </View>

              </View>
            </ScrollView>
          </View>
        </View >
      </SafeAreaView >

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
const styles = StyleSheet.create({
  screen: {

    backgroundColor: colors.light,
    padding: 6

  },
  itemContainer: {

    marginRight: 16,
    marginLeft: 6
  },
  item: {
    flex: 1,
    margin: 3,
    backgroundColor: 'lightblue',
  }
});
export default connect(mapStateToProps)(Home);
