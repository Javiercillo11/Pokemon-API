export class PokemonDetail {
    id: number;
    order: number;
    name: string;
    height: number;
    abilities: Ability[];
    spices: Species;
    types: Type[];
    weight: number;
    sprites: Sprite;
    stats: Stat[];

    constructor() {
        this.id = 0;
        this.order = 0;
        this.name = '';
        this.height = 0;
        this.abilities = [];
        this.spices = new Species();
        this.types = [];
        this.weight = 0;
        this.sprites = new Sprite();
        this.stats = [];
    }
}

class Ability  {
    ability: {
        name: string;
    }

    constructor() {
        this.ability = { name: '' };
    }
}

class Species {
    url: string;

    constructor(){
        this.url = '';
    }
}

class Type {
    slot: number;
    type: {
        name: string;
    }

    constructor() {
        this.slot = 0;
        this.type = { name: '' };
    }
}

class Sprite {
    front_default: string;

    constructor() {
        this.front_default = '';
    }
}

class Stat {
    base_stat: number;
    stat: {
        name: string;
    }

    constructor() {
        this.base_stat = 0;
        this.stat = { name: '' };
    }
}