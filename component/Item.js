import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Image} from 'react-native';

export const Item = (props) => {
    return(
        <View style ={itemStyles.item}>
            <View style = {itemStyles.row}>
                <Text style={itemStyles.text}>{props.category}</Text>
                <Text style={itemStyles.text}>{props.amount}</Text>
            </View>
            <TouchableOpacity>
                <Image style ={itemStyles.icon} source={require('../assets/times-circle-solid.png')} />
            </TouchableOpacity>
        </View>
    )
}

const itemStyles = StyleSheet.create({
    item : {
        padding: 10,
        display: 'flex',
        flexDirection : 'row',
        justifyContent: 'space-between'
    },
    text: {
        fontSize: 16,
        color: 'black'
    },
    row: {
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'space-between',
        paddingRight: 10,
    },
    icon: {
        width: 25,
        height: 25
    }
})