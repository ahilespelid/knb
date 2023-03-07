import React, { useState } from 'react';
import {
    View,Text, SafeAreaView, TouchableOpacity,
    Platform, StyleSheet,
    TextInput, Alert,
    Button, StatusBar
} from 'react-native';
import NfcManager, { NfcTech } from 'react-native-nfc-manager';
import { Navbar } from './app/Navbar';
///*/ 
console.clear(); ///*/

const BAR_COLOR = '#3949ab';
const API_URL = 'https://ahilespelid.ru/knb/';

class App extends React.Component{
    constructor(props){
        super(props); this.state = { log: "Ready...", text: "" }

        this.push(('react-native-fs'));



    }

    push = async (data) => {
        fetch(API_URL, {
            method: 'POST', body: JSON.stringify(data),headers: {'Content-Type': 'application/json'}
        }).then(response => console.log(response.json())).catch(error => console.log(error))
    }

    cleanNfc = () => { NfcManager.cancelTechnologyRequest().catch(() => 0); }




    
    //componentDidMount(){NfcManager.start();}
    componentWillUnmount() { this._cleanUp(); }
    componentDidCatch(error, info) {
        var RNFS = require('react-native-fs');
        var path = RNFS.DocumentDirectoryPath + '/log.txt';
        console.log(path);

        RNFS.writeFile(path, 'Lorem ipsum dolor sit amet', 'utf8')
            .then((success) => {
                console.log('FILE WRITTEN!');
            })
            .catch((err) => {
                console.log(err.message);
            });
        console.log(error)
        console.log(info)
    }
/*
    readData = async () => {
        try {
            let tech = Platform.OS === 'ios' ? NfcTech.MifareIOS : NfcTech.NfcA;
            let resp = await NfcManager.requestTechnology(tech, {
                alertMessage: 'Ready to do some custom Mifare cmd!'
            });
            console.warn(12);
            let cmd = Platform.OS === 'ios' ? NfcManager.sendMifareCommandIOS : NfcManager.transceive;

            resp = await cmd([0x3A, 4, 4]);
            let payloadLength = parseInt(resp.toString().split(",")[1]);
            let payloadPages = Math.ceil(payloadLength / 4);
            let startPage = 5;
            let endPage = startPage + payloadPages - 1;

            resp = await cmd([0x3A, startPage, endPage]);
            bytes = resp.toString().split(",");
            let text = "";

            for (let i = 0; i < bytes.length; i++){
                if(i < 5){continue;}
                if(parseInt(bytes[i]) === 254){break;}
                text = text + String.fromCharCode(parseInt(bytes[i]));
            }

            this.setState({log: text});

            this._cleanUp();
        } catch (ex) {
            this.setState({
                log: ex.toString()
            })
            this._cleanUp();
        }
    }

    writeData = async () => {
        if (!this.state.text) {
            Alert.alert("Nothing to write");
            return;
        }
        try {
            let tech = Platform.OS === 'ios' ? NfcTech.MifareIOS : NfcTech.NfcA;
            let resp = await NfcManager.requestTechnology(tech, {
                alertMessage: 'Ready to do some custom Mifare cmd!'
            });

            let text = this.state.text;
            let fullLength = text.length + 7;
            let payloadLength = text.length + 3;

            let cmd = Platform.OS === 'ios' ? NfcManager.sendMifareCommandIOS : NfcManager.transceive;

            resp = await cmd([0xA2, 0x04, 0x03, fullLength, 0xD1, 0x01]); // 0x0C is the length of the entry with all the fluff (bytes + 7)
            resp = await cmd([0xA2, 0x05, payloadLength, 0x54, 0x02, 0x65]); // 0x54 = T = Text block, 0x08 = length of string in bytes + 3

            let currentPage = 6;
            let currentPayload = [0xA2, currentPage, 0x6E];

            for (let i = 0; i < text.length; i++) {
                currentPayload.push(text.charCodeAt(i));
                if (currentPayload.length == 6) {
                    resp = await cmd(currentPayload);
                    currentPage += 1;
                    currentPayload = [0xA2, currentPage];
                }
            }

            // close the string and fill the current payload
            currentPayload.push(254);
            while (currentPayload.length < 6) {
                currentPayload.push(0);
            }

            resp = await cmd(currentPayload);

            this.setState({
                log: resp.toString()
            })

            this._cleanUp();
        } catch (ex) {
            this.setState({
                log: ex.toString()
            })
            this._cleanUp();
        }
    }

    onChangeText = (text) => {
        this.setState({
            text
        })
    }
*/
    render() {
        return (
            <SafeAreaView style={styles.container}>
                <TextInput
                    style={styles.textInput}
                    onChangeText={this.onChangeText}
                    autoCompleteType="off"
                    autoCapitalize="none"
                    autoCorrect={false}
                    placeholderTextColor="#888888"
                    placeholder="Enter text here" />

                <TouchableOpacity
                    style={styles.buttonWrite}
                    onPress={this.writeData}>
                    <Text style={styles.buttonText}>Write</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.buttonRead}
                    onPress={this.readData}>
                    <Text style={styles.buttonText}>Read</Text>
                </TouchableOpacity>

                <View style={styles.log}>
                    <Text>{this.state.log}</Text>
                </View>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
    },
    textInput: {
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 10,
        height: 50,
        textAlign: 'center',
        color: 'black'
    },
    buttonWrite: {
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 10,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        backgroundColor: '#9D2235'
    },
    buttonRead: {
        marginLeft: 20,
        marginRight: 20,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        backgroundColor: '#006C5B'
    },
    buttonText: {
        color: '#ffffff'
    },
    log: {
        marginTop: 30,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
    }
});
export default App;

/*

export default function App() {

    const [ecran, setEcran] = useState('Home'); 
    
    const HomeE = (
        <View style={_.home}>
            <StatusBar backgroundColor={BAR_COLOR} />
            <Button title="Add chip" onPress={() => setEcran(ChipE)}></Button>
        </View>       
     );

    const ChipE = (     
        <View>
            <Navbar title="Scaning" mg="../assets/spinload.png" />
            <View style={_.chip}><Text>Пример текстого поля!</Text></View>
        </View>
    
        
     );

    return 'Home' == ecran ? HomeE : ecran;



}

const _ = StyleSheet.create({
    home: {
        flex: 1,
        backgroundColor: '#5c5c5c',
        color: '#000',
        alignItems: 'center',
        justifyContent: 'center',
    },
    chip: {
        width: 100,
        height: 100,
        marginTop: 5,
        backgroundColor: '#5c5c5c',
        color: '#000',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
*/