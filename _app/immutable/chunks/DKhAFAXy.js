import{D,m as Y,V as z,A as K,a4 as J,S as Q,o as _,x as W,aF as X,aG as Z,ag as y,aH as m,w as $,aI as x}from"./CdgbeYTC.js";import{i as rr,g as fr,j as ir,n as tr,k as sr}from"./D4OEgraR.js";function ur(r,i){if(i){const f=document.body;r.autofocus=!0,D(()=>{document.activeElement===f&&r.focus()})}}let k=!1;function ar(){k||(k=!0,document.addEventListener("reset",r=>{Promise.resolve().then(()=>{var i;if(!r.defaultPrevented)for(const f of r.target.elements)(i=f.__on_r)==null||i.call(f)})},{capture:!0}))}function Ar(r,i,...f){var t=r,s=J,u;Y(()=>{s!==(s=i())&&(u&&(Q(u),u=null),u=K(()=>s(t,...f)))},z),_&&(t=W)}function F(r){var i,f,t="";if(typeof r=="string"||typeof r=="number")t+=r;else if(typeof r=="object")if(Array.isArray(r)){var s=r.length;for(i=0;i<s;i++)r[i]&&(f=F(r[i]))&&(t&&(t+=" "),t+=f)}else for(f in r)r[f]&&(t&&(t+=" "),t+=f);return t}function or(){for(var r,i,f=0,t="",s=arguments.length;f<s;f++)(r=arguments[f])&&(i=F(r))&&(t&&(t+=" "),t+=i);return t}function er(r){return typeof r=="object"?or(r):r??""}const w=[...` 	
\r\f \v\uFEFF`];function cr(r,i,f){var t=r==null?"":""+r;if(i&&(t=t?t+" "+i:i),f){for(var s in f)if(f[s])t=t?t+" "+s:s;else if(t.length)for(var u=s.length,e=0;(e=t.indexOf(s,e))>=0;){var l=e+u;(e===0||w.includes(t[e-1]))&&(l===t.length||w.includes(t[l]))?t=(e===0?"":t.substring(0,e))+t.substring(l+1):e=l}}return t===""?null:t}function j(r,i=!1){var f=i?" !important;":";",t="";for(var s in r){var u=r[s];u!=null&&u!==""&&(t+=" "+s+": "+u+f)}return t}function I(r){return r[0]!=="-"||r[1]!=="-"?r.toLowerCase():r}function lr(r,i){if(i){var f="",t,s;if(Array.isArray(i)?(t=i[0],s=i[1]):t=i,r){r=String(r).replaceAll(/\s*\/\*.*?\*\/\s*/g,"").trim();var u=!1,e=0,l=!1,A=[];t&&A.push(...Object.keys(t).map(I)),s&&A.push(...Object.keys(s).map(I));var c=0,b=-1;const p=r.length;for(var v=0;v<p;v++){var d=r[v];if(l?d==="/"&&r[v-1]==="*"&&(l=!1):u?u===d&&(u=!1):d==="/"&&r[v+1]==="*"?l=!0:d==='"'||d==="'"?u=d:d==="("?e++:d===")"&&e--,!l&&u===!1&&e===0){if(d===":"&&b===-1)b=v;else if(d===";"||v===p-1){if(b!==-1){var C=I(r.substring(c,b).trim());if(!A.includes(C)){d!==";"&&v++;var L=r.substring(c,v).trim();f+=" "+L+";"}}c=v+1,b=-1}}}}return t&&(f+=j(t)),s&&(f+=j(s,!0)),f=f.trim(),f===""?null:f}return r==null?null:String(r)}function nr(r,i,f,t,s,u){var e=r.__className;if(_||e!==f){var l=cr(f,t,u);(!_||l!==r.getAttribute("class"))&&(l==null?r.removeAttribute("class"):i?r.className=l:r.setAttribute("class",l)),r.__className=f}else if(u&&s!==u)for(var A in u){var c=!!u[A];(s==null||c!==!!s[A])&&r.classList.toggle(A,c)}return u}function P(r,i={},f,t){for(var s in f){var u=f[s];i[s]!==u&&(f[s]==null?r.style.removeProperty(s):r.style.setProperty(s,u,t))}}function vr(r,i,f,t){var s=r.__style;if(_||s!==i){var u=lr(i,t);(!_||u!==r.getAttribute("style"))&&(u==null?r.removeAttribute("style"):r.style.cssText=u),r.__style=i}else t&&(Array.isArray(t)?(P(r,f==null?void 0:f[0],t[0]),P(r,f==null?void 0:f[1],t[1],"important")):P(r,f,t));return t}const N=Symbol("class"),E=Symbol("style"),G=Symbol("is custom element"),H=Symbol("is html");function br(r){if(_){var i=!1,f=()=>{if(!i){if(i=!0,r.hasAttribute("value")){var t=r.value;T(r,"value",null),r.value=t}if(r.hasAttribute("checked")){var s=r.checked;T(r,"checked",null),r.checked=s}}};r.__on_r=f,x(f),ar()}}function _r(r,i){var f=M(r);f.value===(f.value=i??void 0)||r.value===i&&(i!==0||r.nodeName!=="PROGRESS")||(r.value=i??"")}function dr(r,i){i?r.hasAttribute("selected")||r.setAttribute("selected",""):r.removeAttribute("selected")}function T(r,i,f,t){var s=M(r);_&&(s[i]=r.getAttribute(i),i==="src"||i==="srcset"||i==="href"&&r.nodeName==="LINK")||s[i]!==(s[i]=f)&&(i==="loading"&&(r[X]=f),f==null?r.removeAttribute(i):typeof f!="string"&&U(r).includes(i)?r[i]=f:r.setAttribute(i,f))}function Sr(r,i,f,t,s=!1){var u=M(r),e=u[G],l=!u[H];let A=_&&e;A&&$(!1);var c=i||{},b=r.tagName==="OPTION";for(var v in i)v in f||(f[v]=null);f.class?f.class=er(f.class):f[N]&&(f.class=null),f[E]&&(f.style??(f.style=null));var d=U(r);for(const a in f){let o=f[a];if(b&&a==="value"&&o==null){r.value=r.__value="",c[a]=o;continue}if(a==="class"){var C=r.namespaceURI==="http://www.w3.org/1999/xhtml";nr(r,C,o,t,i==null?void 0:i[N],f[N]),c[a]=o,c[N]=f[N];continue}if(a==="style"){vr(r,o,i==null?void 0:i[E],f[E]),c[a]=o,c[E]=f[E];continue}var L=c[a];if(o!==L){c[a]=o;var p=a[0]+a[1];if(p!=="$$")if(p==="on"){const g={},S="$$"+a;let n=a.slice(2);var O=sr(n);if(rr(n)&&(n=n.slice(0,-7),g.capture=!0),!O&&L){if(o!=null)continue;r.removeEventListener(n,c[S],g),c[S]=null}if(o!=null)if(O)r[`__${n}`]=o,ir([n]);else{let q=function(B){c[a].call(this,B)};c[S]=fr(n,r,q,g)}else O&&(r[`__${n}`]=void 0)}else if(a==="style")T(r,a,o);else if(a==="autofocus")ur(r,!!o);else if(!e&&(a==="__value"||a==="value"&&o!=null))r.value=r.__value=o;else if(a==="selected"&&b)dr(r,o);else{var h=a;l||(h=tr(h));var R=h==="defaultValue"||h==="defaultChecked";if(o==null&&!e&&!R)if(u[a]=null,h==="value"||h==="checked"){let g=r;const S=i===void 0;if(h==="value"){let n=g.defaultValue;g.removeAttribute(h),g.defaultValue=n,g.value=g.__value=S?n:null}else{let n=g.defaultChecked;g.removeAttribute(h),g.defaultChecked=n,g.checked=S?n:!1}}else r.removeAttribute(a);else R||d.includes(h)&&(e||typeof o!="string")?r[h]=o:typeof o!="function"&&T(r,h,o)}}}return A&&$(!0),c}function M(r){return r.__attributes??(r.__attributes={[G]:r.nodeName.includes("-"),[H]:r.namespaceURI===Z})}var V=new Map;function U(r){var i=V.get(r.nodeName);if(i)return i;V.set(r.nodeName,i=[]);for(var f,t=r,s=Element.prototype;s!==t;){f=m(t);for(var u in f)f[u].set&&i.push(u);t=y(t)}return i}export{N as C,T as a,nr as b,er as c,Sr as d,vr as e,_r as f,br as r,Ar as s};
