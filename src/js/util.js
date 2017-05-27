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
            }
        },
        array: {
            arraySum: (array) => {
                array.reduce((a, b) => {
                    return (a + b);
                });
            }
        },
        math: {
            random: (min, max) => {
                return Math.floor(((max - min) + 1) * Math.random()) + min;
            }
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
            }
        }
    };

    return Util;
})();

export default Util;
