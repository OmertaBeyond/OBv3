import Util from './Util';

const CarPage = (($) => {
    const CarPage = {
        OnNodeChange: (nodeName, nodeId, nodeClass) => {
            if (Util.url.onPage('module=Cars') && nodeId == 'module_Cars') {
                Util.notification.remove('gta');

                // Grab value of stolen car (does not include cars stolen by lackeys)
                const carValText = $('#game_container').text().trim();
                if (carValText.match(/\$ ([,\d]+)/) !== null) {
                    const oldValue = parseInt(Util.storage.get('carMoney', 0), 10);
                    const sum = parseInt(carValText.match(/\$ ([,\d]+)/)[1].replace(',', ''), 10);
                    Util.storage.set('carMoney', (sum + oldValue));
                    let totalSuccess = parseInt(Util.storage.get('carSuccess', 0), 10);
                    ++totalSuccess;
                    Util.storage.set('carSuccess', totalSuccess);
                }

                let maxValue = 0;
                let maxIndex = 3;
                $('#nick-car-choices .head h4').each(function (i) {
                    if (parseInt($(this).text().replace('%', ''), 10) > maxValue) {
                        maxValue = parseInt($(this).text().replace('%', ''), 10);
                        maxIndex = i;
                    }
                });
                $(`#nick-car-choices .popup-place-wrapper:eq(${maxIndex})`).addClass('active');
                $(`#nick-car-choices button:eq(${maxIndex})`).focus();
            }

            if (Util.url.onPage('module=Cars') && nodeClass == 'otable widetable') {
                const itemspath = 'table[data-info="items"] > tbody > tr[data-id]';
                // Loop cars
                let x = 0;
                let totalCarval = 0;
                $(itemspath).each(() => {
                    // grab value
                    const carVal = parseInt($(`${itemspath}:eq(${x}) > td:eq(4)`).text().replace(',', '').replace('$', ''), 10);
                    totalCarval += carVal;
                    ++x;
                });
                // Show total value
                $('div.oheader:eq(2)').text($(itemspath).length + $('div.oheader:eq(2)').text()).append(
                    $('<span>').text(`total value: $${Util.number.commafy(totalCarval)}`)
                );
            }
        }
    };

    return CarPage;
})(jQuery);

export default CarPage;

