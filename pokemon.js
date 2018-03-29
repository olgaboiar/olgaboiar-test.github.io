class Pokemon {
	constructor (data) {
		this.name = data.name;
		this.height = data.height;
		this.weight = data.weight;
		this.stats = data.stats;
		this.abilities = data.abilities;
		// get pokemon's stat
		this.hp      = this.getStatByName("hp");
		this.defense = this.getStatByName("defense");
		this.attack  = this.getStatByName("attack");
		//get pokemon's image for icon
		this.front_default    = data.sprites.front_default;
		this.front_shiny      = data.sprites.front_shiny;
		//get pokemon's abilities
		this.abilities_list = this.getAbilities();
		
	}
	
	getStatByName(name) {
		for (let i = 0; i < this.stats.length; i++) {
			if (name == this.stats[i].stat.name) {
				return this.stats[i].base_stat;
			}
		}
		alert("Stat not found");
	}

	getAbilities() {
		let abilitiesAll = [];
		for (let m = 0; m < this.abilities.length; m++) {
			abilitiesAll.push(this.abilities[m].ability.name);
			
		}
		return abilitiesAll.join(", ");
		alert("not found");
	}
}
