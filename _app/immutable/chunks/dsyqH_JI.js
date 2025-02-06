import{t as l,b as i}from"./B109eW-1.js";import"./fImC2UEv.js";import{Z as r,Y as p,_ as g,a0 as u,$ as m}from"./DQqQCv71.js";import{h as f}from"./BqEvJcLk.js";import{l as h,s as k}from"./O1Vu6-D3.js";import{P as b}from"./CzZ4yvwm.js";const n={toc:[{level:2,title:"Core Component",id:"core-component"},{level:3,title:"Core Component API",id:"core-component-api"}]},{toc:w}=n;var v=l('<h2 id="core-component">Core Component</h2> <p><code>Core</code> is a wrapper component for [@slidy/core][core-package] available via named import. It is best to use to build up the custom component for specific needs or when just the basic functionality is needed.</p> <pre class="language-svelte"><!></pre> <h3 id="core-component-api">Core Component API</h3> <table><thead><tr><th align="left">Property</th><th align="center">Default</th><th align="center">Type</th><th align="left">Description</th></tr></thead><tbody><tr><td align="left"><code>animation</code></td><td align="center"><code>undefined</code></td><td align="center"><code>AnimationFunc</code></td><td align="left">Custom slide animation.</td></tr><tr><td align="left"><code>axis</code></td><td align="center"><code>"x"</code></td><td align="center">`“x”</td><td align="left">“y”`</td></tr><tr><td align="left"><code>clamp</code></td><td align="center"><code>0</code></td><td align="center"><code>number</code></td><td align="left">Clamps sliding index as <code>&#123;clamp&#125; - &#123;index&#125; + &#123;clamp&#125;</code></td></tr><tr><td align="left"><code>className</code></td><td align="center"><code>""</code></td><td align="center"><code>string</code></td><td align="left">Passes the <code>class</code> to the node.</td></tr><tr><td align="left"><code>duration</code></td><td align="center"><code>450</code></td><td align="center"><code>number</code></td><td align="left">Slide transitions duration value.</td></tr><tr><td align="left"><code>easing</code></td><td align="center"><code>undefined</code></td><td align="center"><code>(t: number =&gt; number)</code></td><td align="left">Inertion scroll easing behaviour.</td></tr><tr><td align="left"><code>gravity</code></td><td align="center"><code>1.2</code></td><td align="center"><code>number</code></td><td align="left">Scroll inertia value.</td></tr><tr><td align="left"><code>indent</code></td><td align="center"><code>0</code></td><td align="center"><code>number</code></td><td align="left">Custom scroll indent value, calculates as <code>gap * indent</code>.</td></tr><tr><td align="left"><code>index</code></td><td align="center"><code>0</code></td><td align="center"><code>number</code></td><td align="left">The index of the initial slide.</td></tr><tr><td align="left"><code>loop</code></td><td align="center"><code>false</code></td><td align="center"><code>boolean</code></td><td align="left">Makes the slideshow continious.</td></tr><tr><td align="left"><code>position</code></td><td align="center"><code>0</code></td><td align="center"><code>number</code></td><td align="left">The current position value of the carousel.</td></tr><tr><td align="left"><code>sensity</code></td><td align="center"><code>5</code></td><td align="center"><code>number</code></td><td align="left">Defines the sliding sensity as the number of pixels required to drag.</td></tr><tr><td align="left"><code>snap</code></td><td align="center"><code>undefined</code></td><td align="center">`“start”</td><td align="left">“center”</td></tr><tr><td align="left"><code>tag</code></td><td align="center"><code>"ol"</code></td><td align="center"><code>string</code></td><td align="left">The HTML tag name to render.</td></tr></tbody></table> <p>For TypeScript users there is the <code>SlidyCoreOptions</code> interface available via named import.</p>',1);function I(a,d){const o=h(d,["children","$$slots","$$events","$$legacy"]);b(a,k(()=>o,n,{children:(c,y)=>{var t=v(),e=r(p(t),4),s=g(e);f(s,()=>`<code class="language-svelte"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">></span></span><span class="token script"><span class="token language-javascript">
	<span class="token keyword">import</span> <span class="token punctuation">&#123;</span> Core <span class="token punctuation">&#125;</span> <span class="token keyword">from</span> <span class="token string">"@slidy/svelte"</span><span class="token punctuation">;</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Core</span><span class="token punctuation">></span></span>
	<span class="token comment">&lt;!-- your carousel items passed via slot --></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>Core</span><span class="token punctuation">></span></span></code>`),u(e),m(6),i(c,t)},$$slots:{default:!0}}))}export{I as default,n as metadata};
