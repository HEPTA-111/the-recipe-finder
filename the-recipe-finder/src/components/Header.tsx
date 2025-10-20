import { Link, useLocation } from "react-router-dom"; 
import React from 'react';

interface HeaderProps {
    onSearchChange: (term: string) => void;
    onSearchSubmit: () => void; 
}

export default function Header({ onSearchChange, onSearchSubmit }: HeaderProps) {
    
    const location = useLocation();
    
    const isFavoritesPage = location.pathname === '/favorites'; 

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault(); 
        onSearchSubmit();
    };

    return (
        <header className="header">
            <div className="header-content">
                <h1>The Cook Book</h1>
                <div className="nav-links">
                    
                    {!isFavoritesPage && (
                        <Link to ="/favorites" className="nav-link">Favourites</Link>
                    )}
                    
                    {isFavoritesPage && (
                        <Link to={"/"} className="nav-link">Back Home</Link>
                    )}
                </div>
                <form className="search-bar" onSubmit={handleFormSubmit}>
                    <input 
                        type="text" 
                        className="search-input" 
                        placeholder="Search for recipes..." 
                        onChange={(e) => onSearchChange(e.target.value)} 
                    />
                    <button type="submit" className="search-button">Search</button>
                </form>
            </div>
        </header>
    );
}