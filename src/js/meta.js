// ==UserScript==
// @name                     Omerta Beyond
// @id                       Omerta Beyond
// @version                  3.0.0-dev
// @date                     20-05-2017
// @description              Omerta Beyond 3.0.0 (We're back to reclaim the throne ;))
// @homepageURL              https://www.omertabeyond.net/
// @namespace                v5.omertabeyond.com
// @updateURL                https://raw.githubusercontent.com/OmertaBeyond/OBv3/master/dist/ob.meta.js
// @supportURL               https://github.com/OmertaBeyond/OBv3/issues
// @icon                     https://raw.githubusercontent.com/OmertaBeyond/OBv3/master/dist/images/logo.small.png
// @screenshot               https://raw.githubusercontent.com/OmertaBeyond/OBv3/master/dist/images/logo.small.png
// @author                   OBDev Team <info@omertabeyond.com>
// @author                   vBm <vbm@omertabeyond.com>
// @author                   Dopedog <dopedog@omertabeyond.com>
// @author                   Rix <rix@omertabeyond.com>
// @author                   MrWhite <mrwhite@omertabeyond.com>
// @author                   MurderInc <murderinc@omertabeyond.com>
// @author                   Sebbe <sebbe@omertabeyond.com>
// @author                   Brainscrewer <brainscrewer@omertabeyond.com>
// @author                   semitom <tom.gankema@gmail.com>
// @license                  GNU General Public License v3
// @contributionURL          https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=sbanks%40omertabeyond%2ecom&lc=GB&item_name=Omerta%20Beyond&currency_code=EUR&bn=PP%2dDonationsBF%3abtn_donateCC_LG%2egif%3aNonHosted
// @contributionAmount       €3.00
// @encoding                 UTF-8
// @priority                 1
// @require                  https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js
// @require                  https://ajax.googleapis.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.js
// @require                  https://cdnjs.cloudflare.com/ajax/libs/howler/2.0.3/howler.min.js
// @resource    css          https://raw.githubusercontent.com/OmertaBeyond/OBv2/master/scripts/beyond.css
// @resource    favicon      https://raw.githubusercontent.com/OmertaBeyond/OBv2/master/images/favicon.png
// @resource    logo         https://raw.githubusercontent.com/OmertaBeyond/OBv2/master/images/logo.png
// @resource    logo-old     https://raw.githubusercontent.com/OmertaBeyond/OBv2/master/images/logo-old.png
// @resource    prev         https://raw.githubusercontent.com/OmertaBeyond/OBv2/master/images/prev.png
// @resource    next         https://raw.githubusercontent.com/OmertaBeyond/OBv2/master/images/next.png
// @resource    reply        https://raw.githubusercontent.com/OmertaBeyond/OBv2/master/images/reply.png
// @resource    delete       https://raw.githubusercontent.com/OmertaBeyond/OBv2/master/images/delete.png
// @resource    log          https://raw.githubusercontent.com/OmertaBeyond/OBv2/master/images/changelog.png
// @resource    rip          https://raw.githubusercontent.com/OmertaBeyond/OBv2/master/images/rip.png
// @resource    red-star     https://raw.githubusercontent.com/OmertaBeyond/OBv2/master/images/red-star.png
// @resource    NRicon       https://raw.githubusercontent.com/OmertaBeyond/OBv2/master/images/magnifier.png
// @resource    loadingicon  https://raw.githubusercontent.com/OmertaBeyond/OBv2/master/images/loading.png
// @include                  http://*.barafranca.com/*
// @include                  https://*.barafranca.com/*
// @include                  http://barafranca.com/*
// @include                  https://barafranca.com/*
// @include                  http://*.barafranca.nl/*
// @include                  https://*.barafranca.nl/*
// @include                  http://barafranca.nl/*
// @include                  https://barafranca.nl/*
// @include                  http://*.barafranca.us/*
// @include                  https://*.barafranca.us/*
// @include                  http://barafranca.us/*
// @include                  https://barafranca.us/*
// @include                  http://*.barafranca.gen.tr/*
// @include                  https://*.barafranca.gen.tr/*
// @include                  http://barafranca.gen.tr/*
// @include                  https://barafranca.gen.tr/*
// @include                  http://omerta.com.tr/*
// @include                  https://omerta.com.tr/*
// @include                  http://*.omerta.com.tr/*
// @include                  https://*.omerta.com.tr/*
// @include                  http://*.omerta.dm/*
// @include                  https://*.omerta.dm/*
// @include                  http://omerta.dm/*
// @include                  https://omerta.dm/*
// @include                  http://*.omerta.pt/*
// @include                  https://*.omerta.pt/*
// @include                  http://omerta.pt/*
// @include                  https://omerta.pt/*
// @include                  https://*.omerta.land*
// @exclude                  http://*/game-register.php*
// @exclude                  https://*/game-register.php*
// @grant                    GM_getResourceText
// @grant                    GM_getResourceURL
// @grant                    GM_addStyle
// @grant                    GM_xmlhttpRequest
// @grant                    unsafeWindow
// @connect                  gm.omertabeyond.net
// @connect                  self
// ==/UserScript==
// ==OpenUserJS==
// @author                   vBm
// @collaborator             Gwildor
// @collaborator             MurderInc
// @collaborator             Sebbe
// @collaborator             Brainscrewer
// @collaborator             Ivdbroek85
// ==/OpenUserJS==
