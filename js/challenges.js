dojo.declare("classes.managers.ChallengesManager", com.nuclearunicorn.core.TabManager, {

	constructor: function(game){
		this.game = game;
		this.registerMeta("research", this.challenges, null);
		this.setEffectsCachedExisting();
	},

    challenges:[
    {
		name: "ironWill",
		label: $I("challendge.ironWill.label"),
		description: $I("challendge.ironWill.desc"),
		effectDesc: $I("challendge.ironWill.effect.desc"),
        researched: 0,
        unlocked: true,
        togglableOnOff: true,
        val: 1
	},{
		name: "winterIsComing",
		label: $I("challendge.winterIsComing.label"),
		description: $I("challendge.winterIsComing.desc"),
		effectDesc: $I("challendge.winterIsComing.effect.desc"),
		difficulty: 1,
		researched: 0,
		unlocked: true,
		togglableOnOff: true,
		val: 1,
		on: 0,
		pending: false,
		rewardable: false,
		rewarded: false
	},{
		name: "anarchy",
		label: $I("challendge.anarchy.label"),
		description: $I("challendge.anarchy.desc"),
		effectDesc: $I("challendge.anarchy.effect.desc"),
		difficulty: 5,
		researched: 0,
		unlocked: true,
		togglableOnOff: true,
		val: 1,
		on: 0,
		pending: false,
		rewardable: false,
		rewarded: false
	},{
		name: "energy",
		label: $I("challendge.energy.label"),
		description: $I("challendge.energy.desc"),
		effectDesc: $I("challendge.energy.effect.desc"),
		difficulty: 10,
        researched: 0,
		unlocked: false,
		togglableOnOff: true,
		val: 1,
		on: 0,
		pending: false,
		rewardable: false,
		rewarded: false
	},{
		name: "atheism",
		label: $I("challendge.atheism.label"),
		description: $I("challendge.atheism.desc"),
		effectDesc: $I("challendge.atheism.effect.desc"),
		difficulty: 15,
        researched: 0,
        unlocked: false,
        togglableOnOff: true,
        val: 1,
        on: 0,
        pending: false,
        rewardable: false,
        rewarded: false
	},{
		name: "1000Years",
		label: $I("challendge.1000Years.label"),
		description: $I("challendge.1000Years.desc"),
		effectDesc: $I("challendge.1000Years.effect.desc"),
		difficulty: 3,
        researched: 0,
        unlocked: false,
        togglableOnOff: true,
        val: 1,
        on: 0,
        pending: false,
        rewardable: false,
        rewarded: false
	}],

    conditions:[
    {
		name: "disableChrono",
		label: $I("challendge.condition.disableChrono.label"),
		description: $I("challendge.condition.disableChrono.desc"),
		unlocked: true,
		togglableOnOff: true,
		val: 1,
		on: 0,
		pending: false,
		rewardable: false,
		resets: 0
	},{
		name: "disableMetaResources",
		label: $I("challendge.condition.disableMetaResources.label"),
		description: $I("challendge.condition.disableMetaResources.desc"),
		bonus: 5,
		unlocked: true,
		togglableOnOff: true,
		val: 1,
		on: 0,
		pending: false,
		rewardable: false,
		resets: 0
	},{
		name: "disableMetaTechs",
		label: $I("challendge.condition.disableMetaTechs.label"),
		description: $I("challendge.condition.disableMetaTechs.desc"),
		bonus: 10,
		unlocked: true,
		togglableOnOff: true,
		val: 1,
		on: 0,
		pending: false,
		rewardable: false,
		resets: 0
	},{
		name: "disableApo",
		label: $I("challendge.condition.disableApo.label"),
		description: $I("challendge.condition.disableApo.desc"),
		bonus: 20,
		unlocked: true,
		togglableOnOff: true,
		val: 1,
		on: 0,
		pending: false,
		rewardable: false,
		resets: 0
	},{
		name: "disableRewards",
		label: $I("challendge.condition.disableRewards.label"),
		description: $I("challendge.condition.disableRewards.desc"),
		bonus: 3,
		unlocked: true,
		togglableOnOff: true,
		val: 1,
		on: 0,
		pending: false,
		rewardable: false,
		resets: 0
	},{
		name: "disableMisc",
		label: $I("challendge.condition.disableMisc.label"),
		description: $I("challendge.condition.disableMisc.desc"),
		unlocked: true,
		togglableOnOff: true,
		val: 1,
		on: 0,
		pending: false,
		rewardable: false,
		resets: 0
	}],

	game: null,
	rewardable: false,
	rewarded: false,

	resetState: function(){
		this.rewardable = false;
		this.rewarded = false;

		for (var i = 0; i < this.challenges.length; i++){
			var challenge = this.challenges[i];
			challenge.on = 0;
			challenge.researched = 0;
			challenge.unlocked = (challenge.name == "ironWill" || challenge.name == "winterIsComing" || challenge.name == "anarchy")
			challenge.pending = false;
			challenge.rewardable = false;
			challenge.rewarded = false;
		}
		
		for (var i = 0; i < this.conditions.length; i++){
			var condition = this.conditions[i];
			condition.on = 0;
			condition.pending = false;
			condition.rewardable = false;
			condition.resets = 0;
		}
	},

	save: function(saveData){
		saveData.challenges = {
			rewardable: this.rewardable,
			rewarded: this.rewarded,
			challenges: this.filterMetadata(this.challenges, ["name", "researched", "unlocked", "on", "pending", "rewardable", "rewarded"]),
			conditions: this.filterMetadata(this.conditions, ["name", "on", "pending", "rewardable", "resets"])
		};
	},

	load: function(saveData){
		if (!saveData.challenges){
			return;
		}

		if (saveData.challenges.rewardable)
			this.rewardable = saveData.challenges.rewardable;
		this.rewarded = saveData.challenges.rewarded;

		this.loadMetadata(this.challenges, saveData.challenges.challenges);
		
		if (saveData.challenges.conditions)
		{
			this.loadMetadata(this.conditions, saveData.challenges.conditions);
		}
	},

	update: function(){
		this.getChallenge("ironWill").on = this.game.ironWill;
		// energy
		if (this.getChallenge("energy").unlocked == false) {
			if (this.game.resPool.energyProd != 0 || this.game.resPool.energyCons != 0) {
				this.getChallenge("energy").unlocked = true;
			}
		} else if (this.getChallenge("energy").on) {
			if (
				(this.game.bld.get("pasture").val > 0 && this.game.bld.get("pasture").stage == 1) &&
				(this.game.bld.get("aqueduct").val > 0 && this.game.bld.get("aqueduct").stage == 1) &&
				this.game.bld.get("steamworks").val > 0 &&
				this.game.bld.get("magneto").val > 0 &&
				this.game.bld.get("reactor").val > 0 &&
				(this.game.space.getBuilding("sattelite").val > 0 && this.game.workshop.get("solarSatellites").researched) &&
				this.game.space.getBuilding("sunlifter").val > 0 &&
				this.game.space.getBuilding("tectonic").val > 0 &&
				this.game.space.getBuilding("hrHarvester").val > 0
			) {
				this.researchChallenge("energy");
			}
		}
		
		if (this.getChallenge("anarchy").on) {
			if (this.game.bld.get("aiCore").val > 0){
				this.researchChallenge("anarchy");
			}

		}
		// winterIsComing
		if (this.getChallenge("winterIsComing").on) {
			if (this.game.space.getPlanet("helios").reached){
				this.researchChallenge("winterIsComing");
			}
		}
		
		if (this.getChallenge("atheism").on && this.game.time.getVSU("cryochambers").on > 0) {
			this.researchChallenge("atheism");
		}
		
		if (game.challenges.getChallenge("1000Years").on && this.game.calendar.year >= 1000) {
			game.challenges.researchChallenge("1000Years");
		}
		
		var noChallenge = true;
		
		for (var i = 0; i < this.challenges.length; i++) {
			if (this.challenges[i].on) {
				noChallenge = false;
			}
		}
		
		if (noChallenge && this.getCondition("disableChrono").on && this.game.space.getPlanet("moon").unlocked)
		{
			this.researchChallenge();
		}
		
		for (var i = 0; i < this.challenges.length; i++) {
			if (!this.challenges[i].on || !this.getCondition("disableChrono").on) {
				this.challenges[i].rewardable = false;
			}
		}
		
		for (var i = 0; i < this.conditions.length; i++) {
			if (!this.conditions[i].on) {
				this.conditions[i].rewardable = false;
				this.conditions[i].resets = 0;
				
				if (this.conditions[i].name == "disableMetaResources")
				{
					this.getCondition("disableMetaTechs").resets = 0;
				}
			}
		}


	},

	getChallenge: function(name){
		return this.getMeta(name, this.challenges);
	},
	
	getCondition: function(name){
		return this.getMeta(name, this.conditions);
	},

	researchChallenge: function(challenge) {
		var apotheosis = 0;
		if (challenge){
			if (this.getChallenge(challenge).rewardable && !this.getChallenge(challenge).rewarded){
				this.getChallenge(challenge).researched += 1;
				this.getChallenge(challenge).rewarded = true;
				this.game.msg($I("challendge.btn.log.message.on.complete", [this.getChallenge(challenge).label]));
				
				if (challenge == "winterIsComing"){
					this.game.resPool.get("void").reserveValue += 1000;
				}
				
				if (challenge == "anarchy"){
					this.game.resPool.get("relic").reserveValue += 10000;
				}
				
				if (challenge == "energy"){
					this.game.resPool.get("antimatter").reserveValue += 5000;
				}
				
				if (challenge == "atheism"){
					this.game.religion.faithRatio += 1;
				}
				
				if (challenge == "1000Years"){
					this.game.resPool.get("timeCrystal").reserveValue += 20000;
				}
				
				var challengeTotal = 0;
				var challengeNumber = 0;
				for (var i = 0; i < this.challenges.length; i++) {
					if (this.challenges[i].rewardable) {
						challengeNumber += 1;
						challengeTotal += Math.pow(this.challenges[i].difficulty, 2)
					}
				}
				
				apotheosis += Math.sqrt(challengeTotal) / challengeNumber;
			}
		}
		
		if (this.rewardable && !this.rewarded)
		{
			apotheosis += 1;
			this.rewarded = true;
		}
		var conditionTotal = 1;
		for (var i = 0; i < this.conditions.length; i++) {
			if (this.conditions[i].on && this.conditions[i].bonus) {
				conditionTotal += Math.pow(this.conditions[i].bonus * (1 - this.game.getHyperbolicEffect(this.conditions[i].resets / 10, 1)), 2);
			}
		}
		
		apotheosis *= Math.sqrt(conditionTotal);
		
		if (apotheosis)
		{
			this.game.resPool.addRes(this.game.resPool.get("apotheosis"), Math.floor(apotheosis), true);
		}
	},
	
	getChallengePenalty: function(name, type){
		var researched = this.getChallenge(name).researched;
		var on = this.getChallenge(name).on;
		
		if (name == "winterIsComing")
		{
			if (type == "warmRate")
			{
				return Math.floor(175 - this.game.getHyperbolicEffect(researched * 10, 175));
			}
			else if (type == "coldRate")
			{
				return Math.ceil(175 + this.game.getHyperbolicEffect(researched * 50, 825));
			}
			else if (type == "warmMod")
			{
				return (1 - Math.ceil(60 + this.game.getHyperbolicEffect(researched, 40)) / 100);
			}
			else if (type == "normalMod")
			{
				return (1 - Math.ceil(75 + this.game.getHyperbolicEffect(researched, 25)) / 100);
			}
			else if (type == "coldMod")
			{
				return (1 - Math.ceil(90 + this.game.getHyperbolicEffect(researched, 10)) / 100);
			}
		}
		else if (name == "anarchy")
		{
			return (Math.floor(50 + this.game.getHyperbolicEffect(researched * 5, 50)) / 100);
		}
		else if (!on)
		{
			return 1;
		}
		else if (name == "energy")
		{
			return (2 + researched * 0.1);
		}
		else if (name == "atheism")
		{
			return (1 + researched * 0.2);
		}
		else if (name == "1000Years")
		{
			return (1 + researched * 0.5);
		}
	},
	
	getChallengeReward: function(name, type){
		if (this.getChallenge(name).on || this.getCondition("disableRewards").on)
		{
			return 1;
		}

		var researched = this.getChallenge(name).researched;
		
		if (name == "winterIsComing")
		{
			return 1 + this.game.getHyperbolicEffect(researched * 0.1, 1);
		}
		else if (name == "anarchy")
		{
			return 1 + this.game.getHyperbolicEffect(researched * 0.5, 4);
		}
		else if (name == "energy")
		{
			return 1 + this.game.getHyperbolicEffect(researched * 0.1, 1);
		}
		else if (name == "atheism")
		{
			return 1 + this.game.getHyperbolicEffect(researched * 0.25, 5);
		}
		else if (name == "1000Years")
		{
			return 1 - this.game.getHyperbolicEffect(researched * 0.1, 1);
		}
	},

	handleChallengeToggle: function(name, on) {
		if (name == "atheism")
		{
			this.game.upgrade({buildings: ["temple"]});
		}
	},

	handleConditionToggle: function(name, on) {
		if (on)
		{
			if (name == "disableMetaResources")
			{
				var metaRes = ["karma", "paragon", "burnedParagon", "apotheosis"]
				for (var i = 0; i < metaRes.length; i++)
				{
					var res = this.game.resPool.get(metaRes[i]);
					res.reserveValue += res.value;
					res.value = 0;
				}
				
				this.game.karmaKittens = 0;
				
				if (this.getCondition("disableMetaTechs").on)
				{
					for (var i = 0; i < this.game.prestige.perks.length; i++)
					{
						var perk = this.game.prestige.perks[i];
					
						if (perk.defaultUnlocked)
						{
							perk.unlocked = true;
						}
					}
				}
			}
			
			if (name == "disableMetaTechs")
			{
				for (var i = 0; i < this.game.prestige.perks.length; i++)
				{
					var perk = this.game.prestige.perks[i];
					perk.reserve = perk.researched;
					perk.unlocked = false;
					perk.researched = false;
					
					if (this.getCondition("disableMetaResources").on && perk.defaultUnlocked)
					{
						perk.unlocked = true;
					}
				}
			}
			
			if (name == "disableApo")
			{
				this.game.religion.faithRatioReserve = this.game.religion.faithRatio;
				this.game.religion.faithRatio = 0;
				this.game.religion.tcratioReserve = this.game.religion.tcratio;
				this.game.religion.tcratio = 0;
				this.game.religion.tclevel = this.game.religion.getTranscendenceLevel();

				for (var i = 0; i < this.game.religion.transcendenceUpgrades.length; i++)
				{
					this.game.religion.transcendenceUpgrades[i].reserve += this.game.religion.transcendenceUpgrades[i].val;
					this.game.religion.transcendenceUpgrades[i].val = 0;
					this.game.religion.transcendenceUpgrades[i].on = 0;
				}
			}
			
			if (name == "disableMisc")
			{
				var bls = this.game.resPool.get("sorrow");
				bls.reserveValue = bls.value;
				bls.value = 0;
				
				this.game.karmaZebrasReserve = this.game.karmaZebras;
				this.game.karmaZebras = 0;
				this.game.resPool.get("zebras").maxValue = 0;
				this.game.resPool.get("zebras").reserveValue = this.game.resPool.get("zebras").value;
				this.game.resPool.get("zebras").value = 0;
				
				var box = this.game.resPool.get("elderBox");
				box.reserveValue = box.value;
				box.value = 0;
				var paper = this.game.resPool.get("wrappingPaper");
				paper.reserveValue = paper.value;
				paper.value = 0;
			}
		}
		else
		{
			if (name == "disableMetaResources")
			{
				if (this.getCondition("disableMetaTechs").on)
				{
					for (var i = 0; i < this.game.prestige.perks.length; i++)
					{
						var perk = this.game.prestige.perks[i];
					
						if (perk.defaultUnlocked)
						{
							perk.unlocked = false;
						}
					}
				}
			}
		}
	},

	applyPending: function(){
		for (var i = 0; i < this.challenges.length; i++){
			var challenge = this.challenges[i];
			if (challenge.pending){
				challenge.pending = false;
				challenge.on = 1;
				this.handleChallengeToggle(challenge.name, true);
			}
		}

		for (var i = 0; i < this.conditions.length; i++){
			var condition = this.conditions[i];
			if (condition.pending){
				condition.pending = false;
				condition.on = 1;
				this.handleConditionToggle(condition.name, true);
			}
		}
	},
	
	getWeatherMod: function(season, res){
		if (this.getChallenge("winterIsComing").on)
		{
			return this.getChallengePenalty("winterIsComing", (this.game.calendar.weather || "normal") + "Mod");
		}
		else
		{
			var reward = 1;
			if (this.game.calendar.weather == "warm")
			{
				reward = this.getChallengeReward("winterIsComing");
			}
			if (this.game.calendar.weather == "cold")
			{
				reward = 1 / this.getChallengeReward("winterIsComing");
			}
			var weatherMod = this.game.calendar.getWeatherMod();
			return Math.floor((((season.modifiers[res.name] - 1) * reward + 1) + weatherMod) * 100) / 100;
		}
	},
	
	getParagonBonus: function(){
		return this.game.resPool.get("apotheosis").value / 100;
	}
});

dojo.declare("classes.ui.ChallengeBtnController", com.nuclearunicorn.game.ui.BuildingBtnController, {

	getMetadata: function(model){
        if (!model.metaCached){
            model.metaCached = this.game.challenges.getChallenge(model.options.id);
        }
        return model.metaCached;
    },

    getDescription: function(model) {
		if (this.game.bld.get("chronosphere").val > 0) {
			var msgChronosphere = model.metadata.name == "ironWill" ? $I("challendge.btn.chronosphere.with.ironWill.desc") : "";
		} else {
			var msgChronosphere = "";
		}
		return this.inherited(arguments) + $I("challendge.btn.desc", [model.metadata.effectDesc, msgChronosphere]) ;
	},

	getName: function(model){

		var meta = model.metadata;
		name = meta.label
		if (meta.researched){
			name += " (" + meta.researched + ")";
		}
		if (meta.pending){
			name += " (" + $I("challendge.pending") + ")";
		}

		return name;
	},

	updateVisible: function(model){
		model.visible = model.metadata.unlocked;
		model.enabled = model.metadata.name != "ironWill"; // hack
	},

	getPrices: function(model) {
		return $.extend(true, [], model.metadata.prices); // Create a new array to keep original values
	},

	buyItem: function(model, event, callback) {
	},
	
	handleTogglableOnOffClick: function(model) {
		if (model.metadata.name == "ironWill")
		{
			return;
		}

		var on = model.metadata.on;

		this.inherited(arguments);

		if (!on && model.metadata.on)
		{
			model.metadata.on = 0;
			model.metadata.pending = !model.metadata.pending;
		}

		if (on && !model.metadata.on)
		{
			this.game.challenges.handleChallengeToggle(model.metadata.name, false);
		}
        }

});

dojo.declare("classes.ui.ConditionBtnController", com.nuclearunicorn.game.ui.BuildingBtnController, {

	getMetadata: function(model){
        if (!model.metaCached){
            model.metaCached = this.game.challenges.getCondition(model.options.id);
        }
        return model.metaCached;
    },

    getDescription: function(model) {
		return model.metadata.description;
	},

	getName: function(model){
		if (model.metadata.pending){
			return model.metadata.label + " (" + $I("challendge.pending") + ")";
		}

		return model.metadata.label;
	},

	updateVisible: function(model){
		model.visible = model.metadata.unlocked;
	},

	getPrices: function(model) {
		return $.extend(true, [], model.metadata.prices); // Create a new array to keep original values
	},

	buyItem: function(model, event, callback) {
	},
	
	handleTogglableOnOffClick: function(model) {
		var on = model.metadata.on;

		this.inherited(arguments);
		
		if (!on && model.metadata.on)
		{
			model.metadata.on = 0;
			model.metadata.pending = !model.metadata.pending;
		}

		if (on && !model.metadata.on)
		{
			this.game.challenges.handleConditionToggle(model.metadata.name, false);
		}
	}
});

dojo.declare("classes.ui.ChallengePanel", com.nuclearunicorn.game.ui.Panel, {

	game: null,

	constructor: function(){
	},

    render: function(container){
		var content = this.inherited(arguments);
		var self = this;
		var controller = new classes.ui.ChallengeBtnController(self.game);
		dojo.forEach(this.game.challenges.challenges, function(challenge, i){
			var button = new com.nuclearunicorn.game.ui.BuildingBtn({id: challenge.name, controller: controller}, self.game);
			button.render(content);
			self.addChild(button);
		});

	}

});

dojo.declare("classes.ui.ConditionPanel", com.nuclearunicorn.game.ui.Panel, {

	game: null,

	constructor: function(){
	},

    render: function(container){
		var content = this.inherited(arguments);
		var self = this;
		var controller = new classes.ui.ConditionBtnController(self.game);
		dojo.forEach(this.game.challenges.conditions, function(condition, i){
			var button = new com.nuclearunicorn.game.ui.BuildingBtn({id: condition.name, controller: controller}, self.game);
			button.render(content);
			self.addChild(button);
		});

	}

});

dojo.declare("classes.tab.ChallengesTab", com.nuclearunicorn.game.ui.tab, {
	render: function(container){
		this.challengesPanel = new classes.ui.ChallengePanel($I("challendge.panel.label"), this.game.challenges);
		this.challengesPanel.game = this.game;
		this.challengesPanel.render(container);
		
		this.conditionsPanel = new classes.ui.ConditionPanel($I("challendge.condition.panel.label"), this.game.challenges);
		this.conditionsPanel.game = this.game;
		this.conditionsPanel.render(container);

		var applyPendingBtn = new com.nuclearunicorn.game.ui.ButtonModern({
			name: $I("challendge.applyPending.label"),
			description: $I("challendge.applyPending.desc"),
			handler: dojo.hitch(this, function(){
				this.game.challenges.applyPending();
			}),
			controller: new com.nuclearunicorn.game.ui.ButtonController(this.game, {
				updateVisible: function (model) {
					var visible = false;
					for (var i = 0; i < this.game.challenges.challenges.length; i++){
						if (this.game.challenges.challenges[i].pending){
							visible = true
						}
					}

					for (var i = 0; i < this.game.challenges.conditions.length; i++){
						if (this.game.challenges.conditions[i].pending){
							visible = true;
						}
					}

					model.visible = visible;
				}
			})
		}, this.game);
		applyPendingBtn.render(container);
		this.applyPendingBtn = applyPendingBtn;
    },
	
	update: function(){
		this.challengesPanel.update();
		this.conditionsPanel.update();
		this.applyPendingBtn.update();
	}
});
