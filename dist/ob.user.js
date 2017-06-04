/*
 * Copyright (c) 2007-2017 OmertaBeyond Dev Team
 *
 * OmertaBeyond is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * OmertaBeyond is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with OmertaBeyond.  If not, see <http://www.gnu.org/licenses/>.
 *
 */

// ==UserScript==
// @name                     Omerta Beyond
// @id                       Omerta Beyond
// @version                  3.0.0-dev
// @date                     20-05-2017
// @description              Omerta Beyond 3.0.0 (We're back to reclaim the throne ;))
// @homepageURL              https://www.omertabeyond.net/
// @namespace                v5.omertabeyond.com
// @updateURL                https://raw.githubusercontent.com/OmertaBeyond/OBv3/master/dist/ob.meta.js
// @supportURL               https://github.com/OmertaBeyond/OBv3/issues
// @icon                     https://raw.githubusercontent.com/OmertaBeyond/OBv3/master/dist/images/logo.small.png
// @screenshot               https://raw.githubusercontent.com/OmertaBeyond/OBv3/master/dist/images/logo.small.png
// @author                   OBDev Team <info@omertabeyond.com>
// @author                   vBm <vbm@omertabeyond.com>
// @author                   Dopedog <dopedog@omertabeyond.com>
// @author                   Rix <rix@omertabeyond.com>
// @author                   MrWhite <mrwhite@omertabeyond.com>
// @author                   MurderInc <murderinc@omertabeyond.com>
// @author                   Sebbe <sebbe@omertabeyond.com>
// @author                   Brainscrewer <brainscrewer@omertabeyond.com>
// @author                   semitom <tom.gankema@gmail.com>
// @license                  GNU General Public License v3
// @contributionURL          https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=sbanks%40omertabeyond%2ecom&lc=GB&item_name=Omerta%20Beyond&currency_code=EUR&bn=PP%2dDonationsBF%3abtn_donateCC_LG%2egif%3aNonHosted
// @contributionAmount       €3.00
// @encoding                 UTF-8
// @priority                 1
// @require                  https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js
// @require                  https://ajax.googleapis.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.js
// @require                  https://cdnjs.cloudflare.com/ajax/libs/howler/2.0.3/howler.min.js
// @resource    css          https://raw.githubusercontent.com/OmertaBeyond/OBv3/master/dist/css/beyond.css
// @resource    favicon      https://raw.githubusercontent.com/OmertaBeyond/OBv3/master/dist/images/favicon.png
// @resource    logo         https://raw.githubusercontent.com/OmertaBeyond/OBv3/master/dist/images/logo.png
// @resource    logo-old     https://raw.githubusercontent.com/OmertaBeyond/OBv3/master/dist/images/logo-old.png
// @resource    prev         https://raw.githubusercontent.com/OmertaBeyond/OBv3/master/dist/images/prev.png
// @resource    next         https://raw.githubusercontent.com/OmertaBeyond/OBv3/master/dist/images/next.png
// @resource    reply        https://raw.githubusercontent.com/OmertaBeyond/OBv3/master/dist/images/reply.png
// @resource    delete       https://raw.githubusercontent.com/OmertaBeyond/OBv3/master/dist/images/delete.png
// @resource    log          https://raw.githubusercontent.com/OmertaBeyond/OBv3/master/dist/images/changelog.png
// @resource    rip          https://raw.githubusercontent.com/OmertaBeyond/OBv3/master/dist/images/rip.png
// @resource    red-star     https://raw.githubusercontent.com/OmertaBeyond/OBv3/master/dist/images/red-star.png
// @resource    NRicon       https://raw.githubusercontent.com/OmertaBeyond/OBv3/master/dist/images/magnifier.png
// @resource    loadingicon  https://raw.githubusercontent.com/OmertaBeyond/OBv3/master/dist/images/loading.png
// @include                  http://*.barafranca.com/*
// @include                  https://*.barafranca.com/*
// @include                  http://barafranca.com/*
// @include                  https://barafranca.com/*
// @include                  http://*.barafranca.nl/*
// @include                  https://*.barafranca.nl/*
// @include                  http://barafranca.nl/*
// @include                  https://barafranca.nl/*
// @include                  http://*.barafranca.us/*
// @include                  https://*.barafranca.us/*
// @include                  http://barafranca.us/*
// @include                  https://barafranca.us/*
// @include                  http://*.barafranca.gen.tr/*
// @include                  https://*.barafranca.gen.tr/*
// @include                  http://barafranca.gen.tr/*
// @include                  https://barafranca.gen.tr/*
// @include                  http://omerta.com.tr/*
// @include                  https://omerta.com.tr/*
// @include                  http://*.omerta.com.tr/*
// @include                  https://*.omerta.com.tr/*
// @include                  http://*.omerta.dm/*
// @include                  https://*.omerta.dm/*
// @include                  http://omerta.dm/*
// @include                  https://omerta.dm/*
// @include                  http://*.omerta.pt/*
// @include                  https://*.omerta.pt/*
// @include                  http://omerta.pt/*
// @include                  https://omerta.pt/*
// @include                  https://*.omerta.land*
// @exclude                  http://*/game-register.php*
// @exclude                  https://*/game-register.php*
// @grant                    GM_getResourceText
// @grant                    GM_getResourceURL
// @grant                    GM_addStyle
// @grant                    GM_xmlhttpRequest
// @grant                    unsafeWindow
// @connect                  gm.omertabeyond.net
// @connect                  self
// ==/UserScript==
// ==OpenUserJS==
// @author                   vBm
// @collaborator             Gwildor
// @collaborator             MurderInc
// @collaborator             Sebbe
// @collaborator             Brainscrewer
// @collaborator             Ivdbroek85
// ==/OpenUserJS==

var Util = function () {
    function getVersion(hostname) {
        hostname = hostname || window.location.hostname;
        if (/(.*).omerta.land$/.test(hostname)) {
            return 'dev';
        }

        switch (hostname) {
            case 'www.omerta3.com':
            case 'omerta3.com':
            case 'www.barafranca.com':
            case 'barafranca.com':
            case 'www.barafranca.us':
            case 'barafranca.us':
                return 'com';
            case 'omerta.dm':
            case 'www.omerta.dm':
                return 'dm';
            case 'www.barafranca.nl':
            case 'barafranca.nl':
                return 'nl';
            case 'www.omerta.com.tr':
            case 'omerta.com.tr':
                return 'tr';
            case 'omerta.pt':
            case 'www.omerta.pt':
                return 'pt';
            default:
                return undefined;
        }
    }

    function getValue(name, standard) {
        return localStorage[name + '_' + version] || standard;
    }

    function setValue(name, value) {
        return localStorage[name + '_' + version] = value;
    }

    function getObject(name) {
        var val = localStorage[name + '_' + version];

        if (val === undefined) {
            return {};
        }

        return JSON.parse(val);
    }

    function setObject(name, pref, value) {
        if (name === 'prefs') {
            preferences[pref] = value;
            return localStorage[name + '_' + version] = JSON.stringify(preferences);
        }
        if (name === 'sets') {
            settings[pref] = value;
            return localStorage[name + '_' + version] = JSON.stringify(settings);
        }
    }

    var version = getVersion();
    var preferences = getObject('prefs') || {};
    var settings = getObject('sets') || {};

    var Util = {
        version: version,
        preferences: {
            get: function get(name) {
                return preferences[name];
            },

            set: function set(name, value) {
                setObject(name, 'prefs', value);
            }
        },
        settings: {
            get: function get(name) {
                return settings[name];
            },

            set: function set(name, value) {
                return setObject(name, 'sets', value);
            }
        },
        storage: {
            get: function get(name, standard) {
                return getValue(name, standard);
            },

            set: function set(name, value) {
                return setValue(name, value);
            },

            getPow: function getPow(name, i, def) {
                var info = getValue(name, '' + def);
                var w = void 0;
                if (name == 'bninfo') {
                    w = 2; // set width of buckets
                } else if (name == 'prefs') {
                    w = 1;
                }
                return 1 * info.substr(i * w, w); // return int version of bucket
            },

            setPow: function setPow(name, i, value) {
                var info = getValue(name, '0');
                var w = void 0;
                if (name == 'bninfo') {
                    w = 2; // set width of buckets
                } else if (name == 'prefs') {
                    w = 1;
                }
                i = i * w; // set string index
                value += ''; // toString
                while (value.length < w) {
                    value = '0' + value; // pad with zeros
                }
                if (i > 0 && i + w < info.length) {
                    info = info.substring(0, i) + value + info.substring(i + w); // value goes in middle
                } else if (i === 0) {
                    info = value + info.substring(w); // value goes at beginning
                } else if (i + w >= info.length) {
                    info = info.substring(0, i) + value; // value goes at end
                } else {
                    return;
                }
                setValue(name, info); // store string
            }
        },
        array: {
            arraySum: function arraySum(array) {
                return array.reduce(function (a, b) {
                    return a + b;
                });
            }
        },
        math: {
            random: function random(min, max) {
                return Math.floor((max - min + 1) * Math.random()) + min;
            }
        },
        number: {
            commafy: function commafy(number) {
                var str = ('' + number).split('.');
                var dec = str[1] || '';
                number = str[0].replace(/(\d)(?=(\d{3})+\b)/g, '$1,');
                return dec ? number + '.' + dec : number;
            }
        },
        omerta: {
            ranks: ['Empty-suit', 'Delivery Boy', 'Delivery Girl', 'Picciotto', 'Shoplifter', 'Pickpocket', 'Thief', 'Associate', 'Mobster', 'Soldier', 'Swindler', 'Assassin', 'Local Chief', 'Chief', 'Bruglione', 'Capodecina', 'Godfather', 'First Lady'],
            cities: ['Detroit', 'Chicago', 'Palermo', 'New York', 'Las Vegas', 'Philadelphia', 'Baltimore', 'Corleone'],
            boozenames: ['NO BOOZE', 'Wine', 'Beer', 'Rum', 'Cognac', 'Whiskey', 'Amaretto', 'Port'],
            narcnames: ['NO NARCS', 'Morphine', 'Marijuana', 'Glue', 'Heroin', 'Opium', 'Cocaine', 'Tabacco']
        },
        string: {
            /**
             * Check if a word is in a string
             * @param  {[String]} s    Haystack
             * @param  {[String]} word Needle
             * @return {[Booleon]}
             */
            wordInString: function wordInString(s, word) {
                return new RegExp('\\b' + word + '\\b', 'i').test(s);
            }
        },
        time: {
            parseDatetime: function parseDatetime(dateString) {
                var dateTime = dateString.split(' ');
                var date = dateTime[0].split('-');
                var dd = date[0];
                var mm = date[1] - 1;
                var yyyy = date[2];
                var time = dateTime[1].split(':');
                var h = time[0];
                var m = time[1];
                var s = parseInt(time[2], 10); // get rid of that 00.0;

                return new Date(yyyy, mm, dd, h, m, s);
            },
            timestamp: function timestamp() {
                return Math.floor(parseInt(new Date().getTime(), 10) / 1000);
            }
        },
        url: {
            onPage: function onPage(str) {
                if (window.location.hash.indexOf(str) != -1) {
                    return true;
                }
                return false;
            },

            getParam: function getParam(name) {
                var results = new RegExp('[?|&]' + name + '=([^&;]+?)(&|#|;|$)').exec(window.location.href);
                return results === null ? 0 : results[1] || 0;
            }
        },
        html: {
            isVisible: function isVisible(node) {
                var win = $(window);
                var viewport = {
                    top: win.scrollTop(),
                    left: win.scrollLeft()
                };
                viewport.right = viewport.left + win.width();
                viewport.bottom = viewport.top + win.height();

                var bounds = node.offset();
                bounds.right = bounds.left + node.outerWidth();
                bounds.bottom = bounds.top + node.outerHeight();

                return !(viewport.right < bounds.left || viewport.left > bounds.right || viewport.bottom < bounds.top || viewport.top > bounds.bottom);
            },
            grab: function grab(url, func) {
                var r = 0;
                if (window.XMLHttpRequest) {
                    r = new XMLHttpRequest();
                }
                r.onreadystatechange = function () {
                    if (r.readyState == 4) {
                        if (r.status == 200) {
                            func(r.responseText);
                        }
                    }
                };
                r.open('GET', url, true);
                r.send(null);
            }
        }
    };

    return Util;
}();



var BRC = function ($, Util) {
    var sorts = ['wine', 'cognac', 'whiskey', 'amaretto', 'beer', 'port', 'rum', 'morphine', 'heroin', 'opium', 'cocaine', 'marihuana', 'tabacco', 'glue'];
    var lboth = void 0;
    var nn = void 0;
    var lnarcs = void 0;
    var lbooze = void 0;
    var carry_n = 0;
    var carry_b = 0;
    var narcs = void 0;
    var booze = void 0;
    var n_amount = void 0;
    var b_amount = void 0;
    var lex = void 0;

    // calc travel cost
    var travelPrices = [// travel costs from A to B
    [0, 600, 10350, 1575, 3600, 1350, 1050, 10800], // det
    [600, 0, 11025, 2025, 3000, 1725, 1425, 11400], // chi
    [10350, 11025, 0, 9075, 14025, 9450, 9750, 1875], // pal
    [1575, 2025, 9075, 0, 5025, 375, 675, 9375], // ny
    [3600, 3000, 14025, 5025, 0, 4650, 4350, 14400], // lv
    [1350, 1725, 9450, 375, 4650, 0, 300, 9750], // phi
    [1050, 1425, 9750, 675, 4350, 300, 0, 10050], // bal
    [10800, 11400, 1875, 9375, 14400, 9750, 10050, 0] // cor
    ]; // det   chi    pal    ny    lv     phi   bal    cor

    var boozeNarcInfo = Util.storage.get('bninfo', -1);
    if (boozeNarcInfo !== '' && boozeNarcInfo != -1) {
        // extra checker for undefined crap
        if (boozeNarcInfo.search(/[^0-9]/) != -1) {
            Util.storage.set('bninfo', -1);
        }
    }
    if (boozeNarcInfo !== '' && boozeNarcInfo != -1) {
        // extra checker for undefined crap
        if (boozeNarcInfo.search(/[^0-9]/) != -1) {
            Util.storage.set('bninfo', -1);
        }
    }

    function OnNodeChange(nodeName) {
        var _this = this;

        nn = nodeName;
        if (Util.url.onPage('prices.php') && nn == 'center' || Util.url.onPage('smuggling.php') && nn == 'center') {
            var lexDay = void 0;
            var lexHour = void 0;
            if ($('span#lexhelpsyou').length) {
                lex = parseInt($('span#lexhelpsyou').html().replace(/[^0-9]/g, ''), 10);
                Util.storage.set('lex', lex);
                var BRCd = new Date();
                lexDay = BRCd.getDay();
                lexHour = BRCd.getHours();
                Util.storage.set('lexHour', lexHour);
                Util.storage.set('lexDay', lexDay);
            } else {
                lex = Util.storage.get('lex', 0);
                lexDay = Util.storage.get('lexDay', -1);
                lexHour = Util.storage.get('lexHour', -1);
            }

            var BN = void 0;

            if (Util.storage.get('bninfo', -1) > 0) {
                // do we have info data?
                // create info div to transfer data to XHR function
                narcs = Util.storage.getPow('bninfo', 0, -1);
                booze = Util.storage.getPow('bninfo', 1, -1);
                var city = Util.storage.getPow('bninfo', 2, -1);
                var plane = Util.storage.getPow('bninfo', 3, -1);
                var fam = Util.storage.getPow('bninfo', 4, -1);

                if ($('#info').length === 0) {
                    $('#game_container').append($('<div>').attr('id', 'info').css('display', 'none').text(narcs + '*' + booze + '*' + city + '*' + plane + '*' + fam + '*' + Util.storage.get('brcAF', 0) + '*' + lex + '*' + lexHour + '*' + lexDay));
                }

                // get all prices
                var j = void 0;
                var k = void 0;
                if (Util.url.onPage('prices.php')) {
                    // prices are on the page
                    BN = [];
                    for (var i = 0; i <= 1; i++) {
                        // B/N
                        for (BN[i] = [], j = 0; j <= 6; j++) {
                            // type
                            for (BN[i][j] = [], k = 0; k <= 7; k++) {
                                // city
                                BN[i][j].push(parseInt($('#game_container center:eq(' + i + ') > table > tbody > tr:eq(' + (3 + k) + ') > td:eq(' + (1 + j) + ')').text().replace(/[^0-9]/g, ''), 10));
                            }
                            BN[i][j].unshift(Math.min.apply(null, BN[i][j])); // get min
                            BN[i][j].unshift(Math.max.apply(null, BN[i][j])); // get max
                        }
                    }
                    appBRC(BN);
                } else {
                    var parsePrices = function parsePrices(resp) {
                        var parser = new DOMParser();
                        var dom = parser.parseFromString(resp, 'application/xml');
                        BN = [];
                        for (var _i = 0; _i <= 1; _i++) {
                            // B/N
                            for (BN[_i] = [], j = 0; j <= 6; j++) {
                                // type
                                for (BN[_i][j] = [], k = 0; k <= 7; k++) {
                                    BN[_i][j].push(parseInt(dom.getElementsByTagName((_i === 0 ? Util.omerta.narcnames[j + 1].replace('abacco', 'obacco') : Util.omerta.boozenames[j + 1]).toLowerCase())[k].textContent, 10)); // city
                                }
                                BN[_i][j].unshift(Math.min.apply(null, BN[_i][j])); // get min
                                BN[_i][j].unshift(Math.max.apply(null, BN[_i][j])); // get max
                            }
                        }
                        appBRC(BN); // send prices to BRC function
                    };
                    Util.html.grab('//' + document.location.hostname + '/BeO/webroot/index.php?module=API&action=smuggling_prices', parsePrices);
                }
            }

            if (Util.url.onPage('prices.php')) {
                if (typeof BN == 'undefined') {
                    // todo, this will never happen see if prices are grabbed already
                    var _j = void 0;
                    var _k = void 0;
                    BN = [];
                    for (var _i2 = 0; _i2 <= 1; _i2++) {
                        // B/N
                        for (BN[_i2] = [], _j = 0; _j <= 6; _j++) {
                            // type
                            for (BN[_i2][_j] = [], _k = 0; _k <= 7; _k++) {
                                // city
                                BN[_i2][_j].push(parseInt($('#game_container center:eq(' + _i2 + ') > table > tbody > tr:eq(' + (3 + _k) + ') > td:eq(' + (1 + _j) + ')').text().replace(/[^0-9]/g, ''), 10));
                            }
                            BN[_i2][_j].unshift(Math.min.apply(null, BN[_i2][_j])); // get min
                            BN[_i2][_j].unshift(Math.max.apply(null, BN[_i2][_j])); // get max
                        }
                    }
                }

                var _loop = function _loop(_i3) {
                    for (var _j2 = 0; _j2 <= 6; _j2++) {
                        var _loop2 = function _loop2(_k2) {
                            if (_j2 === 0) {
                                // add mouseover effects
                                var row = $('#game_container center:eq(' + _i3 + ') > table > tbody > tr:eq(' + (_k2 + 1) + ')');
                                row.attr('id', _i3 + 'row' + _k2);
                                row.css('borderTop', '1px solid #000');
                                row.hover(function () {
                                    $(_this).css('backgroundColor', '#888');
                                    $('#' + (_i3 ? 1 : 0) + 'row' + _k2).css('backgroundColor', '#888');
                                }, function () {
                                    $(_this).css('backgroundColor', 'transparent');
                                    $('#' + (_i3 ? 1 : 0) + 'row' + _k2).css('backgroundColor', 'transparent');
                                });
                            }

                            var item = $('#game_container center:eq(' + _i3 + ') > table > tbody > tr:eq(' + (_k2 + 1) + ') > td:eq(' + (_j2 + 1) + ')');
                            item.css({
                                'border-top': '1px solid #000',
                                'text-align': 'center',
                                width: '12%'
                            });
                            if (_j2 % 2 === 0) {
                                // add colors to rows
                                item.css('backgroundColor', '#B0B0B0');
                            }
                            if (BN[_i3][_j2][_k2] == BN[_i3][_j2][0]) {
                                // HL max
                                item.css('fontWeight', 'bold');
                                item.css('color', '#FF0000');
                            }
                            if (BN[_i3][_j2][_k2] == BN[_i3][_j2][1]) {
                                // HL min
                                item.css('fontWeight', 'bold');
                                item.css('color', '#16E54A');
                            }
                            if (_j2 == 5 && _i3 === 0) {
                                // bold-ify cocaine
                                item.css('fontWeight', 'bold');
                            }
                        };

                        for (var _k2 = 2; _k2 <= 9; _k2++) {
                            _loop2(_k2);
                        }
                    }
                };

                for (var _i3 = 0; _i3 <= 1; _i3++) {
                    _loop(_i3);
                }
            }
        }

        // ---------------- Smuggling ----------------
        if (Util.url.onPage('smuggling.php') && nn == 'center') {
            // check if lackeys on
            if ($('#game_container').html().match('/orourke.jpg') !== null && $('#game_container').html().match('/freekowski.jpg') !== null) {
                lboth = 1;
            } else if ($('#game_container').html().match('/orourke.jpg') !== null) {
                lbooze = 1;
            } else if ($('#game_container').html().match('/freekowski.jpg') !== null) {
                lnarcs = 1;
            }

            var bn_xp = 'form > table > tbody > tr:eq(0) > td, .smuggling-header';
            var bn_text = $(bn_xp).html().split('<br>');
            var indexStart = 0;

            var cash = parseInt(bn_text[indexStart].replace(/[^0-9.]/g, ''), 10);
            booze = parseInt(bn_text[indexStart + 1].match(/\d+/), 10); // max amount user can carry
            narcs = parseInt(bn_text[indexStart + 2].match(/\d+/), 10);
            var lexD = new Date();
            var _lexDay = lexD.getDay();
            var _lexHour = lexD.getHours();
            if (bn_text[6]) {
                var _lex = parseInt(bn_text[6].match(/\d+/), 10);
                Util.storage.set('lex', _lex);
            } else {
                Util.storage.set('lex', 0);
            }

            Util.storage.set('lexHour', _lexHour);
            Util.storage.set('lexDay', _lexDay);

            b_amount = [0, 0, 0, 0, 0, 0]; // what is user carrying
            n_amount = [0, 0, 0, 0, 0, 0];

            var xpb = 'table.thinline > tbody > tr:eq(';
            var xpn = 'table.thinline:eq(1) > tbody > tr:eq(';

            if (!lboth) {
                for (var _i4 = 0; _i4 <= 13; _i4++) {
                    // add click to fill stuff and hotkeys
                    if (_i4 < 7 && !lbooze) {
                        // booze
                        var x = _i4 + 3;
                        var bname = $('' + xpb + x + ') > td:eq(0)').text();
                        b_amount[_i4] = parseInt($('' + xpb + x + ') > td:eq(2)').html(), 10); // define how much of this item is being carried
                        $('' + xpb + x + ') > td:eq(0)').empty();
                        $('' + xpb + x + ') > td:eq(0)').append($('<span>').attr({
                            id: 'bh' + _i4,
                            index: _i4,
                            acceskey: _i4 + 1,
                            title: 'Fill in this booze (Hotkey: ' + (_i4 + 1) + ')'
                        }).css('cursor', 'pointer').text(_i4 + 1 + ' ' + bname).click(function () {
                            var i = parseInt($(this).attr('index'), 10);
                            var inpt = $('input[type="text"]');
                            for (var _j3 = 0; _j3 <= 6; _j3++) {
                                // reset form
                                if (_j3 != i) {
                                    inpt[_j3 + 1].value = 0;
                                }
                            }
                            var total = Util.array.arraySum(b_amount);
                            var missing = booze - b_amount[i];
                            var value = parseInt(inpt[i + 1].value, 10);
                            if (b_amount[i] === 0 && total < booze) {
                                if (value === 0) {
                                    inpt[i + 1].value = booze;
                                    $('input[type="radio"]:eq(1)').prop('checked', true);
                                } else {
                                    inpt[i + 1].value = 0;
                                }
                            } else if (b_amount[i] == booze) {
                                if (value === 0) {
                                    inpt[i + 1].value = booze;
                                    $('input[type="radio"]:eq(0)').prop('checked', true);
                                } else {
                                    inpt[i + 1].value = 0;
                                }
                            } else if (b_amount[i] < booze && total < booze) {
                                if (value === 0) {
                                    inpt[i + 1].value = missing;
                                    $('input[type="radio"]:eq(1)').prop('checked', true);
                                } else if (value == missing) {
                                    inpt[i + 1].value = b_amount[i];
                                    $('input[type="radio"]:eq(0)').prop('checked', true);
                                } else {
                                    inpt[i + 1].value = 0;
                                }
                            } else if (n_amount[i - 9] > booze) {
                                if (value === 0) {
                                    inpt[i + 1].value = b_amount[i];
                                    $('input[type="radio"]:eq(0)').prop('checked', true);
                                } else {
                                    inpt[i + 1].value = 0;
                                }
                            } else if (b_amount[i] < booze && total > booze) {
                                if (value === 0) {
                                    inpt[i + 1].value = b_amount[i];
                                    $('input[type="radio"]:eq(0)').prop('checked', true);
                                } else {
                                    inpt[i + 1].value = 0;
                                }
                            }
                            $('input#ver, input[type=submit]').focus();
                        }));
                    }
                    if (_i4 > 6 && !lnarcs) {
                        // narcs
                        var _x = _i4 - 4;
                        var nname = $('' + xpn + _x + ') > td:eq(0)').text();
                        n_amount[_i4 - 7] = parseInt($('' + xpn + _x + ') > td:eq(2)').html(), 10); // define how much of this item is being carried
                        $('' + xpn + _x + ') > td:eq(0)').empty();
                        $('' + xpn + _x + ') > td:eq(0)').append($('<span>').attr({
                            id: 'nh' + _i4,
                            index: _i4,
                            title: 'Fill in this narc'
                        }).css('cursor', 'pointer').text(nname).click(function () {
                            var i = parseInt($(this).attr('index'), 10);
                            var inpt = $('input[type="text"]');
                            for (var _j4 = 0; _j4 <= 6; _j4++) {
                                // reset form
                                if (_j4 != i - 7) {
                                    if (lbooze) {
                                        inpt[_j4 + 1].value = 0;
                                    } else {
                                        inpt[_j4 + 8].value = 0;
                                    }
                                }
                            }
                            var total = Util.array.arraySum(n_amount);
                            var missing = narcs - n_amount[i - 7];
                            var value = void 0;
                            if (lbooze) {
                                value = parseInt(inpt[i - 6].value, 10);
                            } else {
                                value = parseInt(inpt[i + 1].value, 10);
                            }
                            if (n_amount[i - 7] === 0 && total < narcs) {
                                if (value === 0) {
                                    if (lbooze) {
                                        inpt[i - 6].value = narcs;
                                        $('input[type="radio"]:eq(1)').prop('checked', true);
                                    } else {
                                        inpt[i + 1].value = narcs;
                                        $('input[type="radio"]:eq(3)').prop('checked', true);
                                    }
                                } else {
                                    inpt[i + 1].value = 0;
                                }
                            } else if (n_amount[i - 7] == narcs) {
                                if (value === 0) {
                                    if (lbooze) {
                                        inpt[i - 6].value = narcs;
                                        $('input[type="radio"]:eq(0)').prop('checked', true);
                                    } else {
                                        inpt[i + 1].value = narcs;
                                        $('input[type="radio"]:eq(2)').prop('checked', true);
                                    }
                                } else {
                                    inpt[i + 1].value = 0;
                                }
                            } else if (n_amount[i - 7] < narcs && total < narcs) {
                                if (value === 0) {
                                    if (lbooze) {
                                        inpt[i - 6].value = missing;
                                        $('input[type="radio"]:eq(1)').prop('checked', true);
                                    } else {
                                        inpt[i + 1].value = missing;
                                        $('input[type="radio"]:eq(3)').prop('checked', true);
                                    }
                                } else if (value == missing) {
                                    if (lbooze) {
                                        inpt[i - 6].value = n_amount[i - 7];
                                        $('input[type="radio"]:eq(0)').prop('checked', true);
                                    } else {
                                        inpt[i + 1].value = n_amount[i - 7];
                                        $('input[type="radio"]:eq(3)').prop('checked', true);
                                    }
                                } else {
                                    inpt[i + 1].value = 0;
                                }
                            } else if (n_amount[i - 7] > narcs) {
                                if (value === 0) {
                                    if (lbooze) {
                                        inpt[i - 6].value = n_amount[i - 7];
                                        $('input[type="radio"]:eq(0)').prop('checked', true);
                                    } else {
                                        inpt[i + 1].value = n_amount[i - 7];
                                        $('input[type="radio"]:eq(3)').prop('checked', true);
                                    }
                                } else {
                                    inpt[i + 1].value = 0;
                                }
                            } else if (b_amount[i] < narcs && total > narcs) {
                                if (value === 0) {
                                    if (lbooze) {
                                        inpt[i - 6].value = n_amount[i - 7];
                                        $('input[type="radio"]:eq(0)').prop('checked', true);
                                    } else {
                                        inpt[i + 1].value = n_amount[i - 7];
                                        $('input[type="radio"]:eq(2)').prop('checked', true);
                                    }
                                } else {
                                    inpt[i + 1].value = 0;
                                }
                            }
                            $('input#ver, input[type=submit]').focus();
                        }));
                    }
                }
            }

            var inp = $('input[name="typebooze"], input[name="typedrugs"]');
            inp.each(function () {
                $(this).click(function () {
                    if ($('input#ver, input[type=submit]').length) {
                        $('input#ver, input[type=submit]').focus();
                    }
                });
            });

            // visual fix
            if (lnarcs) {
                $('form > table > tbody > tr:eq(1) > td:eq(1)').prepend($('<br />'), $('<br />'));
                $('table.thinline:eq(1)').append($('<br />'));
            }
            if (lbooze) {
                $('form > table > tbody > tr:eq(1) > td:eq(0)').prepend($('<br />'), $('<br />'));
                $('table.thinline:eq(0)').append($('<br />'));
            }

            // create more efficient info text
            var str = $('<span>').text('Pocket: $ ' + Util.number.commafy(cash) + ' | Booze: ' + booze + ' | Narcs: ' + narcs + ' | Lex: ' + lex);
            $(bn_xp).html(str).append($('<br />'), $('<a>').attr({
                href: 'prices.php',
                target: 'main'
            }).text('Current Booze/Narcotics Prices'));
            if (!lboth) {
                $('input#ver, input[type=submit]').focus(); // focus captcha field
            }
        }
    }

    var fillBRCForCity = function fillBRCForCity() {
        fillBRC(parseInt($(this).attr('n'), 10), parseInt($(this).attr('b'), 10), 0);
    };

    function fillBRC(n, b, mode) {
        // actually filling the forms
        var values = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]; // set defaults
        // booze    - narcs    == maximum user can buy
        // carry_b  - carry_n  == total user is carrying
        // b_amount - n_amount == amount per item user is carrying
        // b        - n        == item we want
        if (n > -1 && !lnarcs && mode != 3) {
            // do we want narcs?
            if (carry_n === 0) {
                // nothing in pocket, fill it all
                values[7 + n] = narcs;
                $('input[name="typedrugs"]:eq(1)').prop('checked', true); // buy
            } else {
                // something in pocket
                if (carry_n < narcs) {
                    // we got space for more
                    if (n_amount[n] < narcs) {
                        // not full of wanted
                        if (n_amount[n] != carry_n) {
                            // there is unwanted stuff
                            for (var i = 0; i <= 6; i++) {
                                if (i != n || mode == 1) {
                                    // only sell what we don't want
                                    values[i + 7] = n_amount[i];
                                }
                            }
                            $('input[name="typedrugs"]:eq(0)').prop('checked', true); // sell
                        } else {
                            // only carrying wanted narcs
                            values[7 + n] = narcs - carry_n; // if any, fill missing amount
                            $('input[name="typedrugs"]:eq(1)').prop('checked', true); // buy
                        }
                    } else {
                        // full of wanted
                        if (mode > 0) {
                            // CD/RP mode, sell all
                            values[7 + n] = n_amount[n];
                            $('input[name="typedrugs"]:eq(0)').prop('checked', true); // sell
                        }
                    }
                } else {
                    // we go too much, guess it was a good heist
                    for (var _i5 = 0; _i5 <= 6; _i5++) {
                        // check what we carry
                        if (mode === 0 && _i5 == n) {
                            values[_i5 + 7] = 0;
                        } else {
                            values[_i5 + 7] = n_amount[_i5];
                            $('input[name="typedrugs"]:eq(0)').prop('checked', true); // sell
                        }
                    }
                }
            }
        }
        if (n == -1 && mode == 4 && !lnarcs) {
            for (var _i6 = 0; _i6 <= 6; _i6++) {
                values[_i6 + 7] = n_amount[_i6];
                $('input[name="typedrugs"]:eq(0)').prop('checked', true); // sell
            }
        }

        // check for scenario: failed selling narcs in high
        var selling_n = 0;
        for (var _i7 = 0; _i7 <= 6; _i7++) {
            selling_n += values[_i7 + 7];
        }
        var fail_n = carry_b === 0 && carry_n == narcs && mode === 0 && selling_n > 0 ? 1 : 0;

        if (b > -1 && !fail_n && !lbooze && mode != 3) {
            // do we want booze? Or are we still selling narcs in high?
            if (carry_b === 0) {
                values[b] = booze; // nothing in pocket, fill it all
                $('input[name="typebooze"]:eq(1)').prop('checked', true); // buy
            } else {
                if (carry_b < booze) {
                    // we got space for more
                    if (b_amount[b] < booze) {
                        // not full of wanted
                        if (b_amount[b] != carry_b) {
                            // there is unwanted stuff
                            for (var _i8 = 0; _i8 <= 6; _i8++) {
                                values[_i8] = b_amount[_i8];
                            }
                            $('input[name="typebooze"]:eq(0)').prop('checked', true); // sell
                        } else {
                            // only carrying wanted narcs
                            if (mode == 2) {
                                values[b] = carry_b; // if any, fill missing amount
                                $('input[name="typebooze"]:eq(0)').prop('checked', true); // sell
                            } else {
                                values[b] = booze - carry_b; // if any, fill missing amount
                                $('input[name="typebooze"]:eq(1)').prop('checked', true); // buy
                            }
                        }
                    } else {
                        // full of wanted
                        if (mode > 0) {
                            // CD/RP mode, sell all
                            values[b] = b_amount[b];
                            $('input[name="typebooze"]:eq(0)').prop('checked', true); // sell
                        }
                    }
                } else {
                    // we go too much, guess it was a good heist
                    for (var _i9 = 0; _i9 <= 6; _i9++) {
                        // check what we carry
                        if (mode === 0 && _i9 == b) {
                            values[_i9] = 0;
                        } else {
                            values[_i9] = b_amount[_i9];
                            $('input[name="typebooze"]:eq(0)').prop('checked', true); // sell
                        }
                    }
                }
            }
        }
        if (b == -1 && mode == 4 && !lbooze) {
            for (var _i10 = 0; _i10 <= 6; _i10++) {
                values[_i10] = b_amount[_i10];
                $('input[name="typebooze"]:eq(0)').prop('checked', true); // sell
            }
        }

        // fill in the fields with the calculated values
        var start = lbooze ? 7 : 0;
        var end = lnarcs ? 6 : 13;
        for (var _i11 = start; _i11 <= end; _i11++) {
            var box = $('input[name="' + sorts[_i11] + '"]');
            box.val(values[_i11]);
        }

        // focus
        $('input#ver, input[type=submit]').focus();
    }

    function appBRC(BN) {
        var _this2 = this;

        if (!lboth) {
            var getInfo = $('div#info:eq(0)').text();
            getInfo = getInfo.split('*');
            narcs = getInfo[0];
            booze = getInfo[1];
            var city = getInfo[2];
            var plane = getInfo[3];
            var fam = getInfo[4];
            lex = parseInt(getInfo[6], 10);
            var lexHour = parseInt(getInfo[7], 10);
            var lexDay = parseInt(getInfo[8], 10);

            // extra city checker
            if (Util.url.onPage('smuggling.php')) {
                var smugCity = unsafeWindow.omerta.character.game.city();
                for (var i = 0; i < 8; i++) {
                    if (smugCity.search(Util.omerta.cities[i]) != -1) {
                        city = i + 4;
                        Util.storage.setPow('bninfo', 2, city);
                    }
                }
            }

            // calc profits per item per city
            lex = 1 + 0.01 * lex;
            var j = void 0;
            var nCityprofit = [];
            var bCityprofit = [];
            for (var _i12 = 0; _i12 <= 7; _i12++) {
                // get profit per single unit of b/n
                for (nCityprofit[_i12] = [], bCityprofit[_i12] = [], j = 0; j <= 6; j++) {
                    // price there - price here
                    nCityprofit[_i12].push(Math.round(BN[0][j][_i12 + 2] * lex) - Math.round(BN[0][j][city - 4 + 2])); // -4 correction for city ID,
                    bCityprofit[_i12].push(Math.round(BN[1][j][_i12 + 2] * lex) - Math.round(BN[1][j][city - 4 + 2])); // +2 correction for min/max @ [0]+[1] in BN array
                }
                nCityprofit[_i12].unshift(Math.max.apply(null, nCityprofit[_i12])); // most profit per unit in this city
                bCityprofit[_i12].unshift(Math.max.apply(null, bCityprofit[_i12]));
            }

            // create BRC table
            var table = $('<table>').addClass('thinline').attr('id', 'brc').css('width', '500').append($('<tr>').append($('<td>').addClass('tableheader').attr('colspan', '5').text('Best Run Calculator')), $('<tr>').append($('<td>').attr({
                colspan: '5',
                height: '1'
            }).css('background-color', '#000')), $('<tr>').css({
                'border-bottom': '1px solid #000'
            }).append($('<td>').html('&nbsp; City'), $('<td>').html('&nbsp; Booze'), $('<td>').html('&nbsp; Narc'), $('<td>').html('&nbsp; Profit'), $('<td>').html('&nbsp;')));

            var allProfits = [];
            var bestBN = [];

            // add city rows with individual profits
            for (var _i13 = 0; _i13 <= 7; _i13++) {
                var tr = $('<tr>').attr('id', '2row' + (_i13 + 2));
                tr.hover(function () {
                    $(_this2).css('backgroundColor', '#888');
                }, function () {
                    $(_this2).css('backgroundColor', 'transparent');
                });

                var td = $('<td>').attr('colspan', '5').css({
                    'border-bottom': '1px solid #000',
                    height: '19px'
                });

                // --Calc profits
                if (_i13 == city - 4) {
                    // This is the current city
                    td.css('text-align', 'center');
                    td.html('<i>You are in ' + Util.omerta.cities[_i13] + '</i>');
                    tr.append(td);
                    allProfits.push(0);
                    bestBN.push([0, 0]);
                } else if (plane === 0 && ((city == 6 || city == 11) && _i13 + 4 != 6 && _i13 + 4 != 11 || city != 6 && city != 11 && (_i13 + 4 == 6 || _i13 + 4 == 11))) {
                    // No plane to travel there
                    td.css('text-align', 'center');
                    td.html('<i>You can\'t fly to ' + Util.omerta.cities[_i13] + '</i>');
                    tr.append(td);
                    allProfits.push(0);
                    bestBN.push([0, 0]);
                } else {
                    // Nothing wrong, clear to go
                    var bestNarc = nCityprofit[_i13][0] < 0 ? 0 : nCityprofit[_i13].lastIndexOf(nCityprofit[_i13][0]); // best, if any, narc?
                    var profitNarc = bestNarc === 0 ? 0 : nCityprofit[_i13][bestNarc]; // profit per unit
                    profitNarc = profitNarc * narcs;

                    var bestBooze = bCityprofit[_i13][0] < 0 ? 0 : bCityprofit[_i13].lastIndexOf(bCityprofit[_i13][0]); // best, if any, booze?
                    var profitBooze = bestBooze === 0 ? 0 : bCityprofit[_i13][bestBooze]; // profit per unit
                    profitBooze = profitBooze * booze;

                    var travelCost = travelPrices[_i13][city - 4];
                    if (plane === 0) {
                        // no plane => half travel cost
                        travelCost /= 2;
                    }

                    // Our total profit in this city
                    var totalProfit = profitNarc + profitBooze - Math.round(travelCost);

                    // save all profits in array for later
                    if (totalProfit < 0) {
                        bestBN.push([0, 0]); // push dummy to complete array
                    } else {
                        bestBN.push([bestNarc, bestBooze]);
                    }
                    var wnarc = bestNarc === 0 ? 0 : bestNarc - 1;
                    var wbooze = bestBooze === 0 ? 0 : bestBooze - 1;
                    var narcsell = BN[0][wnarc][0] * narcs * lex;
                    var boozesell = BN[1][wbooze][0] * booze * lex;
                    var pay = Math.round(narcsell * [0, 0.1, 0.1, 0, 0.1][fam]) + Math.round(boozesell * [0, 0.1, 0.1, 0, 0.1][fam]); // famless, member no capo, capo, top3, member with capo
                    totalProfit = totalProfit - pay;
                    allProfits.push(totalProfit);

                    // What's the result
                    if (totalProfit < 0) {
                        // no profit :(
                        td.css('text-align', 'center');
                        td.html('<i>You won\'t make any profit in ' + Util.omerta.cities[_i13] + '</i');
                        tr.append(td);
                    } else {
                        // profit \o/
                        td.html('&nbsp;' + Util.omerta.cities[_i13]);
                        td.attr('colspan', '1');
                        tr.append(td);
                        tr.append($('<td>').css({
                            'border-left': '1px solid #000',
                            'border-bottom': '1px solid #000'
                        }).html('&nbsp; ' + Util.omerta.boozenames[bestBooze]), $('<td>').css({
                            'border-left': '1px solid #000',
                            'border-bottom': '1px solid #000'
                        }).html(parseInt(narcs, 10) === 0 ? 'NO NARCS' : '&nbsp; ' + Util.omerta.narcnames[bestNarc]), $('<td>').css({
                            'border-left': '1px solid #000',
                            'border-bottom': '1px solid #000'
                        }).html('&nbsp; $' + Util.number.commafy(totalProfit)));

                        if (Util.url.onPage('smuggling.php')) {
                            // we need JS links @ smuggling and don't want to waste clicks
                            var key = [0, 4, 6, 1, 2, 3, 5]; // convert b/n - bot prices order to smuggling order
                            var n1 = key[bestNarc - 1];
                            var b1 = key[bestBooze - 1];

                            tr.append($('<td>').css({
                                'border-left': '1px solid #000',
                                'border-bottom': '1px solid #000'
                            }).html('&nbsp;').append($('<span>').attr({
                                id: 'go' + _i13,
                                n: n1,
                                b: b1
                            }).css({
                                'font-weight': 'inherit',
                                'text-align': 'center',
                                cursor: 'pointer'
                            }).text('Go!').click(fillBRCForCity)));
                        } else {
                            // we need to GET to smuggling too
                            tr.append($('<td>').css({
                                'border-left': '1px solid #000',
                                'border-bottom': '1px solid #000'
                            }).html('&nbsp;').append($('<a>').attr({
                                id: 'go' + _i13,
                                href: '/smuggling.php?action=go&n=' + (bestNarc - 1) + '&b=' + (bestBooze - 1)
                            }).css({
                                'font-weight': 'inherit',
                                'text-align': 'center',
                                cursor: 'pointer'
                            }).text('Go!')));
                        }
                    }
                }
                table.append(tr);
            }
            // add lex row
            if (lex > 1) {
                var lexDate = new Date();
                table.append($('<tr>').append($('<td>').attr('colspan', '5').css({
                    'text-align': 'center',
                    'font-size': '10px'
                }).text('Lex Level: ' + parseInt((lex - 1) * 100, 10) + ' - Seen ' + (lexDate.getDay() != lexDay ? '1 Day ago' : lexDate.getHours() - lexHour + ' Hours ago'))));
            }
            // add table to page
            if (Util.url.onPage('prices.php')) {
                if ($('#brc').length === 0) {
                    $('#game_container').append($('<br />'), table);
                }
            } else {
                if ($('#brc').length === 0) {
                    $('#game_container').append($('<br />'), table);
                }
            }
            // bold-ify Best Run
            var bestRun = allProfits.lastIndexOf(Math.max.apply(null, allProfits));
            $('#brc > tbody > tr:eq(' + (3 + bestRun) + ')').css('font-weight', 'bold');

            if (Util.url.onPage('smuggling.php')) {
                var AF = function AF(sel, Xn, Xb) {
                    sel = parseInt(sel, 10);
                    var n = -1;
                    var b = -1;
                    // assemble info for AF
                    var bn_xp = 'form > table > tbody > tr:eq(0) > td, .smuggling-header';
                    var bn_text = $(bn_xp).html().split('|');

                    booze = parseInt(bn_text[1].replace(/[^0-9.]/g, ''), 10); // max amount user can carry
                    narcs = parseInt(bn_text[2].replace(/[^0-9.]/g, ''), 10);

                    b_amount = [0, 0, 0, 0, 0, 0, 0];
                    n_amount = [0, 0, 0, 0, 0, 0, 0]; // what is user carrying
                    var xpb = 'table.thinline > tbody > tr:eq(';
                    var xpn = 'table.thinline:eq(1) > tbody > tr:eq(';
                    for (var _i14 = 0; _i14 <= 13; _i14++) {
                        // define how much of this item is being carried
                        if (_i14 < 7 && !lbooze) {
                            b_amount[_i14] = parseInt($(xpb + (_i14 + 3) + ') > td:eq(2)').text(), 10);
                        }
                        if (_i14 > 6 && !lnarcs) {
                            n_amount[_i14 - 7] = parseInt($(xpn + (_i14 - 4) + ') > td:eq(2)').text(), 10);
                        }
                    }

                    carry_n = Util.array.arraySum(n_amount);
                    carry_b = Util.array.arraySum(b_amount); // how much is the user carrying already
                    // which item do we want?
                    var key = [0, 4, 6, 1, 2, 3, 5];
                    if (sel === 0) {
                        // Calc for Best Run
                        n = key[bestBN[bestRun][0] - 1]; // this trick works, even I'm amazed
                        b = key[bestBN[bestRun][1] - 1];
                        if ((carry_n > 0 || carry_b > 0) && Math.max(Math, allProfits) === 0) {
                            // HACK: in this scenario we're in a high where no other
                            // cities would generate any profit. Just pretend we're using
                            // RP mode so all units get sold.
                            sel = 2;
                        }
                    }
                    if (sel == 1) {
                        // CD Run
                        for (var _i15 = 0; _i15 <= 6; _i15++) {
                            var nItem = parseInt(BN[0][_i15][city - 4 + 2], 10);
                            var highNarc = _i15 === 0 ? nItem : highNarc > nItem ? highNarc : nItem;
                            if (highNarc == nItem) {
                                n = _i15;
                            }
                            var bItem = parseInt(BN[1][_i15][city - 4 + 2], 10);
                            var highBooze = _i15 === 0 ? bItem : highBooze > bItem ? highBooze : bItem;
                            if (highBooze == bItem) {
                                b = _i15;
                            }
                        }
                        n = key[n];
                        b = key[b];
                    }
                    if (sel == 2) {
                        // RP Run
                        for (var _i16 = 0; _i16 <= 6; _i16++) {
                            var _nItem = parseInt(BN[0][_i16][city - 4 + 2], 10);
                            var lowNarc = _i16 === 0 ? _nItem : lowNarc < _nItem ? lowNarc : _nItem;
                            if (lowNarc == _nItem) {
                                n = _i16;
                            }
                            var _bItem = parseInt(BN[1][_i16][city - 4 + 2], 10);
                            var lowBooze = _i16 === 0 ? _bItem : lowBooze < _bItem ? lowBooze : _bItem;
                            if (lowBooze == _bItem) {
                                b = _i16;
                            }
                        }

                        n = key[n];
                        b = key[b];

                        /*
                         * Don't fill in if we can't earn RP and AF would want to buy
                         * Omerta sometimes won't display "NOW" when rp can be earned for b/n actions.
                         * it just displays "The next time you can earn rank points from buying [booze|narcs] is<end>"
                         * we'll handle that case too.
                         */
                        if (!lbooze) {
                            if (!$('form > table > tbody > tr:eq(1) > td[align="center"]:eq(0), .smuggling-table-info:eq(0)').text().match(/NOW|NU|booze is(\s+)$|kopen over(\s+)$/m) && $('input[name="typebooze"]:eq(1)').prop('checked') === true) {
                                b = -1;
                            }
                        }
                        if (!lnarcs) {
                            if (!$('form > table > tbody > tr:eq(1) > td[align="center"]:eq(1), .smuggling-table-info:eq(1)').text().match(/NOW|NU|narcotics is(\s+)$|kopen over(\s+)$/m) && $('input[name="typedrugs"]:eq(1)').prop('checked') === true) {
                                n = -1;
                            }
                        }
                    }
                    if (sel == 3) {
                        // None
                        n = b = -1;
                    }

                    if (document.location.href.indexOf('action=go') !== -1) {
                        // user manual override using external Go! link
                        n = key[Util.url.getParam('n')];
                        b = key[Util.url.getParam('b')];
                    }

                    // overrule with hotkeys [ ] =
                    if (Xn) {
                        n = -1;
                    }
                    if (Xb) {
                        b = -1;
                    }

                    // we know our n and b => fill it in!
                    fillBRC(n, b, sel);
                };
                AF(getInfo[5]);

                var AFtop = parseInt(Util.storage.get('AFtop', '225'), 10);
                var AFleft = parseInt(Util.storage.get('AFleft', '300'), 10);
                if (!$('#AF').length) {
                    if ((Util.settings.get('af_position') || 'floating') == 'floating') {
                        $('#game_container').append($('<div>').addClass('BRCinfo').css({
                            position: 'fixed',
                            left: '16%',
                            top: '0',
                            border: '2px double gray',
                            padding: '5px 5px 2px 5px',
                            cursor: 'move',
                            color: '#FFFFFF',
                            width: '100px',
                            'box-shadow': '2px 2px 2px 2px #1B1B1B',
                            background: 'linear-gradient(to bottom, #3F505F, #1B1B1B)',
                            opacity: '0.9',
                            'border-radius': '5px'
                        }).attr({
                            id: 'AF'
                        }).css({
                            top: AFtop,
                            left: AFleft
                        }));
                    } else {
                        var AFNode = $('<div>').attr({
                            id: 'AF'
                        });

                        $('.smuggling-header').prepend(AFNode);
                    }

                    $('#AF').append($('<center>').text('Auto-Fill').css('font-weight', 'bold'), $('<hr>').css({
                        color: 'gray'
                    }), $('<span>').append($('<input>').attr({
                        id: 'brc0',
                        type: 'radio',
                        name: 'brc'
                    }).click(function () {
                        AF(0);
                        Util.storage.set('brcAF', 0);
                    }), $('<label>').attr({
                        id: 'a1',
                        for: 'brc0',
                        acceskey: '8',
                        title: 'Fill in the most profitable b/n (Hotkey: 8 )'
                    }).text('Best: (8)')), $('<span>').append($('<br />'), $('<input>').attr({
                        id: 'brc1',
                        type: 'radio',
                        name: 'brc'
                    }).click(function () {
                        AF(1);
                        Util.storage.set('brcAF', 1);
                    }), $('<label>').attr({
                        id: 'a2',
                        for: 'brc1',
                        acceskey: '9',
                        title: 'Fill in the most expensive b/n (Hotkey: 9 )'
                    }).text('CD: (9)')), $('<span>').append($('<br />'), $('<input>').attr({
                        id: 'brc2',
                        type: 'radio',
                        name: 'brc'
                    }).click(function () {
                        AF(2);
                        Util.storage.set('brcAF', 2);
                    }), $('<label>').attr({
                        id: 'a3',
                        for: 'brc2',
                        acceskey: '0',
                        title: 'Fill in the cheapest b/n (Hotkey: 0 )'
                    }).text('RP: (0)')), $('<span>').append($('<br />'), $('<input>').attr({
                        id: 'brc3',
                        type: 'radio',
                        name: 'brc'
                    }).click(function () {
                        AF(3);
                        Util.storage.set('brcAF', 3);
                    }), $('<label>').attr({
                        id: 'a4',
                        for: 'brc3',
                        acceskey: '-',
                        title: 'Don\'t fill anything (Hotkey: - )'
                    }).text('None: (-)')));
                }
                if ((Util.settings.get('af_position') || 'floating') == 'floating') {
                    $(function () {
                        $('#AF').draggable();
                    });
                    $('#AF').mouseup(function () {
                        // alert('Set the x and y values using GM_getValue.');
                        var divOffset = $('#AF').offset();
                        var left = divOffset.left;
                        var top = divOffset.top;
                        Util.storage.set('AFleft', left);
                        Util.storage.set('AFtop', top);
                    });
                } else {
                    // show static AF settings in one row
                    $('#AF hr, #AF br').remove();
                }

                var mode = Util.storage.get('brcAF', 0);

                var xp = 'form > table > tbody > tr:eq(0) > td';
                if ($('#do_n').length === 0) {
                    $(xp).append($('<br />'), $('<span>').attr({
                        id: 'do_n',
                        title: 'AutoFill just narcs according to selected BRC mode (Hotkey: [ )',
                        acceskey: '['
                    }).css('cursor', 'pointer').text('Narcs'), $('<span>').text(' | '), $('<span>').attr({
                        id: 'do_b',
                        title: 'AutoFill just booze according to selected BRC mode (Hotkey: ] )',
                        acceskey: ']'
                    }).css('cursor', 'pointer').text('Booze'), $('<span>').text(' | '), $('<span>').attr({
                        id: 'do_sell',
                        title: 'Sell all you have (Hotkey: = )',
                        acceskey: '='
                    }).css('cursor', 'pointer').text('Sell All'), $('<br />'));
                }
                $('#do_n').click(function () {
                    AF(Util.storage.get('brcAF', 0), 0, 1);
                });
                $('#do_b').click(function () {
                    AF(Util.storage.get('brcAF', 0), 1, 0);
                });
                $('#do_sell').click(function () {
                    AF(4, 1, 1);
                });

                $('input#brc' + mode).prop('checked', true);
            }
        }
    }

    /* public functions */
    var Brc = {
        OnNodeChange: OnNodeChange
    };

    return Brc;
}(jQuery, Util);

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var gamePages = [];
gamePages.push(BRC);
// gamePages.push(Vote);

if (document.getElementById('game_container') !== null) {
	var observer = new MutationObserver(function (mutations) {
		mutations.forEach(function (mutation) {
			var _loop = function _loop(i) {
				var node = mutation.addedNodes[i];
				if (node.nodeType == 1 && !node.hasAttribute('data-beyond-fired')) {
					node.setAttribute('data-beyond-fired', true);

					// unbind events
					if (!Util.url.onPage('garage.php') && !Util.url.onPage('module=Cars')) {
						$(window).unbind('scroll');
					}
					if (!Util.url.onPage('action=showMsg')) {
						$(window).unbind('keydown');
					}
					// Disable nickreader when going to other page
					if ($('#shft').length > 0) {
						$('#shft').remove();
					}
					if ($('#proc').length > 0) {
						$('#proc').remove();
					}
					if ($('.NRinfo').length > 0) {
						$('.NRinfo').remove();
					}
					if ($('#NRstatus').length > 0) {
						$('#NRstatus').remove();
					}

					// hitting the click limit means the page won't contain what we expect. ignore it.
					if ($(node).filter(':contains("You reached your click limit."), :contains("Je hebt jouw kliklimiet bereikt.")').length > 0) {
						return {
							v: void 0
						};
					}

					gamePages.forEach(function (p) {
						p.OnNodeChange(node.tagName.toLowerCase(), node.getAttribute('id'), node.className, window.location.hash);
					});
				}
			};

			for (var i = 0; i < mutation.addedNodes.length; i++) {
				var _ret = _loop(i);

				if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
			}
		});
	});

	observer.observe(document.getElementById('game_container'), {
		attributes: false,
		childList: true,
		characterData: false
	});
}
