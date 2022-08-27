import{S as ze,i as Be,s as xe,a as Je,e as q,c as Ke,b as K,g as te,t as z,d as ne,f as B,h as x,j as We,o as he,k as He,l as Fe,m as Me,n as fe,p as N,q as Ge,r as Ye,u as Xe,v as F,w as we,x as M,y as G,z as Ae}from"./chunks/index-b57ea404.js";import{g as Ie,f as Ue,a as De,s as J,b as me,i as Qe}from"./chunks/singletons-f19d0ee1.js";import{_ as H,H as ue,R as Ce,e as Ze}from"./chunks/preload-helper-82cef186.js";import{s as et}from"./chunks/paths-f8114a29.js";function tt(r,e){return r==="/"||e==="ignore"?r:e==="never"?r.endsWith("/")?r.slice(0,-1):r:e==="always"&&!r.endsWith("/")?r+"/":r}function nt(r){for(const e in r)r[e]=r[e].replace(/%23/g,"#").replace(/%3[Bb]/g,";").replace(/%2[Cc]/g,",").replace(/%2[Ff]/g,"/").replace(/%3[Ff]/g,"?").replace(/%3[Aa]/g,":").replace(/%40/g,"@").replace(/%26/g,"&").replace(/%3[Dd]/g,"=").replace(/%2[Bb]/g,"+").replace(/%24/g,"$");return r}const at=["href","pathname","search","searchParams","toString","toJSON"];function rt(r,e){const n=new URL(r);for(const o of at){let i=n[o];Object.defineProperty(n,o,{get(){return e(),i},enumerable:!0,configurable:!0})}return n[Symbol.for("nodejs.util.inspect.custom")]=(o,i,u)=>u(r,i),st(n),n}function st(r){Object.defineProperty(r,"hash",{get(){throw new Error("Cannot access event.url.hash. Consider using `$page.url.hash` inside a component instead")}})}function it(r){let e=5381,n=r.length;if(typeof r=="string")for(;n;)e=e*33^r.charCodeAt(--n);else for(;n;)e=e*33^r[--n];return(e>>>0).toString(36)}const ee=window.fetch;function ot(r,e){let o=`script[sveltekit\\:data-type="data"][sveltekit\\:data-url=${JSON.stringify(typeof r=="string"?r:r.url)}]`;e&&typeof e.body=="string"&&(o+=`[sveltekit\\:data-body="${it(e.body)}"]`);const i=document.querySelector(o);if(i&&i.textContent){const{body:u,...t}=JSON.parse(i.textContent);return Promise.resolve(new Response(u,t))}return ee(r,e)}const lt=/^(\.\.\.)?(\w+)(?:=(\w+))?$/;function ct(r){const e=[],n=[];let o=!0;if(/\]\[/.test(r))throw new Error(`Invalid route ${r} \u2014 parameters must be separated`);if(Ne("[",r)!==Ne("]",r))throw new Error(`Invalid route ${r} \u2014 brackets are unbalanced`);return{pattern:r===""?/^\/$/:new RegExp(`^${r.split(/(?:\/|$)/).filter(ft).map((u,t,d)=>{const y=decodeURIComponent(u),m=/^\[\.\.\.(\w+)(?:=(\w+))?\]$/.exec(y);if(m)return e.push(m[1]),n.push(m[2]),"(?:/(.*))?";const g=t===d.length-1;return y&&"/"+y.split(/\[(.+?)\]/).map(($,S)=>{if(S%2){const U=lt.exec($);if(!U)throw new Error(`Invalid param: ${$}. Params and matcher names can only have underscores and alphanumeric characters.`);const[,I,Y,X]=U;return e.push(Y),n.push(X),I?"(.*?)":"([^/]+?)"}return g&&$.includes(".")&&(o=!1),$.normalize().replace(/%5[Bb]/g,"[").replace(/%5[Dd]/g,"]").replace(/#/g,"%23").replace(/\?/g,"%3F").replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}).join("")}).join("")}${o?"/?":""}$`),names:e,types:n}}function ft(r){return!/^\([^)]+\)$/.test(r)}function ut(r,e,n,o){const i={};for(let u=0;u<e.length;u+=1){const t=e[u],d=n[u],y=r[u+1]||"";if(d){const m=o[d];if(!m)throw new Error(`Missing "${d}" param matcher`);if(!m(y))return}i[t]=y}return i}function Ne(r,e){let n=0;for(let o=0;o<e.length;o+=1)e[o]===r&&(n+=1);return n}function pt(r,e,n){return Object.entries(e).map(([i,[u,t,d]])=>{const{pattern:y,names:m,types:g}=ct(i),$={id:i,exec:S=>{const U=y.exec(S);if(U)return ut(U,m,g,n)},errors:[1,...d||[]].map(S=>r[S]),layouts:[0,...t||[]].map(o),leaf:o(u)};return $.errors.length=$.layouts.length=Math.max($.errors.length,$.layouts.length),$});function o(i){const u=i<0;return u&&(i=~i),[u,r[i]]}}function dt(r){let e,n,o;var i=r[0][0];function u(t){return{props:{data:t[1],errors:t[3]}}}return i&&(e=new i(u(r))),{c(){e&&F(e.$$.fragment),n=q()},l(t){e&&we(e.$$.fragment,t),n=q()},m(t,d){e&&M(e,t,d),K(t,n,d),o=!0},p(t,d){const y={};if(d&2&&(y.data=t[1]),d&8&&(y.errors=t[3]),i!==(i=t[0][0])){if(e){te();const m=e;z(m.$$.fragment,1,0,()=>{G(m,1)}),ne()}i?(e=new i(u(t)),F(e.$$.fragment),B(e.$$.fragment,1),M(e,n.parentNode,n)):e=null}else i&&e.$set(y)},i(t){o||(e&&B(e.$$.fragment,t),o=!0)},o(t){e&&z(e.$$.fragment,t),o=!1},d(t){t&&x(n),e&&G(e,t)}}}function ht(r){let e,n,o;var i=r[0][0];function u(t){return{props:{data:t[1],errors:t[3],$$slots:{default:[mt]},$$scope:{ctx:t}}}}return i&&(e=new i(u(r))),{c(){e&&F(e.$$.fragment),n=q()},l(t){e&&we(e.$$.fragment,t),n=q()},m(t,d){e&&M(e,t,d),K(t,n,d),o=!0},p(t,d){const y={};if(d&2&&(y.data=t[1]),d&8&&(y.errors=t[3]),d&525&&(y.$$scope={dirty:d,ctx:t}),i!==(i=t[0][0])){if(e){te();const m=e;z(m.$$.fragment,1,0,()=>{G(m,1)}),ne()}i?(e=new i(u(t)),F(e.$$.fragment),B(e.$$.fragment,1),M(e,n.parentNode,n)):e=null}else i&&e.$set(y)},i(t){o||(e&&B(e.$$.fragment,t),o=!0)},o(t){e&&z(e.$$.fragment,t),o=!1},d(t){t&&x(n),e&&G(e,t)}}}function mt(r){let e,n,o;var i=r[0][1];function u(t){return{props:{data:t[2],errors:t[3]}}}return i&&(e=new i(u(r))),{c(){e&&F(e.$$.fragment),n=q()},l(t){e&&we(e.$$.fragment,t),n=q()},m(t,d){e&&M(e,t,d),K(t,n,d),o=!0},p(t,d){const y={};if(d&4&&(y.data=t[2]),d&8&&(y.errors=t[3]),i!==(i=t[0][1])){if(e){te();const m=e;z(m.$$.fragment,1,0,()=>{G(m,1)}),ne()}i?(e=new i(u(t)),F(e.$$.fragment),B(e.$$.fragment,1),M(e,n.parentNode,n)):e=null}else i&&e.$set(y)},i(t){o||(e&&B(e.$$.fragment,t),o=!0)},o(t){e&&z(e.$$.fragment,t),o=!1},d(t){t&&x(n),e&&G(e,t)}}}function Te(r){let e,n=r[5]&&Ve(r);return{c(){e=He("div"),n&&n.c(),this.h()},l(o){e=Fe(o,"DIV",{id:!0,"aria-live":!0,"aria-atomic":!0,style:!0});var i=Me(e);n&&n.l(i),i.forEach(x),this.h()},h(){fe(e,"id","svelte-announcer"),fe(e,"aria-live","assertive"),fe(e,"aria-atomic","true"),N(e,"position","absolute"),N(e,"left","0"),N(e,"top","0"),N(e,"clip","rect(0 0 0 0)"),N(e,"clip-path","inset(50%)"),N(e,"overflow","hidden"),N(e,"white-space","nowrap"),N(e,"width","1px"),N(e,"height","1px")},m(o,i){K(o,e,i),n&&n.m(e,null)},p(o,i){o[5]?n?n.p(o,i):(n=Ve(o),n.c(),n.m(e,null)):n&&(n.d(1),n=null)},d(o){o&&x(e),n&&n.d()}}}function Ve(r){let e;return{c(){e=Ge(r[6])},l(n){e=Ye(n,r[6])},m(n,o){K(n,e,o)},p(n,o){o&64&&Xe(e,n[6])},d(n){n&&x(e)}}}function _t(r){let e,n,o,i,u;const t=[ht,dt],d=[];function y(g,$){return g[0][1]?0:1}e=y(r),n=d[e]=t[e](r);let m=r[4]&&Te(r);return{c(){n.c(),o=Je(),m&&m.c(),i=q()},l(g){n.l(g),o=Ke(g),m&&m.l(g),i=q()},m(g,$){d[e].m(g,$),K(g,o,$),m&&m.m(g,$),K(g,i,$),u=!0},p(g,[$]){let S=e;e=y(g),e===S?d[e].p(g,$):(te(),z(d[S],1,1,()=>{d[S]=null}),ne(),n=d[e],n?n.p(g,$):(n=d[e]=t[e](g),n.c()),B(n,1),n.m(o.parentNode,o)),g[4]?m?m.p(g,$):(m=Te(g),m.c(),m.m(i.parentNode,i)):m&&(m.d(1),m=null)},i(g){u||(B(n),u=!0)},o(g){z(n),u=!1},d(g){d[e].d(g),g&&x(o),m&&m.d(g),g&&x(i)}}}function gt(r,e,n){let{stores:o}=e,{page:i}=e,{components:u}=e,{data_0:t=null}=e,{data_1:d=null}=e,{errors:y}=e;We(o.page.notify);let m=!1,g=!1,$=null;return he(()=>{const S=o.page.subscribe(()=>{m&&(n(5,g=!0),n(6,$=document.title||"untitled page"))});return n(4,m=!0),S}),r.$$set=S=>{"stores"in S&&n(7,o=S.stores),"page"in S&&n(8,i=S.page),"components"in S&&n(0,u=S.components),"data_0"in S&&n(1,t=S.data_0),"data_1"in S&&n(2,d=S.data_1),"errors"in S&&n(3,y=S.errors)},r.$$.update=()=>{r.$$.dirty&384&&o.page.set(i)},[u,t,d,y,m,g,$,o,i]}class wt extends ze{constructor(e){super(),Be(this,e,gt,_t,xe,{stores:7,page:8,components:0,data_0:1,data_1:2,errors:3})}}const bt={},ae=[()=>H(()=>import("./chunks/0-743fc357.js"),["chunks/0-743fc357.js","components/pages/_layout.svelte-b3483ec9.js","assets/+layout-ad17970d.css","chunks/index-b57ea404.js","chunks/masthead.module-a817179b.js","assets/masthead-0eceb451.css","chunks/paths-f25f3c46.js","chunks/Link-2d43e7e1.js","chunks/paths-f8114a29.js","chunks/stores-ce07aa98.js","chunks/singletons-f19d0ee1.js"],import.meta.url),()=>H(()=>import("./chunks/1-8d1335c9.js"),["chunks/1-8d1335c9.js","components/error.svelte-2b4c9b6d.js","chunks/index-b57ea404.js","chunks/stores-ce07aa98.js","chunks/singletons-f19d0ee1.js","chunks/paths-f8114a29.js"],import.meta.url),()=>H(()=>import("./chunks/2-f865eb3b.js"),["chunks/2-f865eb3b.js","components/pages/_page.svelte-879fa2ab.js","assets/+page-3b884912.css","chunks/index-b57ea404.js","chunks/paths-f8114a29.js","chunks/slidy-9ec44ef1.js","assets/slidy-643cb2e3.css","chunks/masthead.module-a817179b.js","assets/masthead-0eceb451.css","chunks/Header-ade1377d.js","chunks/paths-f25f3c46.js","chunks/Link-2d43e7e1.js"],import.meta.url),()=>H(()=>import("./chunks/3-7ab2c3d6.js"),["chunks/3-7ab2c3d6.js","components/pages/docs/_page.svelte-aab94d8e.js","assets/+page-b2768e6e.css","chunks/index-b57ea404.js","chunks/paths-f8114a29.js","chunks/stores-ce07aa98.js","chunks/singletons-f19d0ee1.js","chunks/masthead.module-a817179b.js","assets/masthead-0eceb451.css","chunks/Header-ade1377d.js","chunks/Link-2d43e7e1.js"],import.meta.url),()=>H(()=>import("./chunks/4-89752c41.js"),["chunks/4-89752c41.js","chunks/_page-64e281c9.js","chunks/preload-helper-82cef186.js","components/pages/docs/_section_/_page.svelte-d3dcb603.js","assets/+page-1e3ea2c9.css","chunks/index-b57ea404.js","chunks/paths-f8114a29.js","chunks/masthead.module-a817179b.js","assets/masthead-0eceb451.css","chunks/Header-ade1377d.js","chunks/Link-2d43e7e1.js"],import.meta.url),()=>H(()=>import("./chunks/5-3adf726b.js"),["chunks/5-3adf726b.js","components/pages/playground/_page.svelte-ee59bb3a.js","assets/+page-cdd662b1.css","chunks/index-b57ea404.js","chunks/slidy-9ec44ef1.js","assets/slidy-643cb2e3.css"],import.meta.url)],yt={"":[2],docs:[3],playground:[5],"docs/[section]":[4]},qe="sveltekit:scroll",V="sveltekit:index",pe=pt(ae,yt,bt),_e=ae[0],ge=ae[1];_e();ge();let Q={};try{Q=JSON.parse(sessionStorage[qe])}catch{}function de(r){Q[r]=me()}function vt({target:r,base:e,trailing_slash:n}){var Le;const o=[],i={id:null,promise:null},u={before_navigate:[],after_navigate:[]};let t={branch:[],error:null,session_id:0,url:null},d=!1,y=!0,m=!1,g=1,$=null,S,U=!0,I=(Le=history.state)==null?void 0:Le[V];I||(I=Date.now(),history.replaceState({...history.state,[V]:I},"",location.href));const Y=Q[I];Y&&(history.scrollRestoration="manual",scrollTo(Y.x,Y.y));let X=!1,W,be;async function ye(a,{noscroll:c=!1,replaceState:f=!1,keepfocus:s=!1,state:l={}},k){if(typeof a=="string"&&(a=new URL(a,Ie(document))),U)return oe({url:a,scroll:c?me():null,keepfocus:s,redirect_chain:k,details:{state:l,replaceState:f},accepted:()=>{},blocked:()=>{}});await T(a)}async function ve(a){const c=Se(a);if(!c)throw new Error("Attempted to prefetch a URL that does not belong to this app");return i.promise=Re(c),i.id=c.id,i.promise}async function ke(a,c,f,s){var b,R,L;const l=Se(a),k=be={};let p=l&&await Re(l);if(!p&&a.origin===location.origin&&a.pathname===location.pathname&&(p=await ie({status:404,error:new Error(`Not found: ${a.pathname}`),url:a,routeId:null})),!p)return await T(a),!1;if(a=(l==null?void 0:l.url)||a,be!==k)return!1;if(o.length=0,p.type==="redirect")if(c.length>10||c.includes(a.pathname))p=await ie({status:500,error:new Error("Redirect loop"),url:a,routeId:null});else return U?ye(new URL(p.location,a).href,{},[...c,a.pathname]):await T(new URL(p.location,location.href)),!1;else((R=(b=p.props)==null?void 0:b.page)==null?void 0:R.status)>=400&&await J.updated.check()&&await T(a);if(m=!0,f&&f.details){const{details:v}=f,P=v.replaceState?0:1;v.state[V]=I+=P,history[v.replaceState?"replaceState":"pushState"](v.state,"",a)}if(d?(t=p.state,p.props.page&&(p.props.page.url=a),S.$set(p.props)):Ee(p),f){const{scroll:v,keepfocus:P}=f;if(!P){const w=document.body,O=w.getAttribute("tabindex");w.tabIndex=-1,w.focus({preventScroll:!0}),setTimeout(()=>{var h;(h=getSelection())==null||h.removeAllRanges()}),O!==null?w.setAttribute("tabindex",O):w.removeAttribute("tabindex")}if(await Ae(),y){const w=a.hash&&document.getElementById(a.hash.slice(1));v?scrollTo(v.x,v.y):w?w.scrollIntoView():scrollTo(0,0)}}else await Ae();i.promise=null,i.id=null,y=!0,p.props.page&&(W=p.props.page);const E=p.state.branch[p.state.branch.length-1];U=((L=E==null?void 0:E.node.shared)==null?void 0:L.router)!==!1,s&&s(),m=!1}function Ee(a){t=a.state;const c=document.querySelector("style[data-sveltekit]");if(c&&c.remove(),W=a.props.page,S=new wt({target:r,props:{...a.props,stores:J},hydrate:!0}),U){const f={from:null,to:new URL(location.href)};u.after_navigate.forEach(s=>s(f))}d=!0}async function Z({url:a,params:c,branch:f,status:s,error:l,routeId:k,validation_errors:p}){var P;const E=f.filter(Boolean),b={type:"loaded",state:{url:a,params:c,branch:f,error:l,session_id:g},props:{components:E.map(w=>w.node.component),errors:p}};let R={},L=!W;for(let w=0;w<E.length;w+=1){const O=E[w];R={...R,...O.data},(L||!t.branch.some(h=>h===O))&&(b.props[`data_${w}`]=R,L=L||Object.keys((P=O.data)!=null?P:{}).length>0)}if(L||(L=Object.keys(W.data).length!==Object.keys(R).length),!t.url||a.href!==t.url.href||t.error!==l||L){b.props.page={error:l,params:c,routeId:k,status:s,url:a,data:L?R:W.data};const w=(O,h)=>{Object.defineProperty(b.props.page,O,{get:()=>{throw new Error(`$page.${O} has been replaced by $page.url.${h}`)}})};w("origin","origin"),w("path","pathname"),w("query","searchParams")}return b}async function re({loader:a,parent:c,url:f,params:s,routeId:l,server_data_node:k}){var R,L,v,P,w;let p=null;const E={dependencies:new Set,params:new Set,parent:!1,url:!1},b=await a();if((R=b.shared)!=null&&R.load){let O=function(..._){for(const j of _){const{href:D}=new URL(j,f);E.dependencies.add(D)}};const h={};for(const _ in s)Object.defineProperty(h,_,{get(){return E.params.add(_),s[_]},enumerable:!0});const A={routeId:l,params:h,data:(L=k==null?void 0:k.data)!=null?L:null,url:rt(f,()=>{E.url=!0}),async fetch(_,j){let D;typeof _=="string"?D=_:(D=_.url,j={body:_.method==="GET"||_.method==="HEAD"?void 0:await _.blob(),cache:_.cache,credentials:_.credentials,headers:_.headers,integrity:_.integrity,keepalive:_.keepalive,method:_.method,mode:_.mode,redirect:_.redirect,referrer:_.referrer,referrerPolicy:_.referrerPolicy,signal:_.signal,...j});const C=new URL(D,f).href;return O(C),d?ee(C,j):ot(D,j)},setHeaders:()=>{},depends:O,parent(){return E.parent=!0,c()}};Object.defineProperties(A,{props:{get(){throw new Error("@migration task: Replace `props` with `data` stuff https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292693")},enumerable:!1},session:{get(){throw new Error("session is no longer available. See https://github.com/sveltejs/kit/discussions/5883")},enumerable:!1},stuff:{get(){throw new Error("@migration task: Remove stuff https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292693")},enumerable:!1}}),p=(v=await b.shared.load.call(null,A))!=null?v:null}return{node:b,loader:a,server:k,shared:(P=b.shared)!=null&&P.load?{type:"data",data:p,uses:E}:null,data:(w=p!=null?p:k==null?void 0:k.data)!=null?w:null}}function $e(a,c,f){if(!f)return!1;if(f.parent&&c||a.url&&f.url)return!0;for(const s of a.params)if(f.params.has(s))return!0;for(const s of f.dependencies)if(o.some(l=>l(s)))return!0;return!1}function se(a,c){var f,s;return(a==null?void 0:a.type)==="data"?{type:"data",data:a.data,uses:{dependencies:new Set((f=a.uses.dependencies)!=null?f:[]),params:new Set((s=a.uses.params)!=null?s:[]),parent:!!a.uses.parent,url:!!a.uses.url}}:(a==null?void 0:a.type)==="skip"&&c!=null?c:null}async function Re({id:a,url:c,params:f,route:s}){if(i.id===a&&i.promise)return i.promise;const{errors:l,layouts:k,leaf:p}=s,E=t.url&&{url:a!==t.url.pathname+t.url.search,params:Object.keys(f).filter(h=>t.params[h]!==f[h])},b=[...k,p];l.forEach(h=>h==null?void 0:h().catch(()=>{})),b.forEach(h=>h==null?void 0:h[1]().catch(()=>{}));let R=null;const L=b.reduce((h,A,_)=>{var C;const j=t.branch[_],D=!!(A!=null&&A[0])&&((j==null?void 0:j.loader)!==A[1]||$e(E,h.some(Boolean),(C=j.server)==null?void 0:C.uses));return h.push(D),h},[]);if(L.some(Boolean)){try{const h=await ee(`${c.pathname}${c.pathname.endsWith("/")?"":"/"}__data.json${c.search}`,{headers:{"x-sveltekit-invalidated":L.map(A=>A?"1":"").join(",")}});if(R=await h.json(),!h.ok)throw R}catch{T(c);return}if(R.type==="redirect")return R}const v=R==null?void 0:R.nodes;let P=!1;const w=b.map(async(h,A)=>{var le,je;if(!h)return;const _=t.branch[A],j=(le=v==null?void 0:v[A])!=null?le:null;if((!j||j.type==="skip")&&h[1]===(_==null?void 0:_.loader)&&!$e(E,P,(je=_.shared)==null?void 0:je.uses))return _;if(P=!0,(j==null?void 0:j.type)==="error")throw j.httperror?Ze(j.httperror.status,j.httperror.message):j.error;return re({loader:h[1],url:c,params:f,routeId:s.id,parent:async()=>{var Pe;const Oe={};for(let ce=0;ce<A;ce+=1)Object.assign(Oe,(Pe=await w[ce])==null?void 0:Pe.data);return Oe},server_data_node:se(j,_==null?void 0:_.server)})});for(const h of w)h.catch(()=>{});const O=[];for(let h=0;h<b.length;h+=1)if(b[h])try{O.push(await w[h])}catch(A){const _=A;if(_ instanceof Ce)return{type:"redirect",location:_.location};const j=A instanceof ue?A.status:500;for(;h--;)if(l[h]){let D,C=h;for(;!O[C];)C-=1;try{return D={node:await l[h](),loader:l[h],data:{},server:null,shared:null},await Z({url:c,params:f,branch:O.slice(0,C+1).concat(D),status:j,error:_,routeId:s.id})}catch{continue}}T(c);return}else O.push(void 0);return await Z({url:c,params:f,branch:O,status:200,error:null,routeId:s.id})}async function ie({status:a,error:c,url:f,routeId:s}){var R;const l={},k=await _e();let p=null;if(k.server){const L=await ee(`${f.pathname}${f.pathname.endsWith("/")?"":"/"}__data.json${f.search}`,{headers:{"x-sveltekit-invalidated":"1"}}),v=await L.json();if(p=(R=v==null?void 0:v[0])!=null?R:null,!L.ok||(v==null?void 0:v.type)!=="data"){T(f);return}}const E=await re({loader:_e,url:f,params:l,routeId:s,parent:()=>Promise.resolve({}),server_data_node:se(p)}),b={node:await ge(),loader:ge,shared:null,server:null,data:null};return await Z({url:f,params:l,branch:[E,b],status:a,error:c,routeId:s})}function Se(a){if(a.origin!==location.origin||!a.pathname.startsWith(e))return;const c=decodeURI(a.pathname.slice(e.length)||"/");for(const f of pe){const s=f.exec(c);if(s){const l=new URL(a.origin+tt(a.pathname,n)+a.search+a.hash);return{id:l.pathname+l.search,route:f,params:nt(s),url:l}}}}async function oe({url:a,scroll:c,keepfocus:f,redirect_chain:s,details:l,accepted:k,blocked:p}){const E=t.url;let b=!1;const R={from:E,to:a,cancel:()=>b=!0};if(u.before_navigate.forEach(L=>L(R)),b){p();return}de(I),k(),d&&J.navigating.set({from:t.url,to:a}),await ke(a,s,{scroll:c,keepfocus:f,details:l},()=>{const L={from:E,to:a};u.after_navigate.forEach(v=>v(L)),J.navigating.set(null)})}function T(a){return location.href=a.href,new Promise(()=>{})}return{after_navigate:a=>{he(()=>(u.after_navigate.push(a),()=>{const c=u.after_navigate.indexOf(a);u.after_navigate.splice(c,1)}))},before_navigate:a=>{he(()=>(u.before_navigate.push(a),()=>{const c=u.before_navigate.indexOf(a);u.before_navigate.splice(c,1)}))},disable_scroll_handling:()=>{(m||!d)&&(y=!1)},goto:(a,c={})=>ye(a,c,[]),invalidate:a=>{var c,f;if(a===void 0){for(const s of t.branch)(c=s==null?void 0:s.server)==null||c.uses.dependencies.add(""),(f=s==null?void 0:s.shared)==null||f.uses.dependencies.add("");o.push(()=>!0)}else if(typeof a=="function")o.push(a);else{const{href:s}=new URL(a,location.href);o.push(l=>l===s)}return $||($=Promise.resolve().then(async()=>{await ke(new URL(location.href),[]),$=null})),$},prefetch:async a=>{const c=new URL(a,Ie(document));await ve(c)},prefetch_routes:async a=>{const f=(a?pe.filter(s=>a.some(l=>s.exec(l))):pe).map(s=>Promise.all([...s.layouts,s.leaf].map(l=>l==null?void 0:l[1]())));await Promise.all(f)},_start_router:()=>{history.scrollRestoration="manual",addEventListener("beforeunload",s=>{let l=!1;const k={from:t.url,to:null,cancel:()=>l=!0};u.before_navigate.forEach(p=>p(k)),l?(s.preventDefault(),s.returnValue=""):history.scrollRestoration="auto"}),addEventListener("visibilitychange",()=>{if(document.visibilityState==="hidden"){de(I);try{sessionStorage[qe]=JSON.stringify(Q)}catch{}}});const a=s=>{const l=Ue(s);l&&l.href&&l.hasAttribute("sveltekit:prefetch")&&ve(De(l))};let c;const f=s=>{clearTimeout(c),c=setTimeout(()=>{var l;(l=s.target)==null||l.dispatchEvent(new CustomEvent("sveltekit:trigger_prefetch",{bubbles:!0}))},20)};addEventListener("touchstart",a),addEventListener("mousemove",f),addEventListener("sveltekit:trigger_prefetch",a),addEventListener("click",s=>{if(!U||s.button||s.which!==1||s.metaKey||s.ctrlKey||s.shiftKey||s.altKey||s.defaultPrevented)return;const l=Ue(s);if(!l||!l.href)return;const k=l instanceof SVGAElement,p=De(l);if(!k&&!(p.protocol==="https:"||p.protocol==="http:"))return;const E=(l.getAttribute("rel")||"").split(/\s+/);if(l.hasAttribute("download")||E.includes("external")||l.hasAttribute("sveltekit:reload")||(k?l.target.baseVal:l.target))return;const[b,R]=p.href.split("#");if(R!==void 0&&b===location.href.split("#")[0]){X=!0,de(I),J.page.set({...W,url:p}),J.page.notify();return}oe({url:p,scroll:l.hasAttribute("sveltekit:noscroll")?me():null,keepfocus:!1,redirect_chain:[],details:{state:{},replaceState:p.href===location.href},accepted:()=>s.preventDefault(),blocked:()=>s.preventDefault()})}),addEventListener("popstate",s=>{if(s.state&&U){if(s.state[V]===I)return;oe({url:new URL(location.href),scroll:Q[s.state[V]],keepfocus:!1,redirect_chain:[],details:null,accepted:()=>{I=s.state[V]},blocked:()=>{const l=I-s.state[V];history.go(l)}})}}),addEventListener("hashchange",()=>{X&&(X=!1,history.replaceState({...history.state,[V]:++I},"",location.href))});for(const s of document.querySelectorAll("link"))s.rel==="icon"&&(s.href=s.href);addEventListener("pageshow",s=>{s.persisted&&J.navigating.set(null)})},_hydrate:async({status:a,error:c,node_ids:f,params:s,routeId:l})=>{const k=new URL(location.href);let p;try{const E=(v,P)=>{const w=document.querySelector(`script[sveltekit\\:data-type="${v}"]`);return w!=null&&w.textContent?JSON.parse(w.textContent):P},b=E("server_data",[]),R=E("validation_errors",void 0),L=f.map(async(v,P)=>re({loader:ae[v],url:k,params:s,routeId:l,parent:async()=>{const w={};for(let O=0;O<P;O+=1)Object.assign(w,(await L[O]).data);return w},server_data_node:se(b[P])}));p=await Z({url:k,params:s,branch:await Promise.all(L),status:a,error:c!=null&&c.__is_http_error?new ue(c.status,c.message):c,validation_errors:R,routeId:l})}catch(E){const b=E;if(b instanceof Ce){await T(new URL(E.location,location.href));return}p=await ie({status:b instanceof ue?b.status:500,error:b,url:k,routeId:l})}Ee(p)}}}function St(r){}async function Lt({paths:r,target:e,route:n,spa:o,trailing_slash:i,hydrate:u}){const t=vt({target:e,base:r.base,trailing_slash:i});Qe({client:t}),et(r),u&&await t._hydrate(u),n&&(o&&t.goto(location.href,{replaceState:!0}),t._start_router()),dispatchEvent(new CustomEvent("sveltekit:start"))}export{St as set_public_env,Lt as start};
