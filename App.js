
import React, { Component } from 'react';
import {
  Platform,
  LogBox,
  Text,
  View,
  TextInput,
  Button,
  StyleSheet,
  ToastAndroid,
  SafeAreaView,
  ScrollView,
  ActivityIndicator
} from 'react-native';

import { Formik } from 'formik';
import * as Yup from 'yup';

import "react-native-get-random-values"
import "@ethersproject/shims"
import { ethers } from 'ethers';


const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    marginTop: 100
  },
  container: {
    flex: 1,
    margin: 25,
    backgroundColor: "white"
  },
  text: {
    fontSize: 30,
    marginBottom: 50,
    backgroundColor: "#BB2CD9",
    color: "black",
    borderRadius: 15,
    textTransform: "uppercase"
  },
  labelText: {
    color: "white"
  },
  inputText: {
    borderBottomColor: "black",
    borderBottomWidth: 2,
  },
  textinput: {
    borderBottomColor: 'white',
    borderBottomWidth: 2,
    marginBottom: 25,
    color: "black"
  },
  headerWrapper: {
    padding: 10,
    marginTop: 50
  },
  header: {
    fontSize: 36,
    alignSelf: 'auto',
    color: 'black',
    textAlign: "center",
    marginBottom: 25
  },
  errors: {
    color: "red"
  },
  userContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: "5%"
  },
  item: {
    width: "50%"
  },
  input: {
    fontSize: 20,
    padding: 1,
  },
  label: {
    color: "black",
    fontSize: 21
  },
  horizontal: {
    flex: 1,
    justifyContent: "center",
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10
  },
  errors: {
    color: "red"
  }
})

//Schema to handle validation
const Schema = Yup.object().shape({ amount: Yup.number().required('Amount required'), address: Yup.string().required('Address required') });

export default class App extends Component {

  state = {
    wallet: undefined,
    balance: undefined,
    animating: false,
  }
  // Connect to Ethereum network using INFURA as the provider (Ropsten test network)
  provider = new ethers.providers.JsonRpcProvider('https://ropsten.infura.io/v3/81882f4e8d3141e1ab9bb811afe00af6');
  // Setting The mnemonic phrase for this wallet
  mnemonic = "phrase future tape thought addict emotion damage cliff road ten stem exit";

  constructor() {
    super();
    LogBox.ignoreLogs(["Setting a timer"]);
    // Bind the custom functions so the 'this' context is available to it.
    this.sendEth = this.sendEth.bind(this);
    this.balance = this.balance.bind(this);
    
    //
    // This function is set to run in the constructor to make sure it runs only o   nce
    // and not every time the component is re-mounted.
    this.balance();

  }


  balance() {
    // Most blockchain calls are asynchronous, so we're packing all of them within
    // a single anonymous async function.
    (async () => {

      const infuraWallet = ethers.Wallet.fromMnemonic(this.mnemonic);
      const connectedInfuraWallet = infuraWallet.connect(this.provider);

      // Get the wallet balance from the provider. The result is a BigNumber
      const balanceHex = await this.provider.getBalance(connectedInfuraWallet.address);
      // Convert the balance into ETH
      const balanceEth = ethers.utils.formatEther(balanceHex);
      // Update the state with new balance
      if (this.state.balance !== balanceEth) {
        this.setState(() => {
          return {
            balance: balanceEth,
            wallet: connectedInfuraWallet
          }
        });
      }

    })()

  }

  sendEth(e) {
    //Activating the loader to indicate the user that Transaction is processing
    this.setState({ animating: true });

    //assigning the input value to data 
    const data = {
      to: e.address,
      value: ethers.utils.parseEther(e.amount)
    };
    (async () => {

      //Binding the transaction call with try block to handle error
      try {
        // Send the transaction
        const tx = await this.state.wallet.sendTransaction(data);
        // Wait for confirmation
        const confirmedTx = await tx.wait();
        //after successful transaction the balance function is called to update the balance state
        this.balance();
        //Deactivating the loader to indicate the user that Transaction processed
        this.setState({ animating: false });
        //Setting up the toaster to show user about their transaction
        if (Platform.OS === 'android') {
          ToastAndroid.showWithGravity(
            "Transaction Success",
            ToastAndroid.SHORT,
            ToastAndroid.CENTER
          );
        } else {
          AlertIOS.alert(msg);
        }


      } catch (e) {
//Handle all kind of error 


        this.setState({ animating: false });
        if (Platform.OS === 'android') {
  //Setting up the toaster to show user about their transaction
          ToastAndroid.showWithGravity(
            "INVALID_ARGUMENT",
            ToastAndroid.SHORT,
            ToastAndroid.CENTER
          );
        } else {
          AlertIOS.alert(msg);
        }
      }
    })();
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView}>
          <View style={styles.outerContainer}>
            <View style={[styles.container]}>
              <View style={styles.userContainer}>
                <View style={styles.item}>
                  <Text style={styles.label}>User Balance : </Text>
                </View>
                <View style={styles.item}>
                  <Text style={styles.input}>{(Math.round(this.state.balance * 100) / 100).toFixed(4)} ETH </Text>
                </View>
              </View>
              <Formik
                initialValues={{ address: '', amount: '' }}
                validationSchema={Schema}
                onSubmit={values => { this.sendEth(values); return false; }
                }
              >
                {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                  <View style={styles.headerWrapper}>
                    <View style={styles.horizontal}>
                      < ActivityIndicator animating={this.state.animating} size="large" color="blue" />
                    </View>
                    <Text style={styles.header}> Send to User </Text>
                    <TextInput
                      style={styles.textinput}
                      underlineColorAndroid="transparent"
                      placeholder="Enter Recipient Address"
                      placeholderTextColor="black"
                      onChangeText={handleChange('address')}
                      onBlur={handleBlur('address')}
                      value={values.address}
                    />
                    {errors.address && touched.address ? (<Text style={styles.errors}>{errors.address}</Text>) : null}
                    <TextInput
                      style={styles.textinput}
                      underlineColorAndroid="transparent"
                      placeholder="Enter Amount"
                      placeholderTextColor="black"
                      onChangeText={handleChange('amount')}
                      onBlur={handleBlur('amount')}
                      value={values.amount}
                    />
                    {errors.amount && touched.amount ? (<Text style={styles.errors}>{errors.amount}</Text>) : null}
                    <Button onPress={handleSubmit} title="Submit" />
                  </View>
                )}
              </Formik>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    )
  }
}


