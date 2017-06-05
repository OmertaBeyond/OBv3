import Util from './Util';
import Marquee from './modules/marquee';
import BRC from './modules/brc';
import Preferences from './ob/preferences';
import Jail from './pages/jail';

const gamePages = [];
gamePages.push(BRC);
gamePages.push(Jail);

if (document.getElementById('game_container') !== null) {
	const observer = new MutationObserver((mutations) => {
		mutations.forEach((mutation) => {
			for (let i = 0; i < mutation.addedNodes.length; i++) {
				const node = mutation.addedNodes[i];
				if (node.nodeType == 1 && !node.hasAttribute('data-beyond-fired')) {
					node.setAttribute('data-beyond-fired', true);

					// unbind events
					if (!Util.url.onPage('garage.php') && !Util.url.onPage('module=Cars')) {
						$(window).unbind('scroll');
					}
					if (!Util.url.onPage('action=showMsg')) {
						$(window).unbind('keydown');
					}
					// Disable nickreader when going to other page
					if ($('#shft').length > 0) {
						$('#shft').remove();
					}
					if ($('#proc').length > 0) {
						$('#proc').remove();
					}
					if ($('.NRinfo').length > 0) {
						$('.NRinfo').remove();
					}
					if ($('#NRstatus').length > 0) {
						$('#NRstatus').remove();
					}

					// hitting the click limit means the page won't contain what we expect. ignore it.
					if ($(node).filter(':contains("You reached your click limit."), :contains("Je hebt jouw kliklimiet bereikt.")').length > 0) {
						return;
					}

					gamePages.forEach((p) => {
						p.OnNodeChange(node.tagName.toLowerCase(), node.getAttribute('id'), node.className, window.location.hash);
					});
				}
			}
		});
	});

	observer.observe(document.getElementById('game_container'), {
		attributes: false,
		childList: true,
		characterData: false
	});
}

$('#game_container').one('DOMNodeInserted', () => {
	$('.top-nav').append(
		$('<li>').addClass('pull-left').css({
			width: '40%',
			padding: '0',
			display: 'table',
			lineHeight: '14px'
		}).append(
			$('<div>').attr('id', 'marquee').css({
				display: 'table-cell',
				verticalAlign: 'middle'
			}),
			$('<div>').attr('id', 'hiddenbox').addClass('marqueebox')
			)
	);

	Marquee.build();

	let city = Util.storage.getPow('bninfo', 2, -1);
	if (city > 0) {
		city = Util.omerta.cities[city - 4];
		$(`#${city}`).css('font-style', 'italic');
	}

	const prefs_div = $('<div>').addClass('sm-circle-bg ob-prefs-bg').append(
		$('<span>').addClass('sm-circle sm-health').append(
			$('<img>').attr({
				src: GM_getResourceURL('favicon'),
				title: 'Omerta Beyond Preferences'
			}).addClass('ob-prefs-img')
		).hover(
			function () {
				$(this).css('background', '#000FF0');
			},
			function () {
				$(this).css('background', '#FFF');
			}
			)
	).click(() => {
		$('span.title-main').text('Omerta Beyond Preferences');
		$('#game_container').empty();
		$('#game_wrapper_container').css('height', '99%');
		$('#game_container').append(Preferences.page());
	});
	if ($('.ob-prefs-bg').length === 0) {
		$('div.omerta-widget-avatar-body').append(prefs_div);
	}
});

GM_addStyle(GM_getResourceText('css'));
