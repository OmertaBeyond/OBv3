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

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var gamePages = [];
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
