import Util from './Util';

const UserInformation = (($) => {
    // define max b/n judging by rank
    const maxBooze = [1, 2, 2, 5, 7, 10, 15, 20, 25, 30, 35, 40, 45, 50, 60, 70, 70, 70];
    const maxNarcs = [0, 0, 0, 1, 2, 4, 5, 7, 8, 10, 11, 13, 14, 16, 17, 20, 20, 20];

    function onInformationPage() {
        updateUserInformation();

        if (willIsDead()) {
            $('div.gangster-info-body li:eq(2) a span').append($('<span>').addClass('red').text(' | Dead!'));
        }

        const $accountStartElement = $('div.gangster-info-body li:eq(5) a span');
        const howOldAccountText = howOldAccount();
        let previousText = $accountStartElement.html();
        $accountStartElement.html(howOldAccountText).click(() => {
            const currentText = $accountStartElement.html();
            $accountStartElement.html(previousText);
            previousText = currentText;
        });
    }

    function willIsDead() {
        const willName = unsafeWindow.omerta.character.info.testament();
        if (willName !== '') {

            const willTs = Util.storage.get('willTimestamp', 0);
            const checkWillTs = $.now() - (1000 * 10 * 60);
            if (willTs <= checkWillTs) {
                checkUserAlive(willName, (isAlive) => {
                    Util.storage.set('willTimestamp', $.now());
                    if (!isAlive) {
                        Util.storage.set('deadWillName', willName);
                        return true;
                    }

                    return false;
                });
            } else {
                const deadWillName = Util.storage.get('deadWillName');
                if (deadWillName == willName) {
                    return true;
                }

                return false;
            }
        }

        return false;
    }

    function howOldAccount() {
        const startDate = unsafeWindow.omerta.character.info.startdate();
        const diff = Math.abs(Date.now() - startDate.getTime());
        const diffDays = Math.ceil(diff / (1000 * 3600 * 24));
        const startDay = startDate.getDate() >= 10 ? startDate.getDate() : `0${startDate.getDate()}`;
        const startMonth = startDate.getMonth() + 1 >= 10 ? (startDate.getMonth() + 1) : `0${(startDate.getMonth() + 1)}`;
        return `${startDay}-${startMonth}-${startDate.getFullYear()} (${(diffDays - 1)} days old)`;
    }

    /**
     * Checks if the user is alive
     * @param  {[String]}  username
     * @return {Boolean}
     */
    function checkUserAlive(username, callback) {
        $.getJSON(`${Util.beyond.page.api}/domains/${Util.version}/versions/latest/users/${username}`, (data) => {
            callback(data['alive']);
        });
    }

    function updateUserInformation() {
        let ride;

        const nick = unsafeWindow.omerta.character.info.name();
        const rank = unsafeWindow.omerta.character.progress.rank();
        const bloodType = unsafeWindow.omerta.character.info.bloodtype();
        const city = unsafeWindow.omerta.character.game.city();
        const possessions = unsafeWindow.omerta.modules.UserInformation.data.possessions;
        if (possessions) {
            $.each(possessions, (i) => {
                if (possessions[i].type == 'plane') {
                    ride = possessions[i].name_owned;
                }
            });
        }

        Util.storage.set('bloodType', bloodType);
        Util.storage.set('nick', nick);

        let booze = 0;
        let narc = 0;

        for (let i = 0; i <= 17; i++) {
            if (Util.omerta.ranks[i] == rank) {
                booze = maxBooze[i];
                narc = maxNarcs[i];
                break;
            }
        }

        Util.storage.setPow('bninfo', 0, narc);
        Util.storage.setPow('bninfo', 1, booze);

        let cityCode = 0;

        // parse city to ID
        for (let i = 0; i < 8; i++) {
            if (city == Util.omerta.cities[i]) {
                cityCode = i + 4;
                break;
            }
        }

        Util.storage.setPow('bninfo', 2, cityCode); // save

        let plane = 0;
        // parse plane to ID
        for (let i = 0; i <= 5; i++) {
            if (Util.omerta.rides[i] == ride) {
                plane = [0, 0, 1, 2, 3, 4][i];
                break;
            }
        }

        Util.storage.setPow('bninfo', 3, plane); // save
    }

    const UserInformation = {
        OnNodeChange: () => {
            if (Util.url.onPage('module=UserInformation')) {
                onInformationPage();
            }
        }
    };

    return UserInformation;
})(jQuery);

export default UserInformation;
