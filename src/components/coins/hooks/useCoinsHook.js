import React, { useState, useEffect} from 'react'
import Http from 'cryptoBuild/src/libs/http'

const useCoinsHook = (props) => {

    const [state, setState] = useState({
        coins: [],
        allCoins: [],
        loading: false
    })

    const getCoins = async () => {

        setState({
            loading: true
        })

        const res = await Http.instance.get("https://api.coinlore.net/api/tickers/")

        setState({
            coins: res.data,
            allCoins: res.data,
            loading: false
        })
    }

    const handlePress = (coin) => {
        props.navigation.navigate('CoinDetail', { coin })
    }

    console.log("ALL COINS", state.allCoins);

    const handleSearch = (query) => {
        const coinsFiltered = state.allCoins.filter((coin) => {
            return coin.name.toLowerCase().includes(query.toLowerCase()) || 
            coin.symbol.toLowerCase().includes(query.toLowerCase())
        })

        setState({
            ...state,
            coins: coinsFiltered
        })
    }

    useEffect(() => {
        getCoins()
    }, [])
    
    const { coins, loading } = state

    return [handlePress, handleSearch, coins, loading]
}

export default useCoinsHook