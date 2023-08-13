 export const typeEffectiveness = {
    fighting: {
        strong: ['normal', 'rock', 'steel', 'ice', 'dark'],
        weak: ['flying', 'psychic', 'fairy'],
        ineffective: ['ghost']
    },
    flying: {
        strong: ['fighting', 'bug', 'grass'],
        weak: ['rock', 'electric', 'ice'],
        ineffective: []
    },
    normal: {
        strong: [],
        weak: ['rock', 'steel'],
        ineffective: ['ghost']
    },
    fire: {
        strong: ['grass', 'ice', 'bug', 'steel'],
        weak: ['fire', 'water', 'rock', 'dragon'],
        ineffective: []
    },
    water: {
        strong: ['fire', 'ground', 'rock'],
        weak: ['water', 'grass', 'electric'],
        ineffective: []
    },
    grass: {
        strong: ['water', 'ground', 'rock'],
        weak: ['fire', 'grass', 'poison', 'flying', 'bug'],
        ineffective: []
    },
    poison: {
        strong: ['grass', 'fairy'],
        weak: ['poison', 'ground', 'rock', 'ghost'],
        ineffective: ['steel']
    },
    electric: {
        strong: ['water', 'flying'],
        weak: ['electric', 'ground'],
        ineffective: []
    },
    ground: {
        strong: ['fire', 'electric', 'poison', 'rock', 'steel'],
        weak: ['grass', 'ice', 'water'],
        ineffective: ['flying']
    },
    rock: {
        strong: ['fire', 'ice', 'flying', 'bug'],
        weak: ['fighting', 'ground', 'steel'],
        ineffective: []
    },
    psychic: {
        strong: ['fighting', 'poison'],
        weak: ['psychic', 'steel'],
        ineffective: ['dark']
    },
    ice: {
        strong: ['grass', 'ground', 'flying', 'dragon'],
        weak: ['fire', 'water', 'ice'],
        ineffective: []
    },
    bug: {
        strong: ['grass', 'psychic', 'dark'],
        weak: ['fire', 'fighting', 'poison', 'flying', 'ghost', 'steel', 'fairy'],
        ineffective: []
    },
    ghost: {
        strong: ['psychic', 'ghost'],
        weak: ['dark'],
        ineffective: ['normal']
    },
    steel: {
        strong: ['ice', 'rock', 'fairy'],
        weak: ['fire', 'water', 'electric', 'steel'],
        ineffective: []
    },
    dragon: {
        strong: ['dragon'],
        weak: ['steel', 'fairy'],
        ineffective: []
    },
    dark: {
        strong: ['psychic', 'ghost'],
        weak: ['fighting', 'dark', 'fairy'],
        ineffective: []
    },
    fairy: {
        strong: ['fighting', 'dragon', 'dark'],
        weak: ['fire', 'poison', 'steel'],
        ineffective: []
    }
    
}