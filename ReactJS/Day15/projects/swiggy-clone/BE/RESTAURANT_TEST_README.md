# Restaurant API Testing CURLS

## Get all offers

```bash
curl --location 'http://localhost:8005/api/restaurant/offers' \
--header 'Authorization: Bearer <TOKEN>'
```

## Get all restaurants

```bash
curl --location 'http://localhost:8005/api/restaurant' \
--header 'Authorization: Bearer <TOKEN>'
```

### Get all restaurants with pagination

```bash
curl --location 'http://localhost:8005/api/restaurant?offset=0&limit=5' \
--header 'Authorization: Bearer <TOKEN>'
```

### Get all restaurants with sorting

```bash
curl --location 'http://localhost:8005/api/restaurant?sort_by_rating=Lowest' \
--header 'Authorization: Bearer <TOKEN>'
```

## Create a new restaurant

```bash
curl --location 'http://localhost:8005/api/restaurant' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer <TOKEN>' \
--data '{
    "name": "KFC",
    "image": "https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_508,h_320,c_fill/hpncnz3gzwbffh0euyvc",
    "location": "Hyderabad",
    "cuisine": "Burger, Fast Food",
    "rating": 4.5,
    "delivery_time": "30-40 mins",
    "price_for_two": 400,
    "offer": "50% off",
    "user_rating": {
        "rating": 4.5,
        "reviews": 1000
    }
}'
```

## Create multiple new restaurants

```bash
curl --location 'http://localhost:8005/api/restaurant/bulk' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer <TOKEN>' \
--data  '[
    {
    "name": "KFC",
    "image": "https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_508,h_320,c_fill/hpncnz3gzwbffh0euyvc",
    "location": "Hyderabad",
    "cuisine": "Burger, Fast Food",
    "rating": 4.5,
    "delivery_time": "30-40 mins",
    "price_for_two": 400,
    "offer": "50% off",
    "user_rating": {
        "rating": 4.5,
        "reviews": 1000
    },
    {
        "name": "Burger King",
        "image": "https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_508,h_320,c_fill/hpncnz3gzwbffh0euyvc",
        "location": "Delhi",
        "cuisine": "Burger, Fast Food, Continental",
        "rating": 4.3,
        "delivery_time": "35-45 mins",
        "price_for_two": 450,
        "offer": "30% off on orders above ₹299",
        "user_rating": {
            "rating": 4.3,
            "reviews": 1800
        }
    },
    {
        "name": "Subway",
        "image": "https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_508,h_320,c_fill/hpncnz3gzwbffh0euyvc",
        "location": "Bangalore",
        "cuisine": "Sandwich, Healthy Food, Fast Food",
        "rating": 4.1,
        "delivery_time": "20-30 mins",
        "price_for_two": 300,
        "offer": "Free cookie with any footlong",
        "user_rating": {
            "rating": 4.1,
            "reviews": 950
        }
    },
    {
        "name": "Pizza Hut",
        "image": "https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_508,h_320,c_fill/hpncnz3gzwbffh0euyvc",
        "location": "Chennai",
        "cuisine": "Pizza, Italian, Fast Food",
        "rating": 4.4,
        "delivery_time": "40-50 mins",
        "price_for_two": 600,
        "offer": "40% off on pizzas",
        "user_rating": {
            "rating": 4.4,
            "reviews": 3200
        }
    },
    {
        "name": "Domino's Pizza",
        "image": "https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_508,h_320,c_fill/hpncnz3gzwbffh0euyvc",
        "location": "Pune",
        "cuisine": "Pizza, Italian, Fast Food",
        "rating": 4.0,
        "delivery_time": "30-40 mins",
        "price_for_two": 500,
        "offer": "2 pizzas at ₹299 each",
        "user_rating": {
            "rating": 4.0,
            "reviews": 4100
        }
    }
]'

## Create multiple new offers

```bash
curl --location 'http://localhost:8005/api/restaurant/offers/bulk' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer <TOKEN>' \
--data '{
    "offers": [
        {
            "image_url": "https://assets.ccbp.in/frontend/react-js/restaurants-app-project/carousel-images-jammu-special.jpg",
            "id": 1
        },
        {
            "image_url": "https://assets.ccbp.in/frontend/react-js/restaurants-app-project/carousel-images-rajasthani-special.jpg",
            "id": 2
        },
        {
            "image_url": "https://assets.ccbp.in/frontend/react-js/restaurants-app-project/carousel-images-uttar-pradesh-special.jpg",
            "id": 3
        },
        {
            "image_url": "https://assets.ccbp.in/frontend/react-js/restaurants-app-project/carousel-images-north-indian-special.jpg",
            "id": 4
        }
    ]
}'
```

## Get a specific restaurant by ID

```bash
curl --location 'http://localhost:8005/api/restaurant/<restaurant_id>' \
--header 'Authorization: Bearer <TOKEN>'
```

## Add food items to a restaurant

```bash
curl --location 'http://localhost:8005/api/restaurant/<restaurant_id>/food-items' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer <TOKEN>' \
--data '[
    {
        "name": "Chicken Biryani",
        "cost": 350,
        "food_type": "NON-VEG",
        "image_url": "https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_508,h_320,c_fill/hpncnz3gzwbffh0euyvc",
        "rating": 4.5
    },
    {
        "name": "Mutton Biryani",
        "cost": 450,
        "food_type": "NON-VEG",
        "image_url": "https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_508,h_320,c_fill/hpncnz3gzwbffh0euyvc",
        "rating": 4.7
    }
]'
```
