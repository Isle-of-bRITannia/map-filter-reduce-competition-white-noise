import allTransactions from './all_transactions.json';
import botwData from './botw_data.json';
import botwEquipment from './botw_equipment_cleaned.json';
import botwMonsters from './botw_monsters_cleaned.json';


type Equipment = {
    category: string,
    common_locations: string[],
    description: string,
    id: number,
    name: string,
    image: string,     
    attack: number,
    defense: number
};

type Monster = {
    category: string,
    common_locations: string[],
    description: string,
    drops: string[],
    id: number,
    image: string,
    name: string
};

type Material = {
    category: string,
    common_locations: string[],
    cooking_effect: string,
    description: string,
    hearts_recovered: number,
    id: number,
    image: string,
    name: string
};

const equipment: Equipment[] = botwEquipment;
const monsters: Monster[] = botwMonsters;
const materials: Material[] = botwData.data.materials;


// Create a data structure of all monster spawn locations
// Attach to each location all the monster objects that spawn there, but without those Monsters' 'common.locations' and 'id' properties

// Monsters assigned to a location can't be a monster type while missing properties
// So, monsters could be rebuilt from the ground up 1 property at a time when being assigned

const locations: any = {};

for (let i = 0; i < monsters.length; i++) {
    for (let j = 0; j < monsters[i].common_locations.length; j++) {
        if (!locations.hasOwnProperty(monsters[i].common_locations[j])) {
            locations[`${monsters[i].common_locations[j]}`] = [];
        }
    }
}

for (let key of locations.keys()) {
    for (let i = 0; i < monsters.length; i++) {
        for (let j = 0; j < monsters[i].common_locations.length; j++) {
            if (monsters[i].common_locations[j] === key) {
                let monster_to_push = Object(monsters[i]);
                delete monster_to_push.id;
                delete monster_to_push.common_locations;





                key.push(monster_to_push);


            }
        }
    }
}

console.log(locations);