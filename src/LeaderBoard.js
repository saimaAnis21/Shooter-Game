import 'regenerator-runtime/runtime';

const leaderboard = (() => {
    const compare = (a, b) => {
        if (a.score > b.score) return -1;
        if (a.score < b.score) return 1;
        return 0;
      };
    

    const sendData = async (name, score) => {
        let url = "https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/eGdSZNBSweDQpszPD44z/scores/";
        const result = { user: name, score  };
        fetch(url, {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify(result),
            headers: {
                "content-type": "application/json; charset=UTF-8",
                Accept: 'application/json'
            }            
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
        });
      
    };

    const receiveData = async() => {
        let url = "https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/eGdSZNBSweDQpszPD44z/scores/";
        const scores = await fetch(url, {
            method: 'GET',
            mode: 'cors'
        }); 
       return scores.json();
    };

    const displayScore = async (scene) => {
        const scores = await receiveData();
        const scoreList = scores.result;
        console.log(scoreList);
        scoreList.sort(compare);
        const size = scoreList.length > 18 ? 18 : scoreList.length;
        for (let i = 0; i < size; i += 1) {
          scene.add.text(640, 24 * i + 45, `${scoreList[i].user} : ${scoreList[i].score}`, { fontSize: 20 }).setOrigin(0.5);
        }
      };

    return { sendData, receiveData, displayScore };
})();

export default leaderboard;