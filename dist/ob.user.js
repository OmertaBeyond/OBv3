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
// @resource    css          https://raw.githubusercontent.com/OmertaBeyond/OBv2/master/scripts/beyond.css
// @resource    favicon      https://raw.githubusercontent.com/OmertaBeyond/OBv2/master/images/favicon.png
// @resource    logo         https://raw.githubusercontent.com/OmertaBeyond/OBv2/master/images/logo.png
// @resource    logo-old     https://raw.githubusercontent.com/OmertaBeyond/OBv2/master/images/logo-old.png
// @resource    prev         https://raw.githubusercontent.com/OmertaBeyond/OBv2/master/images/prev.png
// @resource    next         https://raw.githubusercontent.com/OmertaBeyond/OBv2/master/images/next.png
// @resource    reply        https://raw.githubusercontent.com/OmertaBeyond/OBv2/master/images/reply.png
// @resource    delete       https://raw.githubusercontent.com/OmertaBeyond/OBv2/master/images/delete.png
// @resource    log          https://raw.githubusercontent.com/OmertaBeyond/OBv2/master/images/changelog.png
// @resource    rip          https://raw.githubusercontent.com/OmertaBeyond/OBv2/master/images/rip.png
// @resource    red-star     https://raw.githubusercontent.com/OmertaBeyond/OBv2/master/images/red-star.png
// @resource    NRicon       https://raw.githubusercontent.com/OmertaBeyond/OBv2/master/images/magnifier.png
// @resource    loadingicon  https://raw.githubusercontent.com/OmertaBeyond/OBv2/master/images/loading.png
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
    var obVersion = '3.0.0-dev';
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

    var version = getVersion();
    var preferences = getObject('prefs') || {};
    var settings = getObject('sets') || {};
    var notificationsArray = [];
    var scheduledNotifications = [];

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

    function trySendingNotification(topic, title, text, tag, callbackUrl, icon) {
        if (preferences['notify_' + topic]) {
            SendNotification(title, text, tag, callbackUrl, icon);
        }

        if (preferences['notify_' + topic + '_sound']) {
            playBeep();
        }
    }

    function SendNotification(title, text, tag, callbackUrl, beyondIcon) {
        var notification = new Notification(title, {
            dir: 'auto',
            lang: '',
            body: text,
            tag: tag,
            icon: beyondIcon
        });
        notification.onclick = function () {
            if (callbackUrl !== null) {
                unsafeWindow.omerta.GUI.container.loadPage(callbackUrl);
            }
            window.focus();
            notification.close();
        };

        // Automatically close notification
        var autoCloseSecs = parseInt(Util.settings.get('autoCloseNotificationsSecs') || 0, 10);
        if (autoCloseSecs > 0) {
            setTimeout(function () {
                notification.close();
                delete notificationsArray[tag];
            }, autoCloseSecs * 1000);
        }

        notificationsArray[tag] = notification;
    }

    var beeping = false;
    var beep = new Howl({
        src: ['https://d1oi19aitxwcck.cloudfront.net/sounds/beep.wav'], // doesn't work with GM_getResourceURL
        onend: function onend() {
            beeping = false;
        }
    });

    function playBeep() {
        if (beeping) {
            // don't play beep more than once at the same time
            return;
        }
        beeping = true;
        beep.play();
    }

    var Util = {
        version: version,
        beyond: {
            version: obVersion,
            page: {
                api: 'https://api.omertabeyond.net',
                apiOld: 'https://gm.omertabeyond.net'
            }
        },
        preferences: {
            get: function get(name) {
                return preferences[name];
            },

            set: function set(name, value) {
                setObject('prefs', name, value);
            }
        },
        settings: {
            get: function get(name) {
                return settings[name];
            },

            set: function set(name, value) {
                return setObject('sets', name, value);
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
        notification: {
            schedule: function schedule(topic, firesAt, title, text, tag, callbackUrl, beyondIcon) {
                if (!scheduledNotifications.hasOwnProperty(topic)) {
                    var timeout = parseInt(firesAt, 10) - unsafeWindow.omerta.Clock.getTime() / 1000;
                    if (timeout > 0) {
                        scheduledNotifications[topic] = true;
                        setTimeout(function () {
                            delete scheduledNotifications[topic];
                            trySendingNotification(topic, title, text, tag, callbackUrl, beyondIcon);
                        }, timeout * 1000);
                    }
                }
            },

            send: trySendingNotification,
            remove: function remove(topic) {
                if (notificationsArray[topic] !== undefined) {
                    notificationsArray[topic].close();
                    delete notificationsArray[topic];
                }
            }
        },
        omerta: {
            ranks: ['Empty-suit', 'Delivery Boy', 'Delivery Girl', 'Picciotto', 'Shoplifter', 'Pickpocket', 'Thief', 'Associate', 'Mobster', 'Soldier', 'Swindler', 'Assassin', 'Local Chief', 'Chief', 'Bruglione', 'Capodecina', 'Godfather', 'First Lady'],
            cities: ['Detroit', 'Chicago', 'Palermo', 'New York', 'Las Vegas', 'Philadelphia', 'Baltimore', 'Corleone'],
            boozenames: ['NO BOOZE', 'Wine', 'Beer', 'Rum', 'Cognac', 'Whiskey', 'Amaretto', 'Port'],
            narcnames: ['NO NARCS', 'Morphine', 'Marijuana', 'Glue', 'Heroin', 'Opium', 'Cocaine', 'Tabacco'],
            rides: ['none', 'geen', 'Fokker DR-1', 'Havilland DH 82A', 'Fleet 7', 'Douglas DC-3']
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



var Marquee = function ($) {
	var prevPrices = [];
	var firstTimePrice = true;

	function buildMarquee() {
		setTimeout(function () {
			GM_xmlhttpRequest({
				method: 'GET',
				url: '/BeO/webroot/index.php?module=API&action=smuggling_prices',
				onload: function onload(resp) {
					var parser = new DOMParser();
					var dom = parser.parseFromString(resp.responseText, 'application/xml');

					function getPrice(drug, city) {
						return dom.getElementsByTagName(drug)[city].textContent;
					}

					function refreshMarquee(h, m) {
						h = m >= 31 ? h + 1 : h;
						m = m >= 31 ? 1 : 31;
						var marQd = new Date();
						marQd.setHours(h);
						marQd.setMinutes(m);
						marQd.setSeconds(0);
						marQd.setMilliseconds(0);
						return marQd.getTime() - unsafeWindow.omerta.Clock.getTime();
					}

					var p = [];
					var q = [];
					var pricesChanged = false;

					for (var _i = 0; _i <= 7; _i++) {
						p[_i] = getPrice('cocaine', _i);
						q[_i] = p[_i];
						if (prevPrices === undefined || prevPrices[_i] === undefined || prevPrices[_i] != p[_i]) {
							pricesChanged = true;
						}
					}

					if (pricesChanged) {
						prevPrices = JSON.parse(JSON.stringify(q));
					} else {
						setTimeout(buildMarquee, 30000);
						return;
					}

					var max = p.sort(function (a, b) {
						return b - a;
					})[0];
					var min = p[p.length - 1];

					var highCity = '';
					var highCityPrice = 0;
					var lowCity = '';
					var lowCityPrice = 0;
					var i = 0;
					q.forEach(function ($n) {
						if ($n == min) {
							q[i] = '<span style="color:#00ff00;">' + $n + '</span>';
							lowCity = Util.omerta.cities[i];
							lowCityPrice = $n;
						}
						if ($n == max) {
							q[i] = '<span style="color:#ff5353;">' + $n + '</span>';
							highCity = Util.omerta.cities[i];
							highCityPrice = $n;
						}
						i++;
					});

					if (!firstTimePrice) {
						Util.notification.send('bn', 'B/N prices changed', 'High city: ' + highCity + ' (' + highCityPrice + ')\nLow city: ' + lowCity + ' (' + lowCityPrice + ')', 'Booze', './BeO/webroot/index.php?module=Travel', GM_getResourceURL('red-star'));
					}

					firstTimePrice = false;

					var time = dom.getElementsByTagName('humantime')[0].textContent;
					time = time.split(' ')[0];
					time = time.split(':');
					time = time[1] < 30 ? time[0] + ':00 OT' : time[0] + ':30 OT';

					function hovermenu(city) {
						var hoverStyle = {
							display: 'block',
							position: 'fixed',
							left: $('#marquee').offset().left,
							top: '42px',
							zIndex: '102',
							opacity: 0.8,
							backgroundColor: 'black',
							color: '#EEE',
							border: 'none',
							padding: '5px 15px 5px 15px'
						};

						$('#hiddenbox').css(hoverStyle).html('Morphine: ' + getPrice('morphine', city) + ' | Heroin: ' + getPrice('heroin', city) + ' | Opium: ' + getPrice('opium', city) + ' | Whiskey: ' + getPrice('whiskey', city) + ' | Amaretto: ' + getPrice('amaretto', city) + ' | Rum: ' + getPrice('rum', city));
					}

					function flytolink(city, priceStr) {
						var link = $('<a>').attr({
							id: Util.omerta.cities[city],
							href: '#'
						}).css({
							color: '#FFF',
							fontSize: '10px'
						}).click(function () {
							unsafeWindow.omerta.GUI.container.loadPage('./BeO/webroot/index.php?module=Travel&action=FetchInfo&CityId=' + (city == 'nul' ? 0 : city));
						});

						if (city == 5 || city == 6 || city == 7) {
							link.mouseover(function (event) {
								hovermenu(city, event.clientX - 560);
								$(this).css('textDecoration', 'underline');
							});
						} else if (city === 0 || city == 1 || city == 2) {
							link.mouseover(function (event) {
								hovermenu(city, event.clientX + 25);
								$(this).css('textDecoration', 'underline');
							});
						} else {
							link.mouseover(function (event) {
								hovermenu(city, event.clientX - 200);
								$(this).css('textDecoration', 'underline');
							});
						}
						link.mouseout(function () {
							$('#hiddenbox').css('display', 'none');
							$(this).css('textDecoration', 'none');
						});
						link.html(priceStr);

						return link;
					}

					var span = $('<span>').append($('<span>').text(time + ': ').css('font-size', '10px'));

					i = 0;
					p.forEach(function () {
						span.css('color', '#FFF');
						span.append(flytolink(i, Util.omerta.cities[i] + ':' + q[i]), $('<span>').text(' | '));
						i++;
					});

					span.append($('<a>').attr({
						href: 'prices.php'
					}).text('All Prices').css({
						color: '#FFF',
						fontSize: '10px'
					}).hover(function () {
						$(this).css('textDecoration', 'underline');
					}, function () {
						$(this).css('textDecoration', 'none');
					}));

					$('#marquee').html(span);
					setTimeout(buildMarquee, refreshMarquee(new Date().getHours(), new Date().getMinutes()));
				}
			});
		});
	}

	var Marquee = {
		build: buildMarquee
	};

	return Marquee;
}(jQuery);



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
                        $('#game_container').append($('<div>').addClass('BRCinfo').attr({
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



var Preferences = function ($) {
    function GetPrefPage() {
        // set location.hash so other code doesn't get triggered
        // window.location.hash = 'OB_preferences';
        // ^ gonna comment this out for a quick .dm patch for new layout

        var setGroupPriority = function setGroupPriority() {
            Util.settings.set($(this).attr('id'), $(this).val());
        };

        var jailHL = Util.preferences.get('jailHL') ? true : false;
        var jailHL_sel = Util.settings.get('jailHL_sel') || 'highest';
        var jailHL_other = Util.settings.get('jailHL_other') || 9;
        var jailHL_friends = Util.settings.get('jailHL_friends') || 5;
        var jailHL_own_lackey = Util.settings.get('jailHL_own_lackey') || 7;
        var jailHL_fr_lackey = Util.settings.get('jailHL_fr_lackey') || 8;
        var jailHL_other_lackey = Util.settings.get('jailHL_other_lackey') || 11;
        var autoCloseNotificationsSecs = Util.settings.get('autoCloseNotificationsSecs') || 0;
        var bo_hotkey = Util.settings.get('bo_hotkey') || '/';
        var custom_groups = Util.storage.get('custom_groups', '').split('|');
        custom_groups.pop();
        var nobust = Util.storage.get('nobust', '').split(',');
        var af_position = Util.settings.get('af_position') || 'floating';
        Util.preferences.set('NR', 1);

        // Build custom groups priority settings
        var c_group_div = null;
        for (var i = 0; i < custom_groups.length; i++) {
            var group_name = custom_groups[i].split(':')[0];
            var group_prio = Util.settings.get('jailHL_' + group_name) || i + 12;
            var group_lackey_prio = Util.settings.get('jailHL_' + group_name + '_lackey') || i + 13;
            var jailTr = [$('<tr>').append($('<td>').text(group_name), $('<td>').append($('<input>').attr({
                id: 'jailHL_' + group_name,
                type: 'text',
                value: group_prio
            }).blur(setGroupPriority))), $('<tr>').append($('<td>').text(group_name + ' lackeys'), $('<td>').append($('<input>').attr({
                id: 'jailHL_' + group_name + '_lackey',
                type: 'text',
                value: group_lackey_prio
            }).blur(setGroupPriority)))];
            if (c_group_div === null) {
                c_group_div = jailTr;
            } else {
                c_group_div = c_group_div.concat(jailTr);
            }
        }

        function deleteNoBustEntry() {
            var entrySpan = $(this).prev();
            var index = nobust.indexOf(entrySpan.attr('id'));
            nobust.splice(index, 1);
            entrySpan.hide();
            $(this).hide();
            Util.storage.set('nobust', nobust);
        }
        // Build no bust list
        var nobust_div = $('<div>').attr('id', 'nobust');
        for (var _i = 0; _i < nobust.length; _i++) {
            if (nobust[_i].length > 0) {
                nobust_div.append($('<span>').attr({ id: nobust[_i] }).text(nobust[_i]), $('<img />').addClass('inboxImg').attr({
                    src: GM_getResourceURL('delete'),
                    title: 'Delete'
                }).click(deleteNoBustEntry), $('<br>'));
            }
        }
        nobust_div.append($('<input>').attr({
            id: 'new_nobust',
            type: 'text'
        }), $('<button>').text('Add').click(function () {
            // let's not add empty entries
            var newVal = $('#new_nobust').val();
            if (newVal.length > 0) {
                $('<span>').attr({ id: newVal }).text(newVal).insertBefore($('#new_nobust'));
                $('<img />').addClass('inboxImg').attr({
                    src: GM_getResourceURL('delete'),
                    title: 'Delete'
                }).click(deleteNoBustEntry).insertBefore($('#new_nobust'));
                $('<br>').insertBefore($('#new_nobust'));
                nobust.push(newVal);
                Util.storage.set('nobust', nobust);
                $('#new_nobust').val('');
            }
        }));

        var getNotificationItem = function getNotificationItem(name, label) {
            return $('<tr>').append($('<td>').text(label), $('<td>').css('text-align', 'center').append($('<input>').attr({
                type: 'checkbox',
                checked: Util.preferences.get(name) ? true : false
            }).click(function (event) {
                Util.preferences.set(name, $(event.currentTarget).prop('checked'));
            })), $('<td>').css('text-align', 'center').append($('<input>').attr({
                type: 'checkbox',
                checked: Util.preferences.get(name + '_sound') ? true : false
            }).click(function (event) {
                Util.preferences.set(name + '_sound', $(event.currentTarget).prop('checked'));
            })));
        };

        var notificationOptions = [{ name: 'notify_bmsgDeaths', label: 'Deaths' }, { name: 'notify_bmsgNews', label: 'News' }, { name: 'notify_bn', label: 'B/N prices changes' }, { name: 'notify_crime', label: 'Crime' }, { name: 'notify_gta', label: 'Nick a car' }, { name: 'notify_travel', label: 'Travel' }, { name: 'notify_bullets', label: 'Buy bullets' }, { name: 'notify_health', label: 'When losing health' }, { name: 'notify_messages', label: 'Receive new message' }, { name: 'notify_alerts', label: 'New alerts' }, { name: 'notify_bg', label: 'Train BG' }, { name: 'notify_highlight', label: 'Name mentioned in chat' }];

        var notificationMarkup = $('<table>').addClass('thinline').attr({ cellspacing: 0, cellpading: 2, width: '100%' }).append($('<tr>').append($('<td>').addClass('tableitem').attr('align', 'center').append($('<b>').text('Event')), $('<td>').addClass('tableitem').attr('align', 'center').append($('<b>').text('Notification')), $('<td>').addClass('tableitem').attr('align', 'center').append($('<b>').text('Sound'))), notificationOptions.map(function (element) {
            return getNotificationItem(element.name, element.label);
        }));

        var prefs_page = $('<center>').attr({
            id: 'prefsContainer'
        }).append($('<table>').addClass('thinline').attr({ cellspacing: 0, cellpading: 2, width: '90%' }).append($('<tr>').append($('<td>').addClass('tableheader').attr('align', 'center').css('text-align', 'center').append($('<span>').css('font-weight', 'bold').text('OmertaBeyond Preferences'))), $('<tr>').append($('<td>').attr({ height: '1', bgcolor: 'black' })), $('<tr>').append($('<td>').addClass('tableitem').attr('align', 'center').css('text-align', 'center').css('font-weight', 'normal').text('Version ' + Util.beyond.version)), $('<tr>').append($('<td>').attr({ height: '1', bgcolor: 'black' })), $('<tr>').append($('<td>').addClass('tableitem').attr('align', 'center').css('text-align', 'center').text('Notifications')), $('<tr>').append($('<td>').attr({ height: '1', bgcolor: 'black' })), $('<tr>').append($('<td>').attr('align', 'center').css('text-align', 'center').text('OmertaBeyond can send you desktop notifications or play a sound for events like deaths or news posts.').append($('<br>'), $('<div>').attr('id', 'Authmsg'), $('<button id="btnNotification">').text('Authorize for notifications').click(function () {
            if ('Notification' in window) {
                Notification.requestPermission(function (perm) {
                    $('#Authmsg').text('Authorization for notification is: ' + perm);
                });
            }
        }), $('<br>'), $('<label>').attr('for', 'autoCloseNotificationsSecs').text('Show notifications for X seconds (0 = always show)'), $('<input>').attr({
            id: 'autoCloseNotificationsSecs',
            type: 'text',
            value: autoCloseNotificationsSecs
        }).blur(function () {
            Util.settings.set('autoCloseNotificationsSecs', $('#autoCloseNotificationsSecs').val());
        }), $('<br>'), $('<div>').addClass('notify').append(notificationMarkup))), $('<tr>').append($('<td>').attr({ height: '1', bgcolor: 'black' })), $('<tr>').append($('<td>').addClass('tableitem').attr('align', 'center').css('text-align', 'center').text('Bust Priorities')), $('<tr>').append($('<td>').attr({ height: '1', bgcolor: 'black' })), $('<tr>').append($('<td>').attr('align', 'center').css('text-align', 'center').text('Here you can choose which groups you want to bust before others.').append($('<br>'), $('<input>').attr({
            id: 'jailHL',
            type: 'checkbox',
            checked: jailHL
        }).click(function () {
            Util.preferences.set('jailHL', $('#jailHL:checked').length);
        }), $('<label>').attr('for', 'jailHL').text('Enable Bust Priorities'), $('<br>'), $('<span>').css('font-style', 'italic').text('Lower value means higher priority'), $('<table>').css('text-align', 'left').css('margin-left', '30%').append($('<tr>').append($('<td>').text('Other'), $('<td>').append($('<input>').attr({
            id: 'jailHL_other',
            type: 'text',
            value: jailHL_other
        }).blur(function () {
            Util.settings.set('jailHL_other', $('#jailHL_other').val());
        }))), $('<tr>').append($('<td>').text('Friends and Family'), $('<td>').append($('<input>').attr({
            id: 'jailHL_friends',
            type: 'text',
            value: jailHL_friends
        }).blur(function () {
            Util.settings.set('jailHL_friends', $('#jailHL_friends').val());
        }))), $('<tr>').append($('<td>').text('Own lackeys'), $('<td>').append($('<input>').attr({
            id: 'jailHL_own_lackey',
            type: 'text',
            value: jailHL_own_lackey
        }).blur(function () {
            Util.settings.set('jailHL_own_lackey', $('#jailHL_own_lackey').val());
        }))), $('<tr>').append($('<td>').text('Friend/Family lackeys'), $('<td>').append($('<input>').attr({
            id: 'jailHL_fr_lackey',
            type: 'text',
            value: jailHL_fr_lackey
        }).blur(function () {
            Util.settings.set('jailHL_fr_lackey', $('#jailHL_fr_lackey').val());
        }))), $('<tr>').append($('<td>').text('Other lackeys'), $('<td>').append($('<input>').attr({
            id: 'jailHL_other_lackey',
            type: 'text',
            value: jailHL_other_lackey
        }).blur(function () {
            Util.settings.set('jailHL_other_lackey', $('#jailHL_other_lackey').val());
        }))), c_group_div, $('<tr>').append($('<td>')), $('<tr>').append($('<td>').text('Buyout hotkey'), $('<td>').append($('<input>').attr({
            id: 'bo_hotkey',
            type: 'text',
            value: bo_hotkey
        }).blur(function () {
            Util.settings.set('bo_hotkey', $('#bo_hotkey').val());
            $('.ob_hotkey_pref').text($('#bo_hotkey').val());
        })))), $('<p>').html('Depending on browser and operating system, you can use either Alt + Shift + <span class="ob_hotkey_pref">' + bo_hotkey + '</span>, Alt + <span class="ob_hotkey_pref">' + bo_hotkey + '</span> or Ctrl + Alt + <span class="ob_hotkey_pref">' + bo_hotkey + '</span> to buy yourself out.'), $('<span>').text('Do you want to choose players with highest/lowest remaining jailtime first, or pick one randomly?'), $('<br>'), $('<div>').addClass('notify').append($('<input>').attr({
            name: 'jailHL_sel',
            id: 'jailHL_high',
            type: 'radio',
            checked: jailHL_sel == 'highest' ? true : false
        }).click(function () {
            Util.settings.set('jailHL_sel', 'highest');
        }), $('<span>').append($('<label>').attr('for', 'jailHL_high').text('highest')), $('<br>'), $('<input>').attr({
            name: 'jailHL_sel',
            id: 'jailHL_low',
            type: 'radio',
            checked: jailHL_sel == 'lowest' ? true : false
        }).click(function () {
            Util.settings.set('jailHL_sel', 'lowest');
        }), $('<span>').append($('<label>').attr('for', 'jailHL_low').text('lowest')), $('<br>'), $('<input>').attr({
            name: 'jailHL_sel',
            id: 'jailHL_rand',
            type: 'radio',
            checked: jailHL_sel == 'random' ? true : false
        }).click(function () {
            Util.settings.set('jailHL_sel', 'random');
        }), $('<span>').append($('<label>').attr('for', 'jailHL_rand').text('random'))))), $('<tr>').append($('<td>').attr({ height: '1', bgcolor: 'black' })), $('<tr>').append($('<td>').addClass('tableitem').attr('align', 'center').css('text-align', 'center').text('Scumbag List')), $('<tr>').append($('<td>').attr({ height: '1', bgcolor: 'black' })), $('<tr>').append($('<td>').attr('align', 'center').css('text-align', 'center').text('There is this one scumbag you wouldn\'t want to bust even if their life depended on it? Just add them here!').append($('<br>'), nobust_div, $('<span>').text('You can add family names too, by the way.'))), $('<tr>').append($('<td>').attr({ height: '1', bgcolor: 'black' })), $('<tr>').append($('<td>').addClass('tableitem').attr('align', 'center').css('text-align', 'center').text('Best Run Calculator - Autofiller')), $('<tr>').append($('<td>').attr({ height: '1', bgcolor: 'black' })), $('<tr>').append($('<td>').attr('align', 'center').css('text-align', 'center').text('Settings for the Best Run Calculator are visible on the Smuggling page').append($('<br>'), $('<br>'), $('<span>').text('You can choose between a movable window or showing the options on top of the page.'), $('<br>'), $('<div>').addClass('notify').append($('<input>').attr({
            type: 'radio',
            id: 'AF_Floating',
            name: 'AF_Position',
            checked: af_position == 'floating'
        }).click(function () {
            Util.settings.set('sets', 'af_position', 'floating');
        }), $('<label>').attr({ for: 'AF_Floating' }).text('Show settings in movable window'), $('<br>'), $('<input>').attr({
            type: 'radio',
            id: 'AF_Static',
            name: 'AF_Position',
            checked: af_position == 'static'
        }).click(function () {
            Util.settings.set('af_position', 'static');
        }), $('<label>').attr({ for: 'AF_Static' }).text('Show settings on top of the page')), $('<br>'), $('<br>'), $('<span>').text('If the movable window is gone, click here to reset its position.'), $('<br>'), $('<button>').text('Clear').click(function () {
            if (confirm('Are you sure?')) {
                Util.storage.set('AFtop', '225');
                Util.storage.set('AFleft', '300');
            }
        }))), $('<tr>').append($('<td>').attr({ height: '1', bgcolor: 'black' })), $('<tr>').append($('<td>').addClass('tableitem').attr('align', 'center').css('text-align', 'center').text('Reset data')), $('<tr>').append($('<td>').attr({ height: '1', bgcolor: 'black' })), $('<tr>').append($('<td>').attr('align', 'center').css('text-align', 'center').text('Manually reset all saved OB data.').append($('<br>'), $('<span>').text('Click the button to clear all settings, WARNING this resets all OB data'), $('<br>'), $('<button>').text('Clear').click(function () {
            if (confirm('Are you sure you want to clear ALL OB data?')) {
                localStorage.clear();
                alert('Please reload Omerta for the changes to take effect.');
            }
        }))), $('<tr>').append($('<td>').attr({ height: '1', bgcolor: 'black' })), $('<tr>').append($('<td>').addClass('tableitem').attr('align', 'center').css('text-align', 'center').text('Report a Bug')), $('<tr>').append($('<td>').attr({ height: '1', bgcolor: 'black' })), $('<tr>').append($('<td>').attr('align', 'center').css('text-align', 'center').text('Please report any bugs you might encounter on IRC in #beyond or post a comment ').append($('<a>').text('here.').css('text-decoration', 'underline').click(function () {
            window.open('https://omertabeyond.net/');
        }), $('<br>'), $('<span>').html('To help us track down the issue, please include the following code:'), $('<br>'), $('<strong>').text(localStorage.getItem('ob_uid')))))); // here we can build prefs page

        if (!('Notification' in window)) {
            $('#Authmsg', prefs_page).text('Your browser doesn\'t support notifications');
            $('#btnNotification', prefs_page).remove();
        } else if (Notification.permission == 'granted') {
            $('#Authmsg', prefs_page).text('Authorization for notification is: ').append($('<span>').text('granted').css({
                'font-weight': 'bold'
            }));
            $('#btnNotification', prefs_page).remove();
        }

        return prefs_page;
    }

    var Preferences = {
        page: GetPrefPage
    };

    return Preferences;
}(jQuery);



var Jail = function (Util) {
    /* private functions */
    function setFocus() {
        if ($('#game_container form').length == 2) {
            // self-bust page - focus on bustout button
            $('input[type=submit]:eq(1)').focus();
        } else {
            // regular jail page, focus on top bustout button
            $('input[type=submit]:first').focus();
        }
    }

    function onBustedPage() {
        var bo_hotkey = Util.settings.get['bo_hotkey'] || '/';
        // Add buyout hotkey
        if ($('input[name="buymeout"]').length) {
            $('input[name="buymeout"]').attr('accesskey', bo_hotkey);
        }

        // Go back to jail when time is over
        if ($('#game_container span[data-time-end]').attr('data-time-end')) {
            $('#game_container span[data-time-end]').on('DOMSubtreeModified', function () {
                if ($('#game_container span').attr('data-time-end') <= Util.time.timestamp()) {
                    unsafeWindow.omerta.GUI.container.loadPage(window.location.hash.substr(1));
                }
            });
        }
    }

    function onJailSettingsPage() {
        // Save omerta jail settings
        // check if already saved
        if ($('form[name="jailcolours"]').attr('saving') != 'done') {
            // save omerta defaults
            Util.storage.set('friends_colour', $('select[name="friends_colour_select"]').val());
            Util.storage.set('fam_colour', $('select[name="fam_colour_select"]').val());
            // cycle custom groups
            var i = 1;
            var custom_groups = '';
            $('#game_container form center div').not('#creategroup').each(function () {
                var group_name = $(this).attr('id');
                var group_colour = $(this).find('select[name="editgroup_colour_select' + i + '"]').find('option:eq(0)').val();
                custom_groups = '' + custom_groups + group_name + ':' + group_colour + '|';
                i++;
            });
            // save custom groups
            Util.storage.set('custom_groups', custom_groups);

            $('form[name="jailcolours"]').attr('saving', 'done');
        }
    }

    function onJailPage() {
        if (Util.storage.get('fam_colour', '') === '' || Util.storage.get('friends_colour', '') === '') {
            unsafeWindow.omerta.GUI.container.loadPage('/jail_settings.php');
            return; // or not?
        }

        var bos = parseInt(Util.storage.get('bustouts', 0), 10);

        var jailHL_sel = Util.settings.get('jailHL_sel') || 'highest';
        var jailHL_other = parseInt(Util.settings.get('jailHL_other') || 9, 10);
        var jailHL_friends = parseInt(Util.settings.get('jailHL_friends') || 5, 10);
        var jailHL_own_lackey = parseInt(Util.settings.get('jailHL_own_lackey') || 7, 10);
        var jailHL_fr_lackey = parseInt(Util.settings.get('jailHL_fr_lackey') || 8, 10);
        var jailHL_other_lackey = parseInt(Util.settings.get('jailHL_other_lackey') || 11, 10);

        var rows = $('tr[bgcolor]').length;
        var prior = null;
        // list for inmates with lowest priority
        var bustlist = [];
        var priority = void 0;
        // Build new row on top
        $('#game_container > form > center > table.thinline > tbody').prepend($('<tr>').attr('id', 'HLrow').css('border-bottom', '1px solid #000'));
        // Loop inmates
        $('tr[bgcolor]').each(function () {
            // Skip nobust
            if (Util.storage.get('nobust', 0)) {
                var nobust = Util.storage.get('nobust').toLowerCase().split(',');
                var fam = $(this).find('td:eq(1) > font').text().toLowerCase();
                var name = $(this).find('td:eq(0) > font > a > font').text().toLowerCase();
                if (fam.length > 0 && $.inArray(fam, nobust) != -1 || $.inArray(name, nobust) != -1) {
                    $(this).find('td').css('text-decoration', 'line-through');
                    $(this).attr('nobust', true);
                    return;
                }
            }
            if ($(this).find('td:eq(0)>font>span').text() === '') {
                // normal player
                if ($(this).attr('bgcolor') !== '') {
                    // friends, family or custom group
                    if (Util.storage.get('custom_groups', '').indexOf($(this).attr('bgcolor')) > 0) {
                        // custom group
                        var cg = Util.storage.get('custom_groups', '').split('|');
                        cg.pop();
                        for (var i = 0; i < cg.length; i++) {
                            var g = cg[i].split(':');
                            if (g[1] == $(this).attr('bgcolor')) {
                                var cg_prio = parseInt(Util.settings.get('jailHL_' + g[0]), 10);
                                priority = cg_prio;
                                if (!prior || priority <= prior) {
                                    if (!prior || priority < prior) {
                                        prior = priority;
                                        bustlist = [];
                                    }
                                    bustlist.push($(this));
                                }
                            }
                        }
                    } else if ($(this).attr('bgcolor') == Util.storage.get('fam_colour') || $(this).attr('bgcolor') == Util.storage.get('friends_colour')) {
                        // friends or family
                        priority = jailHL_friends;
                        if (!prior || priority <= prior) {
                            if (!prior || priority < prior) {
                                prior = priority;
                                bustlist = [];
                            }
                            bustlist.push($(this));
                        }
                    }
                } else {
                    // other
                    priority = jailHL_other;
                    if (!prior || priority <= prior) {
                        if (!prior || priority < prior) {
                            prior = priority;
                            bustlist = [];
                        }
                        bustlist.push($(this));
                    }
                }
            } else {
                // lackey
                if ($(this).attr('bgcolor') !== '') {
                    // friend, family or custom group
                    if (Util.storage.get('custom_groups', '').indexOf($(this).attr('bgcolor')) > 0) {
                        // custom group
                        var _cg = Util.storage.get('custom_groups', '').split('|');
                        _cg.pop();
                        for (var _i = 0; _i < _cg.length; _i++) {
                            var _g = _cg[_i].split(':');
                            if (_g[1] == $(this).attr('bgcolor')) {
                                var _cg_prio = parseInt(Util.settings.get('jailHL_' + _g[0] + '_lackey'), 10);
                                priority = _cg_prio;
                                if (!prior || priority <= prior) {
                                    if (!prior || priority < prior) {
                                        prior = priority;
                                        bustlist = [];
                                    }
                                    bustlist.push($(this));
                                }
                            }
                        }
                    } else if ($(this).attr('bgcolor') == Util.storage.get('fam_colour') || $(this).attr('bgcolor') == Util.storage.get('friends_colour')) {
                        // friends or family
                        priority = jailHL_fr_lackey;
                        if (!prior || priority <= prior) {
                            if (!prior || priority < prior) {
                                prior = priority;
                                bustlist = [];
                            }
                            bustlist.push($(this));
                        }
                    }
                } else {
                    // other
                    if ($(this).find('td:eq(0) > font > a').text() == Util.storage.get('nick', '')) {
                        // own
                        priority = jailHL_own_lackey;
                        if (!prior || priority <= prior) {
                            if (!prior || priority < prior) {
                                prior = priority;
                                bustlist = [];
                            }
                            bustlist.push($(this));
                        }
                    } else {
                        // other
                        priority = jailHL_other_lackey;
                        if (!prior || priority <= prior) {
                            if (!prior || priority < prior) {
                                prior = priority;
                                bustlist = [];
                            }
                            bustlist.push($(this));
                        }
                    }
                }
            }
        }).click(function () {
            // Add selected on top
            $('#HLrow').html($(this).html());
            $('#HLrow').css('background-color', $(this).attr('bgcolor'));
            $(this).find('input[name="bust"]').attr('checked', true);
            $('input[name="ver"]').focus();
        });
        if (bustlist.length > 0) {
            var bustthis = void 0;
            if (jailHL_sel === 'lowest') {
                bustthis = bustlist[bustlist.length - 1];
            } else if (jailHL_sel === 'random') {
                bustthis = bustlist[Util.math.random(0, bustlist.length - 1)];
            } else {
                bustthis = bustlist[0];
            }

            // select inmate
            $('#HLrow').html(bustthis.html());
            $('#HLrow').css('background-color', bustthis.attr('bgcolor'));
            bustthis.find('input[name="bust"]').attr('checked', true);
        }

        $('tr[bgcolor][nobust]').find('input[name="bust"]').attr('checked', false);
        // Add successful BO to total
        var bustMsg = 'You busted this person';
        var bustFriendMsg = 'cellmate out of jail';
        if ($('#game_container:contains("' + bustMsg + '")').length) {
            if ($('#game_container:contains("' + bustFriendMsg + '")').length) {
                bos = bos + 1;
            }
            bos = bos + 1;
            Util.storage.set('bustouts', bos);
        }
        // Add amount of inmates and bustouts
        $('#game_container tr:first').prepend($('<td>').css('width', '46%').append($('<span>').text('In jail: ' + rows), $('<br />'), $('<span>').text('Bustouts: ' + bos)));
        $('#game_container tr:first table').css('margin-left', '0');
    }

    /* public functions */
    var Jail = {
        OnNodeChange: function OnNodeChange(nodeName) {
            if (Util.url.onPage('jail.php')) {
                setFocus();

                if (nodeName == 'table') {
                    // we got busted
                    onBustedPage();
                }

                if (nodeName == 'form' && Util.preferences.get('jailHL')) {
                    onJailPage();
                }
            }

            if (Util.url.onPage('/jail_settings.php') && nodeName == 'form') {
                onJailSettingsPage();
            }
        },

        OnBustedPage: onBustedPage
    };

    return Jail;
}(Util);



var UserInformation = function ($) {
    // define max b/n judging by rank
    var maxBooze = [1, 2, 2, 5, 7, 10, 15, 20, 25, 30, 35, 40, 45, 50, 60, 70, 70, 70];
    var maxNarcs = [0, 0, 0, 1, 2, 4, 5, 7, 8, 10, 11, 13, 14, 16, 17, 20, 20, 20];

    function onInformationPage() {
        updateUserInformation();

        if (willIsDead()) {
            $('div.gangster-info-body li:eq(2) a span').append($('<span>').addClass('red').text(' | Dead!'));
        }

        var $accountStartElement = $('div.gangster-info-body li:eq(5) a span');
        var howOldAccountText = howOldAccount();
        var previousText = $accountStartElement.html();
        $accountStartElement.html(howOldAccountText).click(function () {
            var currentText = $accountStartElement.html();
            $accountStartElement.html(previousText);
            previousText = currentText;
        });
    }

    function willIsDead() {
        var willName = unsafeWindow.omerta.character.info.testament();
        if (willName !== '') {

            var willTs = Util.storage.get('willTimestamp', 0);
            var checkWillTs = $.now() - 1000 * 10 * 60;
            if (willTs <= checkWillTs) {
                checkUserAlive(willName, function (isAlive) {
                    Util.storage.set('willTimestamp', $.now());
                    if (!isAlive) {
                        Util.storage.set('deadWillName', willName);
                        return true;
                    }

                    return false;
                });
            } else {
                var deadWillName = Util.storage.get('deadWillName');
                if (deadWillName == willName) {
                    return true;
                }

                return false;
            }
        }

        return false;
    }

    function howOldAccount() {
        var startDate = unsafeWindow.omerta.character.info.startdate();
        var diff = Math.abs(Date.now() - startDate.getTime());
        var diffDays = Math.ceil(diff / (1000 * 3600 * 24));
        var startDay = startDate.getDate() >= 10 ? startDate.getDate() : '0' + startDate.getDate();
        var startMonth = startDate.getMonth() + 1 >= 10 ? startDate.getMonth() + 1 : '0' + (startDate.getMonth() + 1);
        return startDay + '-' + startMonth + '-' + startDate.getFullYear() + ' (' + (diffDays - 1) + ' days old)';
    }

    /**
     * Checks if the user is alive
     * @param  {[String]}  username
     * @return {Boolean}
     */
    function checkUserAlive(username, callback) {
        $.getJSON(Util.beyond.page.api + '/domains/' + Util.version + '/versions/latest/users/' + username, function (data) {
            callback(data['alive']);
        });
    }

    function updateUserInformation() {
        var ride = void 0;

        var nick = unsafeWindow.omerta.character.info.name();
        var rank = unsafeWindow.omerta.character.progress.rank();
        var bloodType = unsafeWindow.omerta.character.info.bloodtype();
        var city = unsafeWindow.omerta.character.game.city();
        var possessions = unsafeWindow.omerta.modules.UserInformation.data.possessions;
        if (possessions) {
            $.each(possessions, function (i) {
                if (possessions[i].type == 'plane') {
                    ride = possessions[i].name_owned;
                }
            });
        }

        Util.storage.set('bloodType', bloodType);
        Util.storage.set('nick', nick);

        var booze = 0;
        var narc = 0;

        for (var i = 0; i <= 17; i++) {
            if (Util.omerta.ranks[i] == rank) {
                booze = maxBooze[i];
                narc = maxNarcs[i];
                break;
            }
        }

        Util.storage.setPow('bninfo', 0, narc);
        Util.storage.setPow('bninfo', 1, booze);

        var cityCode = 0;

        // parse city to ID
        for (var _i = 0; _i < 8; _i++) {
            if (city == Util.omerta.cities[_i]) {
                cityCode = _i + 4;
                break;
            }
        }

        Util.storage.setPow('bninfo', 2, cityCode); // save

        var plane = 0;
        // parse plane to ID
        for (var _i2 = 0; _i2 <= 5; _i2++) {
            if (Util.omerta.rides[_i2] == ride) {
                plane = [0, 0, 1, 2, 3, 4][_i2];
                break;
            }
        }

        Util.storage.setPow('bninfo', 3, plane); // save
    }

    var UserInformation = {
        OnNodeChange: function OnNodeChange() {
            if (Util.url.onPage('module=UserInformation')) {
                onInformationPage();
            }
        }
    };

    return UserInformation;
}(jQuery);



var Chat = function ($) {
    var chatObserver = void 0;
    var firstMessageTs = void 0;

    function sendHighlight(node) {
        var isBufferedMessage = firstMessageTs >= $.now() - 500;
        var sender = $(node).find('.msg-author');
        var messageText = $(node).find('.msg-content');
        if (!isBufferedMessage && $(node).hasClass('msg-hilight')) {
            Util.notification.send('highlight', 'Your name was mentioned in the chat', sender.text() + messageText.text(), 'Chat', null, GM_getResourceURL('red-star'));
        }
    }

    var Chat = {
        init: function init() {
            chatObserver = new MutationObserver(function (mutations) {
                mutations.forEach(function (mutation) {
                    for (var i = 0; i < mutation.addedNodes.length; i++) {
                        var node = mutation.addedNodes[i];
                        if (node.nodeType == 1 && !node.hasAttribute('data-beyond-fired') && $(node).hasClass('user-message-text')) {
                            node.setAttribute('data-beyond-fired', true);
                            if (typeof firstMessageTs == 'undefined') {
                                firstMessageTs = $.now();
                            }

                            sendHighlight(node);
                        }
                    }
                });
            });
            if (document.getElementById('omerta_chat') !== null) {
                chatObserver.observe(document.getElementById('omerta_chat'), {
                    attributes: false,
                    childList: true,
                    subtree: true,
                    characterData: false
                });
            }
        }
    };

    return Chat;
}(jQuery);



var UserPage = function ($) {
    var wealthMoney = [' ($0 - $50.000)', ' ($50.001 - $100.000)', ' ($100.001 - $500.000)', ' ($1.000.001 - $5.000.000)', ' ($5.000.001 - $15.000.000)', ' ( > $15.000.001)', ' ($500.001 - $1.000.000)'];
    var wealth = ['Straydog', 'Poor', 'Nouveau Riche', 'Very rich', 'Too rich to be true', 'Richer than God', 'Rich'];
    var driver = ['Rookie', 'Co-Driver', 'Driver', 'Advanced Driver', 'Master Driver', 'Chauffeur', 'Advanced Chauffeur', 'Master Chauffeur', 'Racing Driver', 'Race Supremo', 'Champion'];
    var bustAmount = [' (0-500)', ' (501-1.000)', ' (1.001-2.500)', ' (2.501-5.000)', ' (5.001-10.000)', ' (10.001-15.000)', ' (15.001-20.000)', ' (20.001-25.000)', ' (25.001-27.500)', ' (27.501+)'];
    var bustRank = ['Rookie', 'Novice', 'Initiate', 'Decent', 'Apprentice', 'Intermediate', 'Professional', 'Expert', 'Ultimate', 'Extreme Expert'];

    function checkIfUserExist() {
        var input = Util.url.getParam('nick');
        if ($('#game_container:contains("This user does not exist")').length && input !== false) {
            setTimeout(function () {
                $.getJSON(Util.beyond.page.apiOld + '/?p=quicklookup&v=' + Util.version + '&input=' + input, function (data) {
                    $('#game_container').html('This user does not exist: ' + input);
                    var html = '';
                    var i = 0;
                    for (var results in data) {
                        if (data.hasOwnProperty(results)) {
                            if (i < 50) {
                                html += '<br /><a href="user.php?nick=' + results + '" id="' + i + '" class="sel">' + results + '</a>';
                            }
                        }
                        i++;
                    }
                    var total = i === 0 ? 0 : ++i;
                    if (input.length < 3) {
                        $('#game_container').html('This user does not exist: ' + input + '<br />This will give too many results. Try to be more specific.');
                    } else if (total !== 0) {
                        $('#game_wrapper_container').css('height', '99%');
                        $('span.title-main').text('Quick lookup by Omerta Beyond (NB!: Uses old api, may not be accurate)');

                        $('#game_container').html(total <= 50 ? 'This user does not exist: ' + input + '<br />Maybe this is what you were looking for:<br />' : 'This user does not exist: ' + input + '\'<br />Maybe this is what you were looking for:<br />Total results: ' + total + ' Showing first 50 results<br />');
                        $('#game_container').html($('#game_container').html() + html);
                        $('#0').focus();
                        var j = 0;
                        $(window).keydown(function (event) {
                            if (event.keyCode == 40) {
                                if (j < total - 1) {
                                    j++;
                                    $('#' + j).focus();
                                }
                            }
                        });
                        $(window).keydown(function (event) {
                            if (event.keyCode == 38) {
                                if (j !== 0) {
                                    j--;
                                    $('#' + j).focus();
                                }
                            }
                        });
                    } else {
                        $('#game_container').html('This user does not exist: ' + input + '<br />Sorry, we also couldn\'t find any alternatives.');
                    }
                });
            }, 100);
        }
    }

    function addDataFromOb(data) {
        var status = $('span#status').text();
        var unick = $('span#username').first().text();

        if (data['alive'] === false) {
            var rankings = '<a href="/BeO/webroot/index.php?module=Rankings&nick=' + unick + '">View Rankings</a>';
            if ($('img[src*="/userbadges/rip.gif"]').parent().get(0).tagName != 'A') {
                status += '<span style="color:red; font-weight:bold;"> (Akill) </span>';
            }

            $('span#status').html(status + ' | ' + rankings + ' | Died at ' + data['death_date']);
        } else {
            $('span#status').html(status + ' | Last on: ' + data['last_seen']);
        }
    }

    var UserPage = {
        OnNodeChange: function OnNodeChange(nodeName) {
            if (Util.url.onPage('user.php') && nodeName == 'span') {
                checkIfUserExist();
            }

            if (Util.url.onPage('user.php') && nodeName == 'center') {
                var unick = $('span#username').first().text();
                var status = $('span#status').text();
                var alive = status.search(/dead/);
                var inFam = $('span#family > a').length ? $('span#family > a').text() : $('span#family').text();
                $.getJSON(Util.beyond.page.api + '/domains/' + Util.version + '/versions/latest/users/' + unick).done(addDataFromOb);

                // wealth
                var wlth = $('#wealth').attr('value');
                var wealthIndex = wealth.indexOf(wlth);
                $('#wealth').text(wlth + wealthMoney[wealthIndex]);

                // raceform
                var rf = $('#raceform').attr('value');
                var driverIndex = driver.indexOf(rf);
                $('#raceform').text(driverIndex + 1 + ' - ' + rf);

                // bustrank
                var userbustRank = $('#bustrank').attr('value');
                var bustRankIndex = bustRank.indexOf(userbustRank);

                $('#bustrank').text(userbustRank + bustAmount[bustRankIndex]);

                // Actions
                var self = $('table.thinline > tbody > tr:eq(2) > td:eq(1) > a > span').text() == Util.storage.get('nick', '');
                $('td.tableheader').parent().after($('<tr>').append($('<td>').addClass('profilerow').attr({
                    id: 'actions',
                    colspan: '2',
                    align: 'center'
                }).css('display', 'none').html('<a href="BeO/webroot/index.php?module=Heist&action=&driver=' + unick + '">Heist</a> | <a href="' + document.location.protocol + '//' + document.location.hostname + '/BeO/webroot/index.php?module=Spots&driver=' + unick + '">Raid</a> | <a href="/BeO/webroot/index.php?module=Detectives&search=' + unick + '">Hire Detectives</a>')));
                var historyLink = historyLink = $('<span>').text('View History').css('cursor', 'pointer').click(function () {
                    $.get(Util.beyond.page.apiOld + '/?p=history&v=' + Util.version + '&name=' + unick, function (data) {
                        $('#game_container').empty();
                        $('#game_container').html(data);
                    });
                });
                if (!self && alive) {
                    $('td.tableheader').append($('<span>').text(' | '), historyLink, $('<span>').text(' | '), $('<span>').text('Actions').css('cursor', 'pointer').click(function () {
                        $('#actions').toggle();
                    }));
                } else {
                    $('td.tableheader').append($('<span>').text(' | '), historyLink);
                }
                if (parseInt(Util.storage.getPow('bninfo', 4, -1), 10) === 3 && inFam === 'None') {
                    $('#actions').html($('#actions').html() + ' | <a href="/BeO/webroot/index.php?module=Family&who=' + unick + '">Invite to Family</a>');
                }
            }
        }
    };

    return UserPage;
}(jQuery);



var CarPage = function ($) {
    var CarPage = {
        OnNodeChange: function OnNodeChange(nodeName, nodeId, nodeClass) {
            if (Util.url.onPage('module=Cars') && nodeId == 'module_Cars') {
                Util.notification.remove('gta');

                // Grab value of stolen car (does not include cars stolen by lackeys)
                var carValText = $('#game_container').text().trim();
                if (carValText.match(/\$ ([,\d]+)/) !== null) {
                    var oldValue = parseInt(Util.storage.get('carMoney', 0), 10);
                    var sum = parseInt(carValText.match(/\$ ([,\d]+)/)[1].replace(',', ''), 10);
                    Util.storage.set('carMoney', sum + oldValue);
                    var totalSuccess = parseInt(Util.storage.get('carSuccess', 0), 10);
                    ++totalSuccess;
                    Util.storage.set('carSuccess', totalSuccess);
                }

                var maxValue = 0;
                var maxIndex = 3;
                $('#nick-car-choices .head h4').each(function (i) {
                    if (parseInt($(this).text().replace('%', ''), 10) > maxValue) {
                        maxValue = parseInt($(this).text().replace('%', ''), 10);
                        maxIndex = i;
                    }
                });
                $('#nick-car-choices .popup-place-wrapper:eq(' + maxIndex + ')').addClass('active');
                $('#nick-car-choices button:eq(' + maxIndex + ')').focus();
            }

            if (Util.url.onPage('module=Cars') && nodeClass == 'otable widetable') {
                var itemspath = 'table[data-info="items"] > tbody > tr[data-id]';
                // Loop cars
                var x = 0;
                var totalCarval = 0;
                $(itemspath).each(function () {
                    // grab value
                    var carVal = parseInt($(itemspath + ':eq(' + x + ') > td:eq(4)').text().replace(',', '').replace('$', ''), 10);
                    totalCarval += carVal;
                    ++x;
                });
                // Show total value
                $('div.oheader:eq(2)').text($(itemspath).length + $('div.oheader:eq(2)').text()).append($('<span>').text('total value: $' + Util.number.commafy(totalCarval)));
            }
        }
    };

    return CarPage;
}(jQuery);



var CrimePage = function ($) {
    var CrimePage = {
        OnNodeChange: function OnNodeChange(nodeName, nodeId) {
            if (Util.url.onPage('module=Crimes') && nodeId == 'module_Crimes') {
                Util.notification.remove('crime');

                // Grab money stolen
                var moneyStolenText = $('#game_container').text().trim();
                if (moneyStolenText.match(/\$ ([,\d]+)/) !== null) {
                    var oldValue = parseInt(Util.storage.get('crimeMoney', 0), 10);
                    var sum = parseInt(moneyStolenText.match(/\$ ([,\d]+)/)[1].replace(',', ''), 10);
                    Util.storage.set('crimeMoney', sum + oldValue);
                    var totalSuccess = parseInt(Util.storage.get('crimeSuccess', 0), 10);
                    ++totalSuccess;
                    Util.storage.set('crimeSuccess', totalSuccess);
                }

                // focus and highlight last crime option
                $('#crime-choices .popup-place-wrapper:last').addClass('active');
                $('#crime-choices button:last').focus();
            }
        }
    };

    return CrimePage;
}(jQuery);



var Service = function () {

    function checkHealth() {
        var serviceData = unsafeWindow.omerta.services.account.data;
        var newHealth = parseFloat(serviceData.progressbars.health);
        var oldHealth = parseFloat(Util.storage.get('serviceHealth', 0));
        if (oldHealth > 0 && oldHealth > newHealth) {
            var healthText = 'You lost ' + (oldHealth - newHealth) + ' health!';
            var healthTitle = 'Health (' + Util.version + ')';
            Util.notification.send('health', healthTitle, healthText, 'health', './BeO/webroot/index.php?module=Bloodbank', GM_getResourceURL('red-star'));
        }

        Util.storage.set('serviceHealth', newHealth);
    }

    function checkForNewMessages() {
        var serviceData = unsafeWindow.omerta.services.account.data;
        if (serviceData.messages.inbox.length > 0) {
            var lastMessage = parseInt(Util.storage.get('lastMessage', 0), 10);

            var totalMessages = 0;
            $.each(serviceData.messages.inbox, function (i, val) {
                var id = parseInt(val.id, 10);
                if (lastMessage === id) {
                    return false;
                }
                totalMessages += 1;
            });

            if (totalMessages !== 0) {
                var msgId = parseInt(serviceData.messages.inbox[0].id, 10);
                var msgTitle = '';
                var msgText = '';
                var callbackUrl = './BeO/webroot/index.php?module=Mail&action=showMsg&iMsgId=';

                Util.storage.set('lastMessage', msgId);
                if (totalMessages === 1) {
                    msgText = 'Message: ' + serviceData.messages.inbox[0].msg.replace(/<br \/>/g, '');
                    msgTitle = 'New message from ' + serviceData.messages.inbox[0].frm + ': ' + serviceData.messages.inbox[0].sbj + ' (' + Util.version + ')';
                    callbackUrl = callbackUrl + msgId;
                } else {
                    msgText = 'You have got ' + totalMessages + ' new messages';
                    msgTitle = 'New messages (' + Util.version + ')';
                    callbackUrl = './BeO/webroot/index.php?module=Mail&action=inbox';
                }

                Util.notification.send('messages', msgTitle, msgText, 'Mail', callbackUrl, GM_getResourceURL('red-star'));
            }
        }
    }

    function checkForNewAlerts() {
        var serviceData = unsafeWindow.omerta.services.account.data;
        if (serviceData.messages.alert.length > 0) {
            // msgId -1 is a friend request
            var lastAlert = parseInt(Util.storage.get('lastAlert', 0), 10);
            var totalAlerts = 0;
            $.each(serviceData.messages.alert, function (i, val) {
                var id = val.id ? parseInt(val.id, 10) : -1;
                if (lastAlert === id) {
                    return false;
                }
                totalAlerts += 1;
            });

            if (totalAlerts !== 0) {
                var msgId = serviceData.messages.alert[0].id ? parseInt(serviceData.messages.alert[0].id, 10) : -1;
                var alertTitle = '';
                var alertText = '';
                var callbackUrl = './BeO/webroot/index.php?module=Mail&action=showMsg&iMsgId=';
                Util.storage.set('lastAlert', msgId);
                if (totalAlerts === 1) {
                    // If it's a friend request, it has no msg or id
                    if (serviceData.messages.alert[0].sbj !== 'Friend Request(s)') {
                        alertText = 'Alert: ' + serviceData.messages.alert[0].msg.replace(/<br \/>/g, '');
                        alertTitle = 'Alert! ' + serviceData.messages.alert[0].sbj + ' (' + Util.version + ')';
                        callbackUrl = callbackUrl + msgId;
                    } else {
                        alertText = 'Alert: You got a new friend request!';
                        alertTitle = 'Alert! ' + serviceData.messages.alert[0].sbj + ' (' + Util.version + ')';
                        callbackUrl = serviceData.messages.alert[0].link;
                    }
                } else {
                    alertText = 'You have got ' + totalAlerts + ' new alerts';
                    alertTitle = 'Alert! (' + Util.version + ')';
                    callbackUrl = './BeO/webroot/index.php?module=Mail&action=inbox';
                }

                Util.notification.send('alerts', alertTitle, alertText, 'alert', callbackUrl, GM_getResourceURL('red-star'));
            }
        }
    }

    function ScheduleNotifications() {
        Util.notification.schedule('gta', $('[data-cooldown="car"] input').attr('data-knob-timeend'), 'Nick a car (' + Util.version + ')', 'You can nick a car', 'Car', '/?module=Cars', GM_getResourceURL('red-star'));

        Util.notification.schedule('crime', $('[data-cooldown="crime"] input').attr('data-knob-timeend'), 'Crime (' + Util.version + ')', 'You can do a crime', 'Crime', '/?module=Crimes', GM_getResourceURL('red-star'));

        Util.notification.schedule('travel', $('[data-cooldown="travel"] input').attr('data-knob-timeend'), 'Travel (' + Util.version + ')', 'You can travel', 'Travel', '/?module=Travel', GM_getResourceURL('red-star'));

        Util.notification.schedule('bullets', $('[data-cooldown="bullets"] input').attr('data-knob-timeend'), 'Bullets (' + Util.version + ')', 'You can buy bullets', 'Bullets', '/bullets2.php', GM_getResourceURL('red-star'));
    }

    var Service = {
        start: function start() {
            setInterval(function () {
                checkHealth();
                checkForNewMessages();
                checkForNewAlerts();
                ScheduleNotifications();
            }, 5000);
        }
    };

    return Service;
}();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var gamePages = [];
gamePages.push(BRC);
gamePages.push(Jail);
gamePages.push(UserInformation);
gamePages.push(UserPage);
gamePages.push(CarPage);
gamePages.push(CrimePage);

Chat.init();

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

$('#game_container').one('DOMNodeInserted', function () {
	$('.top-nav').append($('<li>').addClass('pull-left').css({
		width: '40%',
		padding: '0',
		display: 'table',
		lineHeight: '14px'
	}).append($('<div>').attr('id', 'marquee').css({
		display: 'table-cell',
		verticalAlign: 'middle'
	}), $('<div>').attr('id', 'hiddenbox').addClass('marqueebox')));

	Service.start();
	Marquee.build();

	var city = Util.storage.getPow('bninfo', 2, -1);
	if (city > 0) {
		city = Util.omerta.cities[city - 4];
		$('#' + city).css('font-style', 'italic');
	}

	var prefs_div = $('<div>').addClass('sm-circle-bg ob-prefs-bg').append($('<span>').addClass('sm-circle sm-health').append($('<img>').attr({
		src: GM_getResourceURL('favicon'),
		title: 'Omerta Beyond Preferences'
	}).addClass('ob-prefs-img')).hover(function () {
		$(this).css('background', '#000FF0');
	}, function () {
		$(this).css('background', '#FFF');
	})).click(function () {
		$('span.title-main').text('Omerta Beyond Preferences');
		$('#game_container').empty();
		$('#game_wrapper_container').css('height', '99%');
		$('#game_container').append(Preferences.page());
	});
	if ($('.ob-prefs-bg').length === 0) {
		$('div.omerta-widget-avatar-body').append(prefs_div);
	}
});

GM_addStyle(GM_getResourceText('css'));
