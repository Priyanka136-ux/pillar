import 'react-native-gesture-handler';
import React from 'react';
//import {} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Transaction from './Transaction';
import Home from './Home';
import Mnemonic from './Mnemonic';
import { Provider } from 'react-redux';
import {store} from './Store/store';


const Stack = createStackNavigator();

export default function App() {
  return (

    <Provider store={store}>
      <NavigationContainer>
     
     
        <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
       
          <Stack.Screen name="Transaction" component={Transaction} />
          <Stack.Screen name="Mnemonic" component={Mnemonic} />
        
        </Stack.Navigator>
     
      </NavigationContainer>
        </Provider>

  

  );
}