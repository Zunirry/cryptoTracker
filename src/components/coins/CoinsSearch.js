import React, { useState } from 'react'
import { TextInput, Platform, View, StyleSheet } from 'react-native'
import Colors from 'cryptoBuild/src/res/colors'


const CoinsSearch = (props) => {

    const [query, setQuery] = useState({})

    const handleText = (query) => {
        setQuery({ query })
    
        if(props.onChange){
           props.onChange(query)
        }
        
        console.log("props",props);
    }

    return (
        <View>
                <TextInput
                    style={[
                        styles.textInput,
                        Platform.OS == 'ios' ?
                            styles.textInputIOS :
                            styles.textInputAndroid
                    ]}
                    onChangeText={handleText}
                    value={query}
                    placeholder="Search coin"
                    placeholderTextColor="#ffff"
                />
            </View>
    )
}

const styles = StyleSheet.create({
    textInput: {
        height: 50,
        backgroundColor: Colors.charade,
        paddingLeft: 16,
        color: '#fff'
    },
    textInputAndroid: {
        borderWidth: 2,
        borderBottomColor: Colors.zircon
    },
    textInputIOS: {
        margin: 8,
        borderRadius: 8
    }
})

export default CoinsSearch