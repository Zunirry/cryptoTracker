import React from 'react'
import { View, Text, Image, Pressable, SectionList, FlatList, StyleSheet } from 'react-native'
import Colors from 'cryptoBuild/src/res/colors'
import CoinMarketItem from './CoinMarketItem'
import useCoinDetailHook from './hooks/useCoinDetailHook'


const CoinDetailScreen = (props) => {
    const { coin } = props.route.params

    const [
        toggleFavorite, 
        getSections, 
        getSymbolIcon, 
        markets, 
        coins, 
        favorites
        ] = useCoinDetailHook(coin)

        console.log("favorites", favorites);
    return (
        <View style={styles.container}>
            <View style={styles.subHeader}>
                <View style={styles.row}>

                    <Image
                        style={styles.iconImg}
                        source={{ uri: getSymbolIcon(coins.name) }}
                        
                    />
                    <Text style={styles.titleText}> {coins.name} </Text>

                </View>

                <Pressable
                    onPress={toggleFavorite}
                    style={[
                        styles.btnFavorites,
                        favorites === true ?
                            styles.btnFavoritesRemove :
                            styles.btnFavoritesAdd
                    ]}
                >

                    <Text style={styles.btnFavoritesText}>{favorites === true ? "Remove favorite" : "Add favorite"}</Text>
                </Pressable>
            </View>

            <SectionList
                style={styles.section}
                sections={getSections(coins)}
                keyExtractor={(item) => item}
                renderItem={({ item }) =>
                    <View style={styles.sectionItem}>
                        <Text style={styles.itemText}> {item} </Text>
                    </View>
                }
                renderSectionHeader={({ section }) =>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionText}> {section.title} </Text>
                    </View>
                }
            />

            <Text style={styles.marketsTitle}>Markets</Text>

            <FlatList
                style={styles.list}
                horizontal={true}
                data={markets}
                renderItem={({ item }) => <CoinMarketItem item={item} />}
                keyExtractor={( item ) => `${item.quote} ${item.base} ${item.name}`}
            />

        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.charade
    },
    row: {
        flexDirection: 'row'
    },
    subHeader: {
        backgroundColor: "rgba(0, 0, 0, 0.1)",
        padding: 16,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    titleText: {
        fontWeight: 'bold',
        fontSize: 16,
        color: Colors.white,
        marginLeft: 8
    },
    iconImg: {
        width: 25,
        height: 25
    },
    section: {
        maxHeight: 220
    },
    list: {
        maxHeight: 100,
        paddingLeft: 16
    },
    sectionHeader: {
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        padding: 8
    },
    sectionItem: {
        padding: 8
    },
    itemText: {
        color: Colors.white,
        fontSize: 14
    },
    sectionText: {
        color: Colors.white,
        fontWeight: 'bold',
        fontSize: 14
    },
    marketsTitle: {
        color: Colors.white,
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 16,
        marginLeft: 16
    },
    btnFavorites: {
        padding: 8,
        borderRadius: 8
    },
    btnFavoritesText: {
        color: Colors.white
    },
    btnFavoritesAdd: {
        backgroundColor: Colors.picton
    },
    btnFavoritesRemove: {
        backgroundColor: Colors.carmine
    }
})

export default CoinDetailScreen