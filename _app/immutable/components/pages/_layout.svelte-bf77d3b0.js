import{S as V,i as q,s as G,k as g,x as w,q as I,a as T,l as v,m as k,y as S,r as L,h as u,c as y,n as h,b as m,D as d,z as A,f as p,t as _,A as C,E as Y,F as j,G as B,H as Q,I as W,J as X,K as Z,L as x,M as ee,N as te,C as ne}from"../../chunks/index-9fe0f8b0.js";import{s as se,a as U,b as ae}from"../../chunks/masthead.module-d477a562.js";import{p as re,a as le,b as oe}from"../../chunks/paths-e4936b55.js";import{L as H}from"../../chunks/Link-dbf87492.js";import{b as P}from"../../chunks/paths-1fa7cd77.js";import{p as fe}from"../../chunks/stores-d38fcb34.js";function ie(o){let e;return{c(){e=I("Slidy")},l(t){e=L(t,"Slidy")},m(t,n){m(t,e,n)},d(t){t&&u(e)}}}function ue(o){let e;return{c(){e=I("MIT licence")},l(t){e=L(t,"MIT licence")},m(t,n){m(t,e,n)},d(t){t&&u(e)}}}function $e(o){let e;return{c(){e=I("Alexander Volkov & Slidy Contributors")},l(t){e=L(t,"Alexander Volkov & Slidy Contributors")},m(t,n){m(t,e,n)},d(t){t&&u(e)}}}function ce(o){let e,t,n,l,r,f,s,a,i,$,b=new Date().getFullYear()+"",z,J,M,R;return r=new H({props:{href:re,$$slots:{default:[ie]},$$scope:{ctx:o}}}),s=new H({props:{href:le,$$slots:{default:[ue]},$$scope:{ctx:o}}}),M=new H({props:{href:oe,$$slots:{default:[$e]},$$scope:{ctx:o}}}),{c(){e=g("footer"),t=g("div"),n=g("section"),l=g("span"),w(r.$$.fragment),f=I(" is released under the "),w(s.$$.fragment),a=T(),i=g("span"),$=I("© "),z=I(b),J=T(),w(M.$$.fragment),this.h()},l(c){e=v(c,"FOOTER",{class:!0});var E=k(e);t=v(E,"DIV",{class:!0});var O=k(t);n=v(O,"SECTION",{label:!0});var N=k(n);l=v(N,"SPAN",{});var D=k(l);S(r.$$.fragment,D),f=L(D," is released under the "),S(s.$$.fragment,D),D.forEach(u),a=y(N),i=v(N,"SPAN",{});var F=k(i);$=L(F,"© "),z=L(F,b),J=y(F),S(M.$$.fragment,F),F.forEach(u),N.forEach(u),O.forEach(u),E.forEach(u),this.h()},h(){h(n,"label","user"),h(t,"class","container wrapper"),h(e,"class",se.footer+" surface-2")},m(c,E){m(c,e,E),d(e,t),d(t,n),d(n,l),A(r,l,null),d(l,f),A(s,l,null),d(n,a),d(n,i),d(i,$),d(i,z),d(i,J),A(M,i,null),R=!0},p(c,[E]){const O={};E&1&&(O.$$scope={dirty:E,ctx:c}),r.$set(O);const N={};E&1&&(N.$$scope={dirty:E,ctx:c}),s.$set(N);const D={};E&1&&(D.$$scope={dirty:E,ctx:c}),M.$set(D)},i(c){R||(p(r.$$.fragment,c),p(s.$$.fragment,c),p(M.$$.fragment,c),R=!0)},o(c){_(r.$$.fragment,c),_(s.$$.fragment,c),_(M.$$.fragment,c),R=!1},d(c){c&&u(e),C(r),C(s),C(M)}}}class me extends V{constructor(e){super(),q(this,e,null,ce,G,{})}}function pe(o){let e,t,n;const l=o[1].default,r=Y(l,o,o[0],null);return{c(){e=g("nav"),t=g("ul"),r&&r.c(),this.h()},l(f){e=v(f,"NAV",{class:!0});var s=k(e);t=v(s,"UL",{class:!0});var a=k(t);r&&r.l(a),a.forEach(u),s.forEach(u),this.h()},h(){h(t,"class",U["menu-items"]),h(e,"class",U["menu-container"])},m(f,s){m(f,e,s),d(e,t),r&&r.m(t,null),n=!0},p(f,[s]){r&&r.p&&(!n||s&1)&&j(r,l,f,f[0],n?Q(l,f[0],s,null):B(f[0]),null)},i(f){n||(p(r,f),n=!0)},o(f){_(r,f),n=!1},d(f){f&&u(e),r&&r.d(f)}}}function _e(o,e,t){let{$$slots:n={},$$scope:l}=e;return W("page",fe),o.$$set=r=>{"$$scope"in r&&t(0,l=r.$$scope)},[l,n]}class de extends V{constructor(e){super(),q(this,e,_e,pe,G,{})}}function he(o,{pattern:e,current:t}){const n=o.firstElementChild,l=n.getAttribute("href");function r({pattern:f,current:s}){f&&f instanceof RegExp?f.test(s)?n.setAttribute("aria-current","page"):n.removeAttribute("aria-current"):!f&&s===l?n.setAttribute("aria-current","page"):n.removeAttribute("aria-current")}return r({pattern:e,current:t}),{update:r}}function ge(o){let e;const t=o[5].default,n=Y(t,o,o[6],null);return{c(){n&&n.c()},l(l){n&&n.l(l)},m(l,r){n&&n.m(l,r),e=!0},p(l,r){n&&n.p&&(!e||r&64)&&j(n,t,l,l[6],e?Q(t,l[6],r,null):B(l[6]),null)},i(l){e||(p(n,l),e=!0)},o(l){_(n,l),e=!1},d(l){n&&n.d(l)}}}function ve(o){let e,t,n,l,r,f;return t=new H({props:{href:o[0],disabled:o[1],$$slots:{default:[ge]},$$scope:{ctx:o}}}),{c(){e=g("li"),w(t.$$.fragment),this.h()},l(s){e=v(s,"LI",{class:!0});var a=k(e);S(t.$$.fragment,a),a.forEach(u),this.h()},h(){h(e,"class",U["menu-item"])},m(s,a){m(s,e,a),A(t,e,null),l=!0,r||(f=X(n=he.call(null,e,{current:o[3].url.pathname,pattern:o[2]})),r=!0)},p(s,[a]){const i={};a&1&&(i.href=s[0]),a&2&&(i.disabled=s[1]),a&64&&(i.$$scope={dirty:a,ctx:s}),t.$set(i),n&&Z(n.update)&&a&12&&n.update.call(null,{current:s[3].url.pathname,pattern:s[2]})},i(s){l||(p(t.$$.fragment,s),l=!0)},o(s){_(t.$$.fragment,s),l=!1},d(s){s&&u(e),C(t),r=!1,f()}}}function be(o,e,t){let n,{$$slots:l={},$$scope:r}=e,{href:f=""}=e,{disabled:s=!1}=e,{pattern:a=null}=e;const i=x("page");return ee(o,i,$=>t(3,n=$)),o.$$set=$=>{"href"in $&&t(0,f=$.href),"disabled"in $&&t(1,s=$.disabled),"pattern"in $&&t(2,a=$.pattern),"$$scope"in $&&t(6,r=$.$$scope)},[f,s,a,n,i,l,r]}class K extends V{constructor(e){super(),q(this,e,be,ve,G,{href:0,disabled:1,pattern:2})}}function Ee(o){let e,t,n;return{c(){e=g("img"),n=I(`
			Slidy`),this.h()},l(l){e=v(l,"IMG",{src:!0,alt:!0,width:!0,height:!0}),n=L(l,`
			Slidy`),this.h()},h(){te(e.src,t=P+"/Slidy.svg")||h(e,"src",t),h(e,"alt","Slidy"),h(e,"width","32"),h(e,"height","32")},m(l,r){m(l,e,r),m(l,n,r)},p:ne,d(l){l&&u(e),l&&u(n)}}}function ke(o){let e;return{c(){e=I("Home")},l(t){e=L(t,"Home")},m(t,n){m(t,e,n)},d(t){t&&u(e)}}}function we(o){let e;return{c(){e=I("Playground")},l(t){e=L(t,"Playground")},m(t,n){m(t,e,n)},d(t){t&&u(e)}}}function Se(o){let e;return{c(){e=I("Docs")},l(t){e=L(t,"Docs")},m(t,n){m(t,e,n)},d(t){t&&u(e)}}}function Ae(o){let e,t,n,l,r,f;return e=new K({props:{href:P+"/",pattern:/\/home/,$$slots:{default:[ke]},$$scope:{ctx:o}}}),n=new K({props:{href:P+"/playground",pattern:/\/playground/,$$slots:{default:[we]},$$scope:{ctx:o}}}),r=new K({props:{href:P+"/docs",pattern:/\/docs/,$$slots:{default:[Se]},$$scope:{ctx:o}}}),{c(){w(e.$$.fragment),t=T(),w(n.$$.fragment),l=T(),w(r.$$.fragment)},l(s){S(e.$$.fragment,s),t=y(s),S(n.$$.fragment,s),l=y(s),S(r.$$.fragment,s)},m(s,a){A(e,s,a),m(s,t,a),A(n,s,a),m(s,l,a),A(r,s,a),f=!0},p(s,a){const i={};a&1&&(i.$$scope={dirty:a,ctx:s}),e.$set(i);const $={};a&1&&($.$$scope={dirty:a,ctx:s}),n.$set($);const b={};a&1&&(b.$$scope={dirty:a,ctx:s}),r.$set(b)},i(s){f||(p(e.$$.fragment,s),p(n.$$.fragment,s),p(r.$$.fragment,s),f=!0)},o(s){_(e.$$.fragment,s),_(n.$$.fragment,s),_(r.$$.fragment,s),f=!1},d(s){C(e,s),s&&u(t),C(n,s),s&&u(l),C(r,s)}}}function Ce(o){let e,t,n,l,r,f,s;return n=new H({props:{href:P+"/",$$slots:{default:[Ee]},$$scope:{ctx:o}}}),f=new de({props:{$$slots:{default:[Ae]},$$scope:{ctx:o}}}),{c(){e=g("header"),t=g("section"),w(n.$$.fragment),l=T(),r=g("section"),w(f.$$.fragment),this.h()},l(a){e=v(a,"HEADER",{class:!0});var i=k(e);t=v(i,"SECTION",{label:!0});var $=k(t);S(n.$$.fragment,$),$.forEach(u),l=y(i),r=v(i,"SECTION",{label:!0});var b=k(r);S(f.$$.fragment,b),b.forEach(u),i.forEach(u),this.h()},h(){h(t,"label","logo"),h(r,"label","navigation"),h(e,"class",`contents ${ae.masthead}`)},m(a,i){m(a,e,i),d(e,t),A(n,t,null),d(e,l),d(e,r),A(f,r,null),s=!0},p(a,[i]){const $={};i&1&&($.$$scope={dirty:i,ctx:a}),n.$set($);const b={};i&1&&(b.$$scope={dirty:i,ctx:a}),f.$set(b)},i(a){s||(p(n.$$.fragment,a),p(f.$$.fragment,a),s=!0)},o(a){_(n.$$.fragment,a),_(f.$$.fragment,a),s=!1},d(a){a&&u(e),C(n),C(f)}}}class Ie extends V{constructor(e){super(),q(this,e,null,Ce,G,{})}}function Le(o){let e,t,n,l,r;e=new Ie({});const f=o[1].default,s=Y(f,o,o[0],null);return l=new me({}),{c(){w(e.$$.fragment),t=T(),s&&s.c(),n=T(),w(l.$$.fragment)},l(a){S(e.$$.fragment,a),t=y(a),s&&s.l(a),n=y(a),S(l.$$.fragment,a)},m(a,i){A(e,a,i),m(a,t,i),s&&s.m(a,i),m(a,n,i),A(l,a,i),r=!0},p(a,[i]){s&&s.p&&(!r||i&1)&&j(s,f,a,a[0],r?Q(f,a[0],i,null):B(a[0]),null)},i(a){r||(p(e.$$.fragment,a),p(s,a),p(l.$$.fragment,a),r=!0)},o(a){_(e.$$.fragment,a),_(s,a),_(l.$$.fragment,a),r=!1},d(a){C(e,a),a&&u(t),s&&s.d(a),a&&u(n),C(l,a)}}}function Me(o,e,t){let{$$slots:n={},$$scope:l}=e;return o.$$set=r=>{"$$scope"in r&&t(0,l=r.$$scope)},[l,n]}class He extends V{constructor(e){super(),q(this,e,Me,Le,G,{})}}export{He as default};
