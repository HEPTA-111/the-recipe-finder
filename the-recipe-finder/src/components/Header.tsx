export default  function Header() {
    return (
        <header className="header">
            <h1 className="logo">The Recipe Finder</h1>
            <div  className="nav-links"> 
                <p>Favourites ❤️</p>
            </div>

            <div className="search-bar">
                <input type="text" className="search-input" placeholder="Search for recipes..." />
                <button className="search-button">Search</button>
            </div>
            
            <div className="nav-links">
                <p>About</p>

            </div>

        </header>
    );
}   