import Util from './Util';

const UserPage = (($) => {
    const wealthMoney = [' ($0 - $50.000)', ' ($50.001 - $100.000)', ' ($100.001 - $500.000)', ' ($1.000.001 - $5.000.000)', ' ($5.000.001 - $15.000.000)', ' ( > $15.000.001)', ' ($500.001 - $1.000.000)'];
    const wealth = ['Straydog', 'Poor', 'Nouveau Riche', 'Very rich', 'Too rich to be true', 'Richer than God', 'Rich'];
    const driver = ['Rookie', 'Co-Driver', 'Driver', 'Advanced Driver', 'Master Driver', 'Chauffeur', 'Advanced Chauffeur', 'Master Chauffeur', 'Racing Driver', 'Race Supremo', 'Champion'];
    const bustAmount = [' (0-500)', ' (501-1.000)', ' (1.001-2.500)', ' (2.501-5.000)', ' (5.001-10.000)', ' (10.001-15.000)', ' (15.001-20.000)', ' (20.001-25.000)', ' (25.001-27.500)', ' (27.501+)'];
    const bustRank = ['Rookie', 'Novice', 'Initiate', 'Decent', 'Apprentice', 'Intermediate', 'Professional', 'Expert', 'Ultimate', 'Extreme Expert'];

    function checkIfUserExist() {
        const input = Util.url.getParam('nick');
        if ($('#game_container:contains("This user does not exist")').length && input !== false) {
            setTimeout(() => {
                $.getJSON(`${Util.beyond.page.apiOld}/?p=quicklookup&v=${Util.version}&input=${input}`, (data) => {
                    $('#game_container').html(`This user does not exist: ${input}`);
                    let html = '';
                    let i = 0;
                    for (const results in data) {
                        if (data.hasOwnProperty(results)) {
                            if (i < 50) {
                                html += `<br /><a href="user.php?nick=${results}" id="${i}" class="sel">${results}</a>`;
                            }
                        }
                        i++;
                    }
                    const total = i === 0 ? 0 : ++i;
                    if (input.length < 3) {
                        $('#game_container').html(`This user does not exist: ${input}<br />This will give too many results. Try to be more specific.`);
                    } else if (total !== 0) {
                        $('#game_wrapper_container').css('height', '99%');
                        $('span.title-main').text('Quick lookup by Omerta Beyond (NB!: Uses old api, may not be accurate)');

                        $('#game_container').html((total <= 50) ? `This user does not exist: ${input}<br />Maybe this is what you were looking for:<br />` : `This user does not exist: ${input}'<br />Maybe this is what you were looking for:<br />Total results: ${total} Showing first 50 results<br />`);
                        $('#game_container').html($('#game_container').html() + html);
                        $('#0').focus();
                        let j = 0;
                        $(window).keydown((event) => {
                            if (event.keyCode == 40) {
                                if (j < total - 1) {
                                    j++;
                                    $(`#${j}`).focus();
                                }
                            }
                        });
                        $(window).keydown((event) => {
                            if (event.keyCode == 38) {
                                if (j !== 0) {
                                    j--;
                                    $(`#${j}`).focus();
                                }
                            }
                        });
                    } else {
                        $('#game_container').html(`This user does not exist: ${input}<br />Sorry, we also couldn\'t find any alternatives.`);
                    }
                });
            }, 100);
        }
    }

    function addDataFromOb(data) {
        let status = $('span#status').text();
        const unick = $('span#username').first().text();

        if (data['alive'] === false) {
            const rankings = `<a href="/BeO/webroot/index.php?module=Rankings&nick=${unick}">View Rankings</a>`;
            if ($('img[src*="/userbadges/rip.gif"]').parent().get(0).tagName != 'A') {
                status += '<span style="color:red; font-weight:bold;"> (Akill) </span>';
            }

            $('span#status').html(`${status} | ${rankings} | Died at ${data['death_date']}`);

        } else {
            $('span#status').html(`${status} | Last on: ${data['last_seen']}`);
        }
    }

    const UserPage = {
        OnNodeChange: (nodeName) => {
            if (Util.url.onPage('user.php') && nodeName == 'span') {
                checkIfUserExist();
            }

            if (Util.url.onPage('user.php') && nodeName == 'center') {
                const unick = $('span#username').first().text();
                const status = $('span#status').text();
                const alive = status.search(/dead/);
                const inFam = ($('span#family > a').length ? $('span#family > a').text() : $('span#family').text());
                $.getJSON(`${Util.beyond.page.api}/domains/${Util.version}/versions/latest/users/${unick}`).done(addDataFromOb);

                // wealth
                const wlth = $('#wealth').attr('value');
                const wealthIndex = wealth.indexOf(wlth);
                $('#wealth').text(wlth + wealthMoney[wealthIndex]);

                // raceform
                const rf = $('#raceform').attr('value');
                const driverIndex = driver.indexOf(rf);
                $('#raceform').text(`${(driverIndex + 1)} - ${rf}`);

                // bustrank
                const userbustRank = $('#bustrank').attr('value');
                const bustRankIndex = bustRank.indexOf(userbustRank);

                $('#bustrank').text(userbustRank + bustAmount[bustRankIndex]);

                // Actions
                const self = ($('table.thinline > tbody > tr:eq(2) > td:eq(1) > a > span').text() == Util.storage.get('nick', ''));
                $('td.tableheader').parent().after(
                    $('<tr>').append(
                        $('<td>').addClass('profilerow').attr({
                            id: 'actions',
                            colspan: '2',
                            align: 'center'
                        }).css('display', 'none').html(`<a href="BeO/webroot/index.php?module=Heist&action=&driver=${unick}">Heist</a> | <a href="${document.location.protocol}//${document.location.hostname}/BeO/webroot/index.php?module=Spots&driver=${unick}">Raid</a> | <a href="/BeO/webroot/index.php?module=Detectives&search=${unick}">Hire Detectives</a>`)
                    )
                );
                let historyLink = historyLink = $('<span>').text('View History').css('cursor', 'pointer').click(() => {
                    $.get(`${Util.beyond.page.apiOld}/?p=history&v=${Util.version}&name=${unick}`, (data) => {
                        $('#game_container').empty();
                        $('#game_container').html(data);
                    });
                });
                if (!self && alive) {
                    $('td.tableheader').append(
                        $('<span>').text(' | '),
                        historyLink,
                        $('<span>').text(' | '),
                        $('<span>').text('Actions').css('cursor', 'pointer').click(() => {
                            $('#actions').toggle();
                        })
                    );
                } else {
                    $('td.tableheader').append(
                        $('<span>').text(' | '),
                        historyLink
                    );
                }
                if (parseInt(Util.storage.getPow('bninfo', 4, -1), 10) === 3 && inFam === 'None') {
                    $('#actions').html(`${$('#actions').html()} | <a href="/BeO/webroot/index.php?module=Family&who=${unick}">Invite to Family</a>`);
                }
            }
        }
    };

    return UserPage;
})(jQuery);

export default UserPage;
