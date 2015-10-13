---
layout: post
title:  Which Troop You Should Upgrade
coc:    1
---

<div class="text-center"><h4><b>Select Your Troops</b></h4></div>
<div class="col-md-12 col-xs-12" style="font-family: 'Josefin Sans', sans-serif;">
    <div class="col-md-6 col-md-offset-3 col-xs-12">
        <div class="col-md-5 col-xs-12">
            <div class="row">
                <div class="col-md-12 col-xs-12 text-center">
                    <b>Elixir Troops</b>
                </div>
            </div>
            <div class="row">
                <div class="col-md-8 col-xs-8">
                    Barbarian
                </div>
                <div class="col-md-4 col-xs-4">
                    <select id="BarbarianLevel" onchange="setTroop(this.value)"></select>
                </div>
            </div>
            <div class="row">
                <div class="col-md-8 col-xs-8">
                    Archer
                </div>
                <div class="col-md-4 col-xs-4">
                    <select id="ArcherLevel" onchange="setTroop(this.value)"></select>
                </div>
            </div>
            <div class="row">
                <div class="col-md-8 col-xs-8">
                    Goblin
                </div>
                <div class="col-md-4 col-xs-4">
                    <select id="GoblinLevel" onchange="setTroop(this.value)"></select>
                </div>
            </div>
            <div class="row">
                <div class="col-md-8 col-xs-8">
                    Giant
                </div>
                <div class="col-md-4 col-xs-4">
                    <select id="GiantLevel" onchange="setTroop(this.value)"></select>
                </div>
            </div>
            <div class="row">
                <div class="col-md-8 col-xs-8">
                    Wall Breaker
                </div>
                <div class="col-md-4 col-xs-4">
                    <select id="WallBreakerLevel" onchange="setTroop(this.value)"></select>
                </div>
            </div>
            <div class="row">
                <div class="col-md-8 col-xs-8">
                    Balloon
                </div>
                <div class="col-md-4 col-xs-4">
                    <select id="BalloonLevel" onchange="setTroop(this.value)"></select>
                </div>
            </div>
            <div class="row">
                <div class="col-md-8 col-xs-8">
                    Wizard
                </div>
                <div class="col-md-4 col-xs-4">
                    <select id="WizardLevel" onchange="setTroop(this.value)"></select>
                </div>
            </div>
            <div class="row">
                <div class="col-md-8 col-xs-8">
                    Healer
                </div>
                <div class="col-md-4 col-xs-4">
                    <select id="HealerLevel" onchange="setTroop(this.value)"></select>
                </div>
            </div>
            <div class="row">
                <div class="col-md-8 col-xs-8">
                    Dragon
                </div>
                <div class="col-md-4 col-xs-4">
                    <select id="DragonLevel" onchange="setTroop(this.value)"></select>
                </div>
            </div>
            <div class="row">
                <div class="col-md-8 col-xs-8">
                    PEKKA
                </div>
                <div class="col-md-4 col-xs-4">
                    <select id="PEKKALevel" onchange="setTroop(this.value)"></select>
                </div>
            </div>
        </div>
        <div class="col-md-5 col-md-push-2 col-xs-12">
            <div class="row">
                <div class="col-md-12 col-xs-12 text-center">
                    <b>Dark Elixir Troops</b>
                </div>
            </div>
            <div class="row">
                <div class="col-md-8 col-xs-8">
                    Minion
                </div>
                <div class="col-md-4 col-xs-4">
                    <select id="MinionLevel" onchange="setTroop(this.value)"></select>
                </div>
            </div>
            <div class="row">
                <div class="col-md-8 col-xs-8">
                    Hog Rider
                </div>
                <div class="col-md-4 col-xs-4">
                    <select id="HogRiderLevel" onchange="setTroop(this.value)"></select>
                </div>
            </div>
            <div class="row">
                <div class="col-md-8 col-xs-8">
                    Valkyrie
                </div>
                <div class="col-md-4 col-xs-4">
                    <select id="ValkyrieLevel" onchange="setTroop(this.value)"></select>
                </div>
            </div>
            <div class="row">
                <div class="col-md-8 col-xs-8">
                    Golem
                </div>
                <div class="col-md-4 col-xs-4">
                    <select id="GolemLevel" onchange="setTroop(this.value)"></select>
                </div>
            </div>
            <div class="row">
                <div class="col-md-8 col-xs-8">
                    Witch
                </div>
                <div class="col-md-4 col-xs-4">
                    <select id="WitchLevel" onchange="setTroop(this.value)"></select>
                </div>
            </div>
            <div class="row">
                <div class="col-md-8 col-xs-8">
                    Lava Hound
                </div>
                <div class="col-md-4 col-xs-4">
                    <select id="LavaHoundLevel" onchange="setTroop(this.value)"></select>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-12 col-xs-12 text-center" style="margin-top: 20px;">
                <button type="button" class="btn btn-primary" onclick="printBestUpgrade()">Show</button>
            </div>
        </div>
    </div>
    <div id="upgradePriority" class="col-md-10 col-md-offset-1 col-xs-12" style="margin-top: 20px; display: none;">
        <div class="col-md-5 col-xs-12">
            <div class="row">
                <div class="col-md-12 col-xs-12 text-center">
                    <b>Elixir Troops</b>
                </div>
            </div>
            <div class="row">
                <div id="bestSortedEL" class="col-md-12 col-xs-12"></div>
            </div>
            <div class="row">
                <div class="col-md-10 col-xs-10">
                    Max damage per second increases for
                </div>
                <div id="bestDPSEL" class="col-md-2 col-xs-2"></div>
            </div>
            <div class="row">
                <div class="col-md-10 col-xs-10">
                    Max hitpoints increases for
                </div>
                <div id="bestHPEL" class="col-md-2 col-xs-2"></div>
            </div>
            <div class="row">
                <div class="col-md-10 col-xs-10">
                    Most cost efficient troop after upgrade
                </div>
                <div id="bestCostEL" class="col-md-2 col-xs-2"></div>
            </div>
            <div class="row">
                <div class="col-md-10 col-xs-10">
                    Most space efficient troop after upgrade
                </div>
                <div id="bestSpaceEL" class="col-md-2 col-xs-2"></div>
            </div>
        </div>
        <div class="col-md-5 col-md-push-2 col-xs-12">
            <div class="row">
                <div class="col-md-12 col-xs-12 text-center">
                    <b>Dark Elixir Troops</b>
                </div>
            </div>
            <div class="row">
                <div id="bestSortedDE" class="col-md-12 col-xs-12"></div>
            </div>
            <div class="row">
                <div class="col-md-10 col-xs-10">
                    Max damage per second increases for
                </div>
                <div id="bestDPSDE" class="col-md-2 col-xs-2"></div>
            </div>
            <div class="row">
                <div class="col-md-10 col-xs-10">
                    Max hitpoints increases for
                </div>
                <div id="bestHPDE" class="col-md-2 col-xs-2"></div>
            </div>
            <div class="row">
                <div class="col-md-10 col-xs-10">
                    Most cost efficient troop after upgrade
                </div>
                <div id="bestCostDE" class="col-md-2 col-xs-2"></div>
            </div>
            <div class="row">
                <div class="col-md-10 col-xs-10">
                    Most space efficient troop after upgrade
                </div>
                <div id="bestSpaceDE" class="col-md-2 col-xs-2"></div>
            </div>
        </div>
    </div>
</div>