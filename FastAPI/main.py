import motor.motor_asyncio
import pandas as pd
from sklearn.metrics.pairwise import cosine_similarity





client = motor.motor_asyncio.AsyncIOMotorClient('mongodb://localhost:27017')
db=client['Xplorer']


async def find_docs():
    users = db.user_collection.find({'rated_count': {'$gt': 15}})
    list = users.to_list(length=500)
    list= list[['rated']]
    return list

def main():
    users=['Anirvesh','Karthik','Naman','Jay','Angee']
    ratings=[
    {'Restaurant A': 4,'Restaurant D': 5, 'Restaurant E': 1},
    {'Restaurant A': 5, 'Restaurant B': 5, 'Restaurant C': 4},
    {'Restaurant D': 2, 'Restaurant E': 4, 'Restaurant F': 5},
    {'Restaurant B': 3, 'Restaurant D': 3,'Restaurant F': 2},
    {'Restaurant A': 1,'Restaurant D': 2, 'Restaurant E': 5}
    ]
    """for document in list:
    users.append(document["userId"])
    ratings.append(document["ratings"])"""
    df = pd.DataFrame(ratings)
    df['userId'] = users
    df = df.melt(id_vars='userId', var_name='restaurantId', value_name='rating')
    df=df.pivot_table(index='userId',columns='restaurantId',values='rating')
    df.fillna(value=pd.NA, inplace=True)
    df=df.subtract(df.mean(axis=1),axis='rows')
    
    user_similarity=df.T.corr()
    print(user_similarity)


    
    picked_user='Angee'
    user_similarity.drop(index=picked_user,inplace=True)
    n=10
    user_similarity_threshold=0.3
    similar_users = user_similarity[user_similarity[picked_user]>user_similarity_threshold][picked_user].sort_values(ascending=False)[:n]
    print(similar_users)
    picked_userid_visited = df[df.index == picked_user].dropna(axis=1, how='all')
    
    similar_user_restaurants = df[df.index.isin(similar_users.index)].dropna(axis=1, how='all')
    
    similar_user_restaurants.drop(picked_userid_visited.columns,axis=1, inplace=True, errors='ignore')
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
    recomendations=ranked_item_score['restaurantId'].to_list()
    print(recomendations)
    return recomendations





if __name__=="__main__":
    main()