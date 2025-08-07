graph TD
    subgraph "Restaurant API Routes"
        A[GET /api/restaurant/offers] --> B{Get all offers};
        C[GET /restaurants] --> D{Get all restaurants};
        E[POST /restaurants] --> F{Create a new restaurant (admin)};
        G[POST /restaurants/bulk] --> H{Create multiple new restaurants (admin)};
        I[POST /api/restaurant/offers/bulk] --> J{Create multiple new offers (admin)};
        K[GET /api/restaurant/cart] --> L{Get all items in cart};
        M[GET /restaurants/:id] --> N{Get a specific restaurant by ID};
        O[POST /restaurants/:id/food-items] --> P{Add food items to a restaurant (admin)};
        Q[POST /api/restaurant/addtocart] --> R{Add item to cart};
        S[POST /api/restaurant/placeorder] --> T{Place a new order};
    end

    subgraph "Authentication"
        B -- "auth()" --> B_auth;
        D -- "auth()" --> D_auth;
        F -- "auth(['admin'])" --> F_auth;
        H -- "auth(['admin'])" --> H_auth;
        J -- "auth(['admin'])" --> J_auth;
        L -- "auth()" --> L_auth;
        N -- "auth()" --> N_auth;
        P -- "auth(['admin'])" --> P_auth;
        R -- "auth()" --> R_auth;
        T -- "auth()" --> T_auth;
    end

    subgraph "Database Models"
        B --> Offer;
        D --> Restaurant;
        F --> Restaurant;
        H --> Restaurant;
        J --> Offer;
        L --> User;
        L --> FoodItem;
        N --> Restaurant;
        N --> FoodItem;
        P --> FoodItem;
        R --> User;
        R --> FoodItem;
        R --> Restaurant;
        T --> Order;
        T --> User;
        T --> FoodItem;
    end

    classDef admin fill:#f9f,stroke:#333,stroke-width:2px;
    class F,H,J,P admin;
