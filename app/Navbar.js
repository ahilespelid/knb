import React, { useState } from 'react';
import { NativeModules, StyleSheet, Text, View, Button, StatusBar, Image } from 'react-native';
import NfcManager from 'react-native-nfc-manager'

const BAR_COLOR = '#3949ab';

export const Navbar = (props) => {

    const ImgNFC = <Image source={require('../assets/nfc.png')} />;
    console.warn(NfcManager);
 
    return (
        <View style={_.navbar}>
            <StatusBar backgroundColor={BAR_COLOR} />
            <View style={_.navbarRow}><Button title="Re" onPress={() => { NativeModules.DevSettings.reload(); }}></Button></View> 
            <View style={_.navbarTitle}>
                <Text style={_.navbarText}>{props.title.toUpperCase()}</Text>
                {NfcManager.isEnabled ? ImgNFC : ''}
            </View>
        </View>  
     );
}


const _ = StyleSheet.create({
    navbar: {
        flexDirection: 'row',
        height: 70,
        width: '100%',
        backgroundColor: BAR_COLOR,
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingBottom: 10,
        borderBottomLeftRadius: 50
    },
    navbarRow: {
        width: '20%',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
    },
    navbarRowButton: {
        color: '#000',
        fontSize: 28,
    },
    navbarTitle: {
        width: '70%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    navbarText: {
        color: '#fff',
        fontSize: 18,
        paddingRight:5
    },
});
