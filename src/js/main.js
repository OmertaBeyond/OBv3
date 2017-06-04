import Util from './Util';

const gamePages = [];
// gamePages.push(Vote);

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
