# 🍲 The Recipe Finder

A responsive web application built with React and TypeScript for searching, viewing, and saving favorite meal recipes using The Meal DB API.

---

## Features

* **Dynamic Recipe Fetching:** Displays a list of random recipes on the homepage using The Meal DB API.
* **Search Functionality:** Allows users to search for specific recipes by name.
* **Favorites System:** Users can add/remove recipes to a persistent favorites list.
* **Data Persistence:** Favorites are saved in the browser's Local Storage, surviving page refreshes.
* **Recipe Detail Modal:** Clicking "View Recipe" opens a responsive modal that fetches and displays full, formatted instructions and method.
* **Responsive Design:** Optimized CSS for seamless viewing across small phone screens to large desktop monitors.

---

## Tech Stack

* **Frontend Framework:** React
* **Language:** TypeScript
* **Bundler/Dev Tool:** Vite
* **Routing:** React Router DOM
* **State Management:** React Hooks (`useState`, `useEffect`)
* **Data Source:** The Meal DB API

---

## Local Setup and Installation

### Prerequisites

You must have Node.js (which includes npm) installed on your system.

### Installation

1.  **Clone the Repository:**
    ```bash
    git clone [YOUR_REPOSITORY_URL]
    cd the-recipe-finder
    ```

2.  **Install Dependencies:**
    ```bash
    npm install
    # OR if using Yarn: yarn install
    ```

3.  **Run in Development Mode:**
    ```bash
    npm run dev
    ```
    The application will be accessible at `http://localhost:5173/`.

---

##  Testing & Usage

The application includes the core functional features listed below.

### Feature Validation

| Feature | Action | Expected Result |
| :--- | :--- | :--- |
| **Persistence** | Add a recipe to favorites and refresh the page. | The recipe remains in the Favorites list. |
| **Search** | Enter "chicken" in the search bar and press Enter. | The displayed list updates to show chicken-based recipes. |
| **Modal** | Click the "View Recipe" button. | A blurred modal appears, fetching and displaying the full method/procedure text. |
| **Navigation** | Click "Favourites" in the header. | Page navigates to `/favorites`, and the header link changes to "Back Home". |

---

##  Deployment (Docker)

To build a production-ready, lightweight Docker image for deployment, follow these steps.

### 1. Build the Docker Image

The multi-stage build compiles the application and uses Nginx to serve the static files.

```bash
docker build -t recipe-finder-prod .



docker run -d -p 8080:80 recipe-finder-prod


Open your web browser and navigate to: http://localhost:8080
```