import React, { useState, useEffect } from 'react'
import Storage from 'cryptoBuild/src/libs/storage'

const useFavorites = (props) => {

    const [favorites, setFavorites] = useState([])


    const getFavorites = async () => {
        try {
            const allKeys = await Storage.instance.getAllKeys()
            const keys = allKeys.filter((key) => key.includes("favorite-"))

            const favs = await Storage.instance.multiGet(keys)


            const favorites = favs.map(fav => JSON.parse(fav[1]))


            setFavorites( favorites )

        } catch(err){
            console.log("getFavorites err", err);
        }
    }

    const handlePress = (coin) => {
        props.navigation.navigate("CoinDetail", { coin })
    }

    useEffect(() => {
        props.navigation.addListener('focus', getFavorites);

        return () => {
            props.navigation.removeListener('focus', getFavorites);
        };

    }, [])

    return [
        favorites,
        handlePress
    ]
}

export default useFavorites