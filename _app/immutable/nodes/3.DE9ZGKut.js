import{a as s,b as l,t as P,s as h}from"../chunks/disclose-version.CFA5S5ly.js";import"../chunks/legacy.CWwcWAHK.js";import{a3 as Z,a5 as j,i as t,_ as a,Z as u,a0 as e,$ as w,a7 as _,a8 as z}from"../chunks/runtime.D3Yf1DbQ.js";import{e as g,i as x}from"../chunks/each.CrbwzhmJ.js";import{i as B}from"../chunks/lifecycle.tzskIO6e.js";import{a as F,b as G}from"../chunks/props.CT7XKP0I.js";import{b as J}from"../chunks/entry.Dco_U2px.js";import{p as K}from"../chunks/stores.C6mJp03L.js";import{L as O}from"../chunks/Link.NJf7SeqF.js";import{H as Q}from"../chunks/Header.DP0CPmCL.js";var R=l('<li class="svelte-1nvy51r"><!></li>'),T=l('<section><h2 class="svelte-1nvy51r"> </h2> <ul class="svelte-1nvy51r"></ul></section>'),U=l('<main class="svelte-1nvy51r"><!> <div class="contents svelte-1nvy51r"></div></main>');function ne($,b){Z(b,!1);const y=F(),C=()=>G(K,"$page",y),E=[{section:"Core Script",items:[{title:"Core",href:"/docs/core"}]},{section:"Integrations",items:[{title:"Svelte",href:"/docs/svelte"}]},{section:"Extensions",items:[{title:"Animation",href:"/docs/animation"},{title:"Easing",href:"/docs/easing"},{title:"Media",href:"/docs/media"}]}];B();var r=U(),c=a(r),H=z(()=>C().params.section||"Documentation");Q(c,{className:"surface-2",get title(){return t(H)}});var m=u(c,2);g(m,5,()=>E,x,(L,v)=>{let S=()=>t(v).section,k=()=>t(v).items;var i=T(),o=a(i),q=a(o,!0);e(o);var p=u(o,2);g(p,5,k,x,(A,f)=>{let D=()=>t(f).title,I=()=>t(f).href;var n=R(),M=a(n);O(M,{get href(){return`${J??""}${I()??""}`},children:(N,V)=>{w();var d=P();_(()=>h(d,D())),s(N,d)},$$slots:{default:!0}}),e(n),s(A,n)}),e(p),e(i),_(()=>h(q,S())),s(L,i)}),e(m),e(r),s($,r),j()}export{ne as component};