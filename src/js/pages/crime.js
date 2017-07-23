import Util from './Util';

const CrimePage = (($) => {
    const CrimePage = {
        OnNodeChange: (nodeName, nodeId) => {
            if (Util.url.onPage('module=Crimes') && nodeId == 'module_Crimes') {
                Util.notification.remove('crime');

                // Grab money stolen
                const moneyStolenText = $('#game_container').text().trim();
                if (moneyStolenText.match(/\$ ([,\d]+)/) !== null) {
                    const oldValue = parseInt(Util.storage.get('crimeMoney', 0), 10);
                    const sum = parseInt(moneyStolenText.match(/\$ ([,\d]+)/)[1].replace(',', ''), 10);
                    Util.storage.set('crimeMoney', (sum + oldValue));
                    let totalSuccess = parseInt(Util.storage.get('crimeSuccess', 0), 10);
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
})(jQuery);

export default CrimePage;

