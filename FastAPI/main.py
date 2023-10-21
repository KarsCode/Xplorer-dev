import motor.motor_asyncio
import pandas as pd
from fastapi import FastAPI
from bson.json_util import dumps
from bson import ObjectId
import json


app=FastAPI()
client = motor.motor_asyncio.AsyncIOMotorClient('mongodb+srv://anirvesh:anirvesh@cluster0.tuw5ikl.mongodb.net/?retryWrites=true&w=majority')
db=client.test

@app.get("/recommendations/{id}")
async def recommend(id):
    # Define the range and retrieve user information
    range = 1
    id=ObjectId(id)
    pickeduserDoc = await db['User'].find_one({'_id': ObjectId(id)})

    # Check if user information is found
    if pickeduserDoc is None:
        return json.loads(dumps([]))  # Return an empty list if user not found

    # Aggregation pipeline to find similar users
    pipeline = [
        {
            "$match": {
                "latitude": {"$gt": pickeduserDoc['latitude'] - range, "$lt": pickeduserDoc['latitude'] + range},
                "longitude": {"$gt": pickeduserDoc['longitude'] - range, "$lt": pickeduserDoc['longitude'] + range}
            }
        },
        {
            "$lookup": {
                "from": "Rating",  # The name of the Rating collection
                "localField": "_id",  # The field in the User collection
                "foreignField": "userId",  # The field in the Rating collection
                "as": "ratings"  # Create an array field "ratings"
            }
        },
        {
            "$addFields": {
                "num_ratings": {"$size": "$ratings"}
            }
        },
        {
            "$match": {
                "num_ratings": {"$gt": 15}
            }
        },
        {
            "$limit": 100
        }
    ]

    # Run the aggregation query
    async def find_users():
        users = []
        async for user in db["User"].aggregate(pipeline):
            users.append(user)
        return users

    # Run the query asynchronously
    user_list = await find_users()

    # Data Transformation
    users = []
    ratings = []

    for document in user_list:
        docu = document["_id"]
        docr = [{'restaurantId': d['restaurantId'], 'rating': d['rating']} for d in document.get('ratings', [])]
 
        users.append(str(docu))
        converted_list = [
            {
                "restaurantId": str(item["restaurantId"]),  # Convert ObjectId to string
                "rating": item["rating"]
            }
            for item in docr
        ]
        converted_dict = {}
        for item in converted_list:
            restaurant_id = item["restaurantId"]
            rating = item["rating"]
            converted_dict[restaurant_id] = rating
        ratings.append(converted_dict)

    df = pd.DataFrame(ratings)
    df['userId'] = users
    df = df.melt(id_vars='userId', var_name='restaurantId', value_name='rating')
    df=df.pivot_table(index='userId',columns='restaurantId',values='rating')
    df.fillna(value=pd.NA, inplace=True)
    df=df.subtract(df.mean(axis=1),axis='rows')
    
    user_similarity=df.T.corr()
    
    picked_user=str(id)
    user_similarity.drop(index=picked_user,inplace=True)
    n=10
    user_similarity_threshold=0.3
    similar_users = user_similarity[user_similarity[picked_user]>user_similarity_threshold][picked_user].sort_values(ascending=False)[:n]
    picked_userId_visited = df[df.index == picked_user].dropna(axis=1, how='all')
    
    
    similar_user_restaurants = df[df.index.isin(similar_users.index)].dropna(axis=1, how='all')
    
    similar_user_restaurants.drop(picked_userId_visited.columns,axis=1, inplace=True, errors='ignore')

    item_score = {}


    for i in similar_user_restaurants.columns:
        restaurant_rating = similar_user_restaurants[i]
        total = 0   
        count = 0 
        for u in similar_users.index:
            if pd.isna(restaurant_rating[u]) == False:
                score = similar_users[u] * restaurant_rating[u]
                total += score
                count +=1
        item_score[i] = total / count

    item_score = pd.DataFrame(item_score.items(), columns=['restaurantId', 'restaurant_score'])
        
    ranked_item_score = item_score.sort_values(by='restaurant_score', ascending=False)

    m = 10
    
    ranked_item_score.head(m)
    recommendations=ranked_item_score['restaurantId'].to_list()

    return recommendations
    



@app.get("/xu/{userId}")
async def xu(userId , target):
        pickeduserDoc = await db['User'].find_one({'_id': userId})
        rated1 = pickeduserDoc["rated"]
        result_dict1 = {}
        for rating_data in rated1:
            restaurant_id = rating_data['restaurantId']
            rating = rating_data['rating']
            result_dict1[restaurant_id] = rating
        
        restaurant_info1 = await db["Restaurant"].find({"_id": {"$in": list(result_dict1.keys())}}).to_list(1000)
        cuisine_ratings = {}
        for restaurant_id, rating in result_dict1.items():
            for restaurant_info in restaurant_info1:
                if restaurant_info['id'] == restaurant_id:
                    cuisines = restaurant_info['cuisines']
                    for cuisine in cuisines:
                        if cuisine in cuisine_ratings:
                            cuisine_ratings[cuisine].append(rating)
                        else:
                            cuisine_ratings[cuisine] = [rating]
        cuisine_avg_ratings = {}
        for cuisine, ratings in cuisine_ratings.items():
            avg_rating = sum(ratings) / len(ratings)
            cuisine_avg_ratings[cuisine] = avg_rating
        list1 = sorted(cuisine_avg_ratings, key=cuisine_avg_ratings.get, reverse=True)[:100]

        targetuserDoc = await db['User'].find_one({'_id': target})
        rated2 = targetuserDoc["rated"]
        result_dict2 = {}
        for rating_data in rated2:
            restaurant_id = rating_data['restaurantId']
            rating = rating_data['rating']
            result_dict2[restaurant_id] = rating
        restaurant_info2 = await db["Restaurant"].find({"_id": {"$in": list(result_dict2.keys())}}).to_list(1000)
        cuisine_ratings = {}
        for restaurant_id, rating in result_dict2.items():
            for restaurant_info in restaurant_info2:
                if restaurant_info['id'] == restaurant_id:
                    cuisines = restaurant_info['cuisines']
                    for cuisine in cuisines:
                        if cuisine in cuisine_ratings:
                            cuisine_ratings[cuisine].append(rating)
                        else:
                            cuisine_ratings[cuisine] = [rating]
        cuisine_avg_ratings = {}
        for cuisine, ratings in cuisine_ratings.items():
            avg_rating = sum(ratings) / len(ratings)
            cuisine_avg_ratings[cuisine] = avg_rating
        list2 = sorted(cuisine_avg_ratings, key=cuisine_avg_ratings.get, reverse=True)[:100] 



        restaurantNet = restaurant_info1 +restaurant_info2

        set1 = set(list1)
        set2 = set(list2)
        intersection = (set1.intersection(set2))
        union = (set1.union(set2))
        jaccard_similarity = len(intersection) / len(union)
        similarity_percentage = jaccard_similarity * 100

        
        filtered_restaurants = [doc for doc in restaurantNet if any(cuisine in doc["cuisines"] for cuisine in intersection)][:20]
        result_json = dumps(filtered_restaurants)                     #very important to when it comes to returning documents with objectid
        filtered_restaurants = json.loads(result_json)
        sorted_restaurants = sorted(filtered_restaurants, key=lambda x: x["rating"], reverse=True)
        restaurant_ids = ([restaurant["id"] for restaurant in sorted_restaurants])
        restaurant_ids_new=[]
        [restaurant_ids_new.append(item) for item in restaurant_ids if item not in restaurant_ids_new][30]


        finalDict={"Percentage":similarity_percentage,"Suggested":restaurant_ids_new}
        return finalDict