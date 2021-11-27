import React, { Component } from 'react';
import { View, Text } from 'react-native';

class Tutorial extends Component {

    render() {

        const {t} = this.props;

        return (
            <View>
                 <Text>{'hello'}</Text>
            </View>
        )
    }
}

export default Tutorial