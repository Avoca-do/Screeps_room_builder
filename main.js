const types = {
    '-10' : {fill: 'red', radius: 0.55, stroke: 'black'}, 
    '-3' : {fill: 'transparent', radius: 0.2, stroke: 'transparent'},
    '-1' : {fill: 'blue', radius: 0.2, stroke: 'black'},
    0 : {fill: 'transparent', radius: 0.2, stroke: 'transparent'},
    1 : {fill: 'transparent', radius: 0.2, stroke: 'transparent'},
    2 : {fill: 'blue', radius: 0.2, stroke: 'black'},
    3 : {fill: 'black', radius: 0.2, stroke: 'black'},
    4 : {fill: 'green', radius: 0.2, stroke: 'black'},
    5 : {fill: 'red', radius: 0.2, stroke: 'black'},
    6 : {fill: 'cyan', radius: 0.2, stroke: 'white'},
    7 : {fill: 'brown', radius: 0.2, stroke: 'green'},
    8 : {fill: 'purple', radius: 0.2, stroke: 'blue'},
    9 : {fill: 'white', radius: 0.2, stroke: 'blue'},
}

const t_t = {
    1 : STRUCTURE_SPAWN,
    2 : STRUCTURE_EXTENSION,
    3 : STRUCTURE_TOWER,
    4 : STRUCTURE_LAB,
    5 : STRUCTURE_POWER_SPAWN, 
    6 : STRUCTURE_STORAGE,
    7 : STRUCTURE_NUKER,
    8 : STRUCTURE_LINK,
    9 : STRUCTURE_TERMINAL,
}


class wpos {
    constructor(x, y, type){
        this.x = x;
        this.y = y;
        this.type = type;
    }

    draw(room){
        if(this.type > 0){
            room.visual.circle(this.x, this.y, types[this.type]);
        }else{
            room.visual.rect(this.x - 0.35, this.y - 0.35, 0.7, 0.7, types[this.type]);
        }
        
    }
}

var arr = [];

var l3 = require('./layout_v3g');
var labs = require('./lab_placment');
var labsv2 = require('./labv2_p');
var lroads = require('./layout_single_road');


const create_l = function(){
    let l = [];

    for(let y = 0; y < 15; y++){
        for(let x = 0; x < 15; x++){
            l.push({
                x : x,
                y : y,
                v : 0,
            })
        }
    }

    let numObject = 10;
    let x = 10;
    let y = 5;
    console.log(JSON.stringify(l[y * 15 + x]));
}

const addBuilding = function(map){

}

module.exports.loop = function () {
    let spawn = Game.spawns['Spawn1'];

    //let pos = new RoomPosition(20, 20);

    let _x = 25, _y = 25;
    //for(let x = x)

    let room = spawn.room;
    //let d = new wpos(25, 25, 1);
    //d.draw(room);

    //console.log("???");
    let strctures = room.find(FIND_MY_STRUCTURES);
    for(let i in strctures){
        let s = strctures[i];
        let t = s.structureType;
        t = (_.invert(t_t))[t];
        let pos = new wpos(s.pos.x - 25, s.pos.y - 25, t);
        arr.push(pos); 
    }

    let size = 21;
    let max = 4;
    let build = 120;
    let test = null;
    console.log(max);
    // //create_l();
    // test = layout.test(size, max, build);
    // //console.log(JSON.stringify(arr));
    // for(let i in test.map){
    //     let p = test.map[i];
    //     let t = p.type;
    //     if(p.contacts > 0 && t > 0){
    //         t = 5;
    //     }
    //     let d = new wpos(p.x + 1, p.y + 1, p.contacts);
    //     //d.draw(room);
    //     d = new wpos(p.x + 1, p.y + 1, p.type);
    //     d.draw(room);
    // }

    test = l3.test(room, 50, 4, 100, 20.5, 25.5);
    //console.log(JSON.stringify(arr));
    for(let i in test.map){
        let p = test.map[i];
        let t = p.type;
        if(p.contacts > 0 && t > 0){
            t = 7
        }
        let d = new wpos(p.x, p.y, p.contacts);
        //d.draw(room);
        d = new wpos(p.gridX, p.gridY, p.type);
        //d.draw(room);
    }

    //test = l3.test(room ,size, max, build, 5 , 6);
    let cycles = 500;
    let labs1 = true;
    if(labs1){
        test = lroads.test(room , 35, max, 210, 6 , 6, 21, 23);
        let time = 0;
        for(let i = 0; i < cycles; i++){
            let t = new Date().getTime();
            //test = lroads.test(room , 35, max, 210, 6 , 6, 21, 23);
            //test.add_tile_world(18, 26);
            //test.add_tile_world(31, 27)
            //test.add_tile_world(31, 28)
            //time += new Date().getTime() - t;
        }
        //console.log(JSON.stringify(test.possible));
        test = lroads.test(room , 15, max, 210, 10 , 10, 17, 17);
        let t = new Date().getTime();
        for(let i = 0; i < 129 ; i++){
            test.add_build_place();
        }
        test.set_buildings_count(87);
        time += new Date().getTime() - t;
        console.log(JSON.stringify(test.get_tile_word(18, 26)));
        //test.add_tile_world(17, 28);
        console.log(JSON.stringify(test.get_tile_word(17, 28)));
        console.log(test.buildings.length, 'buildings!');
        console.log(time);
        test.calculateMap();
        for(let j in test.map){
            let p = test.map[j];
            let t = p.type;
            if(p.contacts > 0 && t > 0){
                t = 7
            }
            let d = new wpos(p.x, p.y, p.type);
            d.draw(room);
            d = new wpos(p.x, p.y, p.range);
            d.draw(room);
        }
    }
    
    let labs2 = true;
    if(labs2){
        test = labs.test(room , 50, max, 210, 0 , 0);
        let time = 0;
        for(let i = 0; i < cycles; i++){
            let t = new Date().getTime();
            //test = labs.test(room , 50, max, 210, 0 , 0);
            //test = labs.test(room , 50, max, 210, 0 , 0);
            //test = labs.test(room , 50, max, 210, 0 , 0);
            //test = labs.test(room , 50, max, 210, 0 , 0);
            // test = labsv2.test(room , 50, max, 210, 0 , 0);
            // test.add_tile(15, 15);
            // test.add_tile(21, 21);
            // test.get_tile(10 , 10);
            // test.get_tile_word(15, 15);
            //test.get_area(5);
            //test.get_closest_area(5, 20 , 20);
            time += new Date().getTime() - t;
        }
        //console.log(time / cycles);
        test.calculateMap();

  
        for(let j in test.map){
            let p = test.map[j];
            let t = p.type;
            if(p.contacts > 0 && t > 0){
                t = 7
            }
            let d = new wpos(p.x, p.y, p.contacts);
            //d.draw(room);
            d = new wpos(p.x, p.y, p.type);
            //d.draw(room);
        }
    }

    console.log('---------------------------------------');
}

