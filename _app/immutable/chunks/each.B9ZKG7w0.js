import{k as ae,m as re,E as Q,n as C,o as k,p as ne,i as z,H as ie,q as F,t as b,v as H,I as S,w as X,x as W,y as fe,z as Z,A as le,B as G,C as y,D as J,F as L,G as te,J as se,K as ue,L as ve,M as _e,N as de,O as oe,P as ce,Q as he,R as Ee,S as K,T as pe,U as Ae,V as Te}from"./index.BiDqHbFu.js";function Ce(l,e){return e}function Ie(l,e,r,u){for(var v=[],_=e.length,t=0;t<_;t++)te(e[t].e,v,!0);var p=_>0&&v.length===0&&r!==null;if(p){var o=r.parentNode;se(o),o.append(r),u.clear(),m(l,e[0].prev,e[_-1].next)}ue(v,()=>{for(var T=0;T<_;T++){var d=e[T];p||(u.delete(d.k),m(l,d.prev,d.next)),ve(d.e,!p)}})}function we(l,e,r,u,v,_=null){var t=l,p={flags:e,items:new Map,first:null},o=(e&Q)!==0;if(o){var T=l;t=C?k(_e(T)):T.appendChild(ae())}C&&ne();var d=null,I=!1,g=de(()=>{var a=r();return pe(a)?a:a==null?[]:Z(a)});re(()=>{var a=z(g),i=a.length;if(I&&i===0)return;I=i===0;let s=!1;if(C){var w=t.data===ie;w!==(i===0)&&(t=F(),k(t),b(!1),s=!0)}if(C){for(var c=null,h,E=0;E<i;E++){if(H.nodeType===8&&H.data===oe){t=H,s=!0,b(!1);break}var A=a[E],n=u(A,E);h=$(H,p,c,null,A,n,E,v,e),p.items.set(n,h),c=h}i>0&&k(F())}if(!C){var f=ce;xe(a,p,t,v,e,(f.f&S)!==0,u)}_!==null&&(i===0?d?X(d):d=W(()=>_(t)):d!==null&&fe(d,()=>{d=null})),s&&b(!0),z(g)}),C&&(t=H)}function xe(l,e,r,u,v,_,t,p){var q,V,B,U;var o=(v&he)!==0,T=(v&(y|L))!==0,d=l.length,I=e.items,g=e.first,a=g,i,s=null,w,c=[],h=[],E,A,n,f;if(o)for(f=0;f<d;f+=1)E=l[f],A=t(E,f),n=I.get(A),n!==void 0&&((q=n.a)==null||q.measure(),(w??(w=new Set)).add(n));for(f=0;f<d;f+=1){if(E=l[f],A=t(E,f),n=I.get(A),n===void 0){var j=a?a.e.nodes_start:r;s=$(j,e,s,s===null?e.first:s.next,E,A,f,u,v),I.set(A,s),c=[],h=[],a=s.next;continue}if(T&&me(n,E,f,v),n.e.f&S&&(X(n.e),o&&((V=n.a)==null||V.unfix(),(w??(w=new Set)).delete(n))),n!==a){if(i!==void 0&&i.has(n)){if(c.length<h.length){var R=h[0],x;s=R.prev;var O=c[0],D=c[c.length-1];for(x=0;x<c.length;x+=1)P(c[x],R,r);for(x=0;x<h.length;x+=1)i.delete(h[x]);m(e,O.prev,D.next),m(e,s,O),m(e,D,R),a=R,s=D,f-=1,c=[],h=[]}else i.delete(n),P(n,a,r),m(e,n.prev,n.next),m(e,n,s===null?e.first:s.next),m(e,s,n),s=n;continue}for(c=[],h=[];a!==null&&a.k!==A;)(_||!(a.e.f&S))&&(i??(i=new Set)).add(a),h.push(a),a=a.next;if(a===null)continue;n=a}c.push(n),s=n,a=n.next}if(a!==null||i!==void 0){for(var N=i===void 0?[]:Z(i);a!==null;)(_||!(a.e.f&S))&&N.push(a),a=a.next;var M=N.length;if(M>0){var ee=v&Q&&d===0?r:null;if(o){for(f=0;f<M;f+=1)(B=N[f].a)==null||B.measure();for(f=0;f<M;f+=1)(U=N[f].a)==null||U.fix()}Ie(e,N,ee,I)}}o&&le(()=>{var Y;if(w!==void 0)for(n of w)(Y=n.a)==null||Y.apply()}),G.first=e.first&&e.first.e,G.last=s&&s.e}function me(l,e,r,u){u&y&&J(l.v,e),u&L?J(l.i,r):l.i=r}function $(l,e,r,u,v,_,t,p,o,T){var d=(o&y)!==0,I=(o&Ae)===0,g=d?I?Ee(v):K(v):v,a=o&L?K(t):t,i={i:a,v:g,k:_,a:null,e:null,prev:r,next:u};try{return i.e=W(()=>p(l,g,a),C),i.e.prev=r&&r.e,i.e.next=u&&u.e,r===null?e.first=i:(r.next=i,r.e.next=i.e),u!==null&&(u.prev=i,u.e.prev=i.e),i}finally{}}function P(l,e,r){for(var u=l.next?l.next.e.nodes_start:r,v=e?e.e.nodes_start:r,_=l.e.nodes_start;_!==u;){var t=Te(_);v.before(_),_=t}}function m(l,e,r){e===null?l.first=r:(e.next=r,e.e.next=r&&r.e),r!==null&&(r.prev=e,r.e.prev=e&&e.e)}export{we as e,Ce as i};
