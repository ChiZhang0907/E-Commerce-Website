const categories = [
    {"_id":1, "category": "Cultural Trip"},
    {"_id":2, "category": "Modern City"},
    {"_id":3, "category": "Natural Scenery"},
    {"_id":4, "category": "Culinary Journey"},
    {"_id":5, "category": "Historical Landmark"}
]

const price = [
    {"_id": 0, "price": "Any", "array": []},
    {"_id": 1, "price": "Under $100", "array": [0, 99]},
    {"_id": 2, "price": "$100 to $199", "array": [100, 199]},
    {"_id": 3, "price": "$200 to $249", "array": [200, 249]},
    {"_id": 4, "price": "$250 to $299", "array": [250, 299]},
    {"_id": 5, "price": "More than $300", "array": [300, 200000]}
]

export {categories, price}