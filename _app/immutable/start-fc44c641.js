import{S as nt,i as at,s as rt,a as ot,e as F,c as it,b as K,g as de,t as M,d as pe,f as B,h as G,j as st,o as Ie,k as lt,l as ct,m as ft,n as ve,p as V,q as ut,r as dt,u as pt,v as Y,w as X,x as Ue,y as Z,z as Q,A as ce}from"./chunks/index-2179246c.js";import{S as et,I as q,g as ze,f as Je,a as Ee,b as fe,s as C,i as We,c as ue,P as Ye,d as ht}from"./chunks/singletons-19057d65.js";import{_ as W,R as Xe,H as Ae}from"./chunks/control-654b50f6.js";import{s as mt,a as _t}from"./chunks/shared-23917130.js";function gt(a,e){return a==="/"||e==="ignore"?a:e==="never"?a.endsWith("/")?a.slice(0,-1):a:e==="always"&&!a.endsWith("/")?a+"/":a}function wt(a){return a.split("%25").map(decodeURI).join("%25")}function yt(a){for(const e in a)a[e]=decodeURIComponent(a[e]);return a}const bt=["href","pathname","search","searchParams","toString","toJSON"];function vt(a,e){const n=new URL(a);for(const l of bt){let i=n[l];Object.defineProperty(n,l,{get(){return e(),i},enumerable:!0,configurable:!0})}return Et(n),n}function Et(a){Object.defineProperty(a,"hash",{get(){throw new Error("Cannot access event.url.hash. Consider using `$page.url.hash` inside a component instead")}})}const kt="/__data.json";function Rt(a){return a.replace(/\/$/,"")+kt}function St(a){let e=5381;if(typeof a=="string"){let n=a.length;for(;n;)e=e*33^a.charCodeAt(--n)}else if(ArrayBuffer.isView(a)){const n=new Uint8Array(a.buffer,a.byteOffset,a.byteLength);let l=n.length;for(;l;)e=e*33^n[--l]}else throw new TypeError("value must be a string or TypedArray");return(e>>>0).toString(36)}const he=window.fetch;window.fetch=(a,e)=>((a instanceof Request?a.method:(e==null?void 0:e.method)||"GET")!=="GET"&&ne.delete(Ne(a)),he(a,e));const ne=new Map;function Lt(a,e){const n=Ne(a,e),l=document.querySelector(n);if(l!=null&&l.textContent){const{body:i,...m}=JSON.parse(l.textContent),t=l.getAttribute("data-ttl");return t&&ne.set(n,{body:i,init:m,ttl:1e3*Number(t)}),Promise.resolve(new Response(i,m))}return he(a,e)}function It(a,e,n){if(ne.size>0){const l=Ne(a,n),i=ne.get(l);if(i){if(performance.now()<i.ttl&&["default","force-cache","only-if-cached",void 0].includes(n==null?void 0:n.cache))return new Response(i.body,i.init);ne.delete(l)}}return he(e,n)}function Ne(a,e){let l=`script[data-sveltekit-fetched][data-url=${JSON.stringify(a instanceof Request?a.url:a)}]`;return e!=null&&e.body&&(typeof e.body=="string"||ArrayBuffer.isView(e.body))&&(l+=`[data-hash="${St(e.body)}"]`),l}const At=/^(\[)?(\.\.\.)?(\w+)(?:=(\w+))?(\])?$/;function Ot(a){const e=[];return{pattern:a==="/"?/^\/$/:new RegExp(`^${Ut(a).map(l=>{const i=/^\[\.\.\.(\w+)(?:=(\w+))?\]$/.exec(l);if(i)return e.push({name:i[1],matcher:i[2],optional:!1,rest:!0,chained:!0}),"(?:/(.*))?";const m=/^\[\[(\w+)(?:=(\w+))?\]\]$/.exec(l);if(m)return e.push({name:m[1],matcher:m[2],optional:!0,rest:!1,chained:!0}),"(?:/([^/]+))?";if(!l)return;const t=l.split(/\[(.+?)\](?!\])/);return"/"+t.map((h,_)=>{if(_%2){if(h.startsWith("x+"))return ke(String.fromCharCode(parseInt(h.slice(2),16)));if(h.startsWith("u+"))return ke(String.fromCharCode(...h.slice(2).split("-").map(P=>parseInt(P,16))));const w=At.exec(h);if(!w)throw new Error(`Invalid param: ${h}. Params and matcher names can only have underscores and alphanumeric characters.`);const[,v,S,T,j]=w;return e.push({name:T,matcher:j,optional:!!v,rest:!!S,chained:S?_===1&&t[0]==="":!1}),S?"(.*?)":v?"([^/]*)?":"([^/]+?)"}return ke(h)}).join("")}).join("")}/?$`),params:e}}function Pt(a){return!/^\([^)]+\)$/.test(a)}function Ut(a){return a.slice(1).split("/").filter(Pt)}function Nt(a,e,n){const l={},i=a.slice(1);let m="";for(let t=0;t<e.length;t+=1){const f=e[t];let h=i[t];if(f.chained&&f.rest&&m&&(h=h?m+"/"+h:m),m="",h===void 0)f.rest&&(l[f.name]="");else{if(f.matcher&&!n[f.matcher](h)){if(f.optional&&f.chained){let _=i.indexOf(void 0,t);if(_===-1){const w=e[t+1];if(w!=null&&w.rest&&w.chained)m=h;else return}for(;_>=t;)i[_]=i[_-1],_-=1;continue}return}l[f.name]=h}}if(!m)return l}function ke(a){return a.normalize().replace(/[[\]]/g,"\\$&").replace(/%/g,"%25").replace(/\//g,"%2[Ff]").replace(/\?/g,"%3[Ff]").replace(/#/g,"%23").replace(/[.*+?^${}()|\\]/g,"\\$&")}function $t(a,e,n,l){const i=new Set(e);return Object.entries(n).map(([f,[h,_,w]])=>{const{pattern:v,params:S}=Ot(f),T={id:f,exec:j=>{const P=v.exec(j);if(P)return Nt(P,S,l)},errors:[1,...w||[]].map(j=>a[j]),layouts:[0,..._||[]].map(t),leaf:m(h)};return T.errors.length=T.layouts.length=Math.max(T.errors.length,T.layouts.length),T});function m(f){const h=f<0;return h&&(f=~f),[h,a[f]]}function t(f){return f===void 0?f:[i.has(f),a[f]]}}function Tt(a){let e,n,l;var i=a[0][0];function m(t){return{props:{data:t[2],form:t[1]}}}return i&&(e=Y(i,m(a))),{c(){e&&X(e.$$.fragment),n=F()},l(t){e&&Ue(e.$$.fragment,t),n=F()},m(t,f){e&&Z(e,t,f),K(t,n,f),l=!0},p(t,f){const h={};if(f&4&&(h.data=t[2]),f&2&&(h.form=t[1]),i!==(i=t[0][0])){if(e){de();const _=e;M(_.$$.fragment,1,0,()=>{Q(_,1)}),pe()}i?(e=Y(i,m(t)),X(e.$$.fragment),B(e.$$.fragment,1),Z(e,n.parentNode,n)):e=null}else i&&e.$set(h)},i(t){l||(e&&B(e.$$.fragment,t),l=!0)},o(t){e&&M(e.$$.fragment,t),l=!1},d(t){t&&G(n),e&&Q(e,t)}}}function jt(a){let e,n,l;var i=a[0][0];function m(t){return{props:{data:t[2],$$slots:{default:[Dt]},$$scope:{ctx:t}}}}return i&&(e=Y(i,m(a))),{c(){e&&X(e.$$.fragment),n=F()},l(t){e&&Ue(e.$$.fragment,t),n=F()},m(t,f){e&&Z(e,t,f),K(t,n,f),l=!0},p(t,f){const h={};if(f&4&&(h.data=t[2]),f&523&&(h.$$scope={dirty:f,ctx:t}),i!==(i=t[0][0])){if(e){de();const _=e;M(_.$$.fragment,1,0,()=>{Q(_,1)}),pe()}i?(e=Y(i,m(t)),X(e.$$.fragment),B(e.$$.fragment,1),Z(e,n.parentNode,n)):e=null}else i&&e.$set(h)},i(t){l||(e&&B(e.$$.fragment,t),l=!0)},o(t){e&&M(e.$$.fragment,t),l=!1},d(t){t&&G(n),e&&Q(e,t)}}}function Dt(a){let e,n,l;var i=a[0][1];function m(t){return{props:{data:t[3],form:t[1]}}}return i&&(e=Y(i,m(a))),{c(){e&&X(e.$$.fragment),n=F()},l(t){e&&Ue(e.$$.fragment,t),n=F()},m(t,f){e&&Z(e,t,f),K(t,n,f),l=!0},p(t,f){const h={};if(f&8&&(h.data=t[3]),f&2&&(h.form=t[1]),i!==(i=t[0][1])){if(e){de();const _=e;M(_.$$.fragment,1,0,()=>{Q(_,1)}),pe()}i?(e=Y(i,m(t)),X(e.$$.fragment),B(e.$$.fragment,1),Z(e,n.parentNode,n)):e=null}else i&&e.$set(h)},i(t){l||(e&&B(e.$$.fragment,t),l=!0)},o(t){e&&M(e.$$.fragment,t),l=!1},d(t){t&&G(n),e&&Q(e,t)}}}function Ze(a){let e,n=a[5]&&Qe(a);return{c(){e=lt("div"),n&&n.c(),this.h()},l(l){e=ct(l,"DIV",{id:!0,"aria-live":!0,"aria-atomic":!0,style:!0});var i=ft(e);n&&n.l(i),i.forEach(G),this.h()},h(){ve(e,"id","svelte-announcer"),ve(e,"aria-live","assertive"),ve(e,"aria-atomic","true"),V(e,"position","absolute"),V(e,"left","0"),V(e,"top","0"),V(e,"clip","rect(0 0 0 0)"),V(e,"clip-path","inset(50%)"),V(e,"overflow","hidden"),V(e,"white-space","nowrap"),V(e,"width","1px"),V(e,"height","1px")},m(l,i){K(l,e,i),n&&n.m(e,null)},p(l,i){l[5]?n?n.p(l,i):(n=Qe(l),n.c(),n.m(e,null)):n&&(n.d(1),n=null)},d(l){l&&G(e),n&&n.d()}}}function Qe(a){let e;return{c(){e=ut(a[6])},l(n){e=dt(n,a[6])},m(n,l){K(n,e,l)},p(n,l){l&64&&pt(e,n[6])},d(n){n&&G(e)}}}function Vt(a){let e,n,l,i,m;const t=[jt,Tt],f=[];function h(w,v){return w[0][1]?0:1}e=h(a),n=f[e]=t[e](a);let _=a[4]&&Ze(a);return{c(){n.c(),l=ot(),_&&_.c(),i=F()},l(w){n.l(w),l=it(w),_&&_.l(w),i=F()},m(w,v){f[e].m(w,v),K(w,l,v),_&&_.m(w,v),K(w,i,v),m=!0},p(w,[v]){let S=e;e=h(w),e===S?f[e].p(w,v):(de(),M(f[S],1,1,()=>{f[S]=null}),pe(),n=f[e],n?n.p(w,v):(n=f[e]=t[e](w),n.c()),B(n,1),n.m(l.parentNode,l)),w[4]?_?_.p(w,v):(_=Ze(w),_.c(),_.m(i.parentNode,i)):_&&(_.d(1),_=null)},i(w){m||(B(n),m=!0)},o(w){M(n),m=!1},d(w){f[e].d(w),w&&G(l),_&&_.d(w),w&&G(i)}}}function qt(a,e,n){let{stores:l}=e,{page:i}=e,{components:m}=e,{form:t}=e,{data_0:f=null}=e,{data_1:h=null}=e;st(l.page.notify);let _=!1,w=!1,v=null;return Ie(()=>{const S=l.page.subscribe(()=>{_&&(n(5,w=!0),n(6,v=document.title||"untitled page"))});return n(4,_=!0),S}),a.$$set=S=>{"stores"in S&&n(7,l=S.stores),"page"in S&&n(8,i=S.page),"components"in S&&n(0,m=S.components),"form"in S&&n(1,t=S.form),"data_0"in S&&n(2,f=S.data_0),"data_1"in S&&n(3,h=S.data_1)},a.$$.update=()=>{a.$$.dirty&384&&l.page.set(i)},[m,t,f,h,_,w,v,l,i]}class Ct extends nt{constructor(e){super(),at(this,e,qt,Vt,rt,{stores:7,page:8,components:0,form:1,data_0:2,data_1:3})}}const Ft={},me=[()=>W(()=>import("./chunks/0-ec2231e2.js"),["./chunks/0-ec2231e2.js","./components/pages/_layout.svelte-00739aa8.js","./chunks/index-2179246c.js","./chunks/masthead.module-d477a562.js","./assets/masthead-0eceb451.css","./chunks/paths-e4936b55.js","./chunks/Link-e80ccb5b.js","./chunks/shared-23917130.js","./chunks/stores-60e917e4.js","./chunks/singletons-19057d65.js","./assets/_layout-ad17970d.css"],import.meta.url),()=>W(()=>import("./chunks/1-d7b680ff.js"),["./chunks/1-d7b680ff.js","./components/error.svelte-d05f8a89.js","./chunks/index-2179246c.js","./chunks/stores-60e917e4.js","./chunks/singletons-19057d65.js","./chunks/shared-23917130.js"],import.meta.url),()=>W(()=>import("./chunks/2-80b73ffc.js"),["./chunks/2-80b73ffc.js","./components/pages/_page.svelte-d197e1e6.js","./chunks/index-2179246c.js","./chunks/shared-23917130.js","./chunks/slidy-972b4cc5.js","./assets/slidy-6f253dfe.css","./chunks/masthead.module-d477a562.js","./assets/masthead-0eceb451.css","./chunks/Header-64fc34f0.js","./chunks/paths-e4936b55.js","./chunks/Link-e80ccb5b.js","./assets/_page-d23e1c9d.css"],import.meta.url),()=>W(()=>import("./chunks/3-49832096.js"),["./chunks/3-49832096.js","./components/pages/docs/_page.svelte-dacce77f.js","./chunks/index-2179246c.js","./chunks/shared-23917130.js","./chunks/stores-60e917e4.js","./chunks/singletons-19057d65.js","./chunks/masthead.module-d477a562.js","./assets/masthead-0eceb451.css","./chunks/Header-64fc34f0.js","./chunks/Link-e80ccb5b.js","./assets/_page-b2768e6e.css"],import.meta.url),()=>W(()=>import("./chunks/4-413ea380.js"),["./chunks/4-413ea380.js","./chunks/_page-6a4638e6.js","./chunks/control-654b50f6.js","./components/pages/docs/_section_/_page.svelte-cd6c3b83.js","./chunks/index-2179246c.js","./chunks/shared-23917130.js","./chunks/masthead.module-d477a562.js","./assets/masthead-0eceb451.css","./chunks/Header-64fc34f0.js","./chunks/Link-e80ccb5b.js","./assets/_page-1e3ea2c9.css"],import.meta.url),()=>W(()=>import("./chunks/5-7c897c78.js"),["./chunks/5-7c897c78.js","./components/pages/playground/_page.svelte-b906fa36.js","./chunks/index-2179246c.js","./chunks/slidy-972b4cc5.js","./assets/slidy-6f253dfe.css","./assets/_page-cdd662b1.css"],import.meta.url)],Mt=[0],Bt={"/":[2],"/docs":[3],"/docs/[section]":[4],"/playground":[5]},Gt={handleError:({error:a})=>{console.error(a)}};async function Ht(a){var e;for(const n in a)if(typeof((e=a[n])==null?void 0:e.then)=="function")return Object.fromEntries(await Promise.all(Object.entries(a).map(async([l,i])=>[l,await i])));return a}Object.getOwnPropertyNames(Object.prototype).sort().join("\0");const Kt=-1,zt=-2,Jt=-3,Wt=-4,Yt=-5,Xt=-6;function Zt(a){if(typeof a=="number")return l(a,!0);if(!Array.isArray(a)||a.length===0)throw new Error("Invalid input");const e=a,n=Array(e.length);function l(i,m=!1){if(i===Kt)return;if(i===Jt)return NaN;if(i===Wt)return 1/0;if(i===Yt)return-1/0;if(i===Xt)return-0;if(m)throw new Error("Invalid input");if(i in n)return n[i];const t=e[i];if(!t||typeof t!="object")n[i]=t;else if(Array.isArray(t))if(typeof t[0]=="string")switch(t[0]){case"Date":n[i]=new Date(t[1]);break;case"Set":const h=new Set;n[i]=h;for(let v=1;v<t.length;v+=1)h.add(l(t[v]));break;case"Map":const _=new Map;n[i]=_;for(let v=1;v<t.length;v+=2)_.set(l(t[v]),l(t[v+1]));break;case"RegExp":n[i]=new RegExp(t[1],t[2]);break;case"Object":n[i]=Object(t[1]);break;case"BigInt":n[i]=BigInt(t[1]);break;case"null":const w=Object.create(null);n[i]=w;for(let v=1;v<t.length;v+=2)w[t[v]]=l(t[v+1]);break}else{const f=new Array(t.length);n[i]=f;for(let h=0;h<t.length;h+=1){const _=t[h];_!==zt&&(f[h]=l(_))}}else{const f={};n[i]=f;for(const h in t){const _=t[h];f[h]=l(_)}}return n[i]}return l(0)}function Qt(a){return a.filter(e=>e!=null)}const Re=$t(me,Mt,Bt,Ft),Oe=me[0],Pe=me[1];Oe();Pe();let ae={};try{ae=JSON.parse(sessionStorage[et])}catch{}function Se(a){ae[a]=ue()}function xt({target:a,base:e}){var Ge;const n=document.documentElement,l=[];let i=null;const m={before_navigate:[],after_navigate:[]};let t={branch:[],error:null,url:null},f=!1,h=!1,_=!0,w=!1,v=!1,S=!1,T=!1,j,P=(Ge=history.state)==null?void 0:Ge[q];P||(P=Date.now(),history.replaceState({...history.state,[q]:P},"",location.href));const _e=ae[P];_e&&(history.scrollRestoration="manual",scrollTo(_e.x,_e.y));let H,$e,re;async function Te(){re=re||Promise.resolve(),await re,re=null;const r=new URL(location.href),o=se(r,!0);i=null,await De(o,r,[])}async function ge(r,{noScroll:o=!1,replaceState:c=!1,keepFocus:s=!1,state:d={},invalidateAll:u=!1},p,b){return typeof r=="string"&&(r=new URL(r,ze(document))),le({url:r,scroll:o?ue():null,keepfocus:s,redirect_chain:p,details:{state:d,replaceState:c},nav_token:b,accepted:()=>{u&&(T=!0)},blocked:()=>{},type:"goto"})}async function je(r){const o=se(r,!1);if(!o)throw new Error(`Attempted to preload a URL that does not belong to this app: ${r}`);return i={id:o.id,promise:Ce(o).then(c=>(c.type==="loaded"&&c.state.error&&(i=null),c))},i.promise}async function oe(...r){const c=Re.filter(s=>r.some(d=>s.exec(d))).map(s=>Promise.all([...s.layouts,s.leaf].map(d=>d==null?void 0:d[1]())));await Promise.all(c)}async function De(r,o,c,s,d={},u){var b,y;$e=d;let p=r&&await Ce(r);if(p||(p=await Be(o,{id:null},await te(new Error(`Not found: ${o.pathname}`),{url:o,params:{},route:{id:null}}),404)),o=(r==null?void 0:r.url)||o,$e!==d)return!1;if(p.type==="redirect")if(c.length>10||c.includes(o.pathname))p=await ie({status:500,error:await te(new Error("Redirect loop"),{url:o,params:{},route:{id:null}}),url:o,route:{id:null}});else return ge(new URL(p.location,o).href,{},[...c,o.pathname],d),!1;else((y=(b=p.props)==null?void 0:b.page)==null?void 0:y.status)>=400&&await C.updated.check()&&await ee(o);if(l.length=0,T=!1,w=!0,s&&s.details){const{details:g}=s,k=g.replaceState?0:1;g.state[q]=P+=k,history[g.replaceState?"replaceState":"pushState"](g.state,"",o)}if(i=null,h?(t=p.state,p.props.page&&(p.props.page.url=o),j.$set(p.props)):Ve(p),s){const{scroll:g,keepfocus:k}=s;if(k||Le(),await ce(),_){const A=o.hash&&document.getElementById(o.hash.slice(1));g?scrollTo(g.x,g.y):A?A.scrollIntoView():scrollTo(0,0)}}else await ce();_=!0,p.props.page&&(H=p.props.page),u&&u(),w=!1}function Ve(r){var s;t=r.state;const o=document.querySelector("style[data-sveltekit]");o&&o.remove(),H=r.props.page,j=new Ct({target:a,props:{...r.props,stores:C},hydrate:!0});const c={from:null,to:{params:t.params,route:{id:((s=t.route)==null?void 0:s.id)??null},url:new URL(location.href)},willUnload:!1,type:"enter"};m.after_navigate.forEach(d=>d(c)),h=!0}async function x({url:r,params:o,branch:c,status:s,error:d,route:u,form:p}){let b="never";for(const L of c)(L==null?void 0:L.slash)!==void 0&&(b=L.slash);r.pathname=gt(r.pathname,b),r.search=r.search;const y={type:"loaded",state:{url:r,params:o,branch:c,error:d,route:u},props:{components:Qt(c).map(L=>L.node.component)}};p!==void 0&&(y.props.form=p);let g={},k=!H,A=0;for(let L=0;L<Math.max(c.length,t.branch.length);L+=1){const E=c[L],U=t.branch[L];(E==null?void 0:E.data)!==(U==null?void 0:U.data)&&(k=!0),E&&(g={...g,...E.data},k&&(y.props[`data_${A}`]=g),A+=1)}return(!t.url||r.href!==t.url.href||t.error!==d||p!==void 0&&p!==H.form||k)&&(y.props.page={error:d,params:o,route:{id:(u==null?void 0:u.id)??null},status:s,url:new URL(r),form:p??null,data:k?g:H.data}),y}async function we({loader:r,parent:o,url:c,params:s,route:d,server_data_node:u}){var g,k,A;let p=null;const b={dependencies:new Set,params:new Set,parent:!1,route:!1,url:!1},y=await r();if((g=y.universal)!=null&&g.load){let D=function(...E){for(const U of E){const{href:$}=new URL(U,c);b.dependencies.add($)}};const L={route:{get id(){return b.route=!0,d.id}},params:new Proxy(s,{get:(E,U)=>(b.params.add(U),E[U])}),data:(u==null?void 0:u.data)??null,url:vt(c,()=>{b.url=!0}),async fetch(E,U){let $;E instanceof Request?($=E.url,U={body:E.method==="GET"||E.method==="HEAD"?void 0:await E.blob(),cache:E.cache,credentials:E.credentials,headers:E.headers,integrity:E.integrity,keepalive:E.keepalive,method:E.method,mode:E.mode,redirect:E.redirect,referrer:E.referrer,referrerPolicy:E.referrerPolicy,signal:E.signal,...U}):$=E;const R=new URL($,c).href;return D(R),h?It($,R,U):Lt($,U)},setHeaders:()=>{},depends:D,parent(){return b.parent=!0,o()}};p=await y.universal.load.call(null,L)??null,p=p?await Ht(p):null}return{node:y,loader:r,server:u,universal:(k=y.universal)!=null&&k.load?{type:"data",data:p,uses:b}:null,data:p??(u==null?void 0:u.data)??null,slash:((A=y.universal)==null?void 0:A.trailingSlash)??(u==null?void 0:u.slash)}}function qe(r,o,c,s,d){if(T)return!0;if(!s)return!1;if(s.parent&&r||s.route&&o||s.url&&c)return!0;for(const u of s.params)if(d[u]!==t.params[u])return!0;for(const u of s.dependencies)if(l.some(p=>p(new URL(u))))return!0;return!1}function ye(r,o){return(r==null?void 0:r.type)==="data"?{type:"data",data:r.data,uses:{dependencies:new Set(r.uses.dependencies??[]),params:new Set(r.uses.params??[]),parent:!!r.uses.parent,route:!!r.uses.route,url:!!r.uses.url},slash:r.slash}:(r==null?void 0:r.type)==="skip"?o??null:null}async function Ce({id:r,invalidating:o,url:c,params:s,route:d}){if((i==null?void 0:i.id)===r)return i.promise;const{errors:u,layouts:p,leaf:b}=d,y=[...p,b];u.forEach(R=>R==null?void 0:R().catch(()=>{})),y.forEach(R=>R==null?void 0:R[1]().catch(()=>{}));let g=null;const k=t.url?r!==t.url.pathname+t.url.search:!1,A=t.route?d.id!==t.route.id:!1,D=y.reduce((R,O,N)=>{var J;const I=t.branch[N],z=!!(O!=null&&O[0])&&((I==null?void 0:I.loader)!==O[1]||qe(R.some(Boolean),A,k,(J=I.server)==null?void 0:J.uses,s));return R.push(z),R},[]);if(D.some(Boolean)){try{g=await xe(c,D)}catch(R){return ie({status:500,error:await te(R,{url:c,params:s,route:{id:d.id}}),url:c,route:d})}if(g.type==="redirect")return g}const L=g==null?void 0:g.nodes;let E=!1;const U=y.map(async(R,O)=>{var J;if(!R)return;const N=t.branch[O],I=L==null?void 0:L[O];if((!I||I.type==="skip")&&R[1]===(N==null?void 0:N.loader)&&!qe(E,A,k,(J=N.universal)==null?void 0:J.uses,s))return N;if(E=!0,(I==null?void 0:I.type)==="error")throw I;return we({loader:R[1],url:c,params:s,route:d,parent:async()=>{var Ke;const He={};for(let be=0;be<O;be+=1)Object.assign(He,(Ke=await U[be])==null?void 0:Ke.data);return He},server_data_node:ye(I===void 0&&R[0]?{type:"skip"}:I??null,N==null?void 0:N.server)})});for(const R of U)R.catch(()=>{});const $=[];for(let R=0;R<y.length;R+=1)if(y[R])try{$.push(await U[R])}catch(O){if(O instanceof Xe)return{type:"redirect",location:O.location};let N=500,I;if(L!=null&&L.includes(O))N=O.status??N,I=O.error;else if(O instanceof Ae)N=O.status,I=O.body;else{if(await C.updated.check())return await ee(c);I=await te(O,{params:s,url:c,route:{id:d.id}})}const z=await Fe(R,$,u);return z?await x({url:c,params:s,branch:$.slice(0,z.idx).concat(z.node),status:N,error:I,route:d}):await Be(c,{id:d.id},I,N)}else $.push(void 0);return await x({url:c,params:s,branch:$,status:200,error:null,route:d,form:o?void 0:null})}async function Fe(r,o,c){for(;r--;)if(c[r]){let s=r;for(;!o[s];)s-=1;try{return{idx:s+1,node:{node:await c[r](),loader:c[r],data:{},server:null,universal:null}}}catch{continue}}}async function ie({status:r,error:o,url:c,route:s}){const d={},u=await Oe();let p=null;if(u.has_server_load)try{const g=await xe(c,[!0]);if(g.type!=="data"||g.nodes[0]&&g.nodes[0].type!=="data")throw 0;p=g.nodes[0]??null}catch{(c.origin!==location.origin||c.pathname!==location.pathname||f)&&await ee(c)}const b=await we({loader:Oe,url:c,params:d,route:s,parent:()=>Promise.resolve({}),server_data_node:ye(p)}),y={node:await Pe(),loader:Pe,universal:null,server:null,data:null};return await x({url:c,params:d,branch:[b,y],status:r,error:o,route:null})}function se(r,o){if(We(r,e))return;const c=wt(r.pathname.slice(e.length)||"/");for(const s of Re){const d=s.exec(c);if(d)return{id:r.pathname+r.search,invalidating:o,route:s,params:yt(d),url:r}}}function Me({url:r,type:o,intent:c,delta:s}){var b,y;let d=!1;const u={from:{params:t.params,route:{id:((b=t.route)==null?void 0:b.id)??null},url:t.url},to:{params:(c==null?void 0:c.params)??null,route:{id:((y=c==null?void 0:c.route)==null?void 0:y.id)??null},url:r},willUnload:!c,type:o};s!==void 0&&(u.delta=s);const p={...u,cancel:()=>{d=!0}};return v||m.before_navigate.forEach(g=>g(p)),d?null:u}async function le({url:r,scroll:o,keepfocus:c,redirect_chain:s,details:d,type:u,delta:p,nav_token:b,accepted:y,blocked:g}){const k=se(r,!1),A=Me({url:r,type:u,delta:p,intent:k});if(!A){g();return}Se(P),y(),v=!0,h&&C.navigating.set(A),await De(k,r,s,{scroll:o,keepfocus:c,details:d},b,()=>{v=!1,m.after_navigate.forEach(D=>D(A)),C.navigating.set(null)})}async function Be(r,o,c,s){return r.origin===location.origin&&r.pathname===location.pathname&&!f?await ie({status:s,error:c,url:r,route:o}):await ee(r)}function ee(r){return location.href=r.href,new Promise(()=>{})}function tt(){let r;n.addEventListener("mousemove",u=>{const p=u.target;clearTimeout(r),r=setTimeout(()=>{s(p,2)},20)});function o(u){s(u.composedPath()[0],1)}n.addEventListener("mousedown",o),n.addEventListener("touchstart",o,{passive:!0});const c=new IntersectionObserver(u=>{for(const p of u)p.isIntersecting&&(oe(new URL(p.target.href).pathname),c.unobserve(p.target))},{threshold:0});function s(u,p){const b=Je(u,n);if(!b)return;const{url:y,external:g}=Ee(b,e);if(g)return;const k=fe(b);k.reload||(p<=k.preload_data?je(y):p<=k.preload_code&&oe(y.pathname))}function d(){c.disconnect();for(const u of n.querySelectorAll("a")){const{url:p,external:b}=Ee(u,e);if(b)continue;const y=fe(u);y.reload||(y.preload_code===Ye.viewport&&c.observe(u),y.preload_code===Ye.eager&&oe(p.pathname))}}m.after_navigate.push(d),d()}return{after_navigate:r=>{Ie(()=>(m.after_navigate.push(r),()=>{const o=m.after_navigate.indexOf(r);m.after_navigate.splice(o,1)}))},before_navigate:r=>{Ie(()=>(m.before_navigate.push(r),()=>{const o=m.before_navigate.indexOf(r);m.before_navigate.splice(o,1)}))},disable_scroll_handling:()=>{(w||!h)&&(_=!1)},goto:(r,o={})=>ge(r,o,[]),invalidate:r=>{if(typeof r=="function")l.push(r);else{const{href:o}=new URL(r,location.href);l.push(c=>c.href===o)}return Te()},invalidateAll:()=>(T=!0,Te()),preload_data:async r=>{const o=new URL(r,ze(document));await je(o)},preload_code:oe,apply_action:async r=>{if(r.type==="error"){const o=new URL(location.href),{branch:c,route:s}=t;if(!s)return;const d=await Fe(t.branch.length,c,s.errors);if(d){const u=await x({url:o,params:t.params,branch:c.slice(0,d.idx).concat(d.node),status:r.status??500,error:r.error,route:s});t=u.state,j.$set(u.props),ce().then(Le)}}else if(r.type==="redirect")ge(r.location,{invalidateAll:!0},[]);else{const o={form:r.data,page:{...H,form:r.data,status:r.status}};j.$set(o),r.type==="success"&&ce().then(Le)}},_start_router:()=>{var r;history.scrollRestoration="manual",addEventListener("beforeunload",o=>{var s;let c=!1;if(!v){const d={from:{params:t.params,route:{id:((s=t.route)==null?void 0:s.id)??null},url:t.url},to:null,willUnload:!0,type:"leave",cancel:()=>c=!0};m.before_navigate.forEach(u=>u(d))}c?(o.preventDefault(),o.returnValue=""):history.scrollRestoration="auto"}),addEventListener("visibilitychange",()=>{if(document.visibilityState==="hidden"){Se(P);try{sessionStorage[et]=JSON.stringify(ae)}catch{}}}),(r=navigator.connection)!=null&&r.saveData||tt(),n.addEventListener("click",o=>{if(o.button||o.which!==1||o.metaKey||o.ctrlKey||o.shiftKey||o.altKey||o.defaultPrevented)return;const c=Je(o.composedPath()[0],n);if(!c)return;const{url:s,external:d,target:u}=Ee(c,e);if(!s)return;if(u==="_parent"||u==="_top"){if(window.parent!==window)return}else if(u&&u!=="_self")return;const p=fe(c);if(!(c instanceof SVGAElement)&&s.protocol!==location.protocol&&!(s.protocol==="https:"||s.protocol==="http:"))return;if(d||p.reload){Me({url:s,type:"link"})||o.preventDefault(),v=!0;return}const[y,g]=s.href.split("#");if(g!==void 0&&y===location.href.split("#")[0]){S=!0,Se(P),t.url=s,C.page.set({...H,url:s}),C.page.notify();return}le({url:s,scroll:p.noscroll?ue():null,keepfocus:!1,redirect_chain:[],details:{state:{},replaceState:s.href===location.href},accepted:()=>o.preventDefault(),blocked:()=>o.preventDefault(),type:"link"})}),n.addEventListener("submit",o=>{if(o.defaultPrevented)return;const c=HTMLFormElement.prototype.cloneNode.call(o.target),s=o.submitter;if(((s==null?void 0:s.formMethod)||c.method)!=="get")return;const u=new URL((s==null?void 0:s.hasAttribute("formaction"))&&(s==null?void 0:s.formAction)||c.action);if(We(u,e))return;const p=o.target,{noscroll:b,reload:y}=fe(p);if(y)return;o.preventDefault(),o.stopPropagation();const g=new FormData(p),k=s==null?void 0:s.getAttribute("name");k&&g.append(k,(s==null?void 0:s.getAttribute("value"))??""),u.search=new URLSearchParams(g).toString(),le({url:u,scroll:b?ue():null,keepfocus:!1,redirect_chain:[],details:{state:{},replaceState:!1},nav_token:{},accepted:()=>{},blocked:()=>{},type:"form"})}),addEventListener("popstate",o=>{var c;if((c=o.state)!=null&&c[q]){if(o.state[q]===P)return;const s=o.state[q]-P;le({url:new URL(location.href),scroll:ae[o.state[q]],keepfocus:!1,redirect_chain:[],details:null,accepted:()=>{P=o.state[q]},blocked:()=>{history.go(-s)},type:"popstate",delta:s})}}),addEventListener("hashchange",()=>{S&&(S=!1,history.replaceState({...history.state,[q]:++P},"",location.href))});for(const o of document.querySelectorAll("link"))o.rel==="icon"&&(o.href=o.href);addEventListener("pageshow",o=>{o.persisted&&C.navigating.set(null)})},_hydrate:async({status:r=200,error:o,node_ids:c,params:s,route:d,data:u,form:p})=>{f=!0;const b=new URL(location.href);({params:s={},route:d={id:null}}=se(b,!1)||{});let y;try{const g=c.map(async(k,A)=>{const D=u[A];return we({loader:me[k],url:b,params:s,route:d,parent:async()=>{const L={};for(let E=0;E<A;E+=1)Object.assign(L,(await g[E]).data);return L},server_data_node:ye(D)})});y=await x({url:b,params:s,branch:await Promise.all(g),status:r,error:o,form:p,route:Re.find(({id:k})=>k===d.id)??null})}catch(g){if(g instanceof Xe){await ee(new URL(g.location,location.href));return}y=await ie({status:g instanceof Ae?g.status:500,error:await te(g,{url:b,params:s,route:d}),url:b,route:d})}Ve(y)}}}async function xe(a,e){var m;const n=new URL(a);n.pathname=Rt(a.pathname),n.searchParams.append("x-sveltekit-invalidated",e.map(t=>t?"1":"").join("_"));const l=await he(n.href),i=await l.json();if(!l.ok)throw new Error(i);return(m=i.nodes)==null||m.forEach(t=>{(t==null?void 0:t.type)==="data"&&(t.data=Zt(t.data),t.uses={dependencies:new Set(t.uses.dependencies??[]),params:new Set(t.uses.params??[]),parent:!!t.uses.parent,route:!!t.uses.route,url:!!t.uses.url})}),i}function te(a,e){return a instanceof Ae?a.body:Gt.handleError({error:a,event:e})??{message:e.route.id!=null?"Internal Error":"Not Found"}}function Le(){const a=document.querySelector("[autofocus]");if(a)a.focus();else{const e=document.body,n=e.getAttribute("tabindex");e.tabIndex=-1,e.focus({preventScroll:!0}),setTimeout(()=>{var l;(l=getSelection())==null||l.removeAllRanges()}),n!==null?e.setAttribute("tabindex",n):e.removeAttribute("tabindex")}}async function rn({env:a,hydrate:e,paths:n,target:l,version:i}){mt(n),_t(i);const m=xt({target:l,base:n.base});ht({client:m}),e?await m._hydrate(e):m.goto(location.href,{replaceState:!0}),m._start_router()}export{rn as start};
