import{h as D,a as P,b as R}from"../chunks/B-jEmkcL.js";import"../chunks/Czp1GZy9.js";import{aC as j,m as q,n as y,p as B,aH as U,D as x,A as W,X as I,T as k,S as A,ar as E,aI as H,aJ as N,w as G,x as J,y as M,az as K,v as L,c as V,a7 as X,a8 as Z,a5 as F,$ as O,a1 as Q,i as Y}from"../chunks/iUKnLhpC.js";import{i as z}from"../chunks/FogZw5sa.js";import{S as tt,y as et}from"../chunks/DR_SDhMO.js";const S=0,v=1,$=2;function at(t,e,a,o,h){y&&B();var n=t,u=j(),l=V,i=I,p,s,f,d=(u?k:A)(void 0),w=(u?k:A)(void 0),g=!1;function _(r,m){g=!0,m&&(E(b),H(b),N(l));try{r===v&&o&&(s?G(s):s=J(()=>o(n,d))),r!==S&&p&&M(p,()=>p=null),r!==v&&s&&M(s,()=>s=null),r!==$&&f&&M(f,()=>f=null)}finally{m&&(N(null),H(null),E(null),K())}}var b=q(()=>{if(i!==(i=e())){if(U(i)){var r=i;g=!1,r.then(m=>{r===i&&(x(d,m),_(v,!0))},m=>{if(r===i)throw x(w,m),_($,!0),w.v}),y||W(()=>{g||_(S,!0)})}else x(d,i),_(v,!1);return()=>i=I}});y&&(n=L)}const nt=(t,e,a)=>Math.min(Math.max(t,e),a),ot=async({limit:t=5,width:e=window.innerWidth,height:a=window.innerHeight})=>{try{return await it(t,{width:e,height:a})}catch(o){console.error(`Could not fetch photos: ${o}`)}};async function it(t=9,e={width:window.innerWidth,height:window.innerHeight}){const a="https://raw.githubusercontent.com/Valexr/Slidy/master/assets/static/photos.json",o=Array.from({length:t},()=>Math.floor(Math.random()*24644));return(await(await fetch(a)).json()).reduce((l,[i,p,s],f)=>{if(o.includes(f)){const d={width:e.height*(p/10),height:e.height},w={width:e.width,height:e.height},g=`?w=${u(T(d,w).width)}`;l.push({id:f,src:`https://images.unsplash.com/photo-${i}${g}`,alt:`Image by ${s} from Unsplash`,...T(d,w)})}return l},[]);function u(l){return l*devicePixelRatio}}const T=(t,e)=>{const a=Math.min(e.width/t.width,e.height,t.height);return{width:Math.round(t.width*a),height:Math.round(t.height*a)}},C=!!globalThis.window,rt=(t,e=new Set)=>{const a=n=>(e.add(n),n(t),()=>{e.delete(n)}),o=n=>e.forEach(u=>u(n));return[a,n=>o(t=n(t))]},st=C&&matchMedia("(prefers-color-scheme: dark)").matches,[ct,gt]=rt(st);ct(t=>{C&&document.documentElement.setAttribute("scheme",t?"dark":"light")});let c=[];async function ht(t=10){c=await ot({limit:nt(3,t,10)})}async function ut(t=10){return c!=null&&c.length||await ht(),c==null?void 0:c.sort(()=>.5-Math.random()).slice(0,t)}var lt=R('<main class="svelte-gogyl2"><!></main>');function _t(t,e){X(e,!1),z();var a=lt();D(h=>{F.title="Slidy 3.1.0 - SvelteKit"});var o=O(a);at(o,()=>ut(10),null,(h,n)=>{tt(h,{animation:et,duration:450,gravity:1.45,snap:"center",thumbnail:!0,index:4,get slides(){return Y(n)},arrows:!0,loop:!0})}),Q(a),P(t,a),Z()}export{_t as component};
