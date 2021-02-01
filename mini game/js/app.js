new Vue({
  el: "#app",
  data: {
    playerHP: 100,
    monsterHP: 100,
    gameIsRunning: false,
    turns: [],
    turnInProcec: false,
    playerTurn: false,
    monsterTurn: false,
    playerHeal: false,
    playerImg: "img/player.gif",
    playerMP: 0,
    monsterMP: 0,
    monsterImg: "img/monster.gif",
    potions: [1, 1, 1, 1],
    damage: 0,
    damageP: 0,
    damageM: 0,
    healP: 0,
    sound: null,
  },
  methods: {
    calculateDamage: function (min, max) {
      this.damage = Math.floor(Math.random() * (max - min) + min);
      return this.damage;
    },
    startGame: function () {
      var audio = new Audio("sound/game music.mp3");
      audio.play();
      this.gameIsRunning = true;
      this.turns = [];
      this.playerMP = 0;
      this.monsterMP = 0;
      this.playerHP = 100;
      this.monsterHP = 100;
      this.potions = [1, 1, 1, 1];
      this.playerImg = "img/player.gif";
      this.monsterImg = "img/monster.gif";
    },
    attack: function () {
      var audio = new Audio("sound/playerP.mp3");
      audio.play();
      this.turnInProcec = true;
      this.playerTurn = true;
      this.monsterHP -= this.calculateDamage(5, 12);
      this.playerMP += this.damage * 3;
      this.damageM = this.damage;
      if (this.playerMP > 100) {
        this.playerMP = 100;
      }
      this.turns.unshift({
        isPlayer: true,
        isHealing: false,
        text: "Player hits Monster for " + this.damage,
      });

      this.playerImg = "img/playerAttack.gif";
      setTimeout(() => {
        this.playerImg = "img/player.gif";
        this.playerTurn = false;
        if (this.checkWin()) {
          return;
        }

        this.monsterAttack();
      }, 800);
    },
    specialAttack: function () {
      var audio = new Audio("sound/dragon.mp3");
      audio.play();
      this.turnInProcec = true;
      this.playerTurn = true;
      this.playerMP = 0;
      this.monsterHP -= this.calculateDamage(15, 25);
      this.damageM = this.damage;
      this.turns.unshift({
        isPlayer: true,
        isHealing: false,
        text: "Player hits spaciel attack on Monster for " + this.damage,
      });

      this.playerImg = "img/playerSpaiceal.gif";
      setTimeout(() => {
        this.playerImg = "img/player.gif";
        this.playerTurn = false;
        if (this.checkWin()) {
          return;
        }

        this.monsterAttack();
      }, 2600);
    },
    heal: function () {
      var audio = new Audio("sound/heal.mp3");
      audio.play();
      this.turnInProcec = true;
      this.playerHeal = true;
      this.playerHP += this.calculateDamage(20, 40);
      this.healP = this.damage;
      if (this.playerHP >= 100) {
        this.playerHP = 100;
      }
      this.turns.unshift({
        isPlayer: true,
        isHealing: true,
        text: "Player heals for " + this.damage,
      });
      this.playerImg = "img/playerHeal.gif";
      this.potions.splice(0, 1);
      setTimeout(() => {
        this.playerImg = "img/player.gif";
        this.playerHeal = false;
        this.monsterAttack();
      }, 800);
    },

    monsterAttack: function () {
      this.monsterTurn = true;
      if (this.monsterMP >= 100) {
        var audio = new Audio("sound/slash.mp3");
        audio.play();
        this.monsterMP = 0;
        this.playerHP -= this.calculateDamage(15, 30);
        this.damageP = this.damage;
        this.monsterImg = "img/monsterSpecialAttack.gif";
      } else {
        var audio = new Audio("sound/monsterP.mp3");
        audio.play();
        this.playerHP -= this.calculateDamage(5, 18);
        this.monsterMP += this.damage * 2.5;
        this.damageP = this.damage;
        if (this.monsterMP > 100) {
          this.monsterMP = 100;
        }
        this.monsterImg = "img/monsterAttack.gif";
      }

      this.turns.unshift({
        isPlayer: false,
        isHealing: false,
        text: "Monster hits Player for " + this.damage,
      });

      setTimeout(() => {
        this.monsterImg = "img/monster.gif";
        this.turnInProcec = false;
        this.monsterTurn = false;
        this.checkWin();
      }, 700);
    },
    checkWin: function () {
      if (this.monsterHP <= 0) {
        this.monsterImg = "img/monsterLost.gif";
        alert("You Won! Start new game??");
        this.gameIsRunning = false;
        this.turnInProcec = false;
        return true;
      }
      if (this.playerHP <= 0) {
        this.playerImg = "img/playerLost.gif";
        alert("You Lost! Start new game??");
        this.gameIsRunning = false;

        return true;
      }
      return false;
    },
  },
});
