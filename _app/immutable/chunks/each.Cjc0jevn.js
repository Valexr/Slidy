import{t as z,a as B}from"./index.0Eb-6dyg.js";import{r as C}from"./scheduler.yVBDbAbC.js";function G(n){return(n==null?void 0:n.length)!==void 0?n:Array.from(n)}function H(n,o){z(n,1,1,()=>{o.delete(n.key)})}function I(n,o,x,D,A,g,f,j,p,k,w,q){let i=n.length,d=g.length,c=i;const a={};for(;c--;)a[n[c].key]=c;const h=[],u=new Map,m=new Map,M=[];for(c=d;c--;){const e=q(A,g,c),s=x(e);let t=f.get(s);t?M.push(()=>t.p(e,o)):(t=k(s,e),t.c()),u.set(s,h[c]=t),s in a&&m.set(s,Math.abs(c-a[s]))}const v=new Set,S=new Set;function y(e){B(e,1),e.m(j,w),f.set(e.key,e),w=e.first,d--}for(;i&&d;){const e=h[d-1],s=n[i-1],t=e.key,l=s.key;e===s?(w=e.first,i--,d--):u.has(l)?!f.has(t)||v.has(t)?y(e):S.has(l)?i--:m.get(t)>m.get(l)?(S.add(t),y(e)):(v.add(l),i--):(p(s,f),i--)}for(;i--;){const e=n[i];u.has(e.key)||p(e,f)}for(;d;)y(h[d-1]);return C(M),h}export{G as e,H as o,I as u};
