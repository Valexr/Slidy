function k(){}function nt(t,e){for(const n in e)t[n]=e[n];return t}function ct(t){return!!t&&(typeof t=="object"||typeof t=="function")&&typeof t.then=="function"}function Q(t){return t()}function I(){return Object.create(null)}function E(t){t.forEach(Q)}function H(t){return typeof t=="function"}function Et(t,e){return t!=t?e==e:t!==e||t&&typeof t=="object"||typeof t=="function"}let j;function Nt(t,e){return j||(j=document.createElement("a")),j.href=e,t===j.href}function rt(t){return Object.keys(t).length===0}function st(t,...e){if(t==null)return k;const n=t.subscribe(...e);return n.unsubscribe?()=>n.unsubscribe():n}function St(t,e,n){t.$$.on_destroy.push(st(e,n))}function jt(t,e,n,c){if(t){const r=U(t,e,n,c);return t[0](r)}}function U(t,e,n,c){return t[1]&&c?nt(n.ctx.slice(),t[1](c(e))):n.ctx}function At(t,e,n,c){if(t[2]&&c){const r=t[2](c(n));if(e.dirty===void 0)return r;if(typeof r=="object"){const l=[],s=Math.max(e.dirty.length,r.length);for(let u=0;u<s;u+=1)l[u]=e.dirty[u]|r[u];return l}return e.dirty|r}return e.dirty}function Ct(t,e,n,c,r,l){if(r){const s=U(e,n,c,l);t.p(s,r)}}function Mt(t){if(t.ctx.length>32){const e=[],n=t.ctx.length/32;for(let c=0;c<n;c++)e[c]=-1;return e}return-1}function Tt(t){const e={};for(const n in t)n[0]!=="$"&&(e[n]=t[n]);return e}function Dt(t,e){const n={};e=new Set(e);for(const c in t)!e.has(c)&&c[0]!=="$"&&(n[c]=t[c]);return n}function Ot(t){const e={};for(const n in t)e[n]=!0;return e}function Pt(t){return t&&H(t.destroy)?t.destroy:k}let M=!1;function it(){M=!0}function lt(){M=!1}function ot(t,e,n,c){for(;t<e;){const r=t+(e-t>>1);n(r)<=c?t=r+1:e=r}return t}function ut(t){if(t.hydrate_init)return;t.hydrate_init=!0;let e=t.childNodes;if(t.nodeName==="HEAD"){const i=[];for(let o=0;o<e.length;o++){const _=e[o];_.claim_order!==void 0&&i.push(_)}e=i}const n=new Int32Array(e.length+1),c=new Int32Array(e.length);n[0]=-1;let r=0;for(let i=0;i<e.length;i++){const o=e[i].claim_order,_=(r>0&&e[n[r]].claim_order<=o?r+1:ot(1,r,a=>e[n[a]].claim_order,o))-1;c[i]=n[_]+1;const d=_+1;n[d]=i,r=Math.max(d,r)}const l=[],s=[];let u=e.length-1;for(let i=n[r]+1;i!=0;i=c[i-1]){for(l.push(e[i-1]);u>=i;u--)s.push(e[u]);u--}for(;u>=0;u--)s.push(e[u]);l.reverse(),s.sort((i,o)=>i.claim_order-o.claim_order);for(let i=0,o=0;i<s.length;i++){for(;o<l.length&&s[i].claim_order>=l[o].claim_order;)o++;const _=o<l.length?l[o]:null;t.insertBefore(s[i],_)}}function at(t,e){if(M){for(ut(t),(t.actual_end_child===void 0||t.actual_end_child!==null&&t.actual_end_child.parentNode!==t)&&(t.actual_end_child=t.firstChild);t.actual_end_child!==null&&t.actual_end_child.claim_order===void 0;)t.actual_end_child=t.actual_end_child.nextSibling;e!==t.actual_end_child?(e.claim_order!==void 0||e.parentNode!==t)&&t.insertBefore(e,t.actual_end_child):t.actual_end_child=e.nextSibling}else(e.parentNode!==t||e.nextSibling!==null)&&t.appendChild(e)}function Lt(t,e,n){M&&!n?at(t,e):(e.parentNode!==t||e.nextSibling!=n)&&t.insertBefore(e,n||null)}function ft(t){t.parentNode&&t.parentNode.removeChild(t)}function qt(t,e){for(let n=0;n<t.length;n+=1)t[n]&&t[n].d(e)}function _t(t){return document.createElement(t)}function dt(t){return document.createElementNS("http://www.w3.org/2000/svg",t)}function z(t){return document.createTextNode(t)}function Bt(){return z(" ")}function Ht(){return z("")}function zt(t,e,n,c){return t.addEventListener(e,n,c),()=>t.removeEventListener(e,n,c)}function V(t,e,n){n==null?t.removeAttribute(e):t.getAttribute(e)!==n&&t.setAttribute(e,n)}function Ft(t,e){const n=Object.getOwnPropertyDescriptors(t.__proto__);for(const c in e)e[c]==null?t.removeAttribute(c):c==="style"?t.style.cssText=e[c]:c==="__value"?t.value=t[c]=e[c]:n[c]&&n[c].set?t[c]=e[c]:V(t,c,e[c])}function Rt(t,e){Object.keys(e).forEach(n=>{ht(t,n,e[n])})}function ht(t,e,n){e in t?t[e]=typeof t[e]=="boolean"&&n===""?!0:n:V(t,e,n)}function mt(t){return Array.from(t.childNodes)}function pt(t){t.claim_info===void 0&&(t.claim_info={last_index:0,total_claimed:0})}function X(t,e,n,c,r=!1){pt(t);const l=(()=>{for(let s=t.claim_info.last_index;s<t.length;s++){const u=t[s];if(e(u)){const i=n(u);return i===void 0?t.splice(s,1):t[s]=i,r||(t.claim_info.last_index=s),u}}for(let s=t.claim_info.last_index-1;s>=0;s--){const u=t[s];if(e(u)){const i=n(u);return i===void 0?t.splice(s,1):t[s]=i,r?i===void 0&&t.claim_info.last_index--:t.claim_info.last_index=s,u}}return c()})();return l.claim_order=t.claim_info.total_claimed,t.claim_info.total_claimed+=1,l}function Y(t,e,n,c){return X(t,r=>r.nodeName===e,r=>{const l=[];for(let s=0;s<r.attributes.length;s++){const u=r.attributes[s];n[u.name]||l.push(u.name)}l.forEach(s=>r.removeAttribute(s))},()=>c(e))}function Wt(t,e,n){return Y(t,e,n,_t)}function Gt(t,e,n){return Y(t,e,n,dt)}function yt(t,e){return X(t,n=>n.nodeType===3,n=>{const c=""+e;if(n.data.startsWith(c)){if(n.data.length!==c.length)return n.splitText(c.length)}else n.data=c},()=>z(e),!0)}function It(t){return yt(t," ")}function Jt(t,e){e=""+e,t.wholeText!==e&&(t.data=e)}function Kt(t,e,n,c){n===null?t.style.removeProperty(e):t.style.setProperty(e,n,c?"important":"")}function Qt(t,e,n){t.classList[n?"add":"remove"](e)}function gt(t,e,{bubbles:n=!1,cancelable:c=!1}={}){const r=document.createEvent("CustomEvent");return r.initCustomEvent(t,n,c,e),r}function Ut(t,e){const n=[];let c=0;for(const r of e.childNodes)if(r.nodeType===8){const l=r.textContent.trim();l===`HEAD_${t}_END`?(c-=1,n.push(r)):l===`HEAD_${t}_START`&&(c+=1,n.push(r))}else c>0&&n.push(r);return n}function Vt(t,e){return new t(e)}let v;function g(t){v=t}function $(){if(!v)throw new Error("Function called outside component initialization");return v}function Xt(t){$().$$.on_mount.push(t)}function Yt(t){$().$$.after_update.push(t)}function Zt(){const t=$();return(e,n,{cancelable:c=!1}={})=>{const r=t.$$.callbacks[e];if(r){const l=gt(e,n,{cancelable:c});return r.slice().forEach(s=>{s.call(t,l)}),!l.defaultPrevented}return!0}}function te(t,e){return $().$$.context.set(t,e),e}function ee(t){return $().$$.context.get(t)}function ne(t,e){const n=t.$$.callbacks[e.type];n&&n.slice().forEach(c=>c.call(this,e))}const w=[],J=[],A=[],K=[],Z=Promise.resolve();let q=!1;function tt(){q||(q=!0,Z.then(F))}function ce(){return tt(),Z}function B(t){A.push(t)}const L=new Set;let x=0;function F(){if(x!==0)return;const t=v;do{try{for(;x<w.length;){const e=w[x];x++,g(e),bt(e.$$)}}catch(e){throw w.length=0,x=0,e}for(g(null),w.length=0,x=0;J.length;)J.pop()();for(let e=0;e<A.length;e+=1){const n=A[e];L.has(n)||(L.add(n),n())}A.length=0}while(w.length);for(;K.length;)K.pop()();q=!1,L.clear(),g(t)}function bt(t){if(t.fragment!==null){t.update(),E(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(B)}}const C=new Set;let b;function xt(){b={r:0,c:[],p:b}}function wt(){b.r||E(b.c),b=b.p}function R(t,e){t&&t.i&&(C.delete(t),t.i(e))}function et(t,e,n,c){if(t&&t.o){if(C.has(t))return;C.add(t),b.c.push(()=>{C.delete(t),c&&(n&&t.d(1),c())}),t.o(e)}else c&&c()}function re(t,e){const n=e.token={};function c(r,l,s,u){if(e.token!==n)return;e.resolved=u;let i=e.ctx;s!==void 0&&(i=i.slice(),i[s]=u);const o=r&&(e.current=r)(i);let _=!1;e.block&&(e.blocks?e.blocks.forEach((d,a)=>{a!==l&&d&&(xt(),et(d,1,1,()=>{e.blocks[a]===d&&(e.blocks[a]=null)}),wt())}):e.block.d(1),o.c(),R(o,1),o.m(e.mount(),e.anchor),_=!0),e.block=o,e.blocks&&(e.blocks[l]=o),_&&F()}if(ct(t)){const r=$();if(t.then(l=>{g(r),c(e.then,1,e.value,l),g(null)},l=>{if(g(r),c(e.catch,2,e.error,l),g(null),!e.hasCatch)throw l}),e.current!==e.pending)return c(e.pending,0),!0}else{if(e.current!==e.then)return c(e.then,1,e.value,t),!0;e.resolved=t}}function se(t,e,n){const c=e.slice(),{resolved:r}=t;t.current===t.then&&(c[t.value]=r),t.current===t.catch&&(c[t.error]=r),t.block.p(c,n)}function ie(t,e){et(t,1,1,()=>{e.delete(t.key)})}function le(t,e,n,c,r,l,s,u,i,o,_,d){let a=t.length,m=l.length,h=a;const T={};for(;h--;)T[t[h].key]=h;const N=[],D=new Map,O=new Map;for(h=m;h--;){const f=d(r,l,h),p=n(f);let y=s.get(p);y?c&&y.p(f,e):(y=o(p,f),y.c()),D.set(p,N[h]=y),p in T&&O.set(p,Math.abs(h-T[p]))}const W=new Set,G=new Set;function P(f){R(f,1),f.m(u,_),s.set(f.key,f),_=f.first,m--}for(;a&&m;){const f=N[m-1],p=t[a-1],y=f.key,S=p.key;f===p?(_=f.first,a--,m--):D.has(S)?!s.has(y)||W.has(y)?P(f):G.has(S)?a--:O.get(y)>O.get(S)?(G.add(y),P(f)):(W.add(S),a--):(i(p,s),a--)}for(;a--;){const f=t[a];D.has(f.key)||i(f,s)}for(;m;)P(N[m-1]);return N}function oe(t,e){const n={},c={},r={$$scope:1};let l=t.length;for(;l--;){const s=t[l],u=e[l];if(u){for(const i in s)i in u||(c[i]=1);for(const i in u)r[i]||(n[i]=u[i],r[i]=1);t[l]=u}else for(const i in s)r[i]=1}for(const s in c)s in n||(n[s]=void 0);return n}function ue(t){return typeof t=="object"&&t!==null?t:{}}function ae(t){t&&t.c()}function fe(t,e){t&&t.l(e)}function $t(t,e,n,c){const{fragment:r,after_update:l}=t.$$;r&&r.m(e,n),c||B(()=>{const s=t.$$.on_mount.map(Q).filter(H);t.$$.on_destroy?t.$$.on_destroy.push(...s):E(s),t.$$.on_mount=[]}),l.forEach(B)}function kt(t,e){const n=t.$$;n.fragment!==null&&(E(n.on_destroy),n.fragment&&n.fragment.d(e),n.on_destroy=n.fragment=null,n.ctx=[])}function vt(t,e){t.$$.dirty[0]===-1&&(w.push(t),tt(),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}function _e(t,e,n,c,r,l,s,u=[-1]){const i=v;g(t);const o=t.$$={fragment:null,ctx:[],props:l,update:k,not_equal:r,bound:I(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(e.context||(i?i.$$.context:[])),callbacks:I(),dirty:u,skip_bound:!1,root:e.target||i.$$.root};s&&s(o.root);let _=!1;if(o.ctx=n?n(t,e.props||{},(d,a,...m)=>{const h=m.length?m[0]:a;return o.ctx&&r(o.ctx[d],o.ctx[d]=h)&&(!o.skip_bound&&o.bound[d]&&o.bound[d](h),_&&vt(t,d)),a}):[],o.update(),_=!0,E(o.before_update),o.fragment=c?c(o.ctx):!1,e.target){if(e.hydrate){it();const d=mt(e.target);o.fragment&&o.fragment.l(d),d.forEach(ft)}else o.fragment&&o.fragment.c();e.intro&&R(t.$$.fragment),$t(t,e.target,e.anchor,e.customElement),lt(),F()}g(i)}class de{$destroy(){kt(this,1),this.$destroy=k}$on(e,n){if(!H(n))return k;const c=this.$$.callbacks[e]||(this.$$.callbacks[e]=[]);return c.push(n),()=>{const r=c.indexOf(n);r!==-1&&c.splice(r,1)}}$set(e){this.$$set&&!rt(e)&&(this.$$.skip_bound=!0,this.$$set(e),this.$$.skip_bound=!1)}}export{qt as $,ce as A,k as B,at as C,jt as D,Ct as E,Mt as F,At as G,te as H,Pt as I,H as J,ee as K,St as L,Nt as M,nt as N,Ft as O,Qt as P,oe as Q,Dt as R,de as S,Tt as T,Ut as U,dt as V,Gt as W,zt as X,ne as Y,Rt as Z,E as _,Bt as a,Zt as a0,le as a1,ie as a2,ue as a3,Ot as a4,re as a5,se as a6,Lt as b,It as c,wt as d,Ht as e,R as f,xt as g,ft as h,_e as i,Yt as j,_t as k,Wt as l,mt as m,V as n,Xt as o,Kt as p,z as q,yt as r,Et as s,et as t,Jt as u,Vt as v,ae as w,fe as x,$t as y,kt as z};
