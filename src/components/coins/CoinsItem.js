import React from 'react'
import { View, Text, Image, StyleSheet, Platform, Pressable } from 'react-native'
import Colors from 'cryptoBuild/src/res/colors'

const CoinsItem = ({item, onPress}) => {

    getImgArrow = () => {
        if(item.percent_change_1h > 0){
            return require('cryptoBuild/src/assets/arrow_up.png')
        } else {
            return require('cryptoBuild/src/assets/arrow_down.png')
        }
    }

    return (
        <Pressable onPress={onPress} style={styles.container} >

            <View style={styles.row}>
                <Text style={styles.symbolText}> {item.symbol} </Text>
                <Text style={styles.nameText}> {item.name} </Text>
                <Text style={styles.priceText}> {`$${item.price_usd}`} </Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.percentText}> {item.percent_change_1h} </Text>
                <Image
                    style={styles.icon}
                    source={getImgArrow()}
                />
            </View>

        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 16,
        borderBottomColor: Colors.zircon,
        borderBottomWidth: 1,
        paddingLeft: Platform.OS == 'ios' ? 0 : 16,
        marginLeft: Platform.OS == 'ios' ? 16 : 0
    },
    row: {
        flexDirection: 'row'
    },
    symbolText: {
        color: '#ffffff',
        fontWeight: 'bold',
        fontSize: 16
    },
    nameText: {
        color: '#ffffff',
        fontSize: 14,
        marginRight: 16
    },
    priceText: {
        color: '#ffff',
        fontSize: 14
    },
    percentText: {
        color: '#fff',
        fontSize: 12,
        marginRight: 8
    },
    icon: {
        width: 22,
        height: 22
    }
})

export default CoinsItem