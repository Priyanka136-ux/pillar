
import React, { Component } from 'react';
import {
    Platform,
    Text,
    View,
    TextInput,
    Button,
    StyleSheet,
    ToastAndroid,
    SafeAreaView,
    ScrollView,
    ActivityIndicator,
} from 'react-native';

import { Formik } from 'formik';
import * as Yup from 'yup';

import "react-native-get-random-values"
import "@ethersproject/shims"

import { connect } from 'react-redux';
import * as Types from './Store/types';
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
    input: {
        fontSize: 20,
        padding: 1,
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
const Schema = Yup.object().shape({ mnemonic: Yup.string().min(15, 'Please Enter Atleast 15 Letters').required('Mnemonic required') });


const mapStateToProps = state => state;
const mapDispatchToProps = dispatch => ({
    mnemonicChange: mnemonic => dispatch({
        type: Types.MNEMONIC_CHANGE, payload: {
            mnemonic
        }
    })
});
const connectComponent = connect(mapStateToProps, mapDispatchToProps);

class Mnemonic extends Component {
    constructor(props) {
        super(props);
        this.saveMnemonic = this.saveMnemonic.bind(this);
    }

    saveMnemonic(values) {
        this.props.mnemonicChange(values.mnemonic);
        if (Platform.OS === 'android') {
            ToastAndroid.showWithGravity(
                "Mnemonic updated successfully",
                ToastAndroid.SHORT,
                ToastAndroid.CENTER
            );
        } else {
            AlertIOS.alert(msg);
        }
       
    }

    render() {
        return (

            <SafeAreaView style={styles.container}>
                <ScrollView style={styles.scrollView}>
                    <View style={styles.outerContainer}>
                        <View style={[styles.container]}>
                            {/* Add Mnemonic pharse of Account */}
                            <Formik
                                initialValues={{ mnemonic: '' }}
                                validationSchema={Schema}
                                onSubmit={values => {
                                    this.saveMnemonic(values);
                                }
                                }
                            >
                                {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                                    <View style={styles.headerWrapper}>
                                        <View style={styles.horizontal}>
                                        </View>
                                        <Text style={styles.header}> Enter Mnemonic</Text>
                                        <TextInput
                                            style={styles.textinput}
                                            underlineColorAndroid="transparent"
                                            placeholder="Enter Mnemonic"
                                            placeholderTextColor="black"
                                            onChangeText={handleChange('mnemonic')}
                                            onBlur={handleBlur('mnemonic')}
                                            value={values.mnemonic}
                                        />
                                        {errors.mnemonic && touched.mnemonic ? (<Text style={styles.errors}>{errors.mnemonic}</Text>) : null}
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



export default connectComponent(Mnemonic)