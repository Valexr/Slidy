import{aF as O,al as I,U as F,K as S,aA as x,y as z,J as G,o as T,q as J,aH as K,v as d,aI as H,Z as k,B as g,w as N,C as i,S as w,aJ as Z,aK as Q,x as j,aL as D,a2 as R,T as X,a1 as ee,aM as re,P as te,z as ne,aN as ae,F as se,p as oe,a as ue,j as ie,a3 as C,u as le,aO as ce,W as fe,m as de,aa as _e}from"./runtime.6xWG0gki.js";function pe(e){var r=F,t=S;O(null),I(null);try{return e()}finally{O(r),I(t)}}const B=new Set,P=new Set;function Ne(e,r,t,a){function s(n){if(a.capture||E.call(r,n),!n.cancelBubble)return pe(()=>t.call(this,n))}return e.startsWith("pointer")||e.startsWith("touch")||e==="wheel"?G(()=>{r.addEventListener(e,s,a)}):r.addEventListener(e,s,a),s}function Se(e){for(var r=0;r<e.length;r++)B.add(e[r]);for(var t of P)t(e)}function E(e){var W;var r=this,t=r.ownerDocument,a=e.type,s=((W=e.composedPath)==null?void 0:W.call(e))||[],n=s[0]||e.target,o=0,_=e.__root;if(_){var c=s.indexOf(_);if(c!==-1&&(r===document||r===window)){e.__root=r;return}var b=s.indexOf(r);if(b===-1)return;c<=b&&(o=c)}if(n=s[o]||e.target,n!==r){x(e,"currentTarget",{configurable:!0,get(){return n||t}});var M=F,p=S;O(null),I(null);try{for(var u,l=[];n!==null;){var h=n.assignedSlot||n.parentNode||n.host||null;try{var y=n["__"+a];if(y!==void 0&&!n.disabled)if(z(y)){var[U,...Y]=y;U.apply(n,[e,...Y])}else y.call(n,e)}catch(A){u?l.push(A):u=A}if(e.cancelBubble||h===r||h===null)break;n=h}if(u){for(let A of l)queueMicrotask(()=>{throw A});throw u}}finally{e.__root=r,delete e.currentTarget,O(M),I(p)}}}let f;function ve(){f=void 0}function Ae(e){let r=null,t=d;var a;if(d){for(r=i,f===void 0&&(f=w(document.head));f!==null&&(f.nodeType!==8||f.data!==H);)f=k(f);f===null?g(!1):f=N(k(f))}d||(a=document.head.appendChild(T()));try{J(()=>e(a),K)}finally{t&&(g(!0),f=i,N(r))}}function $(e){var r=document.createElement("template");return r.innerHTML=e,r.content}function v(e,r){var t=S;t.nodes_start===null&&(t.nodes_start=e,t.nodes_end=r)}function Le(e,r){var t=(r&Z)!==0,a=(r&Q)!==0,s,n=!e.startsWith("<!>");return()=>{if(d)return v(i,null),i;s===void 0&&(s=$(n?e:"<!>"+e),t||(s=w(s)));var o=a?document.importNode(s,!0):s.cloneNode(!0);if(t){var _=w(o),c=o.lastChild;v(_,c)}else v(o,o);return o}}function Oe(e,r,t="svg"){var a=!e.startsWith("<!>"),s=`<${t}>${a?e:"<!>"+e}</${t}>`,n;return()=>{if(d)return v(i,null),i;if(!n){var o=$(s),_=w(o);n=w(_)}var c=n.cloneNode(!0);return v(c,c),c}}function Ie(e=""){if(!d){var r=T(e+"");return v(r,r),r}var t=i;return t.nodeType!==3&&(t.before(t=T()),N(t)),v(t,t),t}function Me(){if(d)return v(i,null),i;var e=document.createDocumentFragment(),r=document.createComment(""),t=T();return e.append(r,t),v(r,t),e}function Re(e,r){if(d){S.nodes_end=i,j();return}e!==null&&e.before(r)}function ke(e){return e.endsWith("capture")&&e!=="gotpointercapture"&&e!=="lostpointercapture"}const he=["beforeinput","click","change","dblclick","contextmenu","focusin","focusout","input","keydown","keyup","mousedown","mousemove","mouseout","mouseover","mouseup","pointerdown","pointermove","pointerout","pointerover","pointerup","touchend","touchmove","touchstart"];function De(e){return he.includes(e)}const be={formnovalidate:"formNoValidate",ismap:"isMap",nomodule:"noModule",playsinline:"playsInline",readonly:"readOnly",srcobject:"srcObject"};function Ce(e){return e=e.toLowerCase(),be[e]??e}const ye=["touchstart","touchmove"];function me(e){return ye.includes(e)}function Pe(e,r){var t=r==null?"":typeof r=="object"?r+"":r;t!==(e.__t??(e.__t=e.nodeValue))&&(e.__t=t,e.nodeValue=t==null?"":t+"")}function ge(e,r){return q(e,r)}function Ve(e,r){D(),r.intro=r.intro??!1;const t=r.target,a=d,s=i;try{for(var n=w(t);n&&(n.nodeType!==8||n.data!==H);)n=k(n);if(!n)throw R;g(!0),N(n),j();const o=q(e,{...r,anchor:n});if(i===null||i.nodeType!==8||i.data!==X)throw ee(),R;return g(!1),o}catch(o){if(o===R)return r.recover===!1&&re(),D(),te(t),g(!1),ge(e,r);throw o}finally{g(a),N(s),ve()}}const m=new Map;function q(e,{target:r,anchor:t,props:a={},events:s,context:n,intro:o=!0}){D();var _=new Set,c=p=>{for(var u=0;u<p.length;u++){var l=p[u];if(!_.has(l)){_.add(l);var h=me(l);r.addEventListener(l,E,{passive:h});var y=m.get(l);y===void 0?(document.addEventListener(l,E,{passive:h}),m.set(l,1)):m.set(l,y+1)}}};c(ne(B)),P.add(c);var b=void 0,M=ae(()=>{var p=t??r.appendChild(T());return se(()=>{if(n){oe({});var u=ie;u.c=n}s&&(a.$$events=s),d&&v(p,null),b=e(p,a)||{},d&&(S.nodes_end=i),n&&ue()}),()=>{var h;for(var u of _){r.removeEventListener(u,E);var l=m.get(u);--l===0?(document.removeEventListener(u,E),m.delete(u)):m.set(u,l)}P.delete(c),V.delete(b),p!==t&&((h=p.parentNode)==null||h.removeChild(p))}});return V.set(b,M),b}let V=new WeakMap;function We(e){const r=V.get(e);r&&r()}function we(e,r,t){if(e==null)return r(void 0),C;const a=le(()=>e.subscribe(r,t));return a.unsubscribe?()=>a.unsubscribe():a}let L=!1;function Fe(e,r,t){const a=t[r]??(t[r]={store:null,source:fe(void 0),unsubscribe:C});if(a.store!==e)if(a.unsubscribe(),a.store=e??null,e==null)a.source.v=void 0,a.unsubscribe=C;else{var s=!0;a.unsubscribe=we(e,n=>{s?a.source.v=n:_e(a.source,n)}),s=!1}return de(a.source)}function He(){const e={};return ce(()=>{for(var r in e)e[r].unsubscribe()}),e}function je(e){var r=L;try{return L=!1,[e(),L]}finally{L=r}}const Ee="5";typeof window<"u"&&(window.__svelte||(window.__svelte={v:new Set})).v.add(Ee);export{Re as a,Pe as b,Fe as c,Ie as d,v as e,$ as f,Me as g,Ae as h,je as i,ke as j,Ne as k,Se as l,De as m,Ce as n,Ve as o,ge as p,Oe as q,He as s,Le as t,We as u};