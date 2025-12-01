/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState } from 'react';
import {
    Alert,
    Button,
    StyleSheet,
    Text,
    View,
    ScrollView,
    Image
} from 'react-native';
import Auth0 from 'react-native-auth0';

import config from './auth0-configuration';
const auth0 = new Auth0(config);

interface UserInfo {
    [key: string]: any;
}

const App = () => {
    let [accessToken, setAccessToken] = useState<string | null>(null);
    let [userInfo, setUserInfo] = useState<UserInfo | null>(null);

    const onLogin = () => {
        auth0.webAuth
            .authorize({}, { ephemeralSession: true })
            .then(credentials => {
                setAccessToken(credentials.accessToken);
                // Get user info from the ID token
                return auth0.auth.userInfo({ token: credentials.accessToken });
            })
            .then(user => {
                setUserInfo(user);
            })
            .catch(error => console.log('Login error:', error));
    };

    const onLogout = () => {
        auth0.webAuth
            .clearSession({})
            .then(() => {
                Alert.alert('Logged out!');
                setAccessToken(null);
                setUserInfo(null);
            })
            .catch(() => {
                console.log('Log out cancelled');
            });
    };

    let loggedIn = accessToken !== null;

    if (loggedIn && userInfo) {
        return (
            <ScrollView style={styles.scrollContainer}>
                <View style={styles.profileContainer}>
                    <Text style={styles.header}>Profile</Text>

                    {userInfo.picture && (
                        <Image
                            source={{ uri: userInfo.picture }}
                            style={styles.profileImage}
                        />
                    )}

                    <View style={styles.claimsContainer}>
                        {Object.keys(userInfo).map((key) => (
                            <View key={key} style={styles.claimRow}>
                                <Text style={styles.claimKey}>{key}:</Text>
                                <Text style={styles.claimValue}>
                                    {typeof userInfo[key] === 'object'
                                        ? JSON.stringify(userInfo[key], null, 2)
                                        : String(userInfo[key])}
                                </Text>
                            </View>
                        ))}
                    </View>

                    <View style={styles.buttonContainer}>
                        <Button onPress={onLogout} title="Log Out" />
                    </View>
                </View>
            </ScrollView>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Auth0Sample - Login</Text>
            <Text>You are not logged in.</Text>
            <View style={styles.buttonContainer}>
                <Button onPress={onLogin} title="Log In" />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF'
    },
    scrollContainer: {
        flex: 1,
        backgroundColor: '#F5FCFF'
    },
    profileContainer: {
        flex: 1,
        padding: 20,
        paddingTop: 60
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        alignSelf: 'center',
        marginBottom: 20
    },
    claimsContainer: {
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        padding: 15,
        marginBottom: 20
    },
    claimRow: {
        marginBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
        paddingBottom: 10
    },
    claimKey: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#333333',
        marginBottom: 5
    },
    claimValue: {
        fontSize: 14,
        color: '#666666'
    },
    buttonContainer: {
        marginTop: 10
    }
});

export default App;