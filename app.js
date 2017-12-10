new Vue({
	el: "#app",

	data: {
		isStarted: false,
		player: {
			hp: 100,
			charge: 0
		},
		monster: {
			hp: 100
		},
		logs: []
	},

	computed: {
		isSpecialReady: function() {
			return this.player.charge < 3;
		},
		isHealReady: function() {
			return this.player.charge < 2;
		}
	},

	methods: {
		// Button Functions
		start: function() {
			this.player.hp = 100;
			this.player.charge = 0;
			this.monster.hp = 100;
			this.isStarted = true;
			this.logs = [];
		},

		attack: function() {
			this.player.charge++;

			this.playerAttack(11, 5, "hits");
			this.monsterAttack();

			this.checkWin();
		},

		specialAttack: function() {
			this.player.charge -= 3;

			this.playerAttack(20, 12, "SMASHES");
			this.monsterAttack();

			this.checkWin();
		},

		heal: function() {
			this.player.charge -= 2;

			var healAmount = this.randomNumber(15, 7);
			this.player.hp += healAmount;
			this.addLog("Player heals for " + healAmount, true);

			this.monsterAttack();

			this.checkWin();
		},

		giveUp: function() {
			this.isStarted = false;
			this.logs = [];
		},

		// Helper Functions
		playerAttack: function(max, min, message) {
			var playerAttack = this.randomNumber(max, min);

			this.monster.hp -= playerAttack;

			this.addLog("Player " + message + " Monster for " + playerAttack, true);
		},

		monsterAttack: function() {
			var monsterAttack = this.randomNumber(12, 6);

			this.player.hp -= monsterAttack;

			this.addLog("Monster hits Player for " + monsterAttack, false);
		},

		randomNumber: function(max, min) {
			return Math.max(Math.floor(Math.random() * max) + 1, min);
		},

		addLog: function(message, isPlayer) {
			this.logs.unshift({
				message: message,
				isPlayer: isPlayer});
		},

		checkWin: function() {
			if(this.player.hp < 1 && this.monster.hp < 1) {
				if(confirm("It's a draw! Play again?")) {
					this.start();
				} else {
					this.isStarted = false;
				}

			} else if(this.monster.hp < 1) {
				if(confirm("You won! Play again?")) {
					this.start();
				} else {
					this.isStarted = false;
				}

			} else if(this.player.hp < 1) {
				if(confirm("You lost! Play again?")) {
					this.start();
				} else {
					this.isStarted = false;
				}
			}
		}
	}
});
