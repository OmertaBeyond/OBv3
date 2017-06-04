import Util from './Util';

const Marquee = (($) => {
    let prevPrices = [];
    let firstTimePrice = true;

    function buildMarquee() {
		setTimeout(() => {
			GM_xmlhttpRequest({
				method: 'GET',
				url: '/BeO/webroot/index.php?module=API&action=smuggling_prices',
				onload: (resp) => {
					const parser = new DOMParser();
					const dom = parser.parseFromString(resp.responseText, 'application/xml');

					function getPrice(drug, city) {
						return dom.getElementsByTagName(drug)[city].textContent;
					}

					function refreshMarquee(h, m) {
						h = (m >= 31 ? h + 1 : h);
						m = (m >= 31 ? 1 : 31);
						const marQd = new Date();
						marQd.setHours(h);
						marQd.setMinutes(m);
						marQd.setSeconds(0);
						marQd.setMilliseconds(0);
						return (marQd.getTime() - unsafeWindow.omerta.Clock.getTime());
					}

					const p = [];
					const q = [];
					let pricesChanged = false;

					for (let i = 0; i <= 7; i++) {
						p[i] = getPrice('cocaine', i);
						q[i] = p[i];
						if ((prevPrices === undefined || prevPrices[i] === undefined) || prevPrices[i] != p[i]) {
							pricesChanged = true;
						}
					}

					if (pricesChanged) {
						prevPrices = JSON.parse(JSON.stringify(q));
					} else {
						setTimeout(buildMarquee, 30000);
						return;
					}

					const max = p.sort((a, b) => {
						return b - a;
					})[0];
					const min = p[(p.length - 1)];

					let highCity = '';
					let highCityPrice = 0;
					let lowCity = '';
					let lowCityPrice = 0;
					let i = 0;
					q.forEach(($n) => {
						if ($n == min) {
							q[i] = `<span style="color:#00ff00;">${$n}</span>`;
							lowCity = Util.omerta.cities[i];
							lowCityPrice = $n;
						}
						if ($n == max) {
							q[i] = `<span style="color:#ff5353;">${$n}</span>`;
							highCity = Util.omerta.cities[i];
							highCityPrice = $n;
						}
						i++;
					});

					if (!firstTimePrice) {
						Util.notification.send('bn', 'B/N prices changed', `High city: ${highCity} (${highCityPrice})\nLow city: ${lowCity} (${lowCityPrice})`, 'Booze', './BeO/webroot/index.php?module=Travel', GM_getResourceURL('red-star'));
					}

					firstTimePrice = false;

					let time = dom.getElementsByTagName('humantime')[0].textContent;
					time = time.split(' ')[0];
					time = time.split(':');
					time = (time[1] < 30) ? `${time[0]}:00 OT` : `${time[0]}:30 OT`;

					function hovermenu(city) {
						const hoverStyle = {
							display: 'block',
							position: 'fixed',
							left: $('#marquee').offset().left,
							top: '42px',
							zIndex: '102',
							opacity: 0.8,
							backgroundColor: 'black',
							color: '#EEE',
							border: 'none',
							padding: '5px 15px 5px 15px'
						};

						$('#hiddenbox').css(hoverStyle).html(`Morphine: ${getPrice('morphine', city)} | Heroin: ${getPrice('heroin', city)} | Opium: ${getPrice('opium', city)} | Whiskey: ${getPrice('whiskey', city)} | Amaretto: ${getPrice('amaretto', city)} | Rum: ${getPrice('rum', city)}`);
					}

					function flytolink(city, priceStr) {
						const link = $('<a>').attr({
							id: Util.omerta.cities[city],
							href: '#'
						}).css({
							color: '#FFF',
							fontSize: '10px'
						}).click(() => {
							unsafeWindow.omerta.GUI.container.loadPage(`./BeO/webroot/index.php?module=Travel&action=FetchInfo&CityId=${((city == 'nul') ? 0 : city)}`);
						});

						if (city == 5 || city == 6 || city == 7) {
							link.mouseover(function (event) {
								hovermenu(city, event.clientX - 560);
								$(this).css('textDecoration', 'underline');
							});
						} else if (city === 0 || city == 1 || city == 2) {
							link.mouseover(function (event) {
								hovermenu(city, event.clientX + 25);
								$(this).css('textDecoration', 'underline');
							});
						} else {
							link.mouseover(function (event) {
								hovermenu(city, event.clientX - 200);
								$(this).css('textDecoration', 'underline');
							});
						}
						link.mouseout(function () {
							$('#hiddenbox').css('display', 'none');
							$(this).css('textDecoration', 'none');
						});
						link.html(priceStr);

						return link;
					}

					const span = $('<span>').append(
						$('<span>').text(`${time}: `).css('font-size', '10px')
					);

					i = 0;
					p.forEach(() => {
						span.css('color', '#FFF');
						span.append(flytolink(i, `${Util.omerta.cities[i]}:${q[i]}`), $('<span>').text(' | '));
						i++;
					});

					span.append(
						$('<a>').attr({
							href: 'prices.php'
						}).text('All Prices').css({
							color: '#FFF',
							fontSize: '10px'
						}).hover(function () {
							$(this).css('textDecoration', 'underline');
						}, function () {
							$(this).css('textDecoration', 'none');
						})
					);

					$('#marquee').html(span);
					setTimeout(buildMarquee, refreshMarquee(new Date().getHours(), new Date().getMinutes()));
				}
			});
		});
	}

    const Marquee = {
        build: buildMarquee
    };

    return Marquee;
})(jQuery);

export default Marquee;
