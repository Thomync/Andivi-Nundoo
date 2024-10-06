import React, { useState, useEffect } from 'react';
import { auth } from '../../firebase'; // Asegúrate de importar el auth
import Me from './me';
import Stars from './stars';

const Container = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                setUser(user);
            } else {
                setUser(null);
            }
        });
        return () => unsubscribe();
    }, []);

    return (
        <>
            <Me user={user} /> {/* Pasamos el usuario a Me */}
            <Stars userId={user ? user.uid : null} /> {/* Pasamos el userId a Stars */}
        </>
    );
};

export default Container;
