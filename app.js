var app = {
	// loadedPokemons is used for preloader functionality
	loadedPokemons: 0,
	myTrainer: new Trainer(),
	init: function() {
		this.loadPokemon(300);
		this.loadPokemon(653);
		this.loadPokemon(151);
	},
	loadPokemon: function(pokemonId) {
		let pokemon;
		let self = this;
		$.ajax({
			url: "https://pokeapi.co/api/v2/pokemon/" + pokemonId + "/",
			type: "GET",
			success: function(data) {
				self.loadedPokemons++;
				pokemon = new Pokemon(data);
				self.myTrainer.addPokemon(pokemon);
				//creating floating button icons for pokemons
				let $pokemonLinkTag = $('<a id="pokemon-' + pokemonId + '" class="btn-floating btn-large waves-effect waves-light pokemon-link"><img id="pokemon-icon-' + pokemonId + '" src="' + data.sprites.front_default + '">"</a>');
				let $pokemonIconTag = $('<div class="col s12 m4 center-align pokemon-icon"/>').append($pokemonLinkTag);
				$(".pokemon-icons").append($pokemonIconTag);
				//adding image change when hovering on the icon
				$("#pokemon-" + pokemonId).mouseover(function() {
					$("#pokemon-icon-" + pokemonId).attr("src", data.sprites.front_shiny);
				});
				$("#pokemon-" + pokemonId).mouseout(function() {
					$("#pokemon-icon-" + pokemonId).attr("src", data.sprites.front_default);
				});
				//showing pokemon card when this pokemon's icon is clicked
				$pokemonLinkTag.click(function() {
					$("#" + this.getAttribute("id") + "-card").addClass('show-it').siblings().removeClass('show-it');
				});
				//creating the structure of the pokemon card
				let $pokemonProperty = $("#pokemon-properties-" + pokemonId);
				$("#pokemon-name-" + pokemonId).append($("<span class='card-title'>" + data.name + "</span>"));
				$pokemonProperty.append($('<div id="pokemon-weight-' + pokemonId + '">' + data.weight + '</div>'));
				$pokemonProperty.append($('<div id="pokemon-height-' + pokemonId + '">' + data.height + '</div>'));
				$pokemonProperty.append($('<div id="pokemon-hp-' + pokemonId + '">' + pokemon.getStatByName("hp") + '</div>'));
				$pokemonProperty.append($('<div id="pokemon-attack-' + pokemonId + '">' + pokemon.getStatByName("attack") + '</div>'));
				$pokemonProperty.append($('<div id="pokemon-defense-' + pokemonId + '">' + pokemon.getStatByName("defense") + '</div>'));
				$pokemonProperty.append($('<div id="pokemon-abilities-' + pokemonId + '">' + pokemon.getAbilities() + '</div>'));
				//removing preloader when 3 ajax calls returned success
				if (self.loadedPokemons == 3) {
					$('body').removeClass('loading');
					$('ul.tabs').tabs();
				}
			},
			error: function(error) {
				console.log(error)
			}
		});
	}
};