import {Link} from "react-router-dom";
export default function Header() {
    return (
        <header className="header">
            <div className="header-content">
                <h1>The Recipe Finder</h1>
                <div className="nav-links">
                    <Link to ="/Favorites">Favourites</Link>
                </div>
                <div className="search-bar">
                    <input type="text" className="search-input" placeholder="Search for recipes..." />
                    <button className="search-button">Search</button>
                </div>
            </div>
        </header>
    );
}