import React, { useState, useEffect, useContext, createContext } from 'react';
import firebase from './firebase';
import { createUser } from './db';

const authContext = createContext();

export function ProvideAuth({ children }) {
    const auth = useProvideAuth();
    return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => {
    return useContext(authContext);
};

function useProvideAuth() {
    const [user, setUser] = useState(null);

    const handlerUser = (rawUser) => {
        if (rawUser) {
            const user = formatUser(rawUser);

            createUser(user.uid, user);
            setUser(user);
            return user;
        } else {
            setUser(false);
            return false;
        }
    };

    const signin = () => {
        return firebase
            .auth()
            .signInWithPopup(new firebase.auth.GoogleAuthProvider())
            .then((response) => handlerUser(response.user));
    };

    const signout = () => {
        return firebase
            .auth()
            .signOut()
            .then(() => handlerUser(false));
    };

    useEffect(() => {
        const unsubscribe = firebase.auth().onAuthStateChanged(handlerUser);

        return () => unsubscribe();
    }, []);

    return {
        user,
        signin,
        signout
    };
}


const formatUser = (user) => {
    return {
        uid: user.uid,
        email: user.email,
        name: user.displayName,
        provider: user.providerData[0].providerId,
        photoUrl: user.photoURL
    };
};