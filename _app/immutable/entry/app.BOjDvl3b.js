const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["../nodes/0.CMqmCuFG.js","../chunks/disclose-version.aDxFXWT7.js","../chunks/runtime.CITBsLGg.js","../chunks/class.C5XTEbx8.js","../chunks/Link.CPkTImq1.js","../chunks/props.CIf3yywa.js","../assets/Link.DxOb0eqM.css","../chunks/legacy.C5qRRbfG.js","../chunks/lifecycle.BmR5OYlz.js","../chunks/paths.YCAjTuvs.js","../chunks/entry.Bnv14grM.js","../chunks/index-client.BQ39Y19I.js","../chunks/stores.Bapo7_Em.js","../chunks/actions.CpJ-ci_d.js","../assets/0.Cp6bGb17.css","../nodes/1.CBMXHF1F.js","../nodes/2.Ch35SP8C.js","../chunks/slidy.CzjKDVAo.js","../chunks/if.BCia60UM.js","../chunks/each.C9c-dxwq.js","../chunks/style.PwPRnE0L.js","../assets/slidy.C5dl-wMS.css","../chunks/Header.BFiooAsj.js","../assets/Header.DXG2A6kV.css","../assets/2.mwTylsHI.css","../nodes/3.5iInspa_.js","../assets/3.myEnoLWL.css","../nodes/4.zL5BlFO6.js","../chunks/preload-helper.CIAh8Vx9.js","../assets/4.BP-EEqAF.css","../nodes/5.B43Zq87y.js","../assets/5.CIJtcSUX.css"])))=>i.map(i=>d[i]);
var M=e=>{throw TypeError(e)};var Y=(e,t,r)=>t.has(e)||M("Cannot "+r);var c=(e,t,r)=>(Y(e,t,"read from private field"),r?r.call(e):t.get(e)),A=(e,t,r)=>t.has(e)?M("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(e):t.set(e,r),k=(e,t,r,i)=>(Y(e,t,"write to private field"),i?i.call(e,r):t.set(e,r),r);import{c as L,_ as y}from"../chunks/preload-helper.CIAh8Vx9.js";import{e as Q,r as U,b as W,B as X,ad as p,i as _,av as $,ah as x,az as tt,aA as et,R as rt,a3 as st,f as at,u as ot,aB as it,Y as O,a5 as nt,aC as T,Z as ct,_ as ut,a0 as ft,a7 as dt,j as w}from"../chunks/runtime.CITBsLGg.js";import{k as mt,m as _t,u as lt,a as E,b as z,e as D,t as ht,s as vt}from"../chunks/disclose-version.aDxFXWT7.js";import{i as I}from"../chunks/if.BCia60UM.js";import{p as V,c as gt}from"../chunks/props.CIf3yywa.js";import{o as yt}from"../chunks/index-client.BQ39Y19I.js";function q(e,t){return e===t||(e==null?void 0:e[p])===t}function j(e={},t,r,i){return Q(()=>{var o,n;return U(()=>{o=n,n=[],W(()=>{e!==r(...n)&&(t(e,...n),o&&q(r(...o),e)&&t(null,...o))})}),()=>{X(()=>{n&&q(r(...n),e)&&t(null,...n)})}}),e}function Et(e){return class extends Pt{constructor(t){super({component:e,...t})}}}var l,f;class Pt{constructor(t){A(this,l);A(this,f);var n;var r=new Map,i=(s,a)=>{var h=rt(a);return r.set(s,h),h};const o=new Proxy({...t.props||{},$$events:{}},{get(s,a){return _(r.get(a)??i(a,Reflect.get(s,a)))},has(s,a){return a===$?!0:(_(r.get(a)??i(a,Reflect.get(s,a))),Reflect.has(s,a))},set(s,a,h){return x(r.get(a)??i(a,h),h),Reflect.set(s,a,h)}});k(this,f,(t.hydrate?mt:_t)(t.component,{target:t.target,anchor:t.anchor,props:o,context:t.context,intro:t.intro??!1,recover:t.recover})),(!((n=t==null?void 0:t.props)!=null&&n.$$host)||t.sync===!1)&&tt(),k(this,l,o.$$events);for(const s of Object.keys(c(this,f)))s==="$set"||s==="$destroy"||s==="$on"||et(this,s,{get(){return c(this,f)[s]},set(a){c(this,f)[s]=a},enumerable:!0});c(this,f).$set=s=>{Object.assign(o,s)},c(this,f).$destroy=()=>{lt(c(this,f))}}$set(t){c(this,f).$set(t)}$on(t,r){c(this,l)[t]=c(this,l)[t]||[];const i=(...o)=>r.call(this,...o);return c(this,l)[t].push(i),()=>{c(this,l)[t]=c(this,l)[t].filter(o=>o!==i)}}$destroy(){c(this,f).$destroy()}}l=new WeakMap,f=new WeakMap;const Ct={};var bt=z('<div id="svelte-announcer" aria-live="assertive" aria-atomic="true" style="position: absolute; left: 0; top: 0; clip: rect(0 0 0 0); clip-path: inset(50%); overflow: hidden; white-space: nowrap; width: 1px; height: 1px"><!></div>'),Rt=z("<!> <!>",1);function Ot(e,t){st(t,!0);let r=V(t,"components",23,()=>[]),i=V(t,"data_0",3,null),o=V(t,"data_1",3,null);at(()=>t.stores.page.set(t.page)),ot(()=>{t.stores,t.page,t.constructors,r(),t.form,i(),o(),t.stores.page.notify()});let n=T(!1),s=T(!1),a=T(null);yt(()=>{const u=t.stores.page.subscribe(()=>{_(n)&&(x(s,!0),it().then(()=>{x(a,gt(document.title||"untitled page"))}))});return x(n,!0),u});const h=w(()=>t.constructors[1]);var C=Rt(),S=O(C);{var G=u=>{var m=D();const P=w(()=>t.constructors[0]);var b=O(m);L(b,()=>_(P),(v,g)=>{j(g(v,{get data(){return i()},get form(){return t.form},children:(d,kt)=>{var B=D(),J=O(B);L(J,()=>_(h),(K,N)=>{j(N(K,{get data(){return o()},get form(){return t.form}}),R=>r()[1]=R,()=>{var R;return(R=r())==null?void 0:R[1]})}),E(d,B)},$$slots:{default:!0}}),d=>r()[0]=d,()=>{var d;return(d=r())==null?void 0:d[0]})}),E(u,m)},Z=u=>{var m=D();const P=w(()=>t.constructors[0]);var b=O(m);L(b,()=>_(P),(v,g)=>{j(g(v,{get data(){return i()},get form(){return t.form}}),d=>r()[0]=d,()=>{var d;return(d=r())==null?void 0:d[0]})}),E(u,m)};I(S,u=>{t.constructors[1]?u(G):u(Z,!1)})}var F=ct(S,2);{var H=u=>{var m=bt(),P=ut(m);{var b=v=>{var g=ht();dt(()=>vt(g,_(a))),E(v,g)};I(P,v=>{_(s)&&v(b)})}ft(m),E(u,m)};I(F,u=>{_(n)&&u(H)})}E(e,C),nt()}const St=Et(Ot),Bt=[()=>y(()=>import("../nodes/0.CMqmCuFG.js"),__vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14]),import.meta.url),()=>y(()=>import("../nodes/1.CBMXHF1F.js"),__vite__mapDeps([15,1,2,7,8,10,11]),import.meta.url),()=>y(()=>import("../nodes/2.Ch35SP8C.js"),__vite__mapDeps([16,1,2,7,3,10,11,17,18,19,20,5,13,21,4,6,22,23,9,24]),import.meta.url),()=>y(()=>import("../nodes/3.5iInspa_.js"),__vite__mapDeps([25,1,2,7,19,8,5,10,11,12,4,3,6,22,18,23,26]),import.meta.url),()=>y(()=>import("../nodes/4.zL5BlFO6.js"),__vite__mapDeps([27,28,2,10,11,1,19,3,20,4,5,6,22,18,23,7,29]),import.meta.url),()=>y(()=>import("../nodes/5.B43Zq87y.js"),__vite__mapDeps([30,1,2,7,8,17,18,19,3,20,5,13,21,31]),import.meta.url)],Mt=[0],Yt={"/":[2],"/docs":[3],"/docs/[section]":[4],"/playground":[5]},xt={handleError:({error:e})=>{console.error(e)},reroute:()=>{},transport:{}},At=Object.fromEntries(Object.entries(xt.transport).map(([e,t])=>[e,t.decode])),qt=(e,t)=>At[e](t);export{qt as decode,At as decoders,Yt as dictionary,xt as hooks,Ct as matchers,Bt as nodes,St as root,Mt as server_loads};
