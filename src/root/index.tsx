import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import MainPage from '../pages/main';
import Details from '../pages/details';
import { AppRoutes } from './routes';

const Stack = createNativeStackNavigator();

export default function Root() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName={AppRoutes.HOME}>
                <Stack.Screen name={AppRoutes.HOME} component={MainPage} />
                <Stack.Screen name={AppRoutes.DETAILS} component={Details} />
            </Stack.Navigator>
        </NavigationContainer>

    );
};
