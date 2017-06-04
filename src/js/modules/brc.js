import Util from './Util';

const BRC = (($, Util) => {
    const sorts = ['wine', 'cognac', 'whiskey', 'amaretto', 'beer', 'port', 'rum', 'morphine', 'heroin', 'opium', 'cocaine', 'marihuana', 'tabacco', 'glue'];
    let lboth;
    let nn;
    let lnarcs;
    let lbooze;
    let carry_n = 0;
    let carry_b = 0;
    let narcs;
    let booze;
    let n_amount;
    let b_amount;
    let lex;

    // calc travel cost
    const travelPrices = [ // travel costs from A to B
        [0, 600, 10350, 1575, 3600, 1350, 1050, 10800], // det
        [600, 0, 11025, 2025, 3000, 1725, 1425, 11400], // chi
        [10350, 11025, 0, 9075, 14025, 9450, 9750, 1875],  // pal
        [1575, 2025, 9075, 0, 5025, 375, 675, 9375],  // ny
        [3600, 3000, 14025, 5025, 0, 4650, 4350, 14400], // lv
        [1350, 1725, 9450, 375, 4650, 0, 300, 9750],  // phi
        [1050, 1425, 9750, 675, 4350, 300, 0, 10050], // bal
        [10800, 11400, 1875, 9375, 14400, 9750, 10050, 0]      // cor
    ];  // det   chi    pal    ny    lv     phi   bal    cor

    const boozeNarcInfo = Util.storage.get('bninfo', -1);
    if (boozeNarcInfo !== '' && boozeNarcInfo != -1) { // extra checker for undefined crap
        if (boozeNarcInfo.search(/[^0-9]/) != -1) {
            Util.storage.set('bninfo', -1);
        }
    }
    if (boozeNarcInfo !== '' && boozeNarcInfo != -1) { // extra checker for undefined crap
        if (boozeNarcInfo.search(/[^0-9]/) != -1) {
            Util.storage.set('bninfo', -1);
        }
    }

    function OnNodeChange(nodeName) {
        nn = nodeName;
        if ((Util.url.onPage('prices.php') && nn == 'center') || (Util.url.onPage('smuggling.php') && nn == 'center')) {
            let lexDay;
            let lexHour;
            if ($('span#lexhelpsyou').length) {
                lex = parseInt($('span#lexhelpsyou').html().replace(/[^0-9]/g, ''), 10);
                Util.storage.set('lex', lex);
                const BRCd = new Date();
                lexDay = BRCd.getDay();
                lexHour = BRCd.getHours();
                Util.storage.set('lexHour', lexHour);
                Util.storage.set('lexDay', lexDay);
            } else {
                lex = Util.storage.get('lex', 0);
                lexDay = Util.storage.get('lexDay', -1);
                lexHour = Util.storage.get('lexHour', -1);
            }

            let BN;

            if (Util.storage.get('bninfo', -1) > 0) { // do we have info data?
                // create info div to transfer data to XHR function
                narcs = Util.storage.getPow('bninfo', 0, -1);
                booze = Util.storage.getPow('bninfo', 1, -1);
                const city = Util.storage.getPow('bninfo', 2, -1);
                const plane = Util.storage.getPow('bninfo', 3, -1);
                const fam = Util.storage.getPow('bninfo', 4, -1);

                if ($('#info').length === 0) {
                    $('#game_container').append(
                        $('<div>').attr('id', 'info').css('display', 'none').text(`${narcs}*${booze}*${city}*${plane}*${fam}*${Util.storage.get('brcAF', 0)}*${lex}*${lexHour}*${lexDay}`)
                    );
                }

                // get all prices
                let j;
                let k;
                if (Util.url.onPage('prices.php')) { // prices are on the page
                    BN = [];
                    for (let i = 0; i <= 1; i++) { // B/N
                        for (BN[i] = [], j = 0; j <= 6; j++) { // type
                            for (BN[i][j] = [], k = 0; k <= 7; k++) { // city
                                BN[i][j].push(parseInt($(`#game_container center:eq(${i}) > table > tbody > tr:eq(${(3 + k)}) > td:eq(${(1 + j)})`).text().replace(/[^0-9]/g, ''), 10));
                            }
                            BN[i][j].unshift(Math.min.apply(null, BN[i][j])); // get min
                            BN[i][j].unshift(Math.max.apply(null, BN[i][j])); // get max
                        }
                    }
                    appBRC(BN);
                } else {
                    const parsePrices = (resp) => {
                        const parser = new DOMParser();
                        const dom = parser.parseFromString(resp, 'application/xml');
                        BN = [];
                        for (let i = 0; i <= 1; i++) { // B/N
                            for (BN[i] = [], j = 0; j <= 6; j++) { // type
                                for (BN[i][j] = [], k = 0; k <= 7; k++) {
                                    BN[i][j].push(parseInt(dom.getElementsByTagName((i === 0 ? (Util.omerta.narcnames[(j + 1)]).replace('abacco', 'obacco') : Util.omerta.boozenames[(j + 1)]).toLowerCase())[k].textContent, 10)); // city
                                }
                                BN[i][j].unshift(Math.min.apply(null, BN[i][j])); // get min
                                BN[i][j].unshift(Math.max.apply(null, BN[i][j])); // get max
                            }
                        }
                        appBRC(BN); // send prices to BRC function
                    };
                    Util.html.grab(`//${document.location.hostname}/BeO/webroot/index.php?module=API&action=smuggling_prices`, parsePrices);
                }
            }

            if (Util.url.onPage('prices.php')) {
                if (typeof BN == 'undefined') { // todo, this will never happen see if prices are grabbed already
                    let j;
                    let k;
                    BN = [];
                    for (let i = 0; i <= 1; i++) { // B/N
                        for (BN[i] = [], j = 0; j <= 6; j++) { // type
                            for (BN[i][j] = [], k = 0; k <= 7; k++) { // city
                                BN[i][j].push(parseInt($(`#game_container center:eq(${i}) > table > tbody > tr:eq(${(3 + k)}) > td:eq(${(1 + j)})`).text().replace(/[^0-9]/g, ''), 10));
                            }
                            BN[i][j].unshift(Math.min.apply(null, BN[i][j])); // get min
                            BN[i][j].unshift(Math.max.apply(null, BN[i][j])); // get max
                        }
                    }
                }

                for (let i = 0; i <= 1; i++) {
                    for (let j = 0; j <= 6; j++) {
                        for (let k = 2; k <= 9; k++) {
                            if (j === 0) { // add mouseover effects
                                const row = $(`#game_container center:eq(${i}) > table > tbody > tr:eq(${(k + 1)})`);
                                row.attr('id', `${i}row${k}`);
                                row.css('borderTop', '1px solid #000');
                                row.hover(() => {
                                    $(this).css('backgroundColor', '#888');
                                    $(`#${(i ? 1 : 0)}row${k}`).css('backgroundColor', '#888');
                                }, () => {
                                    $(this).css('backgroundColor', 'transparent');
                                    $(`#${(i ? 1 : 0)}row${k}`).css('backgroundColor', 'transparent');
                                });
                            }

                            const item = $(`#game_container center:eq(${i}) > table > tbody > tr:eq(${(k + 1)}) > td:eq(${(j + 1)})`);
                            item.css({
                                'border-top': '1px solid #000',
                                'text-align': 'center',
                                width: '12%'
                            });
                            if (j % 2 === 0) { // add colors to rows
                                item.css('backgroundColor', '#B0B0B0');
                            }
                            if (BN[i][j][k] == BN[i][j][0]) { // HL max
                                item.css('fontWeight', 'bold');
                                item.css('color', '#FF0000');
                            }
                            if (BN[i][j][k] == BN[i][j][1]) { // HL min
                                item.css('fontWeight', 'bold');
                                item.css('color', '#16E54A');
                            }
                            if (j == 5 && i === 0) { // bold-ify cocaine
                                item.css('fontWeight', 'bold');
                            }
                        }
                    }
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

            const bn_xp = 'form > table > tbody > tr:eq(0) > td, .smuggling-header';
            const bn_text = $(bn_xp).html().split('<br>');
            const indexStart = 0;

            const cash = parseInt(bn_text[indexStart].replace(/[^0-9.]/g, ''), 10);
            booze = parseInt(bn_text[indexStart + 1].match(/\d+/), 10); // max amount user can carry
            narcs = parseInt(bn_text[indexStart + 2].match(/\d+/), 10);
            const lexD = new Date();
            const lexDay = lexD.getDay();
            const lexHour = lexD.getHours();
            if (bn_text[6]) {
                const lex = parseInt(bn_text[6].match(/\d+/), 10);
                Util.storage.set('lex', lex);
            } else {
                Util.storage.set('lex', 0);
            }

            Util.storage.set('lexHour', lexHour);
            Util.storage.set('lexDay', lexDay);

            b_amount = [0, 0, 0, 0, 0, 0]; // what is user carrying
            n_amount = [0, 0, 0, 0, 0, 0];

            const xpb = 'table.thinline > tbody > tr:eq(';
            const xpn = 'table.thinline:eq(1) > tbody > tr:eq(';

            if (!lboth) {
                for (let i = 0; i <= 13; i++) { // add click to fill stuff and hotkeys
                    if (i < 7 && !lbooze) { // booze
                        const x = i + 3;
                        const bname = $(`${xpb}${x}) > td:eq(0)`).text();
                        b_amount[i] = parseInt($(`${xpb}${x}) > td:eq(2)`).html(), 10); // define how much of this item is being carried
                        $(`${xpb}${x}) > td:eq(0)`).empty();
                        $(`${xpb}${x}) > td:eq(0)`).append(
                            $('<span>').attr({
                                id: `bh${i}`,
                                index: i,
                                acceskey: (i + 1),
                                title: `Fill in this booze (Hotkey: ${(i + 1)})`
                            }).css('cursor', 'pointer').text(`${(i + 1)} ${bname}`).click(function () {
                                const i = parseInt($(this).attr('index'), 10);
                                const inpt = $('input[type="text"]');
                                for (let j = 0; j <= 6; j++) { // reset form
                                    if (j != i) {
                                        inpt[j + 1].value = 0;
                                    }
                                }
                                const total = Util.array.arraySum(b_amount);
                                const missing = booze - b_amount[i];
                                const value = parseInt(inpt[(i + 1)].value, 10);
                                if (b_amount[i] === 0 && total < booze) {
                                    if (value === 0) {
                                        inpt[(i + 1)].value = booze;
                                        $('input[type="radio"]:eq(1)').prop('checked', true);
                                    } else {
                                        inpt[(i + 1)].value = 0;
                                    }
                                } else if (b_amount[i] == booze) {
                                    if (value === 0) {
                                        inpt[(i + 1)].value = booze;
                                        $('input[type="radio"]:eq(0)').prop('checked', true);
                                    } else {
                                        inpt[(i + 1)].value = 0;
                                    }
                                } else if (b_amount[i] < booze && total < booze) {
                                    if (value === 0) {
                                        inpt[(i + 1)].value = missing;
                                        $('input[type="radio"]:eq(1)').prop('checked', true);
                                    } else if (value == missing) {
                                        inpt[(i + 1)].value = b_amount[i];
                                        $('input[type="radio"]:eq(0)').prop('checked', true);
                                    } else {
                                        inpt[(i + 1)].value = 0;
                                    }
                                } else if (n_amount[i - 9] > booze) {
                                    if (value === 0) {
                                        inpt[(i + 1)].value = b_amount[i];
                                        $('input[type="radio"]:eq(0)').prop('checked', true);
                                    } else {
                                        inpt[(i + 1)].value = 0;
                                    }
                                } else if (b_amount[i] < booze && total > booze) {
                                    if (value === 0) {
                                        inpt[(i + 1)].value = b_amount[i];
                                        $('input[type="radio"]:eq(0)').prop('checked', true);
                                    } else {
                                        inpt[(i + 1)].value = 0;
                                    }
                                }
                                $('input#ver, input[type=submit]').focus();
                            })
                        );
                    }
                    if (i > 6 && !lnarcs) { // narcs
                        const x = i - 4;
                        const nname = $(`${xpn}${x}) > td:eq(0)`).text();
                        n_amount[(i - 7)] = parseInt($(`${xpn}${x}) > td:eq(2)`).html(), 10); // define how much of this item is being carried
                        $(`${xpn}${x}) > td:eq(0)`).empty();
                        $(`${xpn}${x}) > td:eq(0)`).append(
                            $('<span>').attr({
                                id: `nh${i}`,
                                index: i,
                                title: 'Fill in this narc'
                            }).css('cursor', 'pointer').text(nname).click(function () {
                                const i = parseInt($(this).attr('index'), 10);
                                const inpt = $('input[type="text"]');
                                for (let j = 0; j <= 6; j++) { // reset form
                                    if (j != i - 7) {
                                        if (lbooze) {
                                            inpt[j + 1].value = 0;
                                        } else {
                                            inpt[j + 8].value = 0;
                                        }
                                    }
                                }
                                const total = Util.array.arraySum(n_amount);
                                const missing = narcs - n_amount[i - 7];
                                let value;
                                if (lbooze) {
                                    value = parseInt(inpt[i - 6].value, 10);
                                } else {
                                    value = parseInt(inpt[(i + 1)].value, 10);
                                }
                                if (n_amount[i - 7] === 0 && total < narcs) {
                                    if (value === 0) {
                                        if (lbooze) {
                                            inpt[i - 6].value = narcs;
                                            $('input[type="radio"]:eq(1)').prop('checked', true);
                                        } else {
                                            inpt[(i + 1)].value = narcs;
                                            $('input[type="radio"]:eq(3)').prop('checked', true);
                                        }
                                    } else {
                                        inpt[(i + 1)].value = 0;
                                    }
                                } else if (n_amount[i - 7] == narcs) {
                                    if (value === 0) {
                                        if (lbooze) {
                                            inpt[i - 6].value = narcs;
                                            $('input[type="radio"]:eq(0)').prop('checked', true);
                                        } else {
                                            inpt[(i + 1)].value = narcs;
                                            $('input[type="radio"]:eq(2)').prop('checked', true);
                                        }
                                    } else {
                                        inpt[(i + 1)].value = 0;
                                    }
                                } else if (n_amount[i - 7] < narcs && total < narcs) {
                                    if (value === 0) {
                                        if (lbooze) {
                                            inpt[i - 6].value = missing;
                                            $('input[type="radio"]:eq(1)').prop('checked', true);
                                        } else {
                                            inpt[(i + 1)].value = missing;
                                            $('input[type="radio"]:eq(3)').prop('checked', true);
                                        }
                                    } else if (value == missing) {
                                        if (lbooze) {
                                            inpt[i - 6].value = n_amount[i - 7];
                                            $('input[type="radio"]:eq(0)').prop('checked', true);
                                        } else {
                                            inpt[(i + 1)].value = n_amount[i - 7];
                                            $('input[type="radio"]:eq(3)').prop('checked', true);
                                        }
                                    } else {
                                        inpt[(i + 1)].value = 0;
                                    }
                                } else if (n_amount[i - 7] > narcs) {
                                    if (value === 0) {
                                        if (lbooze) {
                                            inpt[i - 6].value = n_amount[i - 7];
                                            $('input[type="radio"]:eq(0)').prop('checked', true);
                                        } else {
                                            inpt[(i + 1)].value = n_amount[i - 7];
                                            $('input[type="radio"]:eq(3)').prop('checked', true);
                                        }
                                    } else {
                                        inpt[(i + 1)].value = 0;
                                    }
                                } else if (b_amount[i] < narcs && total > narcs) {
                                    if (value === 0) {
                                        if (lbooze) {
                                            inpt[i - 6].value = n_amount[i - 7];
                                            $('input[type="radio"]:eq(0)').prop('checked', true);
                                        } else {
                                            inpt[(i + 1)].value = n_amount[i - 7];
                                            $('input[type="radio"]:eq(2)').prop('checked', true);
                                        }
                                    } else {
                                        inpt[(i + 1)].value = 0;
                                    }
                                }
                                $('input#ver, input[type=submit]').focus();
                            })
                        );
                    }
                }
            }

            const inp = $('input[name="typebooze"], input[name="typedrugs"]');
            inp.each(function () {
                $(this).click(() => {
                    if ($('input#ver, input[type=submit]').length) {
                        $('input#ver, input[type=submit]').focus();
                    }
                });
            });

            // visual fix
            if (lnarcs) {
                $('form > table > tbody > tr:eq(1) > td:eq(1)').prepend(
                    $('<br />'),
                    $('<br />')
                );
                $('table.thinline:eq(1)').append(
                    $('<br />')
                );
            }
            if (lbooze) {
                $('form > table > tbody > tr:eq(1) > td:eq(0)').prepend(
                    $('<br />'),
                    $('<br />')
                );
                $('table.thinline:eq(0)').append(
                    $('<br />')
                );
            }

            // create more efficient info text
            const str = $('<span>').text(`Pocket: $ ${Util.number.commafy(cash)} | Booze: ${booze} | Narcs: ${narcs} | Lex: ${lex}`);
            $(bn_xp).html(str).append(
                $('<br />'),
                $('<a>').attr({
                    href: 'prices.php',
                    target: 'main'
                }).text('Current Booze/Narcotics Prices')
            );
            if (!lboth) {
                $('input#ver, input[type=submit]').focus(); // focus captcha field
            }
        }
    }

    const fillBRCForCity = function () {
        fillBRC(parseInt($(this).attr('n'), 10), parseInt($(this).attr('b'), 10), 0);
    };

    function fillBRC(n, b, mode) { // actually filling the forms
        const values = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]; // set defaults
        // booze    - narcs    == maximum user can buy
        // carry_b  - carry_n  == total user is carrying
        // b_amount - n_amount == amount per item user is carrying
        // b        - n        == item we want
        if (n > -1 && !lnarcs && mode != 3) { // do we want narcs?
            if (carry_n === 0) { // nothing in pocket, fill it all
                values[7 + n] = narcs;
                $('input[name="typedrugs"]:eq(1)').prop('checked', true); // buy
            } else { // something in pocket
                if (carry_n < narcs) { // we got space for more
                    if (n_amount[n] < narcs) { // not full of wanted
                        if (n_amount[n] != carry_n) { // there is unwanted stuff
                            for (let i = 0; i <= 6; i++) {
                                if (i != n || mode == 1) { // only sell what we don't want
                                    values[i + 7] = n_amount[i];
                                }
                            }
                            $('input[name="typedrugs"]:eq(0)').prop('checked', true); // sell
                        } else { // only carrying wanted narcs
                            values[7 + n] = narcs - carry_n; // if any, fill missing amount
                            $('input[name="typedrugs"]:eq(1)').prop('checked', true); // buy
                        }
                    } else { // full of wanted
                        if (mode > 0) { // CD/RP mode, sell all
                            values[7 + n] = n_amount[n];
                            $('input[name="typedrugs"]:eq(0)').prop('checked', true); // sell
                        }
                    }
                } else { // we go too much, guess it was a good heist
                    for (let i = 0; i <= 6; i++) { // check what we carry
                        if (mode === 0 && i == n) {
                            values[i + 7] = 0;
                        } else {
                            values[i + 7] = n_amount[i];
                            $('input[name="typedrugs"]:eq(0)').prop('checked', true); // sell
                        }
                    }
                }
            }
        }
        if (n == -1 && mode == 4 && !lnarcs) {
            for (let i = 0; i <= 6; i++) {
                values[i + 7] = n_amount[i];
                $('input[name="typedrugs"]:eq(0)').prop('checked', true); // sell
            }
        }

        // check for scenario: failed selling narcs in high
        let selling_n = 0;
        for (let i = 0; i <= 6; i++) {
            selling_n += values[i + 7];
        }
        const fail_n = (carry_b === 0 && carry_n == narcs && mode === 0 && selling_n > 0) ? 1 : 0;

        if (b > -1 && !fail_n && !lbooze && mode != 3) { // do we want booze? Or are we still selling narcs in high?
            if (carry_b === 0) {
                values[b] = booze; // nothing in pocket, fill it all
                $('input[name="typebooze"]:eq(1)').prop('checked', true); // buy
            } else {
                if (carry_b < booze) { // we got space for more
                    if (b_amount[b] < booze) { // not full of wanted
                        if (b_amount[b] != carry_b) { // there is unwanted stuff
                            for (let i = 0; i <= 6; i++) {
                                values[i] = b_amount[i];
                            }
                            $('input[name="typebooze"]:eq(0)').prop('checked', true); // sell
                        } else { // only carrying wanted narcs
                            if (mode == 2) {
                                values[b] = carry_b; // if any, fill missing amount
                                $('input[name="typebooze"]:eq(0)').prop('checked', true); // sell
                            } else {
                                values[b] = booze - carry_b; // if any, fill missing amount
                                $('input[name="typebooze"]:eq(1)').prop('checked', true); // buy
                            }
                        }
                    } else { // full of wanted
                        if (mode > 0) { // CD/RP mode, sell all
                            values[b] = b_amount[b];
                            $('input[name="typebooze"]:eq(0)').prop('checked', true); // sell
                        }
                    }
                } else { // we go too much, guess it was a good heist
                    for (let i = 0; i <= 6; i++) { // check what we carry
                        if (mode === 0 && i == b) {
                            values[i] = 0;
                        } else {
                            values[i] = b_amount[i];
                            $('input[name="typebooze"]:eq(0)').prop('checked', true); // sell
                        }
                    }
                }
            }
        }
        if (b == -1 && mode == 4 && !lbooze) {
            for (let i = 0; i <= 6; i++) {
                values[i] = b_amount[i];
                $('input[name="typebooze"]:eq(0)').prop('checked', true); // sell
            }
        }

        // fill in the fields with the calculated values
        const start = (lbooze) ? 7 : 0;
        const end = (lnarcs) ? 6 : 13;
        for (let i = start; i <= end; i++) {
            const box = $(`input[name="${sorts[i]}"]`);
            box.val(values[i]);
        }

        // focus
        $('input#ver, input[type=submit]').focus();
    }

    function appBRC(BN) {
        if (!lboth) {
            let getInfo = $('div#info:eq(0)').text();
            getInfo = getInfo.split('*');
            narcs = getInfo[0];
            booze = getInfo[1];
            let city = getInfo[2];
            const plane = getInfo[3];
            const fam = getInfo[4];
            lex = parseInt(getInfo[6], 10);
            const lexHour = parseInt(getInfo[7], 10);
            const lexDay = parseInt(getInfo[8], 10);

            // extra city checker
            if (Util.url.onPage('smuggling.php')) {
                const smugCity = unsafeWindow.omerta.character.game.city();
                for (let i = 0; i < 8; i++) {
                    if (smugCity.search(Util.omerta.cities[i]) != -1) {
                        city = i + 4;
                        Util.storage.setPow('bninfo', 2, city);
                    }
                }
            }

            // calc profits per item per city
            lex = 1 + 0.01 * lex;
            let j;
            const nCityprofit = [];
            const bCityprofit = [];
            for (let i = 0; i <= 7; i++) { // get profit per single unit of b/n
                for (nCityprofit[i] = [], bCityprofit[i] = [], j = 0; j <= 6; j++) { // price there - price here
                    nCityprofit[i].push(Math.round(BN[0][j][(i + 2)] * lex) - Math.round(BN[0][j][(city - 4 + 2)])); // -4 correction for city ID,
                    bCityprofit[i].push(Math.round(BN[1][j][(i + 2)] * lex) - Math.round(BN[1][j][(city - 4 + 2)])); // +2 correction for min/max @ [0]+[1] in BN array
                }
                nCityprofit[i].unshift(Math.max.apply(null, nCityprofit[i])); // most profit per unit in this city
                bCityprofit[i].unshift(Math.max.apply(null, bCityprofit[i]));
            }

            // create BRC table
            const table = $('<table>').addClass('thinline').attr('id', 'brc').css('width', '500').append(
                $('<tr>').append(
                    $('<td>').addClass('tableheader').attr('colspan', '5').text('Best Run Calculator')
                ),
                $('<tr>').append(
                    $('<td>').attr({
                        colspan: '5',
                        height: '1'
                    }).css('background-color', '#000')
                ),
                $('<tr>').css({
                    'border-bottom': '1px solid #000'
                }).append(
                    $('<td>').html('&nbsp; City'),
                    $('<td>').html('&nbsp; Booze'),
                    $('<td>').html('&nbsp; Narc'),
                    $('<td>').html('&nbsp; Profit'),
                    $('<td>').html('&nbsp;')
                    )
            );

            const allProfits = [];
            const bestBN = [];

            // add city rows with individual profits
            for (let i = 0; i <= 7; i++) {
                const tr = $('<tr>').attr('id', `2row${(i + 2)}`);
                tr.hover(() => {
                    $(this).css('backgroundColor', '#888');
                }, () => {
                    $(this).css('backgroundColor', 'transparent');
                });

                const td = $('<td>').attr('colspan', '5').css({
                    'border-bottom': '1px solid #000',
                    height: '19px'
                });

                // --Calc profits
                if (i == city - 4) { // This is the current city
                    td.css('text-align', 'center');
                    td.html(`<i>You are in ${Util.omerta.cities[i]}</i>`);
                    tr.append(td);
                    allProfits.push(0);
                    bestBN.push([0, 0]);
                } else if (plane === 0 && (((city == 6 || city == 11) && (i + 4) != 6 && (i + 4) != 11) || ((city != 6 && city != 11) && ((i + 4) == 6 || (i + 4) == 11)))) { // No plane to travel there
                    td.css('text-align', 'center');
                    td.html(`<i>You can\'t fly to ${Util.omerta.cities[i]}</i>`);
                    tr.append(td);
                    allProfits.push(0);
                    bestBN.push([0, 0]);
                } else { // Nothing wrong, clear to go
                    const bestNarc = nCityprofit[i][0] < 0 ? 0 : nCityprofit[i].lastIndexOf(nCityprofit[i][0]); // best, if any, narc?
                    let profitNarc = (bestNarc === 0) ? 0 : nCityprofit[i][bestNarc]; // profit per unit
                    profitNarc = profitNarc * narcs;

                    const bestBooze = bCityprofit[i][0] < 0 ? 0 : bCityprofit[i].lastIndexOf(bCityprofit[i][0]); // best, if any, booze?
                    let profitBooze = (bestBooze === 0) ? 0 : bCityprofit[i][bestBooze]; // profit per unit
                    profitBooze = profitBooze * booze;

                    let travelCost = travelPrices[i][(city - 4)];
                    if (plane === 0) { // no plane => half travel cost
                        travelCost /= 2;
                    }

                    // Our total profit in this city
                    let totalProfit = (profitNarc + profitBooze) - Math.round(travelCost);

                    // save all profits in array for later
                    if (totalProfit < 0) {
                        bestBN.push([0, 0]); // push dummy to complete array
                    } else {
                        bestBN.push([bestNarc, bestBooze]);
                    }
                    const wnarc = (bestNarc === 0) ? 0 : bestNarc - 1;
                    const wbooze = (bestBooze === 0) ? 0 : bestBooze - 1;
                    const narcsell = (BN[0][wnarc][0] * narcs) * lex;
                    const boozesell = (BN[1][wbooze][0] * booze) * lex;
                    const pay = (Math.round(narcsell * [0, 0.1, 0.1, 0, 0.1][fam]) + Math.round(boozesell * [0, 0.1, 0.1, 0, 0.1][fam])); // famless, member no capo, capo, top3, member with capo
                    totalProfit = totalProfit - pay;
                    allProfits.push(totalProfit);

                    // What's the result
                    if (totalProfit < 0) { // no profit :(
                        td.css('text-align', 'center');
                        td.html(`<i>You won\'t make any profit in ${Util.omerta.cities[i]}</i`);
                        tr.append(td);
                    } else { // profit \o/
                        td.html(`&nbsp;${Util.omerta.cities[i]}`);
                        td.attr('colspan', '1');
                        tr.append(td);
                        tr.append(
                            $('<td>').css({
                                'border-left': '1px solid #000',
                                'border-bottom': '1px solid #000'
                            }).html(`&nbsp; ${Util.omerta.boozenames[bestBooze]}`),
                            $('<td>').css({
                                'border-left': '1px solid #000',
                                'border-bottom': '1px solid #000'
                            }).html(parseInt(narcs, 10) === 0 ? 'NO NARCS' : `&nbsp; ${Util.omerta.narcnames[bestNarc]}`),
                            $('<td>').css({
                                'border-left': '1px solid #000',
                                'border-bottom': '1px solid #000'
                            }).html(`&nbsp; $${Util.number.commafy(totalProfit)}`)
                        );

                        if (Util.url.onPage('smuggling.php')) { // we need JS links @ smuggling and don't want to waste clicks
                            const key = [0, 4, 6, 1, 2, 3, 5]; // convert b/n - bot prices order to smuggling order
                            const n1 = key[bestNarc - 1];
                            const b1 = key[bestBooze - 1];

                            tr.append(
                                $('<td>').css({
                                    'border-left': '1px solid #000',
                                    'border-bottom': '1px solid #000'
                                }).html('&nbsp;').append(
                                    $('<span>').attr({
                                        id: `go${i}`,
                                        n: n1,
                                        b: b1
                                    }).css({
                                        'font-weight': 'inherit',
                                        'text-align': 'center',
                                        cursor: 'pointer'
                                    }).text('Go!').click(fillBRCForCity))
                            );
                        } else { // we need to GET to smuggling too
                            tr.append(
                                $('<td>').css({
                                    'border-left': '1px solid #000',
                                    'border-bottom': '1px solid #000'
                                }).html('&nbsp;').append(
                                    $('<a>').attr({
                                        id: `go${i}`,
                                        href: `/smuggling.php?action=go&n=${(bestNarc - 1)}&b=${(bestBooze - 1)}`
                                    }).css({
                                        'font-weight': 'inherit',
                                        'text-align': 'center',
                                        cursor: 'pointer'
                                    }).text('Go!')
                                    )
                            );
                        }
                    }
                }
                table.append(tr);
            }
            // add lex row
            if (lex > 1) {
                const lexDate = new Date();
                table.append(
                    $('<tr>').append(
                        $('<td>').attr('colspan', '5').css({
                            'text-align': 'center',
                            'font-size': '10px'
                        }).text(`Lex Level: ${parseInt((lex - 1) * 100, 10)} - Seen ${((lexDate.getDay() != lexDay) ? '1 Day ago' : `${lexDate.getHours() - lexHour} Hours ago`)}`)
                    )
                );
            }
            // add table to page
            if (Util.url.onPage('prices.php')) {
                if ($('#brc').length === 0) {
                    $('#game_container').append(
                        $('<br />'),
                        table
                    );
                }
            } else {
                if ($('#brc').length === 0) {
                    $('#game_container').append(
                        $('<br />'),
                        table
                    );
                }
            }
            // bold-ify Best Run
            const bestRun = allProfits.lastIndexOf(Math.max.apply(null, allProfits));
            $(`#brc > tbody > tr:eq(${(3 + bestRun)})`).css('font-weight', 'bold');

            if (Util.url.onPage('smuggling.php')) {
                const AF = function (sel, Xn, Xb) {
                    sel = parseInt(sel, 10);
                    let n = -1;
                    let b = -1;
                    // assemble info for AF
                    const bn_xp = 'form > table > tbody > tr:eq(0) > td, .smuggling-header';
                    const bn_text = $(bn_xp).html().split('|');

                    booze = parseInt(bn_text[1].replace(/[^0-9.]/g, ''), 10); // max amount user can carry
                    narcs = parseInt(bn_text[2].replace(/[^0-9.]/g, ''), 10);

                    b_amount = [0, 0, 0, 0, 0, 0, 0];
                    n_amount = [0, 0, 0, 0, 0, 0, 0]; // what is user carrying
                    const xpb = 'table.thinline > tbody > tr:eq(';
                    const xpn = 'table.thinline:eq(1) > tbody > tr:eq(';
                    for (let i = 0; i <= 13; i++) { // define how much of this item is being carried
                        if (i < 7 && !lbooze) {
                            b_amount[i] = parseInt($(`${(xpb + (i + 3))}) > td:eq(2)`).text(), 10);
                        }
                        if (i > 6 && !lnarcs) {
                            n_amount[(i - 7)] = parseInt($(`${(xpn + (i - 4))}) > td:eq(2)`).text(), 10);
                        }
                    }

                    carry_n = Util.array.arraySum(n_amount);
                    carry_b = Util.array.arraySum(b_amount); // how much is the user carrying already
                    // which item do we want?
                    const key = [0, 4, 6, 1, 2, 3, 5];
                    if (sel === 0) { // Calc for Best Run
                        n = key[(bestBN[bestRun][0] - 1)]; // this trick works, even I'm amazed
                        b = key[(bestBN[bestRun][1] - 1)];
                        if ((carry_n > 0 || carry_b > 0) && Math.max(Math, allProfits) === 0) {
                            // HACK: in this scenario we're in a high where no other
                            // cities would generate any profit. Just pretend we're using
                            // RP mode so all units get sold.
                            sel = 2;
                        }
                    }
                    if (sel == 1) { // CD Run
                        for (let i = 0; i <= 6; i++) {
                            const nItem = parseInt(BN[0][i][(city - 4 + 2)], 10);
                            const highNarc = ((i === 0) ? nItem : ((highNarc > nItem) ? highNarc : nItem));
                            if (highNarc == nItem) {
                                n = i;
                            }
                            const bItem = parseInt(BN[1][i][(city - 4 + 2)], 10);
                            const highBooze = ((i === 0) ? bItem : ((highBooze > bItem) ? highBooze : bItem));
                            if (highBooze == bItem) {
                                b = i;
                            }
                        }
                        n = key[n];
                        b = key[b];
                    }
                    if (sel == 2) { // RP Run
                        for (let i = 0; i <= 6; i++) {
                            const nItem = parseInt(BN[0][i][(city - 4 + 2)], 10);
                            const lowNarc = ((i === 0) ? nItem : ((lowNarc < nItem) ? lowNarc : nItem));
                            if (lowNarc == nItem) {
                                n = i;
                            }
                            const bItem = parseInt(BN[1][i][(city - 4 + 2)], 10);
                            const lowBooze = ((i === 0) ? bItem : ((lowBooze < bItem) ? lowBooze : bItem));
                            if (lowBooze == bItem) {
                                b = i;
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
                    if (sel == 3) { // None
                        n = b = -1;
                    }

                    if (document.location.href.indexOf('action=go') !== -1) { // user manual override using external Go! link
                        n = key[(Util.url.getParam('n'))];
                        b = key[(Util.url.getParam('b'))];
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

                const AFtop = parseInt(Util.storage.get('AFtop', '225'), 10);
                const AFleft = parseInt(Util.storage.get('AFleft', '300'), 10);
                if (!$('#AF').length) {
                    if ((Util.settings.get('af_position') || 'floating') == 'floating') {
                        $('#game_container').append(
                            $('<div>').addClass('BRCinfo')
                            .css({
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
                            })
                        );
                    } else {
                        const AFNode = $('<div>').attr({
                            id: 'AF'
                        });

                        $('.smuggling-header').prepend(AFNode);
                    }

                    $('#AF').append(
                        $('<center>').text('Auto-Fill').css('font-weight', 'bold'),
                        $('<hr>').css({
                            color: 'gray'
                        }),
                        $('<span>').append(
                            $('<input>').attr({
                                id: 'brc0',
                                type: 'radio',
                                name: 'brc'
                            }).click(() => {
                                AF(0);
                                Util.storage.set('brcAF', 0);
                            }),
                            $('<label>').attr({
                                id: 'a1',
                                for: 'brc0',
                                acceskey: '8',
                                title: 'Fill in the most profitable b/n (Hotkey: 8 )'
                            }).text('Best: (8)')
                        ),
                        $('<span>').append(
                            $('<br />'),
                            $('<input>').attr({
                                id: 'brc1',
                                type: 'radio',
                                name: 'brc'
                            }).click(() => {
                                AF(1);
                                Util.storage.set('brcAF', 1);
                            }),
                            $('<label>').attr({
                                id: 'a2',
                                for: 'brc1',
                                acceskey: '9',
                                title: 'Fill in the most expensive b/n (Hotkey: 9 )'
                            }).text('CD: (9)')
                        ),
                        $('<span>').append(
                            $('<br />'),
                            $('<input>').attr({
                                id: 'brc2',
                                type: 'radio',
                                name: 'brc'
                            }).click(() => {
                                AF(2);
                                Util.storage.set('brcAF', 2);
                            }),
                            $('<label>').attr({
                                id: 'a3',
                                for: 'brc2',
                                acceskey: '0',
                                title: 'Fill in the cheapest b/n (Hotkey: 0 )'
                            }).text('RP: (0)')
                        ),
                        $('<span>').append(
                            $('<br />'),
                            $('<input>').attr({
                                id: 'brc3',
                                type: 'radio',
                                name: 'brc'
                            }).click(() => {
                                AF(3);
                                Util.storage.set('brcAF', 3);
                            }),
                            $('<label>').attr({
                                id: 'a4',
                                for: 'brc3',
                                acceskey: '-',
                                title: 'Don\'t fill anything (Hotkey: - )'
                            }).text('None: (-)')
                        )
                    );
                }
                if ((Util.settings.get('af_position') || 'floating') == 'floating') {
                    $(() => {
                        $('#AF').draggable();
                    });
                    $('#AF').mouseup(() => {
                        // alert('Set the x and y values using GM_getValue.');
                        const divOffset = $('#AF').offset();
                        const left = divOffset.left;
                        const top = divOffset.top;
                        Util.storage.set('AFleft', left);
                        Util.storage.set('AFtop', top);
                    });
                } else {
                    // show static AF settings in one row
                    $('#AF hr, #AF br').remove();
                }

                const mode = Util.storage.get('brcAF', 0);

                const xp = 'form > table > tbody > tr:eq(0) > td';
                if ($('#do_n').length === 0) {
                    $(xp).append(
                        $('<br />'),
                        $('<span>').attr({
                            id: 'do_n',
                            title: 'AutoFill just narcs according to selected BRC mode (Hotkey: [ )',
                            acceskey: '['
                        }).css('cursor', 'pointer').text('Narcs'),
                        $('<span>').text(' | '),
                        $('<span>').attr({
                            id: 'do_b',
                            title: 'AutoFill just booze according to selected BRC mode (Hotkey: ] )',
                            acceskey: ']'
                        }).css('cursor', 'pointer').text('Booze'),
                        $('<span>').text(' | '),
                        $('<span>').attr({
                            id: 'do_sell',
                            title: 'Sell all you have (Hotkey: = )',
                            acceskey: '='
                        }).css('cursor', 'pointer').text('Sell All'),
                        $('<br />')
                    );
                }
                $('#do_n').click(() => {
                    AF(Util.storage.get('brcAF', 0), 0, 1);
                });
                $('#do_b').click(() => {
                    AF(Util.storage.get('brcAF', 0), 1, 0);
                });
                $('#do_sell').click(() => {
                    AF(4, 1, 1);
                });

                $(`input#brc${mode}`).prop('checked', true);
            }
        }
    }

    /* public functions */
    const Brc = {
        OnNodeChange
    };

    return Brc;
})(jQuery, Util);

export default BRC;
