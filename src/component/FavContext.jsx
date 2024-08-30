// src/FavContext.js
import React, { createContext, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';


const FavContext = createContext();
export const useFav = () => {
    return useContext(FavContext);
};

export const FavProvider = ({ children }) => {
    const [favorites, setFavorites] = useState([]);
    const navigate = useNavigate();

    const addToFavorites = (coin) => {
        if (coin) {
            setFavorites(prevFavs => [...prevFavs, coin]);
            favorites.push(coin);
            alert("sucessfully added");
        }
    };

    const removeFromFavorites = (id) => {
        setFavorites(prevFavs => prevFavs.filter(coin => coin.id !== id));
    };

    return (
        <FavContext.Provider value={{ favorites, addToFavorites, removeFromFavorites }}>
            {children}
        </FavContext.Provider>
    );
};
