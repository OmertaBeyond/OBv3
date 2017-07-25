import Util from './Util';

const Service = (() => {

    function checkHealth() {
        const serviceData = unsafeWindow.omerta.services.account.data;
        const newHealth = parseFloat(serviceData.progressbars.health);
        const oldHealth = parseFloat(Util.storage.get('serviceHealth', 0));
        if (oldHealth > 0 && (oldHealth > newHealth)) {
            const healthText = `You lost ${(oldHealth - newHealth)} health!`;
            const healthTitle = `Health (${Util.version})`;
            Util.notification.send('health', healthTitle, healthText, 'health', './BeO/webroot/index.php?module=Bloodbank', GM_getResourceURL('red-star'));
        }

        Util.storage.set('serviceHealth', newHealth);
    }

    function checkForNewMessages() {
        const serviceData = unsafeWindow.omerta.services.account.data;
        if (serviceData.messages.inbox.length > 0) {
            const lastMessage = parseInt(Util.storage.get('lastMessage', 0), 10);

            let totalMessages = 0;
            $.each(serviceData.messages.inbox, (i, val) => {
                const id = parseInt(val.id, 10);
                if (lastMessage === id) {
                    return false;
                }
                totalMessages += 1;
            });

            if (totalMessages !== 0) {
                const msgId = parseInt(serviceData.messages.inbox[0].id, 10);
                let msgTitle = '';
                let msgText = '';
                let callbackUrl = './BeO/webroot/index.php?module=Mail&action=showMsg&iMsgId=';

                Util.storage.set('lastMessage', msgId);
                if (totalMessages === 1) {
                    msgText = `Message: ${serviceData.messages.inbox[0].msg.replace(/<br \/>/g, '')}`;
                    msgTitle = `New message from ${serviceData.messages.inbox[0].frm}: ${serviceData.messages.inbox[0].sbj} (${Util.version})`;
                    callbackUrl = callbackUrl + msgId;
                } else {
                    msgText = `You have got ${totalMessages} new messages`;
                    msgTitle = `New messages (${Util.version})`;
                    callbackUrl = './BeO/webroot/index.php?module=Mail&action=inbox';
                }

                Util.notification.send('messages', msgTitle, msgText, 'Mail', callbackUrl, GM_getResourceURL('red-star'));

            }
        }
    }

    function checkForNewAlerts() {
        const serviceData = unsafeWindow.omerta.services.account.data;
        if (serviceData.messages.alert.length > 0) {
            // msgId -1 is a friend request
            const lastAlert = parseInt(Util.storage.get('lastAlert', 0), 10);
            let totalAlerts = 0;
            $.each(serviceData.messages.alert, (i, val) => {
                const id = (val.id ? parseInt(val.id, 10) : -1);
                if (lastAlert === id) {
                    return false;
                }
                totalAlerts += 1;
            });

            if (totalAlerts !== 0) {
                const msgId = (serviceData.messages.alert[0].id ? parseInt(serviceData.messages.alert[0].id, 10) : -1);
                let alertTitle = '';
                let alertText = '';
                let callbackUrl = './BeO/webroot/index.php?module=Mail&action=showMsg&iMsgId=';
                Util.storage.set('lastAlert', msgId);
                if (totalAlerts === 1) {
                    // If it's a friend request, it has no msg or id
                    if (serviceData.messages.alert[0].sbj !== 'Friend Request(s)') {
                        alertText = `Alert: ${serviceData.messages.alert[0].msg.replace(/<br \/>/g, '')}`;
                        alertTitle = `Alert! ${serviceData.messages.alert[0].sbj} (${Util.version})`;
                        callbackUrl = callbackUrl + msgId;
                    } else {
                        alertText = 'Alert: You got a new friend request!';
                        alertTitle = `Alert! ${serviceData.messages.alert[0].sbj} (${Util.version})`;
                        callbackUrl = serviceData.messages.alert[0].link;
                    }
                } else {
                    alertText = `You have got ${totalAlerts} new alerts`;
                    alertTitle = `Alert! (${Util.version})`;
                    callbackUrl = './BeO/webroot/index.php?module=Mail&action=inbox';
                }

                Util.notification.send('alerts', alertTitle, alertText, 'alert', callbackUrl, GM_getResourceURL('red-star'));
            }
        }
    }

    function ScheduleNotifications() {
        Util.notification.schedule(
                'gta',
                $('[data-cooldown="car"] input').attr('data-knob-timeend'),
                `Nick a car (${Util.version})`,
                'You can nick a car',
                'Car',
                '/?module=Cars',
                GM_getResourceURL('red-star')
            );

            Util.notification.schedule(
                'crime',
                $('[data-cooldown="crime"] input').attr('data-knob-timeend'),
                `Crime (${Util.version})`,
                'You can do a crime',
                'Crime',
                '/?module=Crimes',
                GM_getResourceURL('red-star')
            );

            Util.notification.schedule(
                'travel',
                $('[data-cooldown="travel"] input').attr('data-knob-timeend'),
                `Travel (${Util.version})`,
                'You can travel',
                'Travel',
                '/?module=Travel',
                GM_getResourceURL('red-star')
            );

            Util.notification.schedule(
                'bullets',
                $('[data-cooldown="bullets"] input').attr('data-knob-timeend'),
                `Bullets (${Util.version})`,
                'You can buy bullets',
                'Bullets',
                '/bullets2.php',
                GM_getResourceURL('red-star')
            );
    }


    const Service = {
        start: () => {
            setInterval(() => {
                checkHealth();
                checkForNewMessages();
                checkForNewAlerts();
                ScheduleNotifications();
            }, 5000);
        }
    };

    return Service;
})();

export default Service;
