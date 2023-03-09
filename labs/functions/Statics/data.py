from flask import Flask, jsonify
import pymongo
import pandas as pd
import matplotlib.pyplot as plt

app = Flask(__name__)

@app.route('/api/user-scores')
def user_scores():
    # connect to MongoDB
    client = pymongo.MongoClient("mongodb://localhost:27017/")
    db = client["DAMA_Grup7"]
    collection = db["users"]

    # get data from MongoDB
    data = []
    for doc in collection.find():
        user_games = doc.get('games')  # get the 'games' field from the document
        if user_games is not None:  # check if the 'games' field exists and is not empty
            for game in user_games:
                game['user_id'] = doc['_id']  # add the 'user_id' field to each game document
                data.append(game)

    # create a DataFrame from the data
    df = pd.DataFrame(data)

    # remove outliers
    q1 = df['score'].quantile(0.25)
    q3 = df['score'].quantile(0.75)
    iqr = q3 - q1
    df = df[(df['score'] >= q1 - 1.5*iqr) & (df['score'] <= q3 + 1.5*iqr)]

    # compute the correlation coefficient
    r = df['time'].corr(df['score'])

    # create a correlation plot
    plt.scatter(df['time'], df['score'])
    plt.xlabel('Time')
    plt.ylabel('Score')
    plt.title(f'Time vs. Score Correlation (r = {r:.2f})')

    # add mean and standard deviation lines
    mean_score = df['score'].mean()
    std_score = df['score'].std()
    plt.axhline(mean_score, color='r', linestyle='--')
    plt.axhline(mean_score + std_score, color='g', linestyle='--')
    plt.axhline(mean_score - std_score, color='g', linestyle='--')

    plt.savefig("../../public_html/userScore.png" )
    #plt.savefig("./Graphic/userScore.png" )

    # return a JSON response with the correlation coefficient
    return jsonify({'correlation': r})

if __name__ == '__main__':
    app.run()
