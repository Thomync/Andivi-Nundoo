import React, { useState, useEffect } from 'react';
import { auth, provider, signInWithPopup, signOut } from '../../firebase';
import Style from '../css/me.module.css';

function Me({ user: propUser, userId }) { // Aceptar userId como prop
    const [currentUser, setCurrentUser] = useState(null);

    const handleLogin = async () => {
        try {
            await signInWithPopup(auth, provider);
        } catch (error) {
            console.error("Error al iniciar sesión", error);
        }
    };

    const handleLogout = async () => {
        try {
            await signOut(auth);
        } catch (error) {
            console.error("Error al cerrar sesión", error);
        }
    };

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setCurrentUser(user);
        });
        return () => unsubscribe();
    }, []);

    return (
        <section className={Style.sectionContainer}>
            {!currentUser ? (
                <div className={Style.log}>
                    <p>Please log in to see your account details.</p>
                    <button onClick={handleLogin} className={Style.googleButton}>
                        Sign in with
                        {/* Icono de Google */}
                    </button>
                </div>
            ) : (
                <div className={Style.userInfo}>
                    <p>Welcome, {currentUser.displayName}!</p>
                    <img src={currentUser.photoURL} alt="User profile" />
                    <button onClick={handleLogout} className={Style.signOutButton}>Log out</button>
                </div>
            )}
        </section>
    );
}

export default Me;
