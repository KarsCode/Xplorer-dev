import motor.motor_asyncio
import pandas as pd
from fastapi import FastAPI


app=FastAPI()
client = motor.motor_asyncio.AsyncIOMotorClient('mongodb://localhost:27017')
db=client.Xplorer

@app.get("/recommendations/{userId}")
async def recommend(userId):
    pickeduserDoc = await db['users'].find_one({'userId':userId})
    list = await db["users"].find({'mostVisited':pickeduserDoc["location"]},{'rated_count': {'$gt': 0}}).to_list(100) #goes inside find{'rated_count': {'$gt': 15}}
    users=[]
    ratings=[]
    for document in list:
        docu = document["userId"]
        docr = document["rated"]
        users.append(docu)
        ratings.append(docr)
    df = pd.DataFrame(ratings)
    df['userId'] = users
    df = df.melt(id_vars='userId', var_name='restaurantId', value_name='rating')
    df=df.pivot_table(index='userId',columns='restaurantId',values='rating')
    df.fillna(value=pd.NA, inplace=True)
    df=df.subtract(df.mean(axis=1),axis='rows')
    
    user_similarity=df.T.corr()
    print(user_similarity)


    
    picked_user=userId
    user_similarity.drop(index=picked_user,inplace=True)
    n=10
    user_similarity_threshold=0.3
    similar_users = user_similarity[user_similarity[picked_user]>user_similarity_threshold][picked_user].sort_values(ascending=False)[:n]
    print(similar_users)
    picked_userId_visited = df[df.index == picked_user].dropna(axis=1, how='all')
    
    
    similar_user_restaurants = df[df.index.isin(similar_users.index)].dropna(axis=1, how='all')
    
    similar_user_restaurants.drop(picked_userId_visited.columns,axis=1, inplace=True, errors='ignore')
    print(similar_user_restaurants)

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
    final=[]
    for restaurantId in recommendations:
        if((await db['restaurants'].find_one({'restaurantId':restaurantId}))['location']==pickeduserDoc["location"]):
            final=final+restaurantId




@app.get("/xu/{userId}")
async def xu(userId , target):
    pickeduserDoc = await db['users'].find_one({'userId':userId})
    targetuserDoc = await db['users'].find_one({'userId':target})

    rated1=pickeduserDoc["rated"]
    rated2=targetuserDoc["rated"]

    restaurant_info1raw =  await db["restaurants"].find({"restaurantId": {"$in": list(rated1.keys())}}).to_list(100)
    restaurant_info2raw= await db["restaurants"].find({"restaurantId": {"$in": list(rated2.keys())}}).to_list(100)
    restaurant_info1={}
    restaurant_info2={}


    for restaurant_data in restaurant_info1raw:
        restaurant_dict = {'cuisines': restaurant_data['cuisines']}
        restaurant_info1[restaurant_data['restaurantId']] = restaurant_dict
    
    for restaurant_data in restaurant_info2raw:
        restaurant_dict = {'cuisines': restaurant_data['cuisines']}
        restaurant_info2[restaurant_data['restaurantId']] = restaurant_dict


    cuisine_ratings = {}
    for restaurant_id, rating in pickeduserDoc['rated'].items():
        
        # Find the cuisines for the restaurant
        if restaurant_id in restaurant_info1:
            cuisines = restaurant_info1[restaurant_id]['cuisines']
            
            # Update the cuisine_ratings dictionary
            for cuisine in cuisines:
                if cuisine in cuisine_ratings:
                    cuisine_ratings[cuisine].append(rating)
                else:
                    cuisine_ratings[cuisine] = [rating]

    # Calculate the average rating for each cuisine
    cuisine_avg_ratings = {}
    for cuisine, ratings in cuisine_ratings.items():
        avg_rating = sum(ratings) / len(ratings)
        cuisine_avg_ratings[cuisine] = avg_rating
    list1 = sorted(cuisine_avg_ratings, key=cuisine_avg_ratings.get, reverse=True)[:10]


    cuisine_ratings = {}
    for restaurant_id, rating in targetuserDoc['rated'].items():
        
        # Find the cuisines for the restaurant
        if restaurant_id in restaurant_info2:
            cuisines = restaurant_info2[restaurant_id]['cuisines']
            
            # Update the cuisine_ratings dictionary
            for cuisine in cuisines:
                if cuisine in cuisine_ratings:
                    cuisine_ratings[cuisine].append(rating)
                else:
                    cuisine_ratings[cuisine] = [rating]

    # Calculate the average rating for each cuisine
    cuisine_avg_ratings = {}
    for cuisine, ratings in cuisine_ratings.items():
        avg_rating = sum(ratings) / len(ratings)
        cuisine_avg_ratings[cuisine] = avg_rating
    list2 = sorted(cuisine_avg_ratings, key=cuisine_avg_ratings.get, reverse=True)[:10]

    set1 = set(list1)
    set2 = set(list2)
    intersection = len(set1.intersection(set2))
    union = len(set1.union(set2))
    jaccard_similarity = intersection / union
    similarity_percentage = jaccard_similarity * 100

    finalDict={"Percentage":similarity_percentage}




    return finalDict
    

     
