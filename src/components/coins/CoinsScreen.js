import React from 'react'
import { View, FlatList, StyleSheet, ActivityIndicator } from 'react-native'
import CoinsItem from './CoinsItem'
import CoinsSearch from './CoinsSearch'
import Colors from 'cryptoBuild/src/res/colors'
import useCoinsHook from './hooks/useCoinsHook'


const CoinsScreen = (props) => {

    const [handlePress, handleSearch, coins, loading] = useCoinsHook(props)

    return (
        <View style={styles.container}>
                <CoinsSearch onChange={handleSearch} />
                {
                    loading &&
                    <ActivityIndicator 
                    color="#ffffff" 
                    size="large"
                    style={ styles.loader }
                    />
                }

                <FlatList
                    data={coins}
                    renderItem={({ item }) => ( 
                        <CoinsItem item={item} 
                        onPress={() => handlePress(item)}
                        />
                    )}
                />
            </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.blackPearl,
    },
    titleText: {
        color: '#fff',
        textAlign: 'center'
    },
    btn: {
        padding: 8,
        backgroundColor: 'blue',
        borderRadius: 8,
        margin: 16
    },
    btnText: {
        color: '#ffff',
        textAlign: 'center'
    },
    loader: {
        marginTop: 60
    }
})

export default CoinsScreen