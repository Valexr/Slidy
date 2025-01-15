import{aI as S,ar as k,P as V,B as A,ak as U,T as Y,A as q,k as b,m as z,aK as G,n as f,aL as W,V as R,t as g,o as N,v as u,M as w,aM as J,aN as K,p as B,aO as I,a3 as O,O as Q,a2 as X,aP as Z,J as ee,z as te,aQ as re,x as ae,a4 as ne,a6 as oe,c as ie}from"./index.BiDqHbFu.js";function me(e){return e.endsWith("capture")&&e!=="gotpointercapture"&&e!=="lostpointercapture"}const se=["beforeinput","click","change","dblclick","contextmenu","focusin","focusout","input","keydown","keyup","mousedown","mousemove","mouseout","mouseover","mouseup","pointerdown","pointermove","pointerout","pointerover","pointerup","touchend","touchmove","touchstart"];function ye(e){return se.includes(e)}const ue={formnovalidate:"formNoValidate",ismap:"isMap",nomodule:"noModule",playsinline:"playsInline",readonly:"readOnly",defaultvalue:"defaultValue",defaultchecked:"defaultChecked",srcobject:"srcObject"};function Ee(e){return e=e.toLowerCase(),ue[e]??e}const le=["touchstart","touchmove"];function de(e){return le.includes(e)}const ce=["textarea","script","style","title"];function ge(e){return ce.includes(e)}function fe(e){var t=V,r=A;S(null),k(null);try{return e()}finally{S(t),k(r)}}const H=new Set,D=new Set;function we(e,t,r,o){function n(a){if(o.capture||T.call(t,a),!a.cancelBubble)return fe(()=>r.call(this,a))}return e.startsWith("pointer")||e.startsWith("touch")||e==="wheel"?q(()=>{t.addEventListener(e,n,o)}):t.addEventListener(e,n,o),n}function Te(e){for(var t=0;t<e.length;t++)H.add(e[t]);for(var r of D)r(e)}function T(e){var P;var t=this,r=t.ownerDocument,o=e.type,n=((P=e.composedPath)==null?void 0:P.call(e))||[],a=n[0]||e.target,i=0,_=e.__root;if(_){var d=n.indexOf(_);if(d!==-1&&(t===document||t===window)){e.__root=t;return}var y=n.indexOf(t);if(y===-1)return;d<=y&&(i=d)}if(a=n[i]||e.target,a!==t){U(e,"currentTarget",{configurable:!0,get(){return a||r}});var M=V,p=A;S(null),k(null);try{for(var s,l=[];a!==null;){var v=a.assignedSlot||a.parentNode||a.host||null;try{var m=a["__"+o];if(m!==void 0&&!a.disabled)if(Y(m)){var[x,...F]=m;x.apply(a,[e,...F])}else m.call(a,e)}catch(L){s?l.push(L):s=L}if(e.cancelBubble||v===t||v===null)break;a=v}if(s){for(let L of l)queueMicrotask(()=>{throw L});throw s}}finally{e.__root=t,delete e.currentTarget,S(M),k(p)}}}let c;function _e(){c=void 0}function be(e){let t=null,r=f;var o;if(f){for(t=u,c===void 0&&(c=w(document.head));c!==null&&(c.nodeType!==8||c.data!==W);)c=R(c);c===null?g(!1):c=N(R(c))}f||(o=document.head.appendChild(b()));try{z(()=>e(o),G)}finally{r&&(g(!0),c=u,N(t))}}function $(e){var t=document.createElement("template");return t.innerHTML=e,t.content}function h(e,t){var r=A;r.nodes_start===null&&(r.nodes_start=e,r.nodes_end=t)}function Ne(e,t){var r=(t&J)!==0,o=(t&K)!==0,n,a=!e.startsWith("<!>");return()=>{if(f)return h(u,null),u;n===void 0&&(n=$(a?e:"<!>"+e),r||(n=w(n)));var i=o?document.importNode(n,!0):n.cloneNode(!0);if(r){var _=w(i),d=i.lastChild;h(_,d)}else h(i,i);return i}}function Ae(e,t,r="svg"){var o=!e.startsWith("<!>"),n=`<${r}>${o?e:"<!>"+e}</${r}>`,a;return()=>{if(f)return h(u,null),u;if(!a){var i=$(n),_=w(i);a=w(_)}var d=a.cloneNode(!0);return h(d,d),d}}function Le(e=""){if(!f){var t=b(e+"");return h(t,t),t}var r=u;return r.nodeType!==3&&(r.before(r=b()),N(r)),h(r,r),r}function Se(){if(f)return h(u,null),u;var e=document.createDocumentFragment(),t=document.createComment(""),r=b();return e.append(t,r),h(t,r),e}function ke(e,t){if(f){A.nodes_end=u,B();return}e!==null&&e.before(t)}function Me(e,t){var r=t==null?"":typeof t=="object"?t+"":t;r!==(e.__t??(e.__t=e.nodeValue))&&(e.__t=r,e.nodeValue=r==null?"":r+"")}function pe(e,t){return j(e,t)}function Oe(e,t){I(),t.intro=t.intro??!1;const r=t.target,o=f,n=u;try{for(var a=w(r);a&&(a.nodeType!==8||a.data!==W);)a=R(a);if(!a)throw O;g(!0),N(a),B();const i=j(e,{...t,anchor:a});if(u===null||u.nodeType!==8||u.data!==Q)throw X(),O;return g(!1),i}catch(i){if(i===O)return t.recover===!1&&Z(),I(),ee(r),g(!1),pe(e,t);throw i}finally{g(o),N(n),_e()}}const E=new Map;function j(e,{target:t,anchor:r,props:o={},events:n,context:a,intro:i=!0}){I();var _=new Set,d=p=>{for(var s=0;s<p.length;s++){var l=p[s];if(!_.has(l)){_.add(l);var v=de(l);t.addEventListener(l,T,{passive:v});var m=E.get(l);m===void 0?(document.addEventListener(l,T,{passive:v}),E.set(l,1)):E.set(l,m+1)}}};d(te(H)),D.add(d);var y=void 0,M=re(()=>{var p=r??t.appendChild(b());return ae(()=>{if(a){ne({});var s=ie;s.c=a}n&&(o.$$events=n),f&&h(p,null),y=e(p,o)||{},f&&(A.nodes_end=u),a&&oe()}),()=>{var v;for(var s of _){t.removeEventListener(s,T);var l=E.get(s);--l===0?(document.removeEventListener(s,T),E.delete(s)):E.set(s,l)}D.delete(d),p!==r&&((v=p.parentNode)==null||v.removeChild(p))}});return C.set(y,M),y}let C=new WeakMap;function Re(e,t){const r=C.get(e);return r?(C.delete(e),r(t)):Promise.resolve()}const he="5";typeof window<"u"&&(window.__svelte||(window.__svelte={v:new Set})).v.add(he);export{ke as a,Ne as b,h as c,$ as d,Se as e,Oe as f,we as g,be as h,me as i,Te as j,ye as k,ge as l,pe as m,Ee as n,Ae as o,Me as s,Le as t,Re as u};
