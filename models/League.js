class Player {
  constructor(key, name) {
    this.key = key;
    this.name = name;
    this.record = {
      wins: 0,
      losses: 0,
      games: 0,
      history: [],
    };
  }
}

class Game {
  constructor(p1, p2, endScore = 11) {
    this.p1 = p1;
    this.p2 = p2;
    this.winner = null;
    this._endScore = endScore;
    this.score = {
      p1: 0,
      p2: 0,
    };
  }
}

class League {
  constructor() {
    this.players = [];

    this.updateCompetitors = this.updateCompetitors.bind(this)
  }

  updateCompetitors(e) {
    let player = this.players.filter((p) => p.name == e.target.value)[0];
    let num = 2;
    if (e.target.id.includes("1")) {
      num = 1;
    }
    this.updateDOMName(player, num)
    this.updateDOMRecord(player, num)
  }

  updateDOMName(player, num) {
    document.getElementById(`competitor${num}Name`).textContent = player.name;
  }

  updateDOMRecord(player, num) {
    document.getElementById(
      `competitor${num}Record`
    ).textContent = `${player.record.wins}-${player.record.losses}`;
  }

  loadPlayers() {
    fetch("https://amiiboapi.com/api/character/")
      .then((data) => data.json())
      .then((data) => {
        let characters = Array.from(new Set(data.amiibo));
        console.log(characters)
        characters.forEach((c) => {
          this.players.push(new Player(c.key, c.name));
        });
        console.log(this.players)
        let datalists = document.querySelectorAll(
          ".competitorSelection .competitorDataList"
        );

        for (let list of datalists) {
          let input;
          if (list.id.includes("1")) {
            input = document.getElementById("player1");
          } else {
            input = document.getElementById("player2");
          }
          input.addEventListener("change", this.updateCompetitors);
          for (let i = 0; i < characters.length; i++) {
            let option = document.createElement("option");
            option.value = characters[i].name;
            list.appendChild(option);
          }
        }
      })
      .catch((err) => console.log(err));
  }
}
