import { useState, useEffect } from 'react'
import Http from 'cryptoBuild/src/libs/http';
import Storage from 'cryptoBuild/src/libs/storage';
import { Alert } from 'react-native'

const useCoinDetailHook = (coin) => {


    const [coins, setCoins] = useState(coin)

    const [markets, setMarkets] = useState([])
    const [favorites, setFavorites] = useState(false)


    const toggleFavorite = () => {

        if(favorites === true) {
            removeFavorite()
        } else {
            addFavorite()
        }
    }

    const addFavorite = async () => {
        
        const coin = JSON.stringify(coins)

        const key = `favorite-${coins.id}`
        
        const stored = await Storage.instance.store(key, coin)
        
        
        
        if (stored) {
            setFavorites(true)
        }

    }


    const removeFavorite = async () => {


        Alert.alert("Remove favorite", "Are you sure?", [
            {
                text: "cancel",
                onPress: () => { },
                style: "cancel"
            },
            {
                text: "Remove",
                onPress: async () => {
                    const key = `favorite-${coins.id}`

                    await Storage.instance.remove(key)
                    setFavorites(false)
                },
                style: "destructive"
            }
        ])
    }


    const getFavorite = async () => {

        setFavorites(true)

        try {
            const key = `favorite-${coins.id}`;

            const favStr = await Storage.instance.get(key);
            console.log("fav", favStr);
            console.log("fav2", Storage.instance.get(key));

            if (favStr !== null) {
                setFavorites(true)
            } else {
                setFavorites(false)
            }

        } catch (err) {
            console.log("get favorites err", err);

            setFavorites(false)
        }
    }


    const getSymbolIcon = (name) => {

        if(name){
            const nameStr = name.toLowerCase().replace(" ", "-")

            return `https://c1.coinlore.com/img/25x25/${nameStr}.png`
        }
    }


    const getSections = (coin) => {
        const sections = [
            {
                title: "Market cap",
                data: [coin.market_cap_usd]
            },
            {
                title: "Volume 24h",
                data: [coin.volume24]
            },
            {
                title: "Change 24h",
                data: [coin.percent_change_24h]
            }
        ]

        return sections
    }

    const getMarkets = async (coinId) => {

        
        const url = `https://api.coinlore.net/api/coin/markets/?id=${coinId.id}`

        console.log("url", url);
        const markets = await Http.instance.get(url)


        setMarkets(markets)
    }

    useEffect(() => {
        getFavorite()
        getMarkets(coin)
    }, [])


    return [
        toggleFavorite,
        getSections,
        getSymbolIcon,
        markets,
        coins,
        favorites,
      ]
}

export default useCoinDetailHook