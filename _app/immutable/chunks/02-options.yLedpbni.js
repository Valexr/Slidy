import{s as ye,l as At,m as ke,e as s,a as p,t as et,H as xe,c as l,o as r,g as i,b as K,d as nt,f as o,p as Te,q as m,i as u,h as e}from"./scheduler.yVBDbAbC.js";import{S as Ce,i as be,c as zt,b as Bt,m as Ft,a as Ot,t as Ut,d as It}from"./index.0Eb-6dyg.js";import{g as He,a as me}from"./spread.CgU5AtxT.js";import{P as Le}from"./Page.ALflsGMG.js";import{L as ve}from"./Link.CD6mg0t0.js";function $e(C){let n;return{c(){n=et("@slidy/animation")},l(f){n=nt(f,"@slidy/animation")},m(f,k){u(f,n,k)},d(f){f&&o(n)}}}function Me(C){let n;return{c(){n=et("@slidy/easing")},l(f){n=nt(f,"@slidy/easing")},m(f,k){u(f,n,k)},d(f){f&&o(n)}}}function we(C){let n,f="API",k,h,g="<code>slidy</code> have two arguments: required <code>node</code> and optional <code>options</code>.",v,_,Kt="Options",at,b,V,Vt='<tr><th align="left">Key</th> <th align="center">Default</th> <th align="left">Type</th> <th align="left">Description</th></tr>',mt,d,N,Nt='<td align="left"><code>index</code></td> <td align="center">0</td> <td align="left">number</td> <td align="left">The starting index on render.</td>',vt,Y,Yt='<td align="left"><code>clamp</code></td> <td align="center">0</td> <td align="left">number</td> <td align="left">Defines the step in number of slides to slide on.</td>',ht,G,Gt='<td align="left"><code>indent</code></td> <td align="center">1</td> <td align="left">number</td> <td align="left">Creates an indent at the edges. The value is calculated from the gap: <code>gap * indent</code></td>',_t,J,Jt='<td align="left"><code>sensity</code></td> <td align="center">5</td> <td align="left">number</td> <td align="left">Defines sensite as the pixels required to drag in order to start move, <code>0</code> when sliding.</td>',yt,Q,Qt='<td align="left"><code>gravity</code></td> <td align="center">1.2</td> <td align="left">number</td> <td align="left">Controls the gravity value <code>0 (space) : 1 (earth) : 2 (underground)</code>.</td>',xt,W,Wt='<td align="left"><code>duration</code></td> <td align="center">375</td> <td align="left">number</td> <td align="left">Sliding duration in ms.</td>',Tt,y,P,Xt="<code>animation</code>",Ct,S,Zt="undefined",bt,E,te="AnimationFunc",Ht,H,Lt,L,$t,Mt,x,j,ee="<code>easing</code>",wt,A,ne="undefined",qt,z,ae="<code>(t: number) =&gt; number</code>",Dt,$,Rt,M,Pt,St,X,se='<td align="left"><code>snap</code></td> <td align="center">undefined</td> <td align="left">string</td> <td align="left">Defines an area to “snap” the slide: <code>&quot;start&quot;, &quot;center&quot;, &quot;end&quot;, &quot;deck&quot;, undefined</code>. By default the behaviour is clamp sliding by edges.</td>',Et,Z,le='<td align="left"><code>axis</code></td> <td align="center">undefined</td> <td align="left"><code>&quot;x&quot;</code> or <code>&quot;y&quot;</code></td> <td align="left">Defines the flow direction.</td>',jt,tt,oe='<td align="left"><code>loop</code></td> <td align="center">false</td> <td align="left">boolean</td> <td align="left">Activated the infinite sliding mode.</td>',st,w,pe="Readonly properties:",lt,B,ie='<thead><tr><th align="left">Key</th> <th align="left">Type</th> <th align="left">Description</th></tr></thead> <tbody><tr><td align="left"><code>position</code></td> <td align="left"><code>number</code></td> <td align="left">Current position</td></tr> <tr><td align="left"><code>direction</code></td> <td align="left"><code>number</code></td> <td align="left">Children move direction</td></tr> <tr><td align="left"><code>vertical</code></td> <td align="left"><code>number</code></td> <td align="left">Children axis flow: <code>0</code> or any <code>Number</code> as <code>true</code></td></tr> <tr><td align="left"><code>reverse</code></td> <td align="left"><code>number</code></td> <td align="left">Children reverse flow: <code>-1</code> or <code>1</code></td></tr></tbody>',ot,q,re="Flow",pt,F,de="To control the flow direction use one of the options on the parent node:",it,O,ce="<li><code>flex-flow: row-reverse | column-reverse</code> CSS property;</li> <li><code>direction: rtl</code> CSS property;</li> <li><code>dir=&quot;rtl&quot;</code> HTML attribute.</li>",rt,U,ue="To use <code>deck</code> flow use the <code>snap: &quot;deck&quot;</code> option, it may be required for some animations.",dt,D,fe="Usage example",ct,I,ut,_e=`<code class="language-html"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>head</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>module<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token script"><span class="token language-javascript">
        <span class="token keyword">import</span> <span class="token punctuation">&#123;</span> slidy <span class="token punctuation">&#125;</span> <span class="token keyword">from</span> <span class="token string">'@slidy/core'</span><span class="token punctuation">;</span><span class="token punctuation">;</span>
        <span class="token keyword">import</span> <span class="token punctuation">&#123;</span> linear <span class="token punctuation">&#125;</span> <span class="token keyword">from</span> <span class="token string">'@slidy/easing'</span><span class="token punctuation">;</span>
        <span class="token keyword">import</span> <span class="token punctuation">&#123;</span> fade <span class="token punctuation">&#125;</span> <span class="token keyword">from</span> <span class="token string">'@slidy/animation'</span><span class="token punctuation">;</span>

        <span class="token keyword">const</span> options <span class="token operator">=</span> <span class="token punctuation">&#123;</span>
            <span class="token literal-property property">index</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
            <span class="token literal-property property">clamp</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
            <span class="token literal-property property">indent</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
            <span class="token literal-property property">sensity</span><span class="token operator">:</span> <span class="token number">5</span><span class="token punctuation">,</span>
            <span class="token literal-property property">gravity</span><span class="token operator">:</span> <span class="token number">1.2</span><span class="token punctuation">,</span>
            <span class="token literal-property property">duration</span><span class="token operator">:</span> <span class="token number">375</span><span class="token punctuation">,</span>
            <span class="token literal-property property">animation</span><span class="token operator">:</span> fade<span class="token punctuation">,</span>
            <span class="token literal-property property">easing</span><span class="token operator">:</span> linear<span class="token punctuation">,</span>
            <span class="token literal-property property">snap</span><span class="token operator">:</span> <span class="token string">'center'</span><span class="token punctuation">,</span>
            <span class="token literal-property property">axis</span><span class="token operator">:</span> <span class="token string">'x'</span><span class="token punctuation">,</span>
            <span class="token literal-property property">loop</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
        <span class="token punctuation">&#125;</span><span class="token punctuation">;</span>
        
        <span class="token keyword">const</span> node <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">querySelector</span><span class="token punctuation">(</span><span class="token string">"#node"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">slidy</span><span class="token punctuation">(</span>node<span class="token punctuation">,</span> options<span class="token punctuation">)</span><span class="token punctuation">;</span>
    </span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>head</span><span class="token punctuation">></span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>section</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>ul</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>node<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
        <span class="token comment">&lt;!-- items --></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>ul</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>section</span><span class="token punctuation">></span></span></code>`,ft;return L=new ve({props:{href:"https://github.com/Valexr/Slidy/tree/master/packages/animation",rel:"nofollow",$$slots:{default:[$e]},$$scope:{ctx:C}}}),M=new ve({props:{href:"https://github.com/Valexr/Slidy/tree/master/packages/easing",rel:"nofollow",$$slots:{default:[Me]},$$scope:{ctx:C}}}),{c(){n=s("h2"),n.textContent=f,k=p(),h=s("p"),h.innerHTML=g,v=p(),_=s("h3"),_.textContent=Kt,at=p(),b=s("table"),V=s("thead"),V.innerHTML=Vt,mt=p(),d=s("tbody"),N=s("tr"),N.innerHTML=Nt,vt=p(),Y=s("tr"),Y.innerHTML=Yt,ht=p(),G=s("tr"),G.innerHTML=Gt,_t=p(),J=s("tr"),J.innerHTML=Jt,yt=p(),Q=s("tr"),Q.innerHTML=Qt,xt=p(),W=s("tr"),W.innerHTML=Wt,Tt=p(),y=s("tr"),P=s("td"),P.innerHTML=Xt,Ct=p(),S=s("td"),S.textContent=Zt,bt=p(),E=s("td"),E.textContent=te,Ht=p(),H=s("td"),Lt=et("Custom sliding animation. Predefined sets are available via "),zt(L.$$.fragment),$t=et("."),Mt=p(),x=s("tr"),j=s("td"),j.innerHTML=ee,wt=p(),A=s("td"),A.textContent=ne,qt=p(),z=s("td"),z.innerHTML=ae,Dt=p(),$=s("td"),Rt=et("Sliding easing behaviour. Predefined sets are available vie "),zt(M.$$.fragment),Pt=et("."),St=p(),X=s("tr"),X.innerHTML=se,Et=p(),Z=s("tr"),Z.innerHTML=le,jt=p(),tt=s("tr"),tt.innerHTML=oe,st=p(),w=s("h3"),w.textContent=pe,lt=p(),B=s("table"),B.innerHTML=ie,ot=p(),q=s("h3"),q.textContent=re,pt=p(),F=s("p"),F.textContent=de,it=p(),O=s("ul"),O.innerHTML=ce,rt=p(),U=s("p"),U.innerHTML=ue,dt=p(),D=s("h3"),D.textContent=fe,ct=p(),I=s("pre"),ut=new xe(!1),this.h()},l(t){n=l(t,"H2",{id:!0,"data-svelte-h":!0}),r(n)!=="svelte-1dwt3fa"&&(n.textContent=f),k=i(t),h=l(t,"P",{"data-svelte-h":!0}),r(h)!=="svelte-1o685j0"&&(h.innerHTML=g),v=i(t),_=l(t,"H3",{id:!0,"data-svelte-h":!0}),r(_)!=="svelte-107v1mk"&&(_.textContent=Kt),at=i(t),b=l(t,"TABLE",{});var a=K(b);V=l(a,"THEAD",{"data-svelte-h":!0}),r(V)!=="svelte-1w97tvd"&&(V.innerHTML=Vt),mt=i(a),d=l(a,"TBODY",{});var c=K(d);N=l(c,"TR",{"data-svelte-h":!0}),r(N)!=="svelte-3jsacc"&&(N.innerHTML=Nt),vt=i(c),Y=l(c,"TR",{"data-svelte-h":!0}),r(Y)!=="svelte-10qtz6g"&&(Y.innerHTML=Yt),ht=i(c),G=l(c,"TR",{"data-svelte-h":!0}),r(G)!=="svelte-1iknsb9"&&(G.innerHTML=Gt),_t=i(c),J=l(c,"TR",{"data-svelte-h":!0}),r(J)!=="svelte-1ipzfdl"&&(J.innerHTML=Jt),yt=i(c),Q=l(c,"TR",{"data-svelte-h":!0}),r(Q)!=="svelte-1550vm1"&&(Q.innerHTML=Qt),xt=i(c),W=l(c,"TR",{"data-svelte-h":!0}),r(W)!=="svelte-1y80c9g"&&(W.innerHTML=Wt),Tt=i(c),y=l(c,"TR",{});var T=K(y);P=l(T,"TD",{align:!0,"data-svelte-h":!0}),r(P)!=="svelte-10hw3m2"&&(P.innerHTML=Xt),Ct=i(T),S=l(T,"TD",{align:!0,"data-svelte-h":!0}),r(S)!=="svelte-1as21bd"&&(S.textContent=Zt),bt=i(T),E=l(T,"TD",{align:!0,"data-svelte-h":!0}),r(E)!=="svelte-1flzr5h"&&(E.textContent=te),Ht=i(T),H=l(T,"TD",{align:!0});var gt=K(H);Lt=nt(gt,"Custom sliding animation. Predefined sets are available via "),Bt(L.$$.fragment,gt),$t=nt(gt,"."),gt.forEach(o),T.forEach(o),Mt=i(c),x=l(c,"TR",{});var R=K(x);j=l(R,"TD",{align:!0,"data-svelte-h":!0}),r(j)!=="svelte-1gls4if"&&(j.innerHTML=ee),wt=i(R),A=l(R,"TD",{align:!0,"data-svelte-h":!0}),r(A)!=="svelte-1as21bd"&&(A.textContent=ne),qt=i(R),z=l(R,"TD",{align:!0,"data-svelte-h":!0}),r(z)!=="svelte-1ifo9d0"&&(z.innerHTML=ae),Dt=i(R),$=l(R,"TD",{align:!0});var kt=K($);Rt=nt(kt,"Sliding easing behaviour. Predefined sets are available vie "),Bt(M.$$.fragment,kt),Pt=nt(kt,"."),kt.forEach(o),R.forEach(o),St=i(c),X=l(c,"TR",{"data-svelte-h":!0}),r(X)!=="svelte-1nv8w8g"&&(X.innerHTML=se),Et=i(c),Z=l(c,"TR",{"data-svelte-h":!0}),r(Z)!=="svelte-17nylam"&&(Z.innerHTML=le),jt=i(c),tt=l(c,"TR",{"data-svelte-h":!0}),r(tt)!=="svelte-19j1j63"&&(tt.innerHTML=oe),c.forEach(o),a.forEach(o),st=i(t),w=l(t,"H3",{id:!0,"data-svelte-h":!0}),r(w)!=="svelte-y4hppz"&&(w.textContent=pe),lt=i(t),B=l(t,"TABLE",{"data-svelte-h":!0}),r(B)!=="svelte-1gnt7bd"&&(B.innerHTML=ie),ot=i(t),q=l(t,"H3",{id:!0,"data-svelte-h":!0}),r(q)!=="svelte-poarms"&&(q.textContent=re),pt=i(t),F=l(t,"P",{"data-svelte-h":!0}),r(F)!=="svelte-t75ojj"&&(F.textContent=de),it=i(t),O=l(t,"UL",{"data-svelte-h":!0}),r(O)!=="svelte-68h7ds"&&(O.innerHTML=ce),rt=i(t),U=l(t,"P",{"data-svelte-h":!0}),r(U)!=="svelte-1o9fvb9"&&(U.innerHTML=ue),dt=i(t),D=l(t,"H3",{id:!0,"data-svelte-h":!0}),r(D)!=="svelte-11iaeot"&&(D.textContent=fe),ct=i(t),I=l(t,"PRE",{class:!0});var ge=K(I);ut=Te(ge,!1),ge.forEach(o),this.h()},h(){m(n,"id","api"),m(_,"id","options"),m(P,"align","left"),m(S,"align","center"),m(E,"align","left"),m(H,"align","left"),m(j,"align","left"),m(A,"align","center"),m(z,"align","left"),m($,"align","left"),m(w,"id","readonly-properties"),m(q,"id","flow"),m(D,"id","usage-example"),ut.a=null,m(I,"class","language-html")},m(t,a){u(t,n,a),u(t,k,a),u(t,h,a),u(t,v,a),u(t,_,a),u(t,at,a),u(t,b,a),e(b,V),e(b,mt),e(b,d),e(d,N),e(d,vt),e(d,Y),e(d,ht),e(d,G),e(d,_t),e(d,J),e(d,yt),e(d,Q),e(d,xt),e(d,W),e(d,Tt),e(d,y),e(y,P),e(y,Ct),e(y,S),e(y,bt),e(y,E),e(y,Ht),e(y,H),e(H,Lt),Ft(L,H,null),e(H,$t),e(d,Mt),e(d,x),e(x,j),e(x,wt),e(x,A),e(x,qt),e(x,z),e(x,Dt),e(x,$),e($,Rt),Ft(M,$,null),e($,Pt),e(d,St),e(d,X),e(d,Et),e(d,Z),e(d,jt),e(d,tt),u(t,st,a),u(t,w,a),u(t,lt,a),u(t,B,a),u(t,ot,a),u(t,q,a),u(t,pt,a),u(t,F,a),u(t,it,a),u(t,O,a),u(t,rt,a),u(t,U,a),u(t,dt,a),u(t,D,a),u(t,ct,a),u(t,I,a),ut.m(_e,I),ft=!0},p(t,a){const c={};a&2&&(c.$$scope={dirty:a,ctx:t}),L.$set(c);const T={};a&2&&(T.$$scope={dirty:a,ctx:t}),M.$set(T)},i(t){ft||(Ot(L.$$.fragment,t),Ot(M.$$.fragment,t),ft=!0)},o(t){Ut(L.$$.fragment,t),Ut(M.$$.fragment,t),ft=!1},d(t){t&&(o(n),o(k),o(h),o(v),o(_),o(at),o(b),o(st),o(w),o(lt),o(B),o(ot),o(q),o(pt),o(F),o(it),o(O),o(rt),o(U),o(dt),o(D),o(ct),o(I)),It(L),It(M)}}}function qe(C){let n,f;const k=[C[0],he];let h={$$slots:{default:[we]},$$scope:{ctx:C}};for(let g=0;g<k.length;g+=1)h=At(h,k[g]);return n=new Le({props:h}),{c(){zt(n.$$.fragment)},l(g){Bt(n.$$.fragment,g)},m(g,v){Ft(n,g,v),f=!0},p(g,[v]){const _=v&1?He(k,[v&1&&me(g[0]),v&0&&me(he)]):{};v&2&&(_.$$scope={dirty:v,ctx:g}),n.$set(_)},i(g){f||(Ot(n.$$.fragment,g),f=!0)},o(g){Ut(n.$$.fragment,g),f=!1},d(g){It(n,g)}}}const he={toc:[{level:2,title:"API",id:"api"},{level:3,title:"Options",id:"options"},{level:3,title:"Readonly properties:",id:"readonly-properties:"},{level:3,title:"Flow",id:"flow"},{level:3,title:"Usage example",id:"usage-example"}]};function De(C,n,f){return C.$$set=k=>{f(0,n=At(At({},n),ke(k)))},n=ke(n),[n]}class Ae extends Ce{constructor(n){super(),be(this,n,De,qe,ye,{})}}export{Ae as default,he as metadata};
