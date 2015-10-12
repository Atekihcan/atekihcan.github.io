var troopList = {};
var bestSorted = [];

var elTroops = {
    Barbarian: 0,
    Archer: 0,
    Goblin: 0,
    Giant: 0,
    WallBreaker: 0,
    Balloon: 0,
    Wizard: 0,
    Healer: 0,
    Dragon: 0,
    PEKKA: 0
};

var deTroops = {
    Minion: 0,
    HogRider: 0,
    Valkyrie: 0,
    Golem: 0,
    Witch: 0,
    LavaHound: 0
};

var Troop = function(type, space, attack_speed, max_level) {
    this.type = type;
    this.space = space;
    this.attack_speed = attack_speed;
    this.max_level = max_level;
    this.level = [];
    for (var i = 0; i <= max_level; i++) {
        this.level.push(0);
    }
    
    this.add_level = function(level, dps, hp, cost, research_cost) {
        this.level[level] = {
            "dps": dps,
            "hp": hp,
            "cost": cost,
            "research_cost": research_cost
        };
    };
};

var createBarbarian = function() {
    var troop = new Troop(0, 1, 1, 7);
    troop.add_level(1, 8, 45, 25, 0);
    troop.add_level(2, 11, 54, 40, 50000);
    troop.add_level(3, 14, 65, 60, 150000);
    troop.add_level(4, 18, 78, 100, 500000);
    troop.add_level(5, 23, 95, 150, 1500000);
    troop.add_level(6, 26, 110, 200, 4500000);
    troop.add_level(7, 30, 125, 250, 6000000);
    return troop;
};

var createArcher = function() {
    var troop = new Troop(0, 1, 1, 7);
    troop.add_level(1, 7, 20, 50, 0);
    troop.add_level(2, 9, 23, 80, 50000);
    troop.add_level(3, 12, 28, 120, 250000);
    troop.add_level(4, 16, 33, 200, 750000);
    troop.add_level(5, 20, 40, 300, 2250000);
    troop.add_level(6, 22, 44, 400, 6000000);
    troop.add_level(7, 25, 48, 500, 7500000);
    return troop;
};

var createGoblin = function() {
    var troop = new Troop(0, 1, 1, 6);
    troop.add_level(1, 11, 25, 25, 0);
    troop.add_level(2, 14, 30, 40, 50000);
    troop.add_level(3, 19, 36, 60, 250000);
    troop.add_level(4, 24, 43, 80, 750000);
    troop.add_level(5, 32, 52, 100, 2250000);
    troop.add_level(6, 42, 68, 150, 4500000);
    return troop;
};

var createGiant = function() {
    var troop = new Troop(0, 5, 2, 7);
    troop.add_level(1, 11, 300, 250, 0);
    troop.add_level(2, 14, 360, 750, 100000);
    troop.add_level(3, 19, 430, 1250, 250000);
    troop.add_level(4, 24, 520, 1750, 750000);
    troop.add_level(5, 31, 670, 2250, 2250000);
    troop.add_level(6, 43, 940, 3000, 6000000);
    troop.add_level(7, 50, 1100, 3500, 7000000);
    return troop;
};

var createWallBreaker = function() {
    var troop = new Troop(0, 2, 1, 6);
    troop.add_level(1, 12, 20, 1000, 0);
    troop.add_level(2, 16, 24, 1500, 100000);
    troop.add_level(3, 24, 29, 2000, 250000);
    troop.add_level(4, 32, 35, 2500, 750000);
    troop.add_level(5, 46, 42, 3000, 2250000);
    troop.add_level(6, 60, 54, 3500, 6750000);
    return troop;
};

var createBalloon = function() {
    var troop = new Troop(0, 5, 4, 6);
    troop.add_level(1, 25, 150, 2000, 0);
    troop.add_level(2, 32, 180, 2500, 150000);
    troop.add_level(3, 48, 216, 3000, 450000);
    troop.add_level(4, 72, 280, 3500, 1350000);
    troop.add_level(5, 108, 390, 4000, 2500000);
    troop.add_level(6, 162, 545, 4500, 6000000);
    return troop;
};

var createWizard = function() {
    var troop = new Troop(0, 4, 1.5, 6);
    troop.add_level(1, 50, 75, 1500, 0);
    troop.add_level(2, 70, 90, 2000, 15000);
    troop.add_level(3, 90, 108, 2500, 450000);
    troop.add_level(4, 125, 130, 3000, 1350000);
    troop.add_level(5, 170, 156, 3500, 2500000);
    troop.add_level(6, 180, 164, 4000, 7500000);
    return troop;
};

var createHealer = function() {
    var troop = new Troop(0, 14, 0.7, 4);
    troop.add_level(1, 35, 500, 5000, 0);
    troop.add_level(2, 42, 600, 6000, 750000);
    troop.add_level(3, 55, 840, 8000, 1500000);
    troop.add_level(4, 71, 1176, 10000, 3000000);
    return troop;
};

var createDragon = function() {
    var troop = new Troop(0, 20, 1.5, 5);
    troop.add_level(1, 140, 1900, 25000, 0);
    troop.add_level(2, 160, 2100, 29000, 2000000);
    troop.add_level(3, 180, 2300, 33000, 3000000);
    troop.add_level(4, 200, 2500, 37000, 7000000);
    troop.add_level(5, 220, 2700, 42000, 8000000);
    return troop;
};

var createPEKKA = function() {
    var troop = new Troop(0, 25, 2.5, 5);
    troop.add_level(1, 240, 2800, 28000, 0);
    troop.add_level(2, 270, 3100, 32000, 3000000);
    troop.add_level(3, 300, 3500, 36000, 6000000);
    troop.add_level(4, 340, 4000, 40000, 7000000);
    troop.add_level(5, 380, 4500, 45000, 8000000);
    return troop;
};

var createMinion = function() {
    var troop = new Troop(1, 2, 1, 6);
    troop.add_level(1, 35, 55, 6, 0);
    troop.add_level(2, 38, 60, 7, 10000);
    troop.add_level(3, 42, 66, 8, 20000);
    troop.add_level(4, 46, 72, 9, 30000);
    troop.add_level(5, 50, 78, 10, 40000);
    troop.add_level(6, 54, 84, 11, 100000);
    return troop;
};

var createHogRider = function() {
    var troop = new Troop(1, 5, 1, 5);
    troop.add_level(1, 60, 270, 40, 0);
    troop.add_level(2, 70, 312, 45, 20000);
    troop.add_level(3, 80, 360, 52, 30000);
    troop.add_level(4, 92, 415, 58, 40000);
    troop.add_level(5, 105, 475, 65, 50000);
    return troop;
};

var createValkyrie = function() {
    var troop = new Troop(1, 8, 1.8, 4);
    troop.add_level(1, 88, 900, 70, 0);
    troop.add_level(2, 99, 1000, 100, 50000);
    troop.add_level(3, 111, 1100, 130, 60000);
    troop.add_level(4, 124, 1200, 160, 70000);
    return troop;
};

var createGolem = function() {
    var troop = new Troop(1, 30, 2.4, 5);
    troop.add_level(1, 38, 4500, 450, 0);
    troop.add_level(2, 42, 5000, 525, 60000);
    troop.add_level(3, 46, 5500, 600, 70000);
    troop.add_level(4, 50, 6000, 675, 80000);
    troop.add_level(5, 54, 6300, 750, 90000);
    return troop;
};

var createWitch = function() {
    var troop = new Troop(1, 12, 0.7, 2);
    troop.add_level(1, 25, 75, 250, 0);
    troop.add_level(2, 30, 100, 350, 75000);
    return troop;
};

var createLavaHound = function() {
    var troop = new Troop(1, 30, 2, 3);
    troop.add_level(1, 10, 5700, 390, 0);
    troop.add_level(2, 12, 6200, 450, 60000);
    troop.add_level(3, 14, 6700, 510, 70000);
    return troop;
};

function createTroops() {
    troopList["Barbarian"] = createBarbarian();
    troopList["Archer"] = createArcher();
    troopList["Goblin"] = createGoblin();
    troopList["Giant"] = createGiant();
    troopList["WallBreaker"] = createWallBreaker();
    troopList["Balloon"] = createBalloon();
    troopList["Wizard"] = createWizard();
    troopList["Healer"] = createHealer();
    troopList["Dragon"] = createDragon();
    troopList["PEKKA"] = createPEKKA();
    troopList["Minion"] = createMinion();
    troopList["HogRider"] = createHogRider();
    troopList["Valkyrie"] = createValkyrie();
    troopList["Golem"] = createGolem();
    troopList["Witch"] = createWitch();
    troopList["LavaHound"] = createLavaHound();
}

function getDPSperCost(troop, level) {
    return troopList[troop].level[level].dps / troopList[troop].level[level].cost;
}

function getDPSperSpace(troop, level) {
    return troopList[troop].level[level].dps / troopList[troop].space;
}

function getHPperCost(troop, level) {
    return troopList[troop].level[level].hp / troopList[troop].level[level].cost;
}

function getHPperSpace(troop, level) {
    return troopList[troop].level[level].hp / troopList[troop].space;
}

function getCostEfficiency(troop, level) {
    return getDPSperCost(troop, level) * getHPperCost(troop, level);
}

function getSpaceEfficiency(troop, level) {
    return getDPSperSpace(troop, level) * getHPperSpace(troop, level);
}

function getUpgradeEfficiency(troop, level) {
    var cost_increase  = (getCostEfficiency(troop, level + 1) - getCostEfficiency(troop, level)) / getCostEfficiency(troop, level);
    var space_increase = (getSpaceEfficiency(troop, level + 1) - getSpaceEfficiency(troop, level)) / getSpaceEfficiency(troop, level);
    var efficiency = 100000000 * (cost_increase * space_increase) / troopList[troop].level[level + 1].research_cost;
    
    return [troop, efficiency, 100 * cost_increase, 100 * space_increase];
}

function populateLevelSelector() {
    for (var key in troopList) {
        var type = troopList[key].type;
        var select = document.getElementById(key + "Level");
        for (var i = 0; i <= troopList[key].max_level; i++){
            var option = document.createElement("option");
            option.text = "Level " + i;
            option.value = i + key;
            select.appendChild(option);
        }
    }
}

function setTroop(value) {
    var name  = value.slice(1, value.length), 
        level = parseInt(value[0]);

    if (name in elTroops) {
        elTroops[name] = level;
    } else if (name in deTroops) {
        deTroops[name] = level;
    }
}

function findBestUpgrade(troops) {
    var bestDPS     = {name: "", value: 0},
        bestHP      = {name: "", value: 0},
        bestCost    = {name: "", value: 0},
        bestSpace   = {name: "", value: 0};
    
    bestSorted  = [];
    var bestSortedNames = "";
    

    for (var key in troops) {
        if(troops[key] && troops[key] < troopList[key].max_level) {
            if (bestDPS.value < troopList[key].level[troops[key] + 1].dps) {
                bestDPS.name  = key;
                bestDPS.value = troopList[key].level[troops[key] + 1].dps;
            }
            if (bestHP.value < troopList[key].level[troops[key] + 1].hp) {
                bestHP.name  = key;
                bestHP.value = troopList[key].level[troops[key] + 1].hp;
            }
            if (bestCost.value < getCostEfficiency(key, troops[key] + 1)) {
                bestCost.name  = key;
                bestCost.value = getCostEfficiency(key, troops[key] + 1);
            }
            if (bestSpace.value < getSpaceEfficiency(key, troops[key] + 1)) {
                bestSpace.name  = key;
                bestSpace.value = getSpaceEfficiency(key, troops[key] + 1);
            }
            bestSorted.push(getUpgradeEfficiency(key, troops[key]));
        }
    }
    
    //console.log(bestDPS);
    
    bestSorted.sort(function(a, b) {return b[1] - a[1]});
    //console.log(bestSorted);
    
    for (var i = 0; i < bestSorted.length; i++) {
        if (i < bestSorted.length - 1) {
            bestSortedNames += bestSorted[i][0] + " > ";
        } else {
            bestSortedNames += bestSorted[i][0];
        }
    }
    
    return [bestDPS, bestHP, bestCost, bestSpace, bestSortedNames];
}

function printBestUpgrade() {
    var resultDiv = document.getElementById("upgradePriority");
    resultDiv.style.display = "";
    
    var ret = findBestUpgrade(elTroops);
    document.getElementById("bestDPSEL").innerHTML    = ret[0].name;
    document.getElementById("bestHPEL").innerHTML     = ret[1].name;
    document.getElementById("bestCostEL").innerHTML   = ret[2].name;
    document.getElementById("bestSpaceEL").innerHTML  = ret[3].name;
    document.getElementById("bestSortedEL").innerHTML = ret[4];
    
    ret = findBestUpgrade(deTroops);
    document.getElementById("bestDPSDE").innerHTML    = ret[0].name;
    document.getElementById("bestHPDE").innerHTML     = ret[1].name;
    document.getElementById("bestCostDE").innerHTML   = ret[2].name;
    document.getElementById("bestSpaceDE").innerHTML  = ret[3].name;
    document.getElementById("bestSortedDE").innerHTML = ret[4];
}

window.onload = function init() {
    createTroops();
    populateLevelSelector();
}

function logToConsole() {
    console.log(troopList);
    console.log(getDPSperCost("Wizard", 5));
}