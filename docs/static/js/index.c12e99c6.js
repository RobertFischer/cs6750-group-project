(()=>{"use strict";var e={1580:function(e,t,s){var o,i=s(85893),a=s(67294),n=s(20745),r=s(27412),l=s(5003),c=s.n(l),d=s(96486),u=s(44537),p=s(88758),h=s.n(p);let m=s.p+"static/media/500-milliseconds-of-silence.8a07b2a8.mp3",f=new Map;function g(e){if(!e)return e;try{return h()(e)||e}catch(t){return console.warn("Error converting from HTML to Markdown",{str:e,e:t}),e}}class b{constructor(e){var t,s,o,i,a;if((0,r._)(this,"mp3Url",void 0),(0,r._)(this,"title",void 0),(0,r._)(this,"pubDate",void 0),(0,r._)(this,"imageUrl",void 0),(0,r._)(this,"summary",void 0),(0,r._)(this,"key",void 0),!e)throw console.error("No RSS item provided",e),Error("No RSS item provided");console.debug(e),this.mp3Url=(null==(t=e.enclosure)?void 0:t.url)||m,this.title=e.title||null,this.pubDate=e.pubDate?(0,u.sG)(e.pubDate):null,this.imageUrl=(null==(s=e.itunes)?void 0:s.image)||null,this.summary=g(e.content||e.contentSnippet||(null==(o=e.itunes)?void 0:o.summary)||(null==(i=e.itunes)?void 0:i.subtitle)||null),this.key=`${this.mp3Url} ${null==(a=this.pubDate)?void 0:a.toISOString()} ${this.title}`}}class v{constructor(e,t){var s,o,i,a,n,l,c;if((0,r._)(this,"title",void 0),(0,r._)(this,"feedUrl",void 0),(0,r._)(this,"imageUrl",void 0),(0,r._)(this,"description",void 0),(0,r._)(this,"oldestEpisode",void 0),(0,r._)(this,"sampleEpisodes",void 0),(0,r._)(this,"mostRecentEpisode",void 0),!t)throw console.error("No RSS provided",t),Error("No RSS provided");console.debug(t),this.title=t.title||(null==(o=t.itunes)||null==(s=o.owner)?void 0:s.name)||null,this.feedUrl=t.feedUrl||(null==(i=t.paginationLinks)?void 0:i.self)||e,this.imageUrl=(null==(a=t.itunes)?void 0:a.image)||(null==(n=t.image)?void 0:n.url)||null,this.description=g(t.description||(null==(l=t.itunes)?void 0:l.summary)||(null==(c=t.itunes)?void 0:c.subtitle)||null);let u=(0,d.sortBy)((0,d.map)(t.items||[],e=>new b(e)),"pubDate");this.oldestEpisode=u.shift()||null,this.mostRecentEpisode=u.pop()||null,this.sampleEpisodes=(0,d.sortBy)((0,d.compact)((0,d.shuffle)(u).slice(0,3)),"pubDate")}}function y(e){let[t,s]=(0,a.useState)("Loading");return(0,a.useEffect)(()=>{let t=f.get(e);if(t)return void s(t);s("Loading"),new(c())().parseURL(e).then(t=>{let o=new v(e,t);f.set(e,o),s(o)}).catch(t=>{console.error("Error parsing RSS feed",{feedUrl:e,error:t}),s("Error")})},[e]),t}let x=(0,d.shuffle)((0,d.uniq)(["https://anchor.fm/s/ea4895dc/podcast/rss","https://anchor.fm/s/ff612a4c/podcast/rss","https://feed.podbean.com/themagicianswife/feed.xml","https://feeds.buzzsprout.com/1101152.rss","https://feeds.buzzsprout.com/1411126.rss","https://feeds.megaphone.fm/ADV8582947768","https://feeds.megaphone.fm/ARML1766556837","https://feeds.megaphone.fm/blank-check","https://feeds.megaphone.fm/craigfinnpod","https://feeds.megaphone.fm/decoderring","https://feeds.megaphone.fm/SBP3707703183","https://feeds.megaphone.fm/sciencevs","https://feeds.megaphone.fm/thebestshow","https://feeds.megaphone.fm/YMRT7068253588","https://feeds.redcircle.com/7655b7ec-dc57-47c9-ab96-1a8fa02f6573","https://feeds.redcircle.com/b78540f3-d05f-4269-bdb3-e22c1aca55ed","https://feeds.simplecast.com/Ao0C24M8","https://feeds.simplecast.com/BqbsxVfO","https://feeds.simplecast.com/byb4nhvN","https://feeds.simplecast.com/FxPyOlup","https://feeds.simplecast.com/l2i9YnTd","https://feeds.simplecast.com/LDNgBXht","https://feeds.simplecast.com/q8x9cVws","https://feeds.simplecast.com/xKJ93w_w","https://feeds.simplecast.com/Y8lFbOT4","https://illrepute.libsyn.com/rss","https://knowledgefight.libsyn.com/rss","https://rss.art19.com/newcomers","https://rss.art19.com/too-scary-didnt-watch","https://tituspodcast.libsyn.com/rss","https://werewolfambulance.libsyn.com/rss","https://www.omnycontent.com/d/playlist/796469f9-ea34-46a2-8776-ad0f015d6beb/eb9aa0b9-9618-418c-88f3-b07c011ee6e9/81371812-755e-4015-9587-b07c011ee71c/podcast.rss","https://www.omnycontent.com/d/playlist/89050f29-3cfb-4513-a5d2-ac79004bd7ba/55c64838-70c7-4576-b4e4-ac800012ec27/05855b96-adce-4eaa-9d54-ac8300634c30/podcast.rss","https://www.omnycontent.com/d/playlist/e73c998e-6e60-432f-8610-ae210140c5b1/0e563f45-9d14-4ce8-8ef0-ae32006cd7e7/0d4cc74d-fff7-4b89-8818-ae32006cd7f0/podcast.rss"]));function j(){let e=x.pop();if(!e)throw Error("No initial podcast URL");return e}let w=j(),N=j();var E=s(19755),S=s.n(E);let P=[];var _=((o={}).Error="Error",o.Loading="Loading",o.Queued="Queued",o.Playing="Playing",o.CanPlay="CanPlay",o);class k{stop(){console.debug("Stopping audio",{url:this.audio.src}),this.audio.pause()}playSample(){if("Loading"===this.state){console.debug("Deferring playing sample because it is loading",{url:this.audio.src}),this.stateChangeHandlers.push(()=>{this.playSample()});return}if("Queued"===this.state||"Playing"===this.state)return void console.debug("Not starting to play sample because it is already playing",{url:this.audio.src});console.debug("Stopping audio before playing sample",{url:this.audio.src}),P.forEach(e=>e.stop()),console.debug("Playing a sample!",{audio:this.audio});let e=this.audio.duration,t=1/8,s=7/8,o=Math.random()*(7/8-1/8)+1/8,i=(()=>{if((0,d.isFinite)(e)){if(e-e*o>60)return e*o;for(let o=s;o>=0;o-=t)if(e-e*o>60)return e*o}return 1})();this.audio.currentTime=i,this.audio.volume=.001,this.audio.play();let a=!1,n=()=>{if(a)return;let e=this.state;"Playing"===e||"Queued"===e?this.stateChangeHandlers.push(n):a=!0};(0,d.defer)(n);let r=e=>setTimeout(()=>{a?console.debug("Aborting function because play has stopped"):e()},200),l=()=>{r(()=>{"Playing"===this.state?(this.audio.volume=Math.min(1,this.audio.volume+.01),console.debug("Increased volume",this.audio.volume)):console.debug("Not increasing volume because of state",this.state),this.audio.volume<1&&l()})},c=()=>{r(()=>{"Playing"===this.state?(this.audio.volume=Math.max(0,this.audio.volume-.01),console.debug("Decreased volume",this.audio.volume)):console.debug("Not decreasing volume because of state",this.state),0<this.audio.volume?c():(a=!0,this.audio.pause())})};l(),setTimeout(c,4e4)}constructor(e){(0,r._)(this,"audio",void 0),(0,r._)(this,"state","Loading"),(0,r._)(this,"stateChangeHandlers",[]),console.debug("Initializing audio controller",{url:e}),this.audio=new Audio(e);let t=t=>()=>{for(console.debug("Audio state change",{url:e,newState:t}),this.state=t;!(0,d.isEmpty)(this.stateChangeHandlers);){let e=this.stateChangeHandlers.pop();e&&(0,d.defer)(e)}},s=S()(this.audio);s.one("canplaythrough",t("CanPlay")),s.on("playing",t("Playing")),s.on("seeking",t("Queued")),s.on("play",t("Queued")),s.on("pause",t("CanPlay")),s.on("ended",t("CanPlay")),s.on("error",s=>{console.error("Audio error",{url:e,event:s}),t("Error")})}}function C(e){let t,s,{audioState:o}=e;switch(o){case _.CanPlay:t="primary",s="play";break;case _.Queued:t="secondary",s="play";break;case _.Playing:t="success",s="play";break;case _.Loading:t="warning",s="cloud-arrow-down";break;case _.Error:t="danger",s="exclamation"}return(0,i.jsx)("i",{className:`fa-solid fa-${s} text-bg-${t}`})}function U(e){let{episode:t}=e,s=function(e){let t=(0,a.useMemo)(()=>new k(e),[e]),{current:s}=(0,a.useRef)(t);return(0,a.useEffect)(()=>(P.push(s),()=>{s.stop(),(0,d.pull)(P,s)}),[e,s]),s}(t.mp3Url),o=function(e){let[t,s]=(0,a.useState)(e.state);return(0,a.useEffect)(()=>{let t=setInterval(()=>{s(e.state)},500);return()=>{clearInterval(t)}},[e]),t}(s);return(0,i.jsx)("li",{className:"list-group-item p-0",children:(0,i.jsxs)("button",{type:"button",onClick:()=>{o===_.CanPlay&&s.playSample()},className:"btn btn-outline-info text-start w-100",children:[(0,i.jsx)(C,{audioState:o}),(0,i.jsx)("span",{className:"ms-2",children:t.title})]})},t.mp3Url)}function O(e){let{podcast:t}=e;return t?"Error"===t?(0,i.jsx)(A,{...e}):"Loading"===t?(0,i.jsx)(L,{...e}):(0,i.jsx)(R,{...e,podcast:t}):(console.warn("No podcast found",{podcast:t}),null)}function R(e){let{podcast:t,position:s,onSelect:o}=e;return(0,i.jsx)("div",{className:"col-12 col-md-10 col-lg-4 col-xl-3",children:(0,i.jsxs)("div",{className:"card",children:[(0,i.jsx)("h4",{className:"card-header",children:"Winner"===s?"Winner!":`Podcast ${s}`}),t.imageUrl&&(0,i.jsx)("img",{src:t.imageUrl,className:"card-img-top ratio ratio-1x1 "}),(0,i.jsxs)("div",{className:"card-body",children:[(0,i.jsx)("h3",{className:"card-title text-body-primary",children:t.title||"[No Title!]"}),(0,i.jsx)("pre",{className:"card-text text-body-secondary ws-pre-line",children:t.description||"[No Description!]"})]}),(0,i.jsxs)("div",{className:"card-body",children:[(0,i.jsx)("h4",{className:"card-title text-body-primary",children:"Sample Episodes"}),(0,i.jsxs)("ul",{className:"list-group list-group-flush",children:[t.oldestEpisode&&(0,i.jsx)(U,{podcast:t,episode:t.oldestEpisode}),t.sampleEpisodes.map(e=>(0,i.jsx)(U,{podcast:t,episode:e},e.key)),t.mostRecentEpisode&&(0,i.jsx)(U,{podcast:t,episode:t.mostRecentEpisode})]})]}),"Winner"!==s&&(0,i.jsx)("div",{className:"card-footer",children:(0,i.jsx)("center",{children:(0,i.jsxs)("button",{type:"button",onClick:o,className:"btn btn-primary btn-lg",children:["Select Podcast ",s]})})})]})})}function A(e){let{position:t}=e;return(0,i.jsx)("div",{className:"col-12 col-md-10 col-lg-4 col-xl-3",children:(0,i.jsxs)("div",{className:"card",children:[(0,i.jsxs)("h4",{className:"card-header",children:["Podcast ",t]}),(0,i.jsx)("div",{className:"card-body",children:(0,i.jsx)("h3",{className:"card-title text-body-primary text-danger-emphasis",children:(0,i.jsx)("center",{children:(0,i.jsx)("i",{className:"fa-solid fa-skull-crossbones fa-fade fa-2xl"})})})})]})})}function L(e){let{position:t}=e;return(0,i.jsx)("div",{className:"col-12 col-md-11 col-lg-4",children:(0,i.jsxs)("div",{className:"card",children:[(0,i.jsxs)("h4",{className:"card-header",children:["Podcast ",t]}),(0,i.jsx)("div",{className:"card-body",children:(0,i.jsx)("h3",{className:"card-title text-body-primary text-warning-emphasis",children:(0,i.jsx)("center",{children:(0,i.jsx)("i",{className:"fa-solid fa-spinner fa-spin-pulse fa-2xl"})})})})]})})}let B=document.getElementById("app");if(!B)throw Error("Could not find the app root");n.createRoot(B).render((0,i.jsx)(a.StrictMode,{children:(0,i.jsx)(function(){let e=function(){let[e,t]=(0,a.useState)(w),[s,o]=(0,a.useState)(N),[i,n]=(0,a.useState)(null),r=y(e),l=y(s);function c(i){let a=x.pop();if(console.info("Selected a podcast",{roundWinner:i,podcastAUrl:e,podcastBUrl:s,nextContender:a}),a)if("A"===i)console.info("Podcast A won; replacing B",{nextContender:a}),o(a);else if("B"===i)console.info("Podcast B won; replacing A",{nextContender:a}),t(a);else throw Error("Unreachable code reached");else console.info("No next contender!  We have a winner!",{roundWinner:i,nextContender:a}),"A"===i?r instanceof v?n(r):console.error("Can't set a winner that is not successfully loaded"):"B"===i&&(l instanceof v?n(l):console.error("Can't set a winner that is not successfully loaded"))}return"Error"===r&&"Error"===l&&(0,d.defer)(c,"A"),i||{podcastA:r,podcastB:l,selectWinner:c}}();if(e instanceof v)return(0,i.jsx)(O,{position:"Winner",podcast:e,onSelect:()=>{}});{let{podcastA:t,podcastB:s,selectWinner:o}=e;return(0,i.jsx)("div",{id:"appContainer",className:"fluid-container",children:(0,i.jsxs)("div",{className:"row justify-content-evenly",children:[(0,i.jsx)(O,{position:"A",podcast:t,onSelect:()=>o("A")}),t!==s&&(0,i.jsx)(O,{position:"B",podcast:s,onSelect:()=>o("B")})]})})}},{})}))},18925:function(){},31384:function(){},24877:function(){},78614:function(){},93104:function(){},76762:function(e,t,s){s(40777),s(446),s(87671),s(55619),s(86782),s(91298),s(39710),s(2394),s(37339),s(34051),s(15519),s(73042),s(45146),s(97810),s(43044),s(83694),s(97582),s(60226),s(78307),s(90601),s(60862),s(95353),s(576),s(60142),s(67886),s(65451),s(46015),s(38334),s(94880),s(75643),s(29761),s(5458),s(37451),s(86152),s(52483),s(76840),s(53152),s(87148),s(17654),s(3481),s(18248),s(5099),s(7303),s(50483),s(56810),s(14612),s(86835),s(40589),s(21800),s(82427),s(26696),s(81566),s(50763),s(13730),s(44706),s(50081),s(50337),s(20936),s(93406),s(32636),s(90481),s(69929),s(60793),s(44898),s(35646),s(20106),s(50974),s(59560),s(73479),s(73293),s(88098),s(54801),s(56253),s(77822),s(93297),s(24129),s(79970),s(55028),s(31062),s(31616),s(55702),s(85716),s(36789),s(20276),s(83039),s(45123),s(67741),s(27788),s(17120),s(43779),s(36301),s(18583),s(80947),s(69774),s(49080),s(18973),s(59734),s(91582),s(73366),s(25128),s(9248),s(33587),s(92175),s(28878),s(64510),s(3689),s(4912),s(10078),s(21416),s(9975),s(71998),s(88023),s(87482),s(47527),s(28544),s(34749),s(17881),s(9365),s(32592),s(84397),s(71819),s(35614),s(97628),s(38588),s(26266),s(57110),s(93157),s(95905),s(17108),s(26506),s(99629),s(99291),s(57850),s(39414),s(23586),s(4355),s(25524),s(55305),s(72660),s(48962),s(35222),s(86247),s(40981),s(1902),s(57117),s(93909),s(61332),s(80351),s(84483),s(87119),s(556),s(51054),s(20787),s(61033),s(40384),s(52291),s(69250),s(8558),s(97980),s(36236),s(2833),s(77906),s(92114),s(15634),s(2613),s(90874),s(52240),s(58675),s(16857),s(68137),s(72715),s(46501),s(86834),s(11549),s(3485),s(68321),s(69594),s(6991),s(23082),s(43882),s(10261),s(84071),s(97758),s(74430),s(51207),s(52843),s(21286),s(11050),s(51116),s(27328),s(4722),s(31820),s(2603),s(55182),s(68441),s(14006),s(37913),s(43579),s(55255),s(88358),s(66590),s(54390),s(55658),s(85313),s(10894),s(71084),s(77365),s(161),s(74128),s(90887),s(94e3),s(44388),s(1107),s(63355),s(28856),s(14897),s(36707),s(30601),s(36330),s(38221),s(75863)}},t={};function s(o){var i=t[o];if(void 0!==i)return i.exports;var a=t[o]={id:o,loaded:!1,exports:{}};return e[o].call(a.exports,a,a.exports,s),a.loaded=!0,a.exports}s.m=e,s.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return s.d(t,{a:t}),t},s.d=(e,t)=>{for(var o in t)s.o(t,o)&&!s.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:t[o]})},s.g=(()=>{if("object"==typeof globalThis)return globalThis;try{return this||Function("return this")()}catch(e){if("object"==typeof window)return window}})(),s.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),s.nmd=e=>(e.paths=[],e.children||(e.children=[]),e),(()=>{var e=[];s.O=(t,o,i,a)=>{if(o){a=a||0;for(var n=e.length;n>0&&e[n-1][2]>a;n--)e[n]=e[n-1];e[n]=[o,i,a];return}for(var r=1/0,n=0;n<e.length;n++){for(var[o,i,a]=e[n],l=!0,c=0;c<o.length;c++)(!1&a||r>=a)&&Object.keys(s.O).every(e=>s.O[e](o[c]))?o.splice(c--,1):(l=!1,a<r&&(r=a));if(l){e.splice(n--,1);var d=i();void 0!==d&&(t=d)}}return t}})(),s.p="/cs6750-group-project/",s.rv=()=>"1.3.3",(()=>{var e={980:0};s.O.j=t=>0===e[t];var t=(t,o)=>{var i,a,[n,r,l]=o,c=0;if(n.some(t=>0!==e[t])){for(i in r)s.o(r,i)&&(s.m[i]=r[i]);if(l)var d=l(s)}for(t&&t(o);c<n.length;c++)a=n[c],s.o(e,a)&&e[a]&&e[a][0](),e[a]=0;return s.O(d)},o=self.webpackChunkrsbuild_react_js=self.webpackChunkrsbuild_react_js||[];o.forEach(t.bind(null,0)),o.push=t.bind(null,o.push.bind(o))})(),s.ruid="bundler=rspack@1.3.3",s.O(void 0,["126","361","275"],function(){return s(76762)});var o=s.O(void 0,["126","361","275"],function(){return s(1580)});o=s.O(o)})();