import{S as Y,i as Z,s as J,k as b,w as H,a as C,l as E,m as w,x as P,c as I,h as g,n as A,b as N,y as S,C as k,f as p,d as q,t as v,z,$ as K,q as Q,r as U,u as W,p as M,e as O,g as y,B as x}from"../../../../chunks/index-2179246c.js";import{c as R}from"../../../../chunks/shared-23917130.js";import"../../../../chunks/masthead.module-d477a562.js";import{H as ee}from"../../../../chunks/Header-64fc34f0.js";import{L as te}from"../../../../chunks/Link-e80ccb5b.js";const le="_main_1d77f_1",ae="_nav_1d77f_19",T={main:le,nav:ae},ne="_article_twloe_1",oe={article:ne};function V(s,e,a){const l=s.slice();return l[1]=e[a],l}function j(s,e,a){const l=s.slice();return l[4]=e[a].level,l[5]=e[a].title,l[6]=e[a].id,l}function re(s){let e,a=s[0].description+"",l;return{c(){e=b("p"),l=Q(a)},l(t){e=E(t,"P",{});var f=w(e);l=U(f,a),f.forEach(g)},m(t,f){N(t,e,f),k(e,l)},p(t,f){f&1&&a!==(a=t[0].description+"")&&W(l,a)},d(t){t&&g(e)}}}function se(s){let e=s[5]+"",a;return{c(){a=Q(e)},l(l){a=U(l,e)},m(l,t){N(l,a,t)},p(l,t){t&1&&e!==(e=l[5]+"")&&W(a,e)},d(l){l&&g(a)}}}function D(s){let e,a,l,t,f;return a=new te({props:{href:R+"#"+s[6],$$slots:{default:[se]},$$scope:{ctx:s}}}),{c(){e=b("li"),H(a.$$.fragment),l=C(),this.h()},l(n){e=E(n,"LI",{"data-level":!0});var o=w(e);P(a.$$.fragment,o),l=I(o),o.forEach(g),this.h()},h(){A(e,"data-level",t=s[4]),M(e,"--toc-level",s[4])},m(n,o){N(n,e,o),S(a,e,null),k(e,l),f=!0},p(n,o){const h={};o&1&&(h.href=R+"#"+n[6]),o&513&&(h.$$scope={dirty:o,ctx:n}),a.$set(h),(!f||o&1&&t!==(t=n[4]))&&A(e,"data-level",t),o&1&&M(e,"--toc-level",n[4])},i(n){f||(p(a.$$.fragment,n),f=!0)},o(n){v(a.$$.fragment,n),f=!1},d(n){n&&g(e),z(a)}}}function F(s){let e,a;return e=new s[1]({}),{c(){H(e.$$.fragment)},l(l){P(e.$$.fragment,l)},m(l,t){S(e,l,t),a=!0},i(l){a||(p(e.$$.fragment,l),a=!0)},o(l){v(e.$$.fragment,l),a=!1},d(l){z(e,l)}}}function G(s){let e,a,l=s[0].pages,t=[];for(let n=0;n<l.length;n+=1)t[n]=F(V(s,l,n));const f=n=>v(t[n],1,1,()=>{t[n]=null});return{c(){for(let n=0;n<t.length;n+=1)t[n].c();e=O()},l(n){for(let o=0;o<t.length;o+=1)t[o].l(n);e=O()},m(n,o){for(let h=0;h<t.length;h+=1)t[h].m(n,o);N(n,e,o),a=!0},p(n,o){if(o&1){const h=l.length;l=n[0].pages;let _;for(_=h;_<l.length;_+=1){const d=V(n,l,_);t[_]?p(t[_],1):(t[_]=F(d),t[_].c(),p(t[_],1),t[_].m(e.parentNode,e))}for(y(),_=l.length;_<t.length;_+=1)f(_);q()}},i(n){if(!a){for(let o=0;o<l.length;o+=1)p(t[o]);a=!0}},o(n){t=t.filter(Boolean);for(let o=0;o<t.length;o+=1)v(t[o]);a=!1},d(n){K(t,n),n&&g(e)}}}function ce(s){let e,a,l,t,f,n,o,h=s[0].pages,_;a=new ee({props:{className:"surface-2",title:s[0].title,$$slots:{default:[re]},$$scope:{ctx:s}}});let d=s[0].toc,i=[];for(let r=0;r<d.length;r+=1)i[r]=D(j(s,d,r));const X=r=>v(i[r],1,1,()=>{i[r]=null});let m=G(s);return{c(){e=b("main"),H(a.$$.fragment),l=C(),t=b("nav"),f=b("ol");for(let r=0;r<i.length;r+=1)i[r].c();n=C(),o=b("article"),m.c(),this.h()},l(r){e=E(r,"MAIN",{class:!0});var c=w(e);P(a.$$.fragment,c),l=I(c),t=E(c,"NAV",{class:!0});var $=w(t);f=E($,"OL",{});var u=w(f);for(let B=0;B<i.length;B+=1)i[B].l(u);u.forEach(g),$.forEach(g),n=I(c),o=E(c,"ARTICLE",{class:!0});var L=w(o);m.l(L),L.forEach(g),c.forEach(g),this.h()},h(){A(t,"class","surface-1 "+T.nav),A(o,"class",oe.article),A(e,"class",T.main)},m(r,c){N(r,e,c),S(a,e,null),k(e,l),k(e,t),k(t,f);for(let $=0;$<i.length;$+=1)i[$].m(f,null);k(e,n),k(e,o),m.m(o,null),_=!0},p(r,[c]){const $={};if(c&1&&($.title=r[0].title),c&513&&($.$$scope={dirty:c,ctx:r}),a.$set($),c&1){d=r[0].toc;let u;for(u=0;u<d.length;u+=1){const L=j(r,d,u);i[u]?(i[u].p(L,c),p(i[u],1)):(i[u]=D(L),i[u].c(),p(i[u],1),i[u].m(f,null))}for(y(),u=d.length;u<i.length;u+=1)X(u);q()}c&1&&J(h,h=r[0].pages)?(y(),v(m,1,1,x),q(),m=G(r),m.c(),p(m,1),m.m(o,null)):m.p(r,c)},i(r){if(!_){p(a.$$.fragment,r);for(let c=0;c<d.length;c+=1)p(i[c]);p(m),_=!0}},o(r){v(a.$$.fragment,r),i=i.filter(Boolean);for(let c=0;c<i.length;c+=1)v(i[c]);v(m),_=!1},d(r){r&&g(e),z(a),K(i,r),m.d(r)}}}function ie(s,e,a){let{data:l}=e;return s.$$set=t=>{"data"in t&&a(0,l=t.data)},[l]}class pe extends Y{constructor(e){super(),Z(this,e,ie,ce,J,{data:0})}}export{pe as default};
