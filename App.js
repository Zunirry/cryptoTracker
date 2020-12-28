import React from 'react';
import { Image, StyleSheet } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import FavoritesStack from 'cryptoBuild/src/components/favorites/FavoritesStack.js'
import CoinsStack from 'cryptoBuild/src/components/coins/CoinsStack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Colors from 'cryptoBuild/src/res/colors'

const Tabs = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Tabs.Navigator
        tabBarOptions={{
          tintColor: '#fefefe',
          style: {
            backgroundColor: Colors.blackPearl,
          },
        }}>
        <Tabs.Screen
          name="Coins"
          component={CoinsStack}
          options={{
            tabBarIcon: ({size, color}) => (
              <Image
                style={{tintColor: color, width: size, height: size}}
                source={require('./src/assets/bank.png')}
              />
            ),
          }}
        />
        <Tabs.Screen
          style={styles.favorites}
          name="Favorites"
          component={FavoritesStack}
          options={{
            tabBarIcon: ({size, color}) => (
              <Image
                style={{tintColor: color, width: size, height: size}}
                source={require('./src/assets/star.png')}
              />
            ),
          }}
        />
      </Tabs.Navigator>
    </NavigationContainer>
  );
};


const styles = StyleSheet.create({
  favorites: {
    borderWidth: 2,
    borderColor: 'red',
    flex: 1
  }
})

export default App;
