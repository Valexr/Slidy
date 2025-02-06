import{t as x,a as S,b as i}from"./B109eW-1.js";import"./fImC2UEv.js";import{Z as t,Y as _,_ as n,a0 as a,$ as r}from"./DQqQCv71.js";import{h as e}from"./BqEvJcLk.js";import{l as N,s as z}from"./O1Vu6-D3.js";import{P}from"./CzZ4yvwm.js";import{L as j}from"./DPGwTJam.js";const g={toc:[{level:2,title:"Styling",id:"styling"},{level:3,title:"Extending/Overriding classes",id:"extending/overriding-classes"},{level:3,title:"Custom Properties API",id:"custom-properties-api"},{level:4,title:"Custom style props",id:"custom-style-props"},{level:4,title:"Inherited custom properties",id:"inherited-custom-properties"}]},{toc:Y}=g;var C=x('<h2 id="styling">Styling</h2> <h3 id="extendingoverriding-classes">Extending/Overriding classes</h3> <p>To extend default component styles use <code>classNames</code> property. Default classes are available via object, that can be extended or overridden:</p> <pre class="language-svelte"><!></pre> <p>The <code>classNames</code> consist of <code>&#123; target: className &#125;</code> pairs:</p> <table><thead><tr><th align="left">Target</th><th align="center">Default class</th><th align="left">Description</th></tr></thead><tbody><tr><td align="left">arrow</td><td align="center"><code>slidy-arrow</code></td><td align="left">Arrow controls.</td></tr><tr><td align="left">counter</td><td align="center"><code>slidy-counter</code></td><td align="left">Slide progress counter.</td></tr><tr><td align="left">img</td><td align="center"><code>slidy-img</code></td><td align="left">Slide image node.</td></tr><tr><td align="left">nav</td><td align="center"><code>slidy-nav</code></td><td align="left">Slide navigation panel.</td></tr><tr><td align="left">nav-item</td><td align="center"><code>slidy-nav-item</code></td><td align="left">Navigtion panel item.</td></tr><tr><td align="left">overlay</td><td align="center"><code>slidy-overlay</code></td><td align="left">Slides overlay node.</td></tr><tr><td align="left">progress</td><td align="center"><code>slidy-progress</code></td><td align="left">Slide progress bar.</td></tr><tr><td align="left">root</td><td align="center"><code>slidy</code></td><td align="left">Component’s root node.</td></tr><tr><td align="left">slide</td><td align="center"><code>slidy-slide</code></td><td align="left">Slide item node.</td></tr><tr><td align="left">slides</td><td align="center"><code>slidy-slides</code></td><td align="left">Slides list node.</td></tr><tr><td align="left">thumbnail</td><td align="center"><code>slidy-thumbnail</code></td><td align="left">Thumbnail item.</td></tr><tr><td align="left">thumbnail</td><td align="center"><code>slidy-thumbnails</code></td><td align="left">Thumbnails bar.</td></tr></tbody></table> <p>The <code>classNames</code> object is available via <!> using <code>classNames</code> key.</p> <h3 id="custom-properties-api">Custom Properties API</h3> <p>For easier style customization <code>Slidy</code> provides a set of predefined custom properties to inherit:</p> <p>List of available public custom properties:</p> <table><thead><tr><th align="left">Property</th><th align="center">Default</th><th align="center">Type</th><th align="left">Description</th></tr></thead><tbody><tr><td align="left"><code>--slidy-arrow-bg</code></td><td align="center">#4e4e4ebf</td><td align="center"><code>&lt;color&gt;</code></td><td align="left">The arrow control background color.</td></tr><tr><td align="left"><code>--slidy-arrow-bg-hover</code></td><td align="center">#4e4e4e54</td><td align="center"><code>&lt;color&gt;</code></td><td align="left">The arrow control hover background color.</td></tr><tr><td align="left"><code>--slidy-arrow-icon-color</code></td><td align="center">currentColor</td><td align="center"><code>&lt;color&gt;</code></td><td align="left">The arrow control icon fill color.</td></tr><tr><td align="left"><code>--slidy-arrow-size</code></td><td align="center">24px</td><td align="center"><code>&lt;length&gt;</code></td><td align="left">The arrow controls size.</td></tr><tr><td align="left"><code>--slidy-counter-bg</code></td><td align="center">#4e4e4ebf</td><td align="center"><code>&lt;color&gt;</code></td><td align="left">The counter’s background color.</td></tr><tr><td align="left"><code>--slidy-focus-ring-color</code></td><td align="center">#c9c9c9e6</td><td align="center"><code>&lt;color&gt;</code></td><td align="left">Focus ring color for all focusable elements.</td></tr><tr><td align="left"><code>--slidy-height</code></td><td align="center">100%</td><td align="center"><code>&lt;length&gt;</code></td><td align="left">The height of the component’s node.</td></tr><tr><td align="left"><code>--slidy-nav-item-color</code></td><td align="center">white</td><td align="center"><code>&lt;color&gt;</code></td><td align="left">The navigation elements color.</td></tr><tr><td align="left"><code>--slidy-nav-item-radius</code></td><td align="center">50%</td><td align="center"><code>&lt;length&gt;</code></td><td align="left">The navigation elements border radius.</td></tr><tr><td align="left"><code>--slidy-nav-item-size</code></td><td align="center">16px</td><td align="center"><code>&lt;length&gt;</code></td><td align="left">The navigation elements size.</td></tr><tr><td align="left"><code>--slidy-progress-thumb-color</code></td><td align="center">#c44f61</td><td align="center"><code>&lt;color&gt;</code></td><td align="left">The progress bar active track color.</td></tr><tr><td align="left"><code>--slidy-progress-track-color</code></td><td align="center">#96969680</td><td align="center"><code>&lt;color&gt;</code></td><td align="left">The progress bar track color.</td></tr><tr><td align="left"><code>--slidy-progress-track-size</code></td><td align="center">5px</td><td align="center"><code>&lt;length&gt;</code></td><td align="left">The progress bar height.</td></tr><tr><td align="left"><code>--slidy-slide-aspect-ratio</code></td><td align="center">unset</td><td align="center"><code>&lt;int/int&gt;</code></td><td align="left">Defines the slide aspect-ratio.</td></tr><tr><td align="left"><code>--slidy-slide-bg-color</code></td><td align="center">darkgray</td><td align="center"><code>&lt;color&gt;</code></td><td align="left">The placeholder background color for loading images.</td></tr><tr><td align="left"><code>--slidy-slide-gap</code></td><td align="center">1rem</td><td align="center"><code>&lt;length&gt;</code></td><td align="left">The gap between items in carousel.</td></tr><tr><td align="left"><code>--slidy-slide-height</code></td><td align="center">100%</td><td align="center"><code>&lt;length&gt;</code></td><td align="left">The carousel items height.</td></tr><tr><td align="left"><code>--slidy-slide-object-fit</code></td><td align="center">cover</td><td align="center">-</td><td align="left">The carousel items (images) resize behaviour.</td></tr><tr><td align="left"><code>--slidy-slide-radius</code></td><td align="center">1rem</td><td align="center"><code>&lt;length&gt;</code></td><td align="left">The slide’s border radius value.</td></tr><tr><td align="left"><code>--slidy-slide-width</code></td><td align="center">auto</td><td align="center"><code>&lt;length&gt;</code></td><td align="left">The carousel items width.</td></tr><tr><td align="left"><code>--slidy-thumbnail-radius</code></td><td align="center">0.5rem</td><td align="center"><code>&lt;length&gt;</code></td><td align="left">The thumbnail <code>border-radius</code> value.</td></tr><tr><td align="left"><code>--slidy-thumbnail-size</code></td><td align="center">50px</td><td align="center"><code>&lt;length&gt;</code></td><td align="left">The thumbnail panel size.</td></tr><tr><td align="left"><code>--slidy-width</code></td><td align="center">100%</td><td align="center"><code>&lt;length&gt;</code></td><td align="left">The width of the component’s node.</td></tr></tbody></table> <p>There are two options:</p> <h4 id="custom-style-props">Custom style props</h4> <p>Svelte supports passing down custom properties to component via [<code>--style-props</code>][svelte-custom-props]:</p> <pre class="language-svelte"><!></pre> <p>Bear in mind that this way Svelte wraps the component in extra <code>&lt;div /&gt;</code> with <code>display: contents</code>.</p> <h4 id="inherited-custom-properties">Inherited custom properties</h4> <p>More optimal way is to use cascade. All supported custom properties starts with <code>--slidy-</code>. For example, to recolor navigation controls, let the component inherit a <code>--slidy-nav-item-color</code> custom property from any parent:</p> <pre class="language-svelte"><!></pre> <p>Or just pass a class with a set of custom properties:</p> <pre class="language-svelte"><!></pre>',1);function Z(u,k){const h=N(k,["children","$$slots","$$events","$$legacy"]);P(u,z(()=>h,g,{children:(m,D)=>{var d=C(),s=t(_(d),6),f=n(s);e(f,()=>`<code class="language-svelte"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">></span></span><span class="token script"><span class="token language-javascript">
	<span class="token keyword">import</span> <span class="token punctuation">&#123;</span> Slidy<span class="token punctuation">,</span> classNames <span class="token punctuation">&#125;</span> <span class="token keyword">from</span> <span class="token string">"@slidy/svelte"</span><span class="token punctuation">;</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Slidy</span>
	<span class="token attr-name">classNames=</span><span class="token language-javascript"><span class="token punctuation">&#123;</span><span class="token punctuation">&#123;</span>
		<span class="token literal-property property">root</span><span class="token operator">:</span> <span class="token template-string"><span class="token template-punctuation string">&#96;</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">$&#123;</span>classNames<span class="token punctuation">.</span>root<span class="token interpolation-punctuation punctuation">&#125;</span></span><span class="token string"> custom-class</span><span class="token template-punctuation string">&#96;</span></span><span class="token punctuation">,</span>
		<span class="token operator">...</span>classNames
	<span class="token punctuation">&#125;</span><span class="token punctuation">&#125;</span></span>
<span class="token punctuation">/></span></span></code>`),a(s);var l=t(s,6),y=t(n(l),3);j(y,{href:"https://svelte.dev/docs#run-time-svelte-getcontext",rel:"nofollow",children:(T,A)=>{r();var $=S("context");i(T,$)},$$slots:{default:!0}}),r(3),a(l);var o=t(l,16),v=n(o);e(v,()=>'<code class="language-svelte"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Slidy</span> <span class="token attr-name">--slidy-slide-gap</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>1rem<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span></code>'),a(o);var c=t(o,8),b=n(c);e(b,()=>`<code class="language-svelte"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>parent<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
	<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Slidy</span> <span class="token punctuation">/></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>style</span><span class="token punctuation">></span></span><span class="token style"><span class="token language-css">
	<span class="token selector">.parent</span> <span class="token punctuation">&#123;</span>
		<span class="token property">--slidy-navigation-color</span><span class="token punctuation">:</span> red<span class="token punctuation">;</span>
	<span class="token punctuation">&#125;</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>style</span><span class="token punctuation">></span></span></code>`),a(c);var p=t(c,4),w=n(p);e(w,()=>`<code class="language-svelte"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">></span></span><span class="token script"><span class="token language-javascript">
	<span class="token keyword">import</span> <span class="token punctuation">&#123;</span> Slidy<span class="token punctuation">,</span> classNames <span class="token punctuation">&#125;</span> <span class="token keyword">from</span> <span class="token string">"@slidy/svelte"</span><span class="token punctuation">;</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Slidy</span>
	<span class="token attr-name">classNames=</span><span class="token language-javascript"><span class="token punctuation">&#123;</span><span class="token punctuation">&#123;</span>
		<span class="token literal-property property">root</span><span class="token operator">:</span> <span class="token template-string"><span class="token template-punctuation string">&#96;</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">$&#123;</span>classNames<span class="token punctuation">.</span>root<span class="token interpolation-punctuation punctuation">&#125;</span></span><span class="token string"> .some-class</span><span class="token template-punctuation string">&#96;</span></span><span class="token punctuation">,</span>
		<span class="token operator">...</span>classNames
	<span class="token punctuation">&#125;</span><span class="token punctuation">&#125;</span></span>
<span class="token punctuation">/></span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>style</span><span class="token punctuation">></span></span><span class="token style"><span class="token language-css">
	<span class="token selector">.some-class</span> <span class="token punctuation">&#123;</span>
		<span class="token property">--slidy-navigation-color</span><span class="token punctuation">:</span> red<span class="token punctuation">;</span>
		<span class="token property">--slidy-nav-item-size</span><span class="token punctuation">:</span> 1rem<span class="token punctuation">;</span>
	<span class="token punctuation">&#125;</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>style</span><span class="token punctuation">></span></span></code>`),a(p),i(m,d)},$$slots:{default:!0}}))}export{Z as default,g as metadata};
