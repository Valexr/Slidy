import{A as l,s as p}from"./index-b57ea404.js";import{a as h}from"./paths-66343203.js";const u=[];function b(e,n=l){let t;const i=new Set;function a(s){if(p(e,s)&&(e=s,t)){const c=!u.length;for(const o of i)o[1](),u.push(o,e);if(c){for(let o=0;o<u.length;o+=2)u[o][0](u[o+1]);u.length=0}}}function f(s){a(s(e))}function r(s,c=l){const o=[s,c];return i.add(o),i.size===1&&(t=n(a)||l),s(e),()=>{i.delete(o),i.size===0&&(t(),t=null)}}return{set:a,update:f,subscribe:r}}function U(e){let n=e.baseURI;if(!n){const t=e.getElementsByTagName("base");n=t.length?t[0].href:e.URL}return n}function w(){return{x:pageXOffset,y:pageYOffset}}function R(e){return e.composedPath().find(t=>t instanceof Node&&t.nodeName.toUpperCase()==="A")}function y(e){return e instanceof SVGAElement?new URL(e.href.baseVal,document.baseURI):new URL(e.href)}function d(e){const n=b(e);let t=!0;function i(){t=!0,n.update(r=>r)}function a(r){t=!1,n.set(r)}function f(r){let s;return n.subscribe(c=>{(s===void 0||t&&c!==s)&&r(s=c)})}return{notify:i,set:a,subscribe:f}}function g(){const{set:e,subscribe:n}=b(!1);let t;async function i(){clearTimeout(t);const a=await fetch(`${h}/_app/version.json`,{headers:{pragma:"no-cache","cache-control":"no-cache"}});if(a.ok){const{version:f}=await a.json(),r=f!=="1661060958459";return r&&(e(!0),clearTimeout(t)),r}else throw new Error(`Version check failed: ${a.status}`)}return{subscribe:n,check:i}}function T(e){e.client}const k={url:d({}),page:d({}),navigating:b(null),updated:g()};export{y as a,w as b,R as f,U as g,T as i,k as s};
