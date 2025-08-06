# Swiggy Clone API

This is the API for the Swiggy Clone application.

## Add to Cart

This endpoint allows a user to add a food item to their cart.

**Endpoint:** `/api/restaurant/addtocart`

**Method:** `POST`

**Authorization:** `Bearer <token>`

**Request Body:**

```json
{
    "restaurantId": "<restaurant_id>",
    "foodItemId": "<food_item_id>",
    "quantity": 1
}
```

**Curl Command:**

```bash
curl -X POST http://localhost:3000/api/restaurant/addtocart \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <your_jwt_token>" \
-d '{
    "restaurantId": "<restaurant_id>",
    "foodItemId": "<food_item_id>",
    "quantity": 1
}'
