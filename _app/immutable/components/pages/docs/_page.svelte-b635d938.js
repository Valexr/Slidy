import{S as U,i as V,s as j,k as v,w as H,a as C,l as $,m as b,x as N,c as I,h as _,n as y,b as L,y as q,C as p,f as g,d as A,t as k,z as M,$ as z,L as F,q as O,r as P,g as T,B as G}from"../../../chunks/index-33fd8535.js";import{b as J}from"../../../chunks/paths-51f95b7f.js";import{p as K}from"../../../chunks/stores-168346ed.js";import"../../../chunks/masthead.module-a817179b.js";import{H as Q}from"../../../chunks/Header-b037a099.js";import{L as R}from"../../../chunks/Link-9578772e.js";function x(h,l,n){const a=h.slice();return a[2]=l[n].section,a[3]=l[n].items,a}function w(h,l,n){const a=h.slice();return a[6]=l[n].title,a[7]=l[n].href,a}function W(h){let l=h[6]+"",n;return{c(){n=O(l)},l(a){n=P(a,l)},m(a,u){L(a,n,u)},p:G,d(a){a&&_(n)}}}function B(h){let l,n,a,u;return n=new R({props:{href:""+(J+h[7]),$$slots:{default:[W]},$$scope:{ctx:h}}}),{c(){l=v("li"),H(n.$$.fragment),a=C(),this.h()},l(c){l=$(c,"LI",{class:!0});var r=b(l);N(n.$$.fragment,r),a=I(r),r.forEach(_),this.h()},h(){y(l,"class","svelte-1nvy51r")},m(c,r){L(c,l,r),q(n,l,null),p(l,a),u=!0},p(c,r){const o={};r&1024&&(o.$$scope={dirty:r,ctx:c}),n.$set(o)},i(c){u||(g(n.$$.fragment,c),u=!0)},o(c){k(n.$$.fragment,c),u=!1},d(c){c&&_(l),M(n)}}}function D(h){let l,n,a=h[2]+"",u,c,r,o,d,s=h[3],t=[];for(let e=0;e<s.length;e+=1)t[e]=B(w(h,s,e));const m=e=>k(t[e],1,1,()=>{t[e]=null});return{c(){l=v("section"),n=v("h2"),u=O(a),c=C(),r=v("ul");for(let e=0;e<t.length;e+=1)t[e].c();o=C(),this.h()},l(e){l=$(e,"SECTION",{});var f=b(l);n=$(f,"H2",{class:!0});var i=b(n);u=P(i,a),i.forEach(_),c=I(f),r=$(f,"UL",{class:!0});var E=b(r);for(let S=0;S<t.length;S+=1)t[S].l(E);E.forEach(_),o=I(f),f.forEach(_),this.h()},h(){y(n,"class","svelte-1nvy51r"),y(r,"class","svelte-1nvy51r")},m(e,f){L(e,l,f),p(l,n),p(n,u),p(l,c),p(l,r);for(let i=0;i<t.length;i+=1)t[i].m(r,null);p(l,o),d=!0},p(e,f){if(f&2){s=e[3];let i;for(i=0;i<s.length;i+=1){const E=w(e,s,i);t[i]?(t[i].p(E,f),g(t[i],1)):(t[i]=B(E),t[i].c(),g(t[i],1),t[i].m(r,null))}for(T(),i=s.length;i<t.length;i+=1)m(i);A()}},i(e){if(!d){for(let f=0;f<s.length;f+=1)g(t[f]);d=!0}},o(e){t=t.filter(Boolean);for(let f=0;f<t.length;f+=1)k(t[f]);d=!1},d(e){e&&_(l),z(t,e)}}}function X(h){let l,n,a,u,c;n=new Q({props:{className:"surface-2",title:h[0].params.section||"Documentation"}});let r=h[1],o=[];for(let s=0;s<r.length;s+=1)o[s]=D(x(h,r,s));const d=s=>k(o[s],1,1,()=>{o[s]=null});return{c(){l=v("main"),H(n.$$.fragment),a=C(),u=v("div");for(let s=0;s<o.length;s+=1)o[s].c();this.h()},l(s){l=$(s,"MAIN",{class:!0});var t=b(l);N(n.$$.fragment,t),a=I(t),u=$(t,"DIV",{class:!0});var m=b(u);for(let e=0;e<o.length;e+=1)o[e].l(m);m.forEach(_),t.forEach(_),this.h()},h(){y(u,"class","contents svelte-1nvy51r"),y(l,"class","svelte-1nvy51r")},m(s,t){L(s,l,t),q(n,l,null),p(l,a),p(l,u);for(let m=0;m<o.length;m+=1)o[m].m(u,null);c=!0},p(s,[t]){const m={};if(t&1&&(m.title=s[0].params.section||"Documentation"),n.$set(m),t&2){r=s[1];let e;for(e=0;e<r.length;e+=1){const f=x(s,r,e);o[e]?(o[e].p(f,t),g(o[e],1)):(o[e]=D(f),o[e].c(),g(o[e],1),o[e].m(u,null))}for(T(),e=r.length;e<o.length;e+=1)d(e);A()}},i(s){if(!c){g(n.$$.fragment,s);for(let t=0;t<r.length;t+=1)g(o[t]);c=!0}},o(s){k(n.$$.fragment,s),o=o.filter(Boolean);for(let t=0;t<o.length;t+=1)k(o[t]);c=!1},d(s){s&&_(l),M(n),z(o,s)}}}function Y(h,l,n){let a;return F(h,K,c=>n(0,a=c)),[a,[{section:"Core Script",items:[{title:"Core",href:"/docs/core"}]},{section:"Integrations",items:[{title:"Svelte",href:"/docs/svelte"}]},{section:"Extensions",items:[{title:"Animation",href:"/docs/animation"},{title:"Easing",href:"/docs/easing"},{title:"Media",href:"/docs/media"}]}]]}class oe extends U{constructor(l){super(),V(this,l,Y,X,j,{})}}export{oe as default};