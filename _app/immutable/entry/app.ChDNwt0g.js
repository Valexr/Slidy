const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["../nodes/0.D-wpd8Uv.js","../chunks/BcWP8BRI.js","../chunks/C91Fk0F4.js","../chunks/DgF3bb_P.js","../chunks/ONP6PINT.js","../chunks/5ELpOJT1.js","../assets/Link.DxOb0eqM.css","../chunks/BhC3-E8R.js","../chunks/Dl81--Hu.js","../chunks/YCAjTuvs.js","../chunks/Cz9MwYQP.js","../chunks/DK2rW0tW.js","../chunks/CU29SNXn.js","../chunks/CAXAs5fv.js","../assets/0.Cp6bGb17.css","../nodes/1.Cs-Twv9h.js","../nodes/2.CibqPZV6.js","../chunks/DHkZNRG6.js","../chunks/C7VPxQHW.js","../chunks/BltdGswM.js","../chunks/PwPRnE0L.js","../assets/slidy.C5dl-wMS.css","../chunks/Br4UIoS0.js","../assets/Header.DXG2A6kV.css","../assets/2.mwTylsHI.css","../nodes/3.5_xXsW6c.js","../assets/3.myEnoLWL.css","../nodes/4.Dy3Gh3pW.js","../chunks/BTpql59K.js","../assets/4.BP-EEqAF.css","../nodes/5.DdnTHAC-.js","../assets/5.CIJtcSUX.css"])))=>i.map(i=>d[i]);
var Y=e=>{throw TypeError(e)};var q=(e,t,r)=>t.has(e)||Y("Cannot "+r);var c=(e,t,r)=>(q(e,t,"read from private field"),r?r.call(e):t.get(e)),L=(e,t,r)=>t.has(e)?Y("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(e):t.set(e,r),A=(e,t,r,i)=>(q(e,t,"write to private field"),i?i.call(e,r):t.set(e,r),r);import{c as T,_ as y}from"../chunks/BTpql59K.js";import{e as N,r as Q,b as U,D as W,a8 as X,ac as R,ap as $,i as l,av as tt,ah as et,L as rt,a6 as st,f as at,u as ot,aw as k,ax as it,Y as O,Z as nt,a7 as ct,_ as ut,a0 as ft,j as w,a5 as dt}from"../chunks/C91Fk0F4.js";import{f as mt,m as lt,u as _t,t as G,b as E,e as D,a as ht,s as vt}from"../chunks/BcWP8BRI.js";import{i as I}from"../chunks/C7VPxQHW.js";import{p as V,c as gt}from"../chunks/5ELpOJT1.js";import{o as yt}from"../chunks/DK2rW0tW.js";function B(e,t){return e===t||(e==null?void 0:e[X])===t}function j(e={},t,r,i){return N(()=>{var o,n;return Q(()=>{o=n,n=[],U(()=>{e!==r(...n)&&(t(e,...n),o&&B(r(...o),e)&&t(null,...o))})}),()=>{W(()=>{n&&B(r(...n),e)&&t(null,...n)})}}),e}function Et(e){return class extends Pt{constructor(t){super({component:e,...t})}}}var _,f;class Pt{constructor(t){L(this,_);L(this,f);var n;var r=new Map,i=(s,a)=>{var h=rt(a);return r.set(s,h),h};const o=new Proxy({...t.props||{},$$events:{}},{get(s,a){return l(r.get(a)??i(a,Reflect.get(s,a)))},has(s,a){return a===$?!0:(l(r.get(a)??i(a,Reflect.get(s,a))),Reflect.has(s,a))},set(s,a,h){return R(r.get(a)??i(a,h),h),Reflect.set(s,a,h)}});A(this,f,(t.hydrate?mt:lt)(t.component,{target:t.target,anchor:t.anchor,props:o,context:t.context,intro:t.intro??!1,recover:t.recover})),(!((n=t==null?void 0:t.props)!=null&&n.$$host)||t.sync===!1)&&tt(),A(this,_,o.$$events);for(const s of Object.keys(c(this,f)))s==="$set"||s==="$destroy"||s==="$on"||et(this,s,{get(){return c(this,f)[s]},set(a){c(this,f)[s]=a},enumerable:!0});c(this,f).$set=s=>{Object.assign(o,s)},c(this,f).$destroy=()=>{_t(c(this,f))}}$set(t){c(this,f).$set(t)}$on(t,r){c(this,_)[t]=c(this,_)[t]||[];const i=(...o)=>r.call(this,...o);return c(this,_)[t].push(i),()=>{c(this,_)[t]=c(this,_)[t].filter(o=>o!==i)}}$destroy(){c(this,f).$destroy()}}_=new WeakMap,f=new WeakMap;const St={};var bt=G('<div id="svelte-announcer" aria-live="assertive" aria-atomic="true" style="position: absolute; left: 0; top: 0; clip: rect(0 0 0 0); clip-path: inset(50%); overflow: hidden; white-space: nowrap; width: 1px; height: 1px"><!></div>'),xt=G("<!> <!>",1);function Ot(e,t){st(t,!0);let r=V(t,"components",23,()=>[]),i=V(t,"data_0",3,null),o=V(t,"data_1",3,null);at(()=>t.stores.page.set(t.page)),ot(()=>{t.stores,t.page,t.constructors,r(),t.form,i(),o(),t.stores.page.notify()});let n=k(!1),s=k(!1),a=k(null);yt(()=>{const u=t.stores.page.subscribe(()=>{l(n)&&(R(s,!0),it().then(()=>{R(a,gt(document.title||"untitled page"))}))});return R(n,!0),u});const h=w(()=>t.constructors[1]);var S=xt(),C=O(S);{var Z=u=>{var m=D();const P=w(()=>t.constructors[0]);var b=O(m);T(b,()=>l(P),(v,g)=>{j(g(v,{get data(){return i()},get form(){return t.form},children:(d,At)=>{var M=D(),H=O(M);T(H,()=>l(h),(J,K)=>{j(K(J,{get data(){return o()},get form(){return t.form}}),x=>r()[1]=x,()=>{var x;return(x=r())==null?void 0:x[1]})}),E(d,M)},$$slots:{default:!0}}),d=>r()[0]=d,()=>{var d;return(d=r())==null?void 0:d[0]})}),E(u,m)},p=u=>{var m=D();const P=w(()=>t.constructors[0]);var b=O(m);T(b,()=>l(P),(v,g)=>{j(g(v,{get data(){return i()},get form(){return t.form}}),d=>r()[0]=d,()=>{var d;return(d=r())==null?void 0:d[0]})}),E(u,m)};I(C,u=>{t.constructors[1]?u(Z):u(p,!1)})}var z=nt(C,2);{var F=u=>{var m=bt(),P=ut(m);{var b=v=>{var g=ht();dt(()=>vt(g,l(a))),E(v,g)};I(P,v=>{l(s)&&v(b)})}ft(m),E(u,m)};I(z,u=>{l(n)&&u(F)})}E(e,S),ct()}const Ct=Et(Ot),Mt=[()=>y(()=>import("../nodes/0.D-wpd8Uv.js"),__vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14]),import.meta.url),()=>y(()=>import("../nodes/1.Cs-Twv9h.js"),__vite__mapDeps([15,1,2,7,8,10,11]),import.meta.url),()=>y(()=>import("../nodes/2.CibqPZV6.js"),__vite__mapDeps([16,1,2,7,3,10,11,17,18,19,20,5,13,21,4,6,22,23,9,24]),import.meta.url),()=>y(()=>import("../nodes/3.5_xXsW6c.js"),__vite__mapDeps([25,1,2,7,19,8,5,10,11,12,4,3,6,22,18,23,26]),import.meta.url),()=>y(()=>import("../nodes/4.Dy3Gh3pW.js"),__vite__mapDeps([27,28,2,10,11,1,19,3,20,4,5,6,22,18,23,7,29]),import.meta.url),()=>y(()=>import("../nodes/5.DdnTHAC-.js"),__vite__mapDeps([30,1,2,7,8,17,18,19,3,20,5,13,21,31]),import.meta.url)],Yt=[0],qt={"/":[2],"/docs":[3],"/docs/[section]":[4],"/playground":[5]},Rt={handleError:({error:e})=>{console.error(e)},reroute:()=>{},transport:{}},Lt=Object.fromEntries(Object.entries(Rt.transport).map(([e,t])=>[e,t.decode])),Bt=!1,Gt=(e,t)=>Lt[e](t);export{Gt as decode,Lt as decoders,qt as dictionary,Bt as hash,Rt as hooks,St as matchers,Mt as nodes,Ct as root,Yt as server_loads};
