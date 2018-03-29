class Trainer {
	constructor() {
		this.pokemons = [];
	}

	addPokemon(pokemon) {
		this.pokemons.push(pokemon);
	}

	all() {
		return this.pokemons;
	}

	get(name) {
		for (let i = 0; i < this.pokemons.length; i++) {
			if (name == this.pokemons[i].name) {
				return this.pokemons[i];
			}
		}
	}
}