import Util from './Util';

const Jail = ((Util) => {
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
        const bo_hotkey = Util.settings.get['bo_hotkey'] || '/';
        // Add buyout hotkey
        if ($('input[name="buymeout"]').length) {
            $('input[name="buymeout"]').attr('accesskey', bo_hotkey);
        }

        // Go back to jail when time is over
        if ($('#game_container span[data-time-end]').attr('data-time-end')) {
            $('#game_container span[data-time-end]').on('DOMSubtreeModified', () => {
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
            let i = 1;
            let custom_groups = '';
            $('#game_container form center div').not('#creategroup').each(function () {
                const group_name = $(this).attr('id');
                const group_colour = $(this).find(`select[name="editgroup_colour_select${i}"]`).find('option:eq(0)').val();
                custom_groups = `${custom_groups}${group_name}:${group_colour}|`;
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

        let bos = parseInt(Util.storage.get('bustouts', 0), 10);

        const jailHL_sel = Util.settings.get('jailHL_sel') || 'highest';
        const jailHL_other = parseInt(Util.settings.get('jailHL_other') || 9, 10);
        const jailHL_friends = parseInt(Util.settings.get('jailHL_friends') || 5, 10);
        const jailHL_own_lackey = parseInt(Util.settings.get('jailHL_own_lackey') || 7, 10);
        const jailHL_fr_lackey = parseInt(Util.settings.get('jailHL_fr_lackey') || 8, 10);
        const jailHL_other_lackey = parseInt(Util.settings.get('jailHL_other_lackey') || 11, 10);

        const rows = $('tr[bgcolor]').length;
        let prior = null;
        // list for inmates with lowest priority
        let bustlist = [];
        let priority;
        // Build new row on top
        $('#game_container > form > center > table.thinline > tbody').prepend($('<tr>').attr('id', 'HLrow').css('border-bottom', '1px solid #000'));
        // Loop inmates
        $('tr[bgcolor]').each(function () {
            // Skip nobust
            if (Util.storage.get('nobust', 0)) {
                const nobust = Util.storage.get('nobust').toLowerCase().split(',');
                const fam = $(this).find('td:eq(1) > font').text().toLowerCase();
                const name = $(this).find('td:eq(0) > font > a > font').text().toLowerCase();
                if ((fam.length > 0 && $.inArray(fam, nobust) != -1) || $.inArray(name, nobust) != -1) {
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
                        const cg = Util.storage.get('custom_groups', '').split('|');
                        cg.pop();
                        for (let i = 0; i < cg.length; i++) {
                            const g = cg[i].split(':');
                            if (g[1] == $(this).attr('bgcolor')) {
                                const cg_prio = parseInt(Util.settings.get(`jailHL_${g[0]}`), 10);
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
                        const cg = Util.storage.get('custom_groups', '').split('|');
                        cg.pop();
                        for (let i = 0; i < cg.length; i++) {
                            const g = cg[i].split(':');
                            if (g[1] == $(this).attr('bgcolor')) {
                                const cg_prio = parseInt(Util.settings.get(`jailHL_${g[0]}_lackey`), 10);
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
            let bustthis;
            if (jailHL_sel === 'lowest') {
                bustthis = bustlist[bustlist.length - 1];
            } else if (jailHL_sel === 'random') {
                bustthis = bustlist[Util.math.random(0, (bustlist.length - 1))];
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
        const bustMsg = 'You busted this person';
        const bustFriendMsg = 'cellmate out of jail';
        if ($(`#game_container:contains("${bustMsg}")`).length) {
            if ($(`#game_container:contains("${bustFriendMsg}")`).length) {
                bos = (bos + 1);
            }
            bos = (bos + 1);
            Util.storage.set('bustouts', bos);
        }
        // Add amount of inmates and bustouts
        $('#game_container tr:first').prepend(
            $('<td>').css('width', '46%').append(
                $('<span>').text(`In jail: ${rows}`),
                $('<br />'),
                $('<span>').text(`Bustouts: ${bos}`)
            )
        );
        $('#game_container tr:first table').css('margin-left', '0');


    }

    /* public functions */
    const Jail = {
        OnNodeChange: (nodeName) => {
            if (Util.url.onPage('jail.php')) {
                setFocus();

                if (nodeName == 'table') { // we got busted
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
})(Util);

export default Jail;
