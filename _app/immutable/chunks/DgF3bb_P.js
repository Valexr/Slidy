import{D as j,m as B,V as q,A as D,a3 as F,S as G,o as g,x as M,w as E,af as z,aA as K,aB as U,aC as Y}from"./C91Fk0F4.js";import{i as H,g as J,j as Q,n as W,k as X}from"./BcWP8BRI.js";function Z(s,r){if(r){const t=document.body;s.autofocus=!0,j(()=>{document.activeElement===t&&s.focus()})}}let S=!1;function x(){S||(S=!0,document.addEventListener("reset",s=>{Promise.resolve().then(()=>{var r;if(!s.defaultPrevented)for(const t of s.target.elements)(r=t.__on_r)==null||r.call(t)})},{capture:!0}))}function es(s,r,...t){var i=s,f=F,e;B(()=>{f!==(f=r())&&(e&&(G(e),e=null),e=D(()=>f(i,...t)))},q),g&&(i=M)}function T(s){var r,t,i="";if(typeof s=="string"||typeof s=="number")i+=s;else if(typeof s=="object")if(Array.isArray(s)){var f=s.length;for(r=0;r<f;r++)s[r]&&(t=T(s[r]))&&(i&&(i+=" "),i+=t)}else for(t in s)s[t]&&(i&&(i+=" "),i+=t);return i}function m(){for(var s,r,t=0,i="",f=arguments.length;t<f;t++)(s=arguments[t])&&(r=T(s))&&(i&&(i+=" "),i+=r);return i}function ss(s){return typeof s=="object"?m(s):s??""}const C=[...` 	
\r\f \v\uFEFF`];function rs(s,r,t){var i=s==null?"":""+s;if(r&&(i=i?i+" "+r:r),t){for(var f in t)if(t[f])i=i?i+" "+f:f;else if(i.length)for(var e=f.length,v=0;(v=i.indexOf(f,v))>=0;){var c=v+e;(v===0||C.includes(i[v-1]))&&(c===i.length||C.includes(i[c]))?i=(v===0?"":i.substring(0,v))+i.substring(c+1):v=c}}return i===""?null:i}function ts(s,r,t,i,f,e){var v=s.__className;if(g||v!==t){var c=rs(t,i,e);(!g||c!==s.getAttribute("class"))&&(c==null?s.removeAttribute("class"):r?s.className=c:s.setAttribute("class",c)),s.__className=t}else if(e){f??(f={});for(var n in e){var h=!!e[n];h!==!!f[n]&&s.classList.toggle(n,h)}}return e}const A=Symbol("class");function us(s){if(g){var r=!1,t=()=>{if(!r){if(r=!0,s.hasAttribute("value")){var i=s.value;y(s,"value",null),s.value=i}if(s.hasAttribute("checked")){var f=s.checked;y(s,"checked",null),s.checked=f}}};s.__on_r=t,Y(t),x()}}function os(s,r){var t=s.__attributes??(s.__attributes={});t.value===(t.value=r??void 0)||s.value===r&&(r!==0||s.nodeName!=="PROGRESS")||(s.value=r??"")}function is(s,r){r?s.hasAttribute("selected")||s.setAttribute("selected",""):s.removeAttribute("selected")}function y(s,r,t,i){var f=s.__attributes??(s.__attributes={});g&&(f[r]=s.getAttribute(r),r==="src"||r==="srcset"||r==="href"&&s.nodeName==="LINK")||f[r]!==(f[r]=t)&&(r==="style"&&"__styles"in s&&(s.__styles={}),r==="loading"&&(s[K]=t),t==null?s.removeAttribute(r):typeof t!="string"&&$(s).includes(r)?s[r]=t:s.setAttribute(r,t))}function ls(s,r,t,i,f=!1,e=!1,v=!1){let c=g&&e;c&&E(!1);var n=r||{},h=s.tagName==="OPTION";for(var b in r)b in t||(t[b]=null);t.class?t.class=ss(t.class):t[A]&&(t.class=null);var O=$(s),R=s.__attributes??(s.__attributes={});for(const a in t){let u=t[a];if(h&&a==="value"&&u==null){s.value=s.__value="",n[a]=u;continue}var N=n[a];if(!(u===N&&a!=="class")){n[a]=u;var w=a[0]+a[1];if(w!=="$$"){if(w==="on"){const l={},d="$$"+a;let o=a.slice(2);var p=X(o);if(H(o)&&(o=o.slice(0,-7),l.capture=!0),!p&&N){if(u!=null)continue;s.removeEventListener(o,n[d],l),n[d]=null}if(u!=null)if(p)s[`__${o}`]=u,Q([o]);else{let I=function(V){n[a].call(this,V)};n[d]=J(o,s,I,l)}else p&&(s[`__${o}`]=void 0)}else if(a==="class"){var P=s.namespaceURI==="http://www.w3.org/1999/xhtml";ts(s,P,u,i,r==null?void 0:r[A],t[A])}else if(a==="style"&&u!=null)s.style.cssText=u+"";else if(a==="autofocus")Z(s,!!u);else if(!e&&(a==="__value"||a==="value"&&u!=null))s.value=s.__value=u;else if(a==="selected"&&h)is(s,u);else{var _=a;f||(_=W(_));var k=_==="defaultValue"||_==="defaultChecked";if(u==null&&!e&&!k)if(R[a]=null,_==="value"||_==="checked"){let l=s;const d=r===void 0;if(_==="value"){let o=l.defaultValue;l.removeAttribute(_),l.defaultValue=o,l.value=l.__value=d?o:null}else{let o=l.defaultChecked;l.removeAttribute(_),l.defaultChecked=o,l.checked=d?o:!1}}else s.removeAttribute(a);else k||O.includes(_)&&(e||typeof u!="string")?s[_]=u:typeof u!="function"&&y(s,_,u)}a==="style"&&"__styles"in s&&(s.__styles={})}}}return c&&E(!0),n}var L=new Map;function $(s){var r=L.get(s.nodeName);if(r)return r;L.set(s.nodeName,r=[]);for(var t,i=s,f=Element.prototype;f!==i;){t=U(i);for(var e in t)t[e].set&&r.push(e);i=z(i)}return r}export{A as C,y as a,ts as b,ss as c,ls as d,os as e,us as r,es as s};
