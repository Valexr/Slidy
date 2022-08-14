import{S as T,i as U,s as j,l as v,x as q,a as x,m as $,p as b,y as w,c as C,h as _,q as y,b as I,z as A,F as p,f as g,d as B,t as E,C as M,V,N as G,u as z,v as F,g as O,n as J}from"../../chunks/index-29dcbe55.js";import{b as K}from"../../chunks/paths-b9644fda.js";import{p as P}from"../../chunks/stores-f96b6d4c.js";import{L as Q}from"../../chunks/masthead.module-9900917e.js";import{H as R}from"../../chunks/Header-61d1e7c9.js";function D(h,l,n){const a=h.slice();return a[2]=l[n].section,a[3]=l[n].items,a}function L(h,l,n){const a=h.slice();return a[6]=l[n].title,a[7]=l[n].href,a}function W(h){let l=h[6]+"",n;return{c(){n=z(l)},l(a){n=F(a,l)},m(a,u){I(a,n,u)},p:J,d(a){a&&_(n)}}}function N(h){let l,n,a,u;return n=new Q({props:{href:""+(K+h[7]),$$slots:{default:[W]},$$scope:{ctx:h}}}),{c(){l=v("li"),q(n.$$.fragment),a=x(),this.h()},l(c){l=$(c,"LI",{class:!0});var r=b(l);w(n.$$.fragment,r),a=C(r),r.forEach(_),this.h()},h(){y(l,"class","svelte-1nvy51r")},m(c,r){I(c,l,r),A(n,l,null),p(l,a),u=!0},p(c,r){const o={};r&1024&&(o.$$scope={dirty:r,ctx:c}),n.$set(o)},i(c){u||(g(n.$$.fragment,c),u=!0)},o(c){E(n.$$.fragment,c),u=!1},d(c){c&&_(l),M(n)}}}function H(h){let l,n,a=h[2]+"",u,c,r,o,d,s=h[3],t=[];for(let e=0;e<s.length;e+=1)t[e]=N(L(h,s,e));const m=e=>E(t[e],1,1,()=>{t[e]=null});return{c(){l=v("section"),n=v("h2"),u=z(a),c=x(),r=v("ul");for(let e=0;e<t.length;e+=1)t[e].c();o=x(),this.h()},l(e){l=$(e,"SECTION",{});var f=b(l);n=$(f,"H2",{class:!0});var i=b(n);u=F(i,a),i.forEach(_),c=C(f),r=$(f,"UL",{class:!0});var k=b(r);for(let S=0;S<t.length;S+=1)t[S].l(k);k.forEach(_),o=C(f),f.forEach(_),this.h()},h(){y(n,"class","svelte-1nvy51r"),y(r,"class","svelte-1nvy51r")},m(e,f){I(e,l,f),p(l,n),p(n,u),p(l,c),p(l,r);for(let i=0;i<t.length;i+=1)t[i].m(r,null);p(l,o),d=!0},p(e,f){if(f&2){s=e[3];let i;for(i=0;i<s.length;i+=1){const k=L(e,s,i);t[i]?(t[i].p(k,f),g(t[i],1)):(t[i]=N(k),t[i].c(),g(t[i],1),t[i].m(r,null))}for(O(),i=s.length;i<t.length;i+=1)m(i);B()}},i(e){if(!d){for(let f=0;f<s.length;f+=1)g(t[f]);d=!0}},o(e){t=t.filter(Boolean);for(let f=0;f<t.length;f+=1)E(t[f]);d=!1},d(e){e&&_(l),V(t,e)}}}function X(h){let l,n,a,u,c;n=new R({props:{className:"surface-2",title:h[0].params.section||"Documentation"}});let r=h[1],o=[];for(let s=0;s<r.length;s+=1)o[s]=H(D(h,r,s));const d=s=>E(o[s],1,1,()=>{o[s]=null});return{c(){l=v("main"),q(n.$$.fragment),a=x(),u=v("div");for(let s=0;s<o.length;s+=1)o[s].c();this.h()},l(s){l=$(s,"MAIN",{class:!0});var t=b(l);w(n.$$.fragment,t),a=C(t),u=$(t,"DIV",{class:!0});var m=b(u);for(let e=0;e<o.length;e+=1)o[e].l(m);m.forEach(_),t.forEach(_),this.h()},h(){y(u,"class","contents svelte-1nvy51r"),y(l,"class","svelte-1nvy51r")},m(s,t){I(s,l,t),A(n,l,null),p(l,a),p(l,u);for(let m=0;m<o.length;m+=1)o[m].m(u,null);c=!0},p(s,[t]){const m={};if(t&1&&(m.title=s[0].params.section||"Documentation"),n.$set(m),t&2){r=s[1];let e;for(e=0;e<r.length;e+=1){const f=D(s,r,e);o[e]?(o[e].p(f,t),g(o[e],1)):(o[e]=H(f),o[e].c(),g(o[e],1),o[e].m(u,null))}for(O(),e=r.length;e<o.length;e+=1)d(e);B()}},i(s){if(!c){g(n.$$.fragment,s);for(let t=0;t<r.length;t+=1)g(o[t]);c=!0}},o(s){E(n.$$.fragment,s),o=o.filter(Boolean);for(let t=0;t<o.length;t+=1)E(o[t]);c=!1},d(s){s&&_(l),M(n),V(o,s)}}}function Y(h,l,n){let a;return G(h,P,c=>n(0,a=c)),[a,[{section:"Core Script",items:[{title:"Core",href:"/docs/core"}]},{section:"Integrations",items:[{title:"Svelte",href:"/docs/svelte"}]},{section:"Extensions",items:[{title:"Animation",href:"/docs/animation"},{title:"Easing",href:"/docs/easing"},{title:"Media",href:"/docs/media"}]}]]}class se extends T{constructor(l){super(),U(this,l,Y,X,j,{})}}export{se as default};