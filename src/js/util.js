const Util = (() => {
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
        return (localStorage[`${name}_${version}`] || standard);
    }

    function setValue(name, value) {
        return (localStorage[`${name}_${version}`] = value);
    }

    function getObject(name) {
        const val = localStorage[`${name}_${version}`];

        if (val === undefined) {
            return {};
        }

        return JSON.parse(val);
    }

    function setObject(name, pref, value) {
        if (name === 'prefs') {
            preferences[pref] = value;
            return (localStorage[`${name}_${version}`] = JSON.stringify(preferences));
        }
        if (name === 'sets') {
            settings[pref] = value;
            return (localStorage[`${name}_${version}`] = JSON.stringify(settings));
        }
    }

    const version = getVersion();
    const preferences = getObject('prefs') || {};
    const settings = getObject('sets') || {};

    const Util = {
        version,
        preferences: {
            get: (name) => {
                return preferences[name];
            },

            set: (name, value) => {
                setObject(name, 'prefs', value);
            }
        },
        settings: {
            get: (name) => {
                return settings[name];
            },

            set: (name, value) => {
                return setObject(name, 'sets', value);
            }
        },
        storage: {
            get: (name, standard) => {
                return getValue(name, standard);
            },

            set: (name, value) => {
                return setValue(name, value);
            },

            getPow: (name, i, def) => {
                const info = getValue(name, `${def}`);
                let w;
                if (name == 'bninfo') {
                    w = 2; // set width of buckets
                } else if (name == 'prefs') {
                    w = 1;
                }
                return (1 * info.substr((i * w), w)); // return int version of bucket
            },

            setPow: (name, i, value) => {
                let info = getValue(name, '0');
                let w;
                if (name == 'bninfo') {
                    w = 2; // set width of buckets
                } else if (name == 'prefs') {
                    w = 1;
                }
                i = i * w; // set string index
                value += ''; // toString
                while (value.length < w) {
                    value = `0${value}`; // pad with zeros
                }
                if (i > 0 && (i + w) < info.length) {
                    info = info.substring(0, i) + value + info.substring(i + w); // value goes in middle
                } else if (i === 0) {
                    info = value + info.substring(w); // value goes at beginning
                } else if ((i + w) >= info.length) {
                    info = info.substring(0, i) + value; // value goes at end
                } else {
                    return;
                }
                setValue(name, info); // store string
            }
        },
        array: {
            arraySum: (array) => {
                return array.reduce((a, b) => {
                    return (a + b);
                });
            }
        },
        math: {
            random: (min, max) => {
                return Math.floor(((max - min) + 1) * Math.random()) + min;
            }
        },
        number: {
            commafy: function commafy(number) {
                const str = (`${number}`).split('.');
                const dec = str[1] || '';
                number = str[0].replace(/(\d)(?=(\d{3})+\b)/g, '$1,');
                return (dec) ? `${number}.${dec}` : number;
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
            wordInString: (s, word) => {
                return new RegExp(`\\b${word}\\b`, 'i').test(s);
            }
        },
        time: {
            parseDatetime: (dateString) => {
                const dateTime = dateString.split(' ');
                const date = dateTime[0].split('-');
                const dd = date[0];
                const mm = date[1] - 1;
                const yyyy = date[2];
                const time = dateTime[1].split(':');
                const h = time[0];
                const m = time[1];
                const s = parseInt(time[2], 10); // get rid of that 00.0;

                return new Date(yyyy, mm, dd, h, m, s);
            },
            timestamp: () => {
                return Math.floor(parseInt(new Date().getTime(), 10) / 1000);
            }
        },
        url: {
            onPage: (str) => {
                if (window.location.hash.indexOf(str) != -1) {
                    return true;
                }
                return false;
            },

            getParam: (name) => {
                const results = new RegExp(`[?|&]${name}=([^&;]+?)(&|#|;|$)`).exec(window.location.href);
                return results === null ? 0 : (results[1] || 0);
            }
        },
        html: {
            isVisible: (node) => {
                const win = $(window);
                const viewport = {
                    top: win.scrollTop(),
                    left: win.scrollLeft()
                };
                viewport.right = viewport.left + win.width();
                viewport.bottom = viewport.top + win.height();

                const bounds = node.offset();
                bounds.right = bounds.left + node.outerWidth();
                bounds.bottom = bounds.top + node.outerHeight();

                return (!(viewport.right < bounds.left || viewport.left > bounds.right || viewport.bottom < bounds.top || viewport.top > bounds.bottom));
            },
            grab: (url, func) => {
                let r = 0;
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
})();

export default Util;
