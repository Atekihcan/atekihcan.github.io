function getAjaxObj() {
	if (window.XMLHttpRequest) {
		return new XMLHttpRequest();
	} else if (window.ActiveXObject) {
		return new ActiveXObject('Microsoft.XMLHTTP');
	} else {
		alert('Your browser does not support AJAX.')
		return;
	}
}

/**
* Any values passed in the passThruParameters will be passed to the response function as the second argument
*
* @param serverScriptName
* @param requestVars
* @param responseHandler
* @param optionalPassThruParameters
*/
function ajaxRequest(serverScriptName, requestVars, responseHandler, passThruParameters) {
	var ajaxObj = getAjaxObj();

	ajaxObj.open('POST', serverScriptName, true);
	ajaxObj.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
	ajaxObj.setRequestHeader('Content-length', requestVars.length);
	ajaxObj.setRequestHeader('Connection', 'close');
	ajaxObj.onreadystatechange = function() {
		if (ajaxObj.readyState == 4) {
			eval(responseHandler+'(ajaxObj.responseText'+((passThruParameters == undefined) ? '' : (', passThruParameters'))+');');
		}
	}
	ajaxObj.send(requestVars);
}

function jsonDecode(jsonString) {
	if (jsonString) {
		return eval('(' + jsonString + ');');
	} else {
		return false;
	}
}

var cachedBrowserType = false;
function getBrowserType () {
	if (cachedBrowserType == false) {
		if (document.layers) {browserType = 'nn4'}
		if (document.all) {browserType = 'ie'}
		if (window.navigator.userAgent.toLowerCase().match('gecko')) {
			browserType = 'gecko';
		}
		cachedBrowserType = browserType;
	} else {
		browserType = cachedBrowserType;
	}
	return browserType;
}
// Javascript equivalent to PHP's number_format() function.
function number_format(num, precision, decpoint, sep) {
	// apply precision
	num = new Number(num);
	num = num.toFixed(precision);

	// check for missing parameters and use defaults if so
	if (arguments.length == 2) {
		sep = ",";
	}
	if (arguments.length == 1) {
		sep = ",";
		decpoint = ".";
	}

	// need a string for operations
	num = num.toString();
	// separate the whole number and the fraction if possible
	a = num.split('.');
	x = a[0]; // decimal
	y = a[1]; // fraction
	z = "";
	if (typeof(x) != "undefined") {
		// reverse the digits. regexp works from left to right.
		for (i=x.length-1;i>=0;i--)
			z += x.charAt(i);
		// add seperators. but undo the trailing one, if there
		z = z.replace(/(\d{3})/g, "$1" + sep);
		if (z.slice(-sep.length) == sep)
			z = z.slice(0, -sep.length);
		x = "";
		// reverse again to get back the number
		for (i=z.length-1;i>=0;i--)
			x += z.charAt(i);
		// add the fraction back in, if it was there
		if (typeof(y) != "undefined" && y.length > 0)
			x += decpoint + y;
	}
	// For negative numbers, remove instances of -,
	x = x.replace('-,', '-');
	return x;
}

function globalEval(src) {
    if (window.execScript) {
        window.execScript(src);
        return;
    }
    var fn = function() {
        window.eval.call(window,src);
    };
    fn();
};
function jsonEncode(arr) {
	var jsonKeys = [];
    for (var key in arr) {
    	var val = arr[key];

    	// Key
    	var str = '"' + key + '":';

    	// Value
    	if (val == null) {
    		str += 'null';
    	} else if (typeof(val) == 'object') {
    		str += jsonEncode(val); // Recursion
    	} else {
    		if (typeof(val) == 'number') {
    			str += val;
    		} else if (typeof(val) == 'string') {
    			str += '"' + escape(val) + '"';
    		} else if (typeof(val) === false) {
    			str += 'false';
    		} else if (typeof(val) === true) {
    			str += 'true';
    		} else if (typeof(val) == null) {
    			str += 'null';
    		} else {
    			str += '""';
			}
    	}
    	jsonKeys.push(str);
    }

    return '{' + jsonKeys.join(',') + '}';
}


////////////////////////////////////////////

var timeNow = graphData = null;
var isPortraitOrientation = true;
var isLandscapeBigOrientation = true;
var isPortraitBigOrientation = true;
var offsetDataSets = 0;


var maxTotalLootMinuteBalance = 33796216;
var maxTotalPlayersOnline = 72319;


var lmChanger = [];
lmChanger['balances'] = [];
lmChanger['balances']['total'] = [];
lmChanger['balances']['total']['lootMinutes'] = false;
lmChanger['balances']['total']['playersOnline'] = false;
lmChanger['balances']['total']['playersOffline'] = false;
lmChanger['balances']['regions'] = [];
lmChanger['rate'] = [];
lmChanger['rate']['total'] = []
lmChanger['rate']['total']['lootMinutes'] = false;
lmChanger['rate']['total']['playersOnline'] = false;
lmChanger['rate']['total']['playersOffline'] = false;
lmChanger['rate']['regions'] = [];

function initializeFull() {
	setInterval('updateLootMinuteBalances();', 1000);
	setInterval('getPageHits();', 15000);

	//setTimeout('document.getElementById(\'goFundMe1\').style.display = \'inline\';', 10000);
	//setTimeout('document.getElementById(\'goFundMe2\').style.display = \'inline\';', 10000);

//	setTimeout('document.getElementById(\'appStore1\').style.display = \'block\';', 5000);
//	setTimeout('document.getElementById(\'appStore2\').style.display = \'block\';', 5000);
}
function initializeMobile() {
	// determine orientation
	if (window.innerHeight > window.innerWidth) {
		// portrait
		offsetDataSets = 120;
		isPortraitOrientation = true;
		isLandscapeBigOrientation = false;
		if (window.innerHeight < 600) {
			document.getElementById('graphPlayersOnline').style.display = 'none';
			isPortraitBigOrientation = false;
			document.getElementById('forecastMessage').style.fontSize = '13px';
		}
	} else{
		// landscape
		if (window.innerHeight < 500) {
			document.getElementById('lootSummaryBox').style.display = 'none';
			isLandscapeBigOrientation = false;
		}
		isPortraitOrientation = isPortraitBigOrientation = false;
	}
	setInterval('updateGraphStatsMobile();', 20000);
	setInterval('updateGraphMobile();', 900000);
}
function initializeMobileStats() {
	// determine orientation
	if (window.innerHeight > window.innerWidth) {
		isPortraitOrientation = true;
		isLandscapeBigOrientation = false;
		if (window.innerHeight < 600 || window.innerWidth < 600) {
			isPortraitBigOrientation = false;
			isLandscapeBigOrientation = false;
		} else {
			isPortraitBigOrientation = true;
			isLandscapeBigOrientation = false;
			document.getElementById('worldwideStats').style.display = 'none';
			document.getElementById('worldwideStatsBig').style.display = 'table';
			document.getElementById('tableRegionStats').style.display = 'none';
			document.getElementById('tableRegionStatsLandscape').style.display = 'table';
		}
	} else {
		isPortraitOrientation = false;
		if (window.innerHeight < 500) {
			isLandscapeBigOrientation = false;
			isPortraitBigOrientation = false;
			document.getElementById('tableRegionStats').style.display = 'none';
			document.getElementById('tableRegionStatsLandscape').style.display = 'table';
		} else {
			isLandscapeBigOrientation = true;
			isPortraitBigOrientation = false;
			document.getElementById('worldwideStats').style.display = 'none';
			document.getElementById('worldwideStatsBig').style.display = 'table';
			document.getElementById('tableRegionStats').style.display = 'none';
			document.getElementById('tableRegionStatsLandscapeBig').style.display = 'table';
		}
	}
	setInterval('updateLootMinuteBalancesMobile();', 1000);
	setInterval('getStatsMobile();', 30000);
}


function updateGraph() {
	ajaxRequest('TOTALS.json', '', 'updateGraphResponse')
}
function updateGraphMobile() {
	ajaxRequest('../TOTALS.json', '', 'updateGraphMobileResponse')
}
function updateGraphResponse(resp) {
	graphData = jsonDecode(resp);
	offsetDataSets = 0;
	redrawGraph();
}
function updateGraphMobileResponse(resp) {
	graphData = jsonDecode(resp);
	offsetDataSets = 0;
	redrawGraphMobile();
}
function redrawGraph() {
	buildGraph(290, 10, maxTotalLootMinuteBalance, 'lootMinutesAvailableTable', 'D8F0EF', true, graphData['totals']['lootMinutes']);
	buildGraph(110, 10, maxTotalPlayersOnline, 'totalPlayersOnline', 'FFE9D1', false, graphData['totals']['playersOnline']);
	buildTimeScale('timeScaleGraphA');
	buildTimeScale('timeScaleGraphB');
	++offsetDataSets;
}
function redrawGraphMobile() {
	// determine height available for graph depending on client height
	var totalHeight = window.innerHeight;
	if (isPortraitOrientation) {
		if (isPortraitBigOrientation) {
			totalHeight -= 345
		} else {
			totalHeight -= 245;
		}
		if (totalHeight < 130) {
			totalHeight = 130;
		}

		buildGraph(totalHeight, 10, maxTotalLootMinuteBalance, 'lootMinutesAvailableTable', 'D8F0EF', true, graphData['totals']['lootMinutes']);
		if (isPortraitBigOrientation) {
			buildGraph(100, 10, maxTotalPlayersOnline, 'totalPlayersOnline', 'FFE9D1', false, graphData['totals']['playersOnline']);
		}
		document.getElementById('lootAvailable1').innerHTML = '<div class="rotate">Loot Available</div>';
		document.getElementById('lootAvailable2').innerHTML = '<div class="rotate">Loot Available</div>';
		document.getElementById('lootAvailable1').style.paddingTop = '65px';
		document.getElementById('lootAvailable2').style.paddingTop = '65px';
	} else {
		var playersOnHeight = 90;
		var height = (totalHeight - playersOnHeight - 80);
		if (isLandscapeBigOrientation) {
			height -= 100;
		}
		if (height < 120) {
			height = 120;
			playersOnHeight = (totalHeight - height - 80);
			if (playersOnHeight < 50) {
				playersOnHeight = 50;
				height = 100;
			}
			if (playersOnHeight < 80) {
				document.getElementById('playersOnline1').innerHTML = '<div class="rotate">On</div>';
				document.getElementById('playersOnline2').innerHTML = '<div class="rotate">On</div>';
			}
			document.getElementById('playersOnline1').style.paddingTop = '0px';
			document.getElementById('playersOnline2').style.paddingTop = '0px';
		}
		buildGraph(height, 10, maxTotalLootMinuteBalance, 'lootMinutesAvailableTable', 'D8F0EF', true, graphData['totals']['lootMinutes']);
		buildGraph(playersOnHeight, 10, maxTotalPlayersOnline, 'totalPlayersOnline', 'FFE9D1', false, graphData['totals']['playersOnline']);
		document.getElementById('lootAvailable1').innerHTML = '<div class="rotate">Loot<br>Available</div>';
		document.getElementById('lootAvailable2').innerHTML = '<div class="rotate">Loot<br>Available</div>';
		document.getElementById('lootAvailable1').style.paddingTop = '20px';
		document.getElementById('lootAvailable2').style.paddingTop = '20px';
	}
	buildTimeScale('timeScaleGraphA');
	buildTimeScale('timeScaleGraphB');
	++offsetDataSets;
}
function buildGraph(tableHeight, topMargin, maxValue, destinationDivId, backgroundColor, isMainGraph, dataSet) {
	var offsetFactors = 5000000;	// for aesthetics on graph, the higher the number, the higher highs and lower lows there will be
	var factorIntervalsPerPixel = ((tableHeight - topMargin) / (maxValue - ((isMainGraph) ? offsetFactors : 0)));
	var html = '';
	var cnt = 0;
	for (var i in graphData['dtStamps']) {
		var dtStamp = Number(graphData['dtStamps'][i]);
		if (cnt > offsetDataSets) {
			var factor = Number(dataSet[i]);
			var isNow = (dtStamp == timeNow);
			var isHourMarker = ((dtStamp % 3600) == 0);
			var isQuarterMarker = ((dtStamp % 900) == 0);
			var bgColor = ((isNow) ? '0000AA' : ((isMainGraph) ? graphData['mainColor'][i] : '464646'));
			var thisHeight = Math.ceil(factorIntervalsPerPixel * (factor - ((isMainGraph) ? offsetFactors : 0)));
			var markerHeight = (tableHeight - thisHeight - 15);
			html += '<td>';
			if (isNow) {
				html += '<div style="background-color:#0000AA;height:'+(tableHeight - thisHeight)+'px;"></div>';
			} else if (isHourMarker && markerHeight > 0) {
				html += '<div style="background-color:#FBCBBD;height:'+(markerHeight)+'px;"></div><div style="height:15px;"></div>';
			} else if (isQuarterMarker && markerHeight > 0) {
				html += '<div style="background-color:#E1E1E1;height:'+(markerHeight)+'px;"></div><div style="height:15px;"></div>';
			}
			html += '<div style="background-color:#'+bgColor+';height:'+thisHeight+'px;"></div></td>';
		}
		++cnt;
	}
	html = '<table width="100%" cellpadding="0" cellspacing="0" class="graphData" style="background-color:#'+backgroundColor+';height:'+tableHeight+'px;"><tr>'+html+'</tr></table>';
	document.getElementById(destinationDivId).innerHTML = html;
}
function buildTimeScale(destinationDivId) {
	var html = '';
	var cnt = 0;
	for (var i in graphData['dtStamps']) {
		if (cnt > offsetDataSets) {
			var dtStamp = Number(graphData['dtStamps'][i]);
			if (dtStamp == timeNow) {
				var bgColor = '0000AA';
			} else if (((dtStamp % 3600) == 0)) {
				var bgColor = 'FBCBBD';
			} else if ((dtStamp % 900) == 0) {
				var bgColor = 'DBDBDB';
			} else {
				var bgColor = 'EEEEEE';
			}

//			var markerOffset = ((militaryTime) ? 300 : 360);
			var markerOffset = 360;
			var hourTextMarker = (getBrowserType() != 'ie' && (((dtStamp + markerOffset) % 3600) == 0));

			if (hourTextMarker) {
				// determine time for local timezone
				var d = new Date(((dtStamp + markerOffset) * 1000));
				var hours = d.getHours();
				if (militaryTime) {
					var ampm = '';
					if (hours < 10) {
						hours = '0' + hours;
					}
				} else {
					if (hours > 12) {
						hours -= 12;
						var ampm = 'p';
					} else if (hours == 12) {
						var ampm = 'p';
					} else if (hours == 0) {
						var ampm = 'a';
						hours = 12;
					} else {
						var ampm = 'a';
					}
				}
				hourTextMarker = hours+ampm;
			}

			html += '<td><div style="background-color:#'+bgColor+';">'+((hourTextMarker) ? hourTextMarker : '')+'</div></td>';
		}
		++cnt;
	}
	html = '<table width="100%" cellpadding="0" cellspacing="0" class="graphData timeGraph"><tr>'+html+'</tr></table>';
	html += '';
	document.getElementById(destinationDivId).innerHTML = html;
}

function getStats() {
	ajaxRequest('STATS.json', '', 'getStatsResponse');
}


// regionstat constants
var STAT_ID = 0;
var STAT_NAME = 1;
var STAT_LOCALTIME = 2;
var STAT_LOCALTIMEMILITARY = 3;
var STAT_TOTALPLAYERS = 4;
var STAT_PLAYERSONLINE = 5;
var STAT_PLAYERSONLINECHANGE = 6;
var STAT_PERCENTONLINE = 7;
var STAT_LOOTMINUTEBALANCE = 8;
var STAT_ONLINECOLOR = 9;
var STAT_LMCHANGE = 10;
var STAT_LMCHANGECOLOR = 11;
var STAT_PLAYERSOFFLINE = 12;
var STAT_LOOTMINUTESPRODUCED = 13;
var STAT_LOOTMINUTESCONSUMED = 14;

function getStatsResponse(resp) {
	resp = jsonDecode(resp);

	// build region stats
	var factor = 60;	// 60 = 1 second, adjust it according to the timer, 120 = every half second, etc...
	var totalPlayersOffline = totalPlayersOnlineChange = 0;
	var html = '';
	for (var i in resp['regionStats']) {
		var reg = resp['regionStats'][i];
		html += '<tr>' +
			'<td style="text-align: left;" class="bold">'+reg[STAT_NAME]+'</td>' +
			'<td class="bold">'+reg[((militaryTime) ? STAT_LOCALTIMEMILITARY : STAT_LOCALTIME)]+'</td>' +
			'<td class="lightRightBorder online" style="color:#'+reg[STAT_ONLINECOLOR]+';" id="regionPlayersOnline_'+reg[STAT_ID]+'">'+number_format(reg[STAT_PLAYERSONLINE], 0, decimalChar, commaChar)+'</td>' +
			'<td class="percent online" style="color:#'+reg[STAT_ONLINECOLOR]+';">'+number_format(reg[STAT_PERCENTONLINE], 1, decimalChar, commaChar)+' %</td>' +
			'<td class="lightRightBorder offline" style="color:#'+reg[STAT_ONLINECOLOR]+';" id="regionPlayersOffline_'+reg[STAT_ID]+'">'+number_format(reg[STAT_PLAYERSOFFLINE], 0, decimalChar, commaChar)+'</td>' +
			'<td class="percent offline" style="color:#'+reg[STAT_ONLINECOLOR]+';">'+number_format((100 - reg[STAT_PERCENTONLINE]), 1, decimalChar, commaChar)+' %</td>' +
			'<td class="lightRightBorder lootMinutes" id="regionLootMinuteBalance_'+reg[STAT_ID]+'">'+number_format(reg[STAT_LOOTMINUTEBALANCE], 0, decimalChar, commaChar)+'</td>' +
			'<td class="percent darkerRightBorder lootMinutes">'+number_format(((reg[STAT_LOOTMINUTEBALANCE] / resp['currentLoot']['lootMinutes']) * 100), 2, decimalChar, commaChar)+' %</td>' +
			'<td class="lightRightBorder lootMinutes produced">'+number_format(reg[STAT_LOOTMINUTESPRODUCED], 0, decimalChar, commaChar)+'</td>' +
			'<td class="lightRightBorder lootMinutes consumed">'+number_format(reg[STAT_LOOTMINUTESCONSUMED], 0, decimalChar, commaChar)+'</td>' +
			'<td class="lootMinutes" style="border-right:none;color:#'+reg[STAT_LMCHANGECOLOR]+';">'+((reg[STAT_LMCHANGE] > 0) ? '+' : '')+number_format(reg[STAT_LMCHANGE], 0, decimalChar, commaChar)+'</td>' +
			'</tr>' +
		'';

		// lmChanger
		lmChanger['balances']['regions'][reg[STAT_ID]] = [];
		lmChanger['balances']['regions'][reg[STAT_ID]]['lootMinutes'] = parseInt(reg[STAT_LOOTMINUTEBALANCE]);
		lmChanger['balances']['regions'][reg[STAT_ID]]['playersOnline'] = parseInt(reg[STAT_PLAYERSONLINE]);
		lmChanger['balances']['regions'][reg[STAT_ID]]['playersOffline'] = parseInt(reg[STAT_PLAYERSOFFLINE]);
		lmChanger['rate']['regions'][reg[STAT_ID]] = [];
		lmChanger['rate']['regions'][reg[STAT_ID]]['lootMinutes'] = (reg[STAT_LMCHANGE] / factor);
		lmChanger['rate']['regions'][reg[STAT_ID]]['playersOnline'] = (reg[STAT_PLAYERSONLINECHANGE] / factor);
		lmChanger['rate']['regions'][reg[STAT_ID]]['playersOffline'] = ((reg[STAT_PLAYERSONLINECHANGE] * -1) / factor);
		totalPlayersOffline += reg[STAT_PLAYERSOFFLINE];
		totalPlayersOnlineChange += reg[STAT_PLAYERSONLINECHANGE];
	}
	document.getElementById('regionStats').innerHTML = html;

	// build main stats
	document.getElementById('lootIndexString').innerHTML = number_format(Number(resp['lootIndexString']), 1, decimalChar, commaChar);

	var lang = document.getElementById('language').value;
	document.getElementById('forecastMessage').innerHTML = resp['forecastMessages'][lang];
	document.getElementById('currentLootLootMinuteChange').innerHTML = ((resp['currentLoot']['lootMinuteChange'] > 0) ? '+' : '')+number_format(resp['currentLoot']['lootMinuteChange'], 0, decimalChar, commaChar);
	document.getElementById('currentLootLootMinuteChange').style.color = ((resp['currentLoot']['lootMinuteChange'] < 0) ? '#CC0000' : '#008800');

	// lmChanger
	lmChanger['balances']['total']['lootMinutes'] = parseInt(resp['currentLoot']['lootMinutes']);
	lmChanger['balances']['total']['playersOnline'] = parseInt(resp['currentLoot']['playersOnline']);
	lmChanger['balances']['total']['playersOffline'] = parseInt(totalPlayersOffline);
	lmChanger['rate']['total']['lootMinutes'] = (resp['currentLoot']['lootMinuteChange'] / factor);
	lmChanger['rate']['total']['playersOnline'] = (totalPlayersOnlineChange / factor);
	lmChanger['rate']['total']['playersOffline'] = ((totalPlayersOnlineChange * -1) / factor);

	// update main stats
	document.getElementById('currentLootLootMinutes').innerHTML = number_format(lmChanger['balances']['total']['lootMinutes'], 0, decimalChar, commaChar);
	document.getElementById('currentLootPlayersOnline').innerHTML = number_format(lmChanger['balances']['total']['playersOnline'], 0, decimalChar, commaChar);
	document.getElementById('currentLootPlayersOffline').innerHTML = number_format(lmChanger['balances']['total']['playersOffline'], 0, decimalChar, commaChar);

	// colors
	document.body.style.backgroundColor = '#'+resp['mainColorShadeNow'];
	document.getElementById('tableA').style.backgroundColor = '#'+resp['bgColor'];
	document.getElementById('tableA').style.border = '3px solid #'+resp['fgColor'];
	document.getElementById('tableA').style.color = '#'+resp['fgColor'];
	document.getElementById('tableB').style.backgroundColor = '#'+resp['bgColor'];
	document.getElementById('tableB').style.border = '3px solid #'+resp['fgColor'];
	document.getElementById('tableB').style.color = '#'+resp['fgColor'];
	document.getElementById('tableC').style.backgroundColor = '#'+resp['bgColor'];
	document.getElementById('tableC').style.border = '3px solid #'+resp['fgColor'];
	document.getElementById('tableC').style.color = '#'+resp['fgColor'];
	document.getElementById('tableD').style.backgroundColor = '#'+resp['bgColor'];
	document.getElementById('tableD').style.border = '3px solid #'+resp['fgColor'];
	document.getElementById('tableD').style.color = '#'+resp['fgColor'];

}

function updateLootMinuteBalances() {
	if (lmChanger['balances']['total']['lootMinutes'] != false) {
		// data is loaded, apply change and display
		lmChanger['balances']['total']['lootMinutes'] += lmChanger['rate']['total']['lootMinutes'];
		lmChanger['balances']['total']['playersOnline'] += lmChanger['rate']['total']['playersOnline'];
		lmChanger['balances']['total']['playersOffline'] += lmChanger['rate']['total']['playersOffline'];

		// update main stats
		document.getElementById('currentLootLootMinutes').innerHTML = number_format(lmChanger['balances']['total']['lootMinutes'], 0, decimalChar, commaChar);
		document.getElementById('currentLootPlayersOnline').innerHTML = number_format(lmChanger['balances']['total']['playersOnline'], 0, decimalChar, commaChar);
		document.getElementById('currentLootPlayersOffline').innerHTML = number_format(lmChanger['balances']['total']['playersOffline'], 0, decimalChar, commaChar);

		// update region balancs
		for (var id in lmChanger['balances']['regions']) {
			lmChanger['balances']['regions'][id]['lootMinutes'] += lmChanger['rate']['regions'][id]['lootMinutes'];
			lmChanger['balances']['regions'][id]['playersOnline'] += lmChanger['rate']['regions'][id]['playersOnline'];
			lmChanger['balances']['regions'][id]['playersOffline'] += lmChanger['rate']['regions'][id]['playersOffline'];
			document.getElementById('regionLootMinuteBalance_'+id).innerHTML = number_format(lmChanger['balances']['regions'][id]['lootMinutes'], 0, decimalChar, commaChar);
			document.getElementById('regionPlayersOnline_'+id).innerHTML = number_format(lmChanger['balances']['regions'][id]['playersOnline'], 0, decimalChar, commaChar);
			document.getElementById('regionPlayersOffline_'+id).innerHTML = number_format(lmChanger['balances']['regions'][id]['playersOffline'], 0, decimalChar, commaChar);
		}
	}
}

function getPageHits(passThruExecuteWhenDone) {
	ajaxRequest('PAGEHITS.json', '', 'getPageHitsResponse', passThruExecuteWhenDone);
}

function getPageHitsResponse(resp, passThruExecuteWhenDone) {
	resp = jsonDecode(resp);
	document.getElementById('totalHits').innerHTML = number_format(resp['totalHits'], 0, decimalChar, commaChar);
	document.getElementById('activeSessions').innerHTML = number_format(resp['activeSessions'], 0, decimalChar, commaChar);
	globalEval(passThruExecuteWhenDone);

	var oldTimeNow = timeNow;
	timeNow = resp['minuteNow'];
	if (oldTimeNow != timeNow && graphData != null) {
		redrawGraph();
		getStats();
	}
}

function updateGraphStatsMobile() {
	ajaxRequest('GRAPH_STATS.json', '', 'updateGraphStatsMobileResponse');
}

function updateGraphStatsMobileResponse(resp) {
	if (resp) {
		resp = jsonDecode(resp);
		// colors and strings
		document.body.style.backgroundColor = '#'+resp['mainColorShadeNow'];
		if (document.getElementById('lootSummaryBox').style.display != 'none') {
			document.getElementById('lootIndex').innerHTML = resp['lootIndexString'];
			document.getElementById('forecastMessage').innerHTML = resp['forecastMessage'];
			document.getElementById('lootIndexMessage').innerHTML = resp['forecastWordNow'];

			document.getElementById('lootIndexContainer').style.borderRight = '3px solid #'+resp['fgColor'];
			document.getElementById('lootIndexContainer').style.borderBottom = '3px solid #'+resp['fgColor'];
			document.getElementById('lootIndexContainer').style.borderLeft = '3px solid #'+resp['fgColor'];
			document.getElementById('lootIndexContainer').style.backgroundColor = '#'+resp['bgColor'];
			document.getElementById('lootIndex').style.color = '#'+resp['fgColor'];
			document.getElementById('lootIndexMessage').style.color = '#'+resp['fgColor'];
			document.getElementById('forecastMessage').style.border = '3px solid #'+resp['fgColor'];
			document.getElementById('forecastMessage').style.backgroundColor = '#'+resp['bgColor'];
			document.getElementById('forecastMessage').style.color = '#'+resp['fgColor'];
			if (isLandscapeBigOrientation) {
				document.getElementById('forecastMessage').style.fontSize = '16px';
				document.getElementById('forecastMessage').style.lineHeight = '20px';
				document.getElementById('lootIndexContainer').style.borderBottomLeftRadius = '6px';
			}
		}
		document.getElementById('graphContainer').style.borderTop = '3px solid #'+resp['fgColor'];
		document.getElementById('graphContainer').style.borderBottom = '3px solid #'+resp['fgColor'];

		// time
		var oldTimeNow = timeNow;
		timeNow = resp['epochMinuteNow'];
		if (oldTimeNow != timeNow && graphData != null) {
			redrawGraphMobile();
		}
	}
}
function getStatsMobile() {
	ajaxRequest('STATS.json', '', 'getStatsMobileResponse');
}
function getStatsMobileResponse(resp) {
	if (resp) {
		resp = jsonDecode(resp);
		// colors
		document.body.style.backgroundColor = '#'+resp['mainColorShadeNow'];
		var obj = ((isLandscapeBigOrientation || isPortraitBigOrientation) ? document.getElementById('worldwideStatsBig') : document.getElementById('worldwideStats'));
		obj.style.border = '3px solid #'+resp['fgColor'];
		obj.style.backgroundColor = '#'+resp['bgColor'];
		obj.style.color = '#'+resp['fgColor'];
		if (isPortraitOrientation) {
			document.getElementById('tableRegionStats').style.borderTop = '3px solid #'+resp['fgColor'];
		} else {
			document.getElementById('tableRegionStatsLandscape').style.borderTop = '3px solid #'+resp['fgColor'];
		}

		// content
		if (isLandscapeBigOrientation || isPortraitBigOrientation) {
			document.getElementById('worldwideLootMinutesAvailableBig').innerHTML = number_format(resp['lootMinutes'], 0, decimalChar, commaChar);
			document.getElementById('worldwidePlayersOnlineBig').innerHTML = number_format(resp['playersOnline'], 0, decimalChar, commaChar);
			document.getElementById('worldwidePlayersOfflineBig').innerHTML = number_format(resp['playersOffline'], 0, decimalChar, commaChar);
			document.getElementById('worldwideLootMinuteChangeBig').innerHTML = ((resp['lootMinuteChange'] > 0) ? '+' : '')+number_format(resp['lootMinuteChange'], 0, decimalChar, commaChar);
			document.getElementById('worldwideLootMinuteChangeBig').style.color = ((resp['lootMinuteChange'] < 0) ? '#CC0000' : '#008800');
		} else {
			document.getElementById('worldwideLootMinutesAvailable').innerHTML = number_format(resp['lootMinutes'], 0, decimalChar, commaChar);
			document.getElementById('worldwidePlayersOnline').innerHTML = number_format(resp['playersOnline'], 0, decimalChar, commaChar);
			document.getElementById('worldwidePlayersOffline').innerHTML = number_format(resp['playersOffline'], 0, decimalChar, commaChar);
			document.getElementById('worldwideLootMinuteChange').innerHTML = ((resp['lootMinuteChange'] > 0) ? '+' : '')+number_format(resp['lootMinuteChange'], 0, decimalChar, commaChar);
			document.getElementById('worldwideLootMinuteChange').style.color = ((resp['lootMinuteChange'] < 0) ? '#CC0000' : '#008800');
		}

		// regions
		var factor = 60;	// 60 = 1 second, adjust it according to the timer, 120 = every half second, etc...
		var totalPlayersOnlineChange = 0;
		var html = '';
		for (var i in resp['regionStats']) {
			var region = resp['regionStats'][i];
			html += '' +
				'<tr>' +
					'<td class="region">'+region[STAT_NAME]+'</td>' +
					'<td class="time">'+region[STAT_LOCALTIME]+'</td>' +
					'<td class="online" style="color:#'+region[STAT_ONLINECOLOR]+';" id="regionPlayersOnline_'+region[STAT_ID]+'">'+number_format(region[STAT_PLAYERSONLINE], 0, decimalChar, commaChar)+'</td>' +
					((isLandscapeBigOrientation || isPortraitBigOrientation || !isPortraitOrientation) ? ('<td class="onlinePercent" style="color:#'+region[STAT_ONLINECOLOR]+';">'+number_format(region[STAT_PERCENTONLINE], 1, decimalChar, commaChar)+' %</td>') : '') +
					'<td class="offline" style="color:#'+region[STAT_ONLINECOLOR]+';" id="regionPlayersOffline_'+region[STAT_ID]+'">'+number_format(region[STAT_PLAYERSOFFLINE], 0, decimalChar, commaChar)+'</td>' +
					((isLandscapeBigOrientation || isPortraitBigOrientation || !isPortraitOrientation) ? ('<td class="offlinePercent" style="color:#'+region[STAT_ONLINECOLOR]+';">'+number_format((100 - region[STAT_PERCENTONLINE]), 1, decimalChar, commaChar)+' %</td>') : '') +
					'<td class="lootMinutes lmBalance" id="regionLootMinuteBalance_'+region[STAT_ID]+'">'+number_format(region[STAT_LOOTMINUTEBALANCE], 0, decimalChar, commaChar)+'</td>' +
					((isLandscapeBigOrientation || isPortraitBigOrientation || !isPortraitOrientation) ? ('<td class="lootMinutes lmBalancePercent">'+number_format(((region[STAT_LOOTMINUTEBALANCE] / resp['lootMinutes']) * 100), 2, decimalChar, commaChar)+' %</td>') : '') +
					(isLandscapeBigOrientation ? ('<td class="lootMinutes lmProduced">'+number_format(region[STAT_LOOTMINUTESPRODUCED], 0, decimalChar, commaChar)+'</td>') : '') +
					(isLandscapeBigOrientation ? ('<td class="lootMinutes lmConsumed">'+number_format(region[STAT_LOOTMINUTESCONSUMED], 0, decimalChar, commaChar)+'</td>') : '') +
					(isLandscapeBigOrientation ? ('<td class="lootMinutes lmNetChange" style="color:#'+region[STAT_LMCHANGECOLOR]+';">'+((region[STAT_LMCHANGE] > 0) ? '+' : '')+number_format(region[STAT_LMCHANGE], 0, decimalChar, commaChar)+'</td>') : '') +
				'</tr>' +
			'';

			// lm changer
			lmChanger['balances']['regions'][region[STAT_ID]] = [];
			lmChanger['balances']['regions'][region[STAT_ID]]['lootMinutes'] = parseInt(region[STAT_LOOTMINUTEBALANCE]);
			lmChanger['balances']['regions'][region[STAT_ID]]['playersOnline'] = parseInt(region[STAT_PLAYERSONLINE]);
			lmChanger['balances']['regions'][region[STAT_ID]]['playersOffline'] = parseInt(region[STAT_PLAYERSOFFLINE]);
			lmChanger['rate']['regions'][region[STAT_ID]] = [];
			lmChanger['rate']['regions'][region[STAT_ID]]['lootMinutes'] = (region[STAT_LMCHANGE] / factor);
			lmChanger['rate']['regions'][region[STAT_ID]]['playersOnline'] = (region[STAT_PLAYERSONLINECHANGE] / factor);
			lmChanger['rate']['regions'][region[STAT_ID]]['playersOffline'] = ((region[STAT_PLAYERSONLINECHANGE] * -1) / factor);
			totalPlayersOnlineChange += region[STAT_PLAYERSONLINECHANGE];
		}
		if (isLandscapeBigOrientation) {
			document.getElementById('regionStatsLandscapeBig').innerHTML = html;
		} else if (isPortraitBigOrientation || !isPortraitOrientation) {
			document.getElementById('regionStatsLandscape').innerHTML = html;
		} else {
			document.getElementById('regionStats').innerHTML = html;
		}

		// main stats lmChanger
		lmChanger['balances']['total']['lootMinutes'] = parseInt(resp['lootMinutes']);
		lmChanger['balances']['total']['playersOnline'] = parseInt(resp['playersOnline']);
		lmChanger['balances']['total']['playersOffline'] = parseInt(resp['playersOffline']);
		lmChanger['rate']['total']['lootMinutes'] = parseInt(resp['lootMinuteChange'] / factor);
		lmChanger['rate']['total']['playersOnline'] = (totalPlayersOnlineChange / factor);
		lmChanger['rate']['total']['playersOffline'] = ((totalPlayersOnlineChange * -1) / factor);
	}
}
function updateLootMinuteBalancesMobile() {
	if (lmChanger['balances']['total']['lootMinutes'] != false) {
		// data is loaded, apply change and display
		lmChanger['balances']['total']['lootMinutes'] += lmChanger['rate']['total']['lootMinutes'];
		lmChanger['balances']['total']['playersOnline'] += lmChanger['rate']['total']['playersOnline'];
		lmChanger['balances']['total']['playersOffline'] += lmChanger['rate']['total']['playersOffline'];

		// update main stats
		if (isLandscapeBigOrientation) {
			document.getElementById('worldwideLootMinutesAvailableBig').innerHTML = number_format(lmChanger['balances']['total']['lootMinutes'], 0, decimalChar, commaChar);
			document.getElementById('worldwidePlayersOnlineBig').innerHTML = number_format(lmChanger['balances']['total']['playersOnline'], 0, decimalChar, commaChar);
			document.getElementById('worldwidePlayersOfflineBig').innerHTML = number_format(lmChanger['balances']['total']['playersOffline'], 0, decimalChar, commaChar);
		} else {
			document.getElementById('worldwideLootMinutesAvailable').innerHTML = number_format(lmChanger['balances']['total']['lootMinutes'], 0, decimalChar, commaChar);
			document.getElementById('worldwidePlayersOnline').innerHTML = number_format(lmChanger['balances']['total']['playersOnline'], 0, decimalChar, commaChar);
			document.getElementById('worldwidePlayersOffline').innerHTML = number_format(lmChanger['balances']['total']['playersOffline'], 0, decimalChar, commaChar);
		}

		// update region balancs
		for (var id in lmChanger['balances']['regions']) {
			lmChanger['balances']['regions'][id]['lootMinutes'] += lmChanger['rate']['regions'][id]['lootMinutes'];
			lmChanger['balances']['regions'][id]['playersOnline'] += lmChanger['rate']['regions'][id]['playersOnline'];
			lmChanger['balances']['regions'][id]['playersOffline'] += lmChanger['rate']['regions'][id]['playersOffline'];
			document.getElementById('regionLootMinuteBalance_'+id).innerHTML = number_format(lmChanger['balances']['regions'][id]['lootMinutes'], 0, decimalChar, commaChar);
			document.getElementById('regionPlayersOnline_'+id).innerHTML = number_format(lmChanger['balances']['regions'][id]['playersOnline'], 0, decimalChar, commaChar);
			document.getElementById('regionPlayersOffline_'+id).innerHTML = number_format(lmChanger['balances']['regions'][id]['playersOffline'], 0, decimalChar, commaChar);
		}
	}
}

function mobileSettingsSave() {
	mobileSettingsToggler();

	var d = new Date();
	var tzOffset = -(d.getTimezoneOffset() / 60);

	// build aryVars
	var aryVars = [];
	aryVars['timezoneOffset'] = tzOffset;
	aryVars['enablePush'] = ((document.getElementById('enablePush').checked) ? 1 : 0);
	aryVars['minutesInAdvance'] = document.getElementById('minutesInAdvance').value;
	aryVars['lootIndexWarning'] = document.getElementById('lootIndexWarning').value;
	aryVars['pushExceptWhen'] = ((document.getElementById('pushExceptWhen').checked) ? 1 : 0);
	aryVars['pushExceptStart'] = document.getElementById('pushExceptStart').value;
	aryVars['pushExceptEnd'] = document.getElementById('pushExceptEnd').value;

	ajaxRequest('settings.php', 'action=SAVE&token='+encodeURIComponent(document.getElementById('token').value)+'&aryVars='+jsonEncode(aryVars), 'mobileSettingsSaveResponse');
}

function mobileSettingsSaveResponse(resp) {
	if (resp != '1') {
		alert('Sorry, but an error has occurred and your settings may not have been saved.');
	}
}

function mobileSettingsToggler() {
	var enablePush = document.getElementById('enablePush').checked;
	var pushExceptWhen = document.getElementById('pushExceptWhen').checked;

	document.getElementById('minutesInAdvance').disabled = (!enablePush);
	document.getElementById('lootIndexWarning').disabled = (!enablePush);
	document.getElementById('pushExceptWhen').disabled = (!enablePush);
	document.getElementById('pushExceptStart').disabled = (!enablePush || !pushExceptWhen);
	document.getElementById('pushExceptEnd').disabled = (!enablePush || !pushExceptWhen);
}