import React from 'react'
import { View, FlatList, StyleSheet } from 'react-native'
import FavoritesEmptyState from './FavoritesEmptyState'
import CoinsItem from 'cryptoBuild/src/components/coins/CoinsItem'
import Colors from 'cryptoBuild/src/res/colors'
import useFavorites from './hooks/useFavorites'


const FavoritesScreen = (props) => {

    const [favorites, handlePress] = useFavorites(props)

    console.log("FAVORITES DATA", favorites);

    return (
        <View style={styles.container}>
            {
                favorites.length == 0 ?
                    <FavoritesEmptyState />
                    : null
            }
            {
                favorites.length > 0 ?
                    <FlatList
                        data={favorites}
                        renderItem={({ item }) => (
                            <CoinsItem item={item}
                                item={item}
                                onPress={() => handlePress(item)}
                            />
                        )}
                    />
                    : null
            }
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.charade,
        flex: 1
    },

})

export default FavoritesScreen