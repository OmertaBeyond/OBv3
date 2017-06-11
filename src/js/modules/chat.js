import Util from './Util';

const Chat = (($) => {
    let chatObserver;
    let firstMessageTs;

    function sendHighlight(node) {
        const isBufferedMessage = firstMessageTs >= $.now() - 500;
        const sender = $(node).find('.msg-author');
        const messageText = $(node).find('.msg-content');
        if (!isBufferedMessage && $(node).hasClass('msg-hilight')) {
            Util.notification.send('highlight', 'Your name was mentioned in the chat', sender.text() + messageText.text(), 'Chat', null, GM_getResourceURL('red-star'));
        }
    }

    const Chat = {
        init: () => {
            chatObserver = new MutationObserver((mutations) => {
                mutations.forEach((mutation) => {
                    for (let i = 0; i < mutation.addedNodes.length; i++) {
                        const node = mutation.addedNodes[i];
                        if (node.nodeType == 1 && !node.hasAttribute('data-beyond-fired') && $(node).hasClass('user-message-text')) {
                            node.setAttribute('data-beyond-fired', true);
                            if (typeof firstMessageTs == 'undefined') {
                                firstMessageTs = $.now();
                            }

                            sendHighlight(node);
                        }
                    }
                });
            });
            if (document.getElementById('omerta_chat') !== null) {
                chatObserver.observe(document.getElementById('omerta_chat'), {
                    attributes: false,
                    childList: true,
                    subtree: true,
                    characterData: false
                });
            }
        }
    };

    return Chat;
})(jQuery);

export default Chat;
