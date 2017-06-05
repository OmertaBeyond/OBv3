import Util from './Util';

const Preferences = (($) => {
    function GetPrefPage() {
        // set location.hash so other code doesn't get triggered
        // window.location.hash = 'OB_preferences';
        // ^ gonna comment this out for a quick .dm patch for new layout

        const setGroupPriority = function () {
            Util.settings.set($(this).attr('id'), $(this).val());
        };

        const jailHL = (Util.preferences.get('jailHL') ? true : false);
        const jailHL_sel = Util.settings.get('jailHL_sel') || 'highest';
        const jailHL_other = Util.settings.get('jailHL_other') || 9;
        const jailHL_friends = Util.settings.get('jailHL_friends') || 5;
        const jailHL_own_lackey = Util.settings.get('jailHL_own_lackey') || 7;
        const jailHL_fr_lackey = Util.settings.get('jailHL_fr_lackey') || 8;
        const jailHL_other_lackey = Util.settings.get('jailHL_other_lackey') || 11;
        const autoCloseNotificationsSecs = Util.settings.get('autoCloseNotificationsSecs') || 0;
        const bo_hotkey = Util.settings.get('bo_hotkey') || '/';
        const custom_groups = Util.storage.get('custom_groups', '').split('|');
        custom_groups.pop();
        const nobust = Util.storage.get('nobust', '').split(',');
        const af_position = Util.settings.get('af_position') || 'floating';
        Util.preferences.set('NR', 1);

        // Build custom groups priority settings
        let c_group_div = null;
        for (let i = 0; i < custom_groups.length; i++) {
            const group_name = custom_groups[i].split(':')[0];
            const group_prio = Util.settings.get(`jailHL_${group_name}`) || (i + 12);
            const group_lackey_prio = Util.settings.get(`jailHL_${group_name}_lackey`) || (i + 13);
            const jailTr = [
                $('<tr>').append(
                    $('<td>').text(group_name),
                    $('<td>').append(
                        $('<input>').attr({
                            id: `jailHL_${group_name}`,
                            type: 'text',
                            value: group_prio
                        }).blur(setGroupPriority)
                    )
                ),
                $('<tr>').append(
                    $('<td>').text(`${group_name} lackeys`),
                    $('<td>').append(
                        $('<input>').attr({
                            id: `jailHL_${group_name}_lackey`,
                            type: 'text',
                            value: group_lackey_prio
                        }).blur(setGroupPriority)
                    )
                )
            ];
            if (c_group_div === null) {
                c_group_div = jailTr;
            } else {
                c_group_div = c_group_div.concat(jailTr);
            }
        }

        function deleteNoBustEntry() {
            const entrySpan = $(this).prev();
            const index = nobust.indexOf(entrySpan.attr('id'));
            nobust.splice(index, 1);
            entrySpan.hide();
            $(this).hide();
            Util.storage.set('nobust', nobust);
        }
        // Build no bust list
        const nobust_div = $('<div>').attr('id', 'nobust');
        for (let i = 0; i < nobust.length; i++) {
            if (nobust[i].length > 0) {
                nobust_div.append(
                    $('<span>').attr({ id: nobust[i] }).text(nobust[i]),
                    $('<img />').addClass('inboxImg').attr({
                        src: GM_getResourceURL('delete'),
                        title: 'Delete'
                    }).click(deleteNoBustEntry),
                    $('<br>')
                );
            }
        }
        nobust_div.append(
            $('<input>').attr({
                id: 'new_nobust',
                type: 'text'
            }),
            $('<button>').text('Add').click(() => {
                // let's not add empty entries
                const newVal = $('#new_nobust').val();
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
            })
        );

        const getNotificationItem = function (name, label) {
            return $('<tr>').append(
                $('<td>').text(label),
                $('<td>').css('text-align', 'center').append(
                    $('<input>').attr({
                        type: 'checkbox',
                        checked: Util.preferences.get(name) ? true : false
                    }).click((event) => {
                        Util.preferences.set(name, $(event.currentTarget).prop('checked'));
                    })
                ),
                $('<td>').css('text-align', 'center').append(
                    $('<input>').attr({
                        type: 'checkbox',
                        checked: Util.preferences.get(`${name}_sound`) ? true : false
                    }).click((event) => {
                        Util.preferences.set(`${name}_sound`, $(event.currentTarget).prop('checked'));
                    })
                )
            );
        };

        const notificationOptions = [
            { name: 'notify_bmsgDeaths', label: 'Deaths' },
            { name: 'notify_bmsgNews', label: 'News' },
            { name: 'notify_bn', label: 'B/N prices changes' },
            { name: 'notify_crime', label: 'Crime' },
            { name: 'notify_gta', label: 'Nick a car' },
            { name: 'notify_travel', label: 'Travel' },
            { name: 'notify_bullets', label: 'Buy bullets' },
            { name: 'notify_health', label: 'When losing health' },
            { name: 'notify_messages', label: 'Receive new message' },
            { name: 'notify_alerts', label: 'New alerts' },
            { name: 'notify_bg', label: 'Train BG' },
            { name: 'notify_highlight', label: 'Name mentioned in chat' }
        ];

        const notificationMarkup = $('<table>').addClass('thinline').attr({ cellspacing: 0, cellpading: 2, width: '100%' }).append(
            $('<tr>').append(
                $('<td>').addClass('tableitem').attr('align', 'center').append(
                    $('<b>').text('Event')
                ),
                $('<td>').addClass('tableitem').attr('align', 'center').append(
                    $('<b>').text('Notification')
                ),
                $('<td>').addClass('tableitem').attr('align', 'center').append(
                    $('<b>').text('Sound')
                )
            ),
            notificationOptions.map((element) => {
                return getNotificationItem(element.name, element.label);
            })
        );

        const prefs_page = $('<center>').attr({
            id: 'prefsContainer'
        }).append(
            $('<table>').addClass('thinline').attr({ cellspacing: 0, cellpading: 2, width: '90%' }).append(
                $('<tr>').append(
                    $('<td>').addClass('tableheader').attr('align', 'center').css('text-align', 'center').append(
                        $('<span>').css('font-weight', 'bold').text('OmertaBeyond Preferences')
                    )
                ),
                $('<tr>').append(
                    $('<td>').attr({ height: '1', bgcolor: 'black' })
                ),
                $('<tr>').append(
                    $('<td>').addClass('tableitem').attr('align', 'center').css('text-align', 'center').css('font-weight', 'normal').text(`Version ${Util.beyond.version}`)
                ),
                $('<tr>').append(
                    $('<td>').attr({ height: '1', bgcolor: 'black' })
                ),
                $('<tr>').append(
                    $('<td>').addClass('tableitem').attr('align', 'center').css('text-align', 'center').text('Notifications')
                ),
                $('<tr>').append(
                    $('<td>').attr({ height: '1', bgcolor: 'black' })
                ),
                $('<tr>').append(
                    $('<td>').attr('align', 'center').css('text-align', 'center').text('OmertaBeyond can send you desktop notifications or play a sound for events like deaths or news posts.').append(
                        $('<br>'),
                        $('<div>').attr('id', 'Authmsg'),
                        $('<button id="btnNotification">').text('Authorize for notifications').click(() => {
                            if ('Notification' in window) {
                                Notification.requestPermission((perm) => {
                                    $('#Authmsg').text(`Authorization for notification is: ${perm}`);
                                });
                            }
                        }),
                        $('<br>'),
                        $('<label>').attr('for', 'autoCloseNotificationsSecs').text('Show notifications for X seconds (0 = always show)'),
                        $('<input>').attr({
                            id: 'autoCloseNotificationsSecs',
                            type: 'text',
                            value: autoCloseNotificationsSecs
                        }).blur(() => {
                            Util.settings.set('autoCloseNotificationsSecs', $('#autoCloseNotificationsSecs').val());
                        }),
                        $('<br>'),
                        $('<div>').addClass('notify').append(
                            notificationMarkup
                        )
                    )
                ),
                $('<tr>').append(
                    $('<td>').attr({ height: '1', bgcolor: 'black' })
                ),
                $('<tr>').append(
                    $('<td>').addClass('tableitem').attr('align', 'center').css('text-align', 'center').text('Bust Priorities')
                ),
                $('<tr>').append(
                    $('<td>').attr({ height: '1', bgcolor: 'black' })
                ),
                $('<tr>').append(
                    $('<td>').attr('align', 'center').css('text-align', 'center').text(
                        'Here you can choose which groups you want to bust before others.'
                    ).append(
                        $('<br>'),
                        $('<input>').attr({
                            id: 'jailHL',
                            type: 'checkbox',
                            checked: jailHL
                        }).click(() => {
                            Util.preferences.set('jailHL', $('#jailHL:checked').length);
                        }),
                        $('<label>').attr('for', 'jailHL').text('Enable Bust Priorities'),
                        $('<br>'),
                        $('<span>').css('font-style', 'italic').text('Lower value means higher priority'),
                        $('<table>').css('text-align', 'left').css('margin-left', '30%').append(
                            $('<tr>').append(
                                $('<td>').text('Other'),
                                $('<td>').append(
                                    $('<input>').attr({
                                        id: 'jailHL_other',
                                        type: 'text',
                                        value: jailHL_other
                                    }).blur(() => {
                                        Util.settings.set('jailHL_other', $('#jailHL_other').val());
                                    })
                                )
                            ),
                            $('<tr>').append(
                                $('<td>').text('Friends and Family'),
                                $('<td>').append(
                                    $('<input>').attr({
                                        id: 'jailHL_friends',
                                        type: 'text',
                                        value: jailHL_friends
                                    }).blur(() => {
                                        Util.settings.set('jailHL_friends', $('#jailHL_friends').val());
                                    })
                                )
                            ),
                            $('<tr>').append(
                                $('<td>').text('Own lackeys'),
                                $('<td>').append(
                                    $('<input>').attr({
                                        id: 'jailHL_own_lackey',
                                        type: 'text',
                                        value: jailHL_own_lackey
                                    }).blur(() => {
                                        Util.settings.set('jailHL_own_lackey', $('#jailHL_own_lackey').val());
                                    })
                                )
                            ),
                            $('<tr>').append(
                                $('<td>').text('Friend/Family lackeys'),
                                $('<td>').append(
                                    $('<input>').attr({
                                        id: 'jailHL_fr_lackey',
                                        type: 'text',
                                        value: jailHL_fr_lackey
                                    }).blur(() => {
                                        Util.settings.set('jailHL_fr_lackey', $('#jailHL_fr_lackey').val());
                                    })
                                )
                            ),
                            $('<tr>').append(
                                $('<td>').text('Other lackeys'),
                                $('<td>').append(
                                    $('<input>').attr({
                                        id: 'jailHL_other_lackey',
                                        type: 'text',
                                        value: jailHL_other_lackey
                                    }).blur(() => {
                                        Util.settings.set('jailHL_other_lackey', $('#jailHL_other_lackey').val());
                                    })
                                )
                            ),
                            c_group_div,
                            $('<tr>').append(
                                $('<td>')
                            ),
                            $('<tr>').append(
                                $('<td>').text('Buyout hotkey'),
                                $('<td>').append(
                                    $('<input>').attr({
                                        id: 'bo_hotkey',
                                        type: 'text',
                                        value: bo_hotkey
                                    }).blur(() => {
                                        Util.settings.set('bo_hotkey', $('#bo_hotkey').val());
                                        $('.ob_hotkey_pref').text($('#bo_hotkey').val());
                                    })
                                )
                            )
                        ),
                        $('<p>').html(`Depending on browser and operating system, you can use either Alt + Shift + <span class="ob_hotkey_pref">${bo_hotkey}</span>, Alt + <span class="ob_hotkey_pref">${bo_hotkey}</span> or Ctrl + Alt + <span class="ob_hotkey_pref">${bo_hotkey}</span> to buy yourself out.`),
                        $('<span>').text('Do you want to choose players with highest/lowest remaining jailtime first, or pick one randomly?'),
                        $('<br>'),
                        $('<div>').addClass('notify').append(
                            $('<input>').attr({
                                name: 'jailHL_sel',
                                id: 'jailHL_high',
                                type: 'radio',
                                checked: (jailHL_sel == 'highest' ? true : false)
                            }).click(() => {
                                Util.settings.set('jailHL_sel', 'highest');
                            }),
                            $('<span>').append(
                                $('<label>').attr('for', 'jailHL_high').text('highest')
                            ),
                            $('<br>'),
                            $('<input>').attr({
                                name: 'jailHL_sel',
                                id: 'jailHL_low',
                                type: 'radio',
                                checked: (jailHL_sel == 'lowest' ? true : false)
                            }).click(() => {
                                Util.settings.set('jailHL_sel', 'lowest');
                            }),
                            $('<span>').append(
                                $('<label>').attr('for', 'jailHL_low').text('lowest')
                            ),
                            $('<br>'),
                            $('<input>').attr({
                                name: 'jailHL_sel',
                                id: 'jailHL_rand',
                                type: 'radio',
                                checked: (jailHL_sel == 'random' ? true : false)
                            }).click(() => {
                                Util.settings.set('jailHL_sel', 'random');
                            }),
                            $('<span>').append(
                                $('<label>').attr('for', 'jailHL_rand').text('random')
                            )
                        )
                        )
                ),
                $('<tr>').append(
                    $('<td>').attr({ height: '1', bgcolor: 'black' })
                ),
                $('<tr>').append(
                    $('<td>').addClass('tableitem').attr('align', 'center').css('text-align', 'center').text('Scumbag List')
                ),
                $('<tr>').append(
                    $('<td>').attr({ height: '1', bgcolor: 'black' })
                ),
                $('<tr>').append(
                    $('<td>').attr('align', 'center').css('text-align', 'center').text(
                        'There is this one scumbag you wouldn\'t want to bust even if their life depended on it? Just add them here!'
                    ).append(
                        $('<br>'),
                        nobust_div,
                        $('<span>').text('You can add family names too, by the way.')
                        )
                ),
                $('<tr>').append(
                    $('<td>').attr({ height: '1', bgcolor: 'black' })
                ),
                $('<tr>').append(
                    $('<td>').addClass('tableitem').attr('align', 'center').css('text-align', 'center').text('Best Run Calculator - Autofiller')
                ),
                $('<tr>').append(
                    $('<td>').attr({ height: '1', bgcolor: 'black' })
                ),
                $('<tr>').append(
                    $('<td>').attr('align', 'center').css('text-align', 'center').text(
                        'Settings for the Best Run Calculator are visible on the Smuggling page'
                    ).append(
                        $('<br>'),
                        $('<br>'),
                        $('<span>').text('You can choose between a movable window or showing the options on top of the page.'),
                        $('<br>'),
                        $('<div>').addClass('notify').append(
                            $('<input>').attr({
                                type: 'radio',
                                id: 'AF_Floating',
                                name: 'AF_Position',
                                checked: af_position == 'floating'
                            }).click(() => {
                                Util.settings.set('sets', 'af_position', 'floating');
                            }),
                            $('<label>').attr({ for: 'AF_Floating' }).text('Show settings in movable window'),
                            $('<br>'),
                            $('<input>').attr({
                                type: 'radio',
                                id: 'AF_Static',
                                name: 'AF_Position',
                                checked: af_position == 'static'
                            }).click(() => {
                                Util.settings.set('af_position', 'static');
                            }),
                            $('<label>').attr({ for: 'AF_Static' }).text('Show settings on top of the page')
                        ),
                        $('<br>'),
                        $('<br>'),
                        $('<span>').text('If the movable window is gone, click here to reset its position.'),
                        $('<br>'),
                        $('<button>').text('Clear').click(() => {
                            if (confirm('Are you sure?')) {
                                Util.storage.set('AFtop', '225');
                                Util.storage.set('AFleft', '300');
                            }
                        })
                        )
                ),
                $('<tr>').append(
                    $('<td>').attr({ height: '1', bgcolor: 'black' })
                ),
                $('<tr>').append(
                    $('<td>').addClass('tableitem').attr('align', 'center').css('text-align', 'center').text('Reset data')
                ),
                $('<tr>').append(
                    $('<td>').attr({ height: '1', bgcolor: 'black' })
                ),
                $('<tr>').append(
                    $('<td>').attr('align', 'center').css('text-align', 'center').text(
                        'Manually reset all saved OB data.'
                    ).append(
                        $('<br>'),
                        $('<span>').text('Click the button to clear all settings, WARNING this resets all OB data'),
                        $('<br>'),
                        $('<button>').text('Clear').click(() => {
                            if (confirm('Are you sure you want to clear ALL OB data?')) {
                                localStorage.clear();
                                alert('Please reload Omerta for the changes to take effect.');
                            }
                        })
                        )
                ),
                $('<tr>').append(
                    $('<td>').attr({ height: '1', bgcolor: 'black' })
                ),
                $('<tr>').append(
                    $('<td>').addClass('tableitem').attr('align', 'center').css('text-align', 'center').text('Report a Bug')
                ),
                $('<tr>').append(
                    $('<td>').attr({ height: '1', bgcolor: 'black' })
                ),
                $('<tr>').append(
                    $('<td>').attr('align', 'center').css('text-align', 'center').text(
                        'Please report any bugs you might encounter on IRC in #beyond or post a comment '
                    ).append(
                        $('<a>').text('here.').css('text-decoration', 'underline').click(() => {
                            window.open('https://omertabeyond.net/');
                        }),
                        $('<br>'),
                        $('<span>').html('To help us track down the issue, please include the following code:'),
                        $('<br>'),
                        $('<strong>').text(localStorage.getItem('ob_uid'))
                        )
                )
            )
            ); // here we can build prefs page

        if (!('Notification' in window)) {
            $('#Authmsg', prefs_page).text('Your browser doesn\'t support notifications');
            $('#btnNotification', prefs_page).remove();
        } else if (Notification.permission == 'granted') {
            $('#Authmsg', prefs_page).text('Authorization for notification is: ').append(
                $('<span>').text('granted').css({
                    'font-weight': 'bold'
                })
            );
            $('#btnNotification', prefs_page).remove();
        }

        return prefs_page;
    }

    const Preferences = {
        page: GetPrefPage
    };

    return Preferences;
})(jQuery);

export default Preferences;
