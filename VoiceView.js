import React, {Fragment, useState,useRef,useEffect, Component} from 'react';
import { Text } from 'react-native';
import AsyncStorage  from '@react-native-community/async-storage';

class VoiceView extends Component {
    txt;
    componentDidMount(){
        this.init();
    }
    async init(){
        console.log('ots in');
        this.txt = await AsyncStorage.getItem('fullDatePayday');
        console.log('lol bro' + this.txt);
    }
    render() {
    
    return (
      <Text>{this.txt}</Text>
    );
  }
}

export default VoiceView;

