import{s as st,l as O,m as W,e as r,a as u,H as ct,t as F,c as p,o as g,g as m,b as X,p as rt,f as a,d as I,q as L,i as l,h as Y}from"./scheduler.yVBDbAbC.js";import{S as pt,i as ft,c as et,b as nt,m as at,a as lt,t as dt,d as ot}from"./index.0Eb-6dyg.js";import{g as ut,a as Z}from"./spread.CgU5AtxT.js";import{P as mt}from"./Page.ALflsGMG.js";import{L as gt}from"./Link.CD6mg0t0.js";function ht(h){let e;return{c(){e=F("separate package")},l(o){e=I(o,"separate package")},m(o,i){l(o,e,i)},d(o){o&&a(e)}}}function _t(h){let e,o="Animation",i,c,d="<code>animation</code> function allows to define a custom sliding animation.",s,f,M,it=`<code class="language-ts"><span class="token keyword">interface</span> <span class="token class-name">AnimationArgs</span> <span class="token punctuation">&#123;</span>
	node<span class="token operator">:</span> HTMLElement<span class="token punctuation">;</span>
  child<span class="token operator">:</span> Child<span class="token punctuation">;</span>
  options<span class="token operator">:</span> Options<span class="token punctuation">;</span>
  translate<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>
<span class="token punctuation">&#125;</span>

<span class="token keyword">type</span> <span class="token class-name">AnimationFunc</span> <span class="token operator">=</span> <span class="token punctuation">(</span>args<span class="token operator">:</span> AnimationArgs<span class="token punctuation">)</span> <span class="token operator">=></span> CSSStyleDeclaration<span class="token punctuation">;</span></code>`,q,C,R="Functions receives 4 arguments:",w,y,V='<thead><tr><th align="left">Name</th> <th align="left">Type</th> <th align="left">Description</th></tr></thead> <tbody><tr><td align="left"><code>node</code></td> <td align="left"><code>HTMLElement</code></td> <td align="left"><code>slidy</code> instance root DOM node.</td></tr> <tr><td align="left"><code>child</code></td> <td align="left"><code>Child</code></td> <td align="left">Extended <code>childNode</code> object.</td></tr> <tr><td align="left"><code>options</code></td> <td align="left"><code>Options</code></td> <td align="left"><code>@slidy/core</code> options subset.</td></tr> <tr><td align="left"><code>translate</code></td> <td align="left"><code>string</code></td> <td align="left">Basic translate required for any function <code>{ transform: translate }</code></td></tr></tbody>',A,_,G="<code>child</code>",E,$,J='<thead><tr><th align="left">Name</th> <th align="left">Type</th> <th align="left">Description</th></tr></thead> <tbody><tr><td align="left"><code>i</code></td> <td align="left"><code>number</code></td> <td align="left">Child index in array.</td></tr> <tr><td align="left"><code>index</code></td> <td align="left"><code>number</code></td> <td align="left">Child index in core script.</td></tr> <tr><td align="left"><code>active</code></td> <td align="left"><code>number</code></td> <td align="left">Calculated as <code>options.loop ? cix : options.index</code>.</td></tr> <tr><td align="left"><code>size</code></td> <td align="left"><code>number</code></td> <td align="left">Calculated as <code>size + gap</code> by <code>options.vertical</code>.</td></tr> <tr><td align="left"><code>dist</code></td> <td align="left"><code>number</code></td> <td align="left">Snap position distance.</td></tr> <tr><td align="left"><code>track</code></td> <td align="left"><code>number</code></td> <td align="left">Move by slide size from its snap point in specified direction.</td></tr> <tr><td align="left"><code>turn</code></td> <td align="left"><code>number</code></td> <td align="left">Calculated as <code>-1 &lt;- child.track / child.size -&gt; 1</code></td></tr> <tr><td align="left"><code>exp</code></td> <td align="left"><code>number</code></td> <td align="left">Interpolated <code>child.track</code> as <code>0 &lt;- exp -&gt; 1</code>.</td></tr></tbody>',j,v,K="<code>options</code>",P,T,Q='<thead><tr><th align="left">Name</th> <th align="left">Type</th> <th align="left">Description</th></tr></thead> <tbody><tr><td align="left"><code>index</code></td> <td align="left"><code>number</code></td> <td align="left">Active slide index.</td></tr> <tr><td align="left"><code>position</code></td> <td align="left"><code>number</code></td> <td align="left">Current position value.</td></tr> <tr><td align="left"><code>vertical</code></td> <td align="left"><code>number</code></td> <td align="left">Children flow, calculated as <code>0</code> or any <code>Number</code> as <code>true</code>.</td></tr> <tr><td align="left"><code>reverse</code></td> <td align="left"><code>number</code></td> <td align="left">The children reverse flow state: `-1</td></tr> <tr><td align="left"><code>snap</code></td> <td align="left"><code>Snap</code></td> <td align="left">The <code>snap</code> position value: <code>&quot;start&quot;, &quot;center&quot;, &quot;end&quot;, &quot;deck&quot;, undefined</code>.</td></tr></tbody>',S,b,U="Animation presets",z,x,N,k,B,D;return k=new gt({props:{href:"https://github.com/Valexr/Slidy/tree/master/packages/easing",rel:"nofollow",$$slots:{default:[ht]},$$scope:{ctx:h}}}),{c(){e=r("h2"),e.textContent=o,i=u(),c=r("p"),c.innerHTML=d,s=u(),f=r("pre"),M=new ct(!1),q=u(),C=r("p"),C.textContent=R,w=u(),y=r("table"),y.innerHTML=V,A=u(),_=r("h3"),_.innerHTML=G,E=u(),$=r("table"),$.innerHTML=J,j=u(),v=r("h3"),v.innerHTML=K,P=u(),T=r("table"),T.innerHTML=Q,S=u(),b=r("h3"),b.textContent=U,z=u(),x=r("p"),N=F("Predefined custom animations are available as "),et(k.$$.fragment),B=F("."),this.h()},l(t){e=p(t,"H2",{id:!0,"data-svelte-h":!0}),g(e)!=="svelte-19dvhdm"&&(e.textContent=o),i=m(t),c=p(t,"P",{"data-svelte-h":!0}),g(c)!=="svelte-sfmhwt"&&(c.innerHTML=d),s=m(t),f=p(t,"PRE",{class:!0});var n=X(f);M=rt(n,!1),n.forEach(a),q=m(t),C=p(t,"P",{"data-svelte-h":!0}),g(C)!=="svelte-8wdtgx"&&(C.textContent=R),w=m(t),y=p(t,"TABLE",{"data-svelte-h":!0}),g(y)!=="svelte-he6voj"&&(y.innerHTML=V),A=m(t),_=p(t,"H3",{id:!0,"data-svelte-h":!0}),g(_)!=="svelte-jdwqcj"&&(_.innerHTML=G),E=m(t),$=p(t,"TABLE",{"data-svelte-h":!0}),g($)!=="svelte-1b69ejg"&&($.innerHTML=J),j=m(t),v=p(t,"H3",{id:!0,"data-svelte-h":!0}),g(v)!=="svelte-1v3hozr"&&(v.innerHTML=K),P=m(t),T=p(t,"TABLE",{"data-svelte-h":!0}),g(T)!=="svelte-yjrqur"&&(T.innerHTML=Q),S=m(t),b=p(t,"H3",{id:!0,"data-svelte-h":!0}),g(b)!=="svelte-1rp730j"&&(b.textContent=U),z=m(t),x=p(t,"P",{});var H=X(x);N=I(H,"Predefined custom animations are available as "),nt(k.$$.fragment,H),B=I(H,"."),H.forEach(a),this.h()},h(){L(e,"id","animation"),M.a=null,L(f,"class","language-ts"),L(_,"id","child"),L(v,"id","options"),L(b,"id","animation-presets")},m(t,n){l(t,e,n),l(t,i,n),l(t,c,n),l(t,s,n),l(t,f,n),M.m(it,f),l(t,q,n),l(t,C,n),l(t,w,n),l(t,y,n),l(t,A,n),l(t,_,n),l(t,E,n),l(t,$,n),l(t,j,n),l(t,v,n),l(t,P,n),l(t,T,n),l(t,S,n),l(t,b,n),l(t,z,n),l(t,x,n),Y(x,N),at(k,x,null),Y(x,B),D=!0},p(t,n){const H={};n&2&&(H.$$scope={dirty:n,ctx:t}),k.$set(H)},i(t){D||(lt(k.$$.fragment,t),D=!0)},o(t){dt(k.$$.fragment,t),D=!1},d(t){t&&(a(e),a(i),a(c),a(s),a(f),a(q),a(C),a(w),a(y),a(A),a(_),a(E),a($),a(j),a(v),a(P),a(T),a(S),a(b),a(z),a(x)),ot(k)}}}function vt(h){let e,o;const i=[h[0],tt];let c={$$slots:{default:[_t]},$$scope:{ctx:h}};for(let d=0;d<i.length;d+=1)c=O(c,i[d]);return e=new mt({props:c}),{c(){et(e.$$.fragment)},l(d){nt(e.$$.fragment,d)},m(d,s){at(e,d,s),o=!0},p(d,[s]){const f=s&1?ut(i,[s&1&&Z(d[0]),s&0&&Z(tt)]):{};s&2&&(f.$$scope={dirty:s,ctx:d}),e.$set(f)},i(d){o||(lt(e.$$.fragment,d),o=!0)},o(d){dt(e.$$.fragment,d),o=!1},d(d){ot(e,d)}}}const tt={toc:[{level:2,title:"Animation",id:"animation"},{level:3,title:"child",id:"child"},{level:3,title:"options",id:"options"},{level:3,title:"Animation presets",id:"animation-presets"}]};function bt(h,e,o){return h.$$set=i=>{o(0,e=O(O({},e),W(i)))},e=W(e),[e]}class Tt extends pt{constructor(e){super(),ft(this,e,bt,vt,st,{})}}export{Tt as default,tt as metadata};
