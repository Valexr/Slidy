import{t as S,a as d,b as c}from"./B109eW-1.js";import"./fImC2UEv.js";import{Z as s,Y as P,_ as t,$ as a,a0 as n}from"./DQqQCv71.js";import{h as k}from"./BqEvJcLk.js";import{l as j,s as G}from"./O1Vu6-D3.js";import{P as J}from"./CzZ4yvwm.js";import{L as g}from"./DPGwTJam.js";const m={title:"slidy/svelte",description:"configurable, reusable and accessible SvelteJS carousel component.",toc:[{level:2,title:"What is slidy-svelte?",id:"what-is-slidy-svelte?"},{level:2,title:"Getting started",id:"getting-started"}]},{title:B,description:C,toc:D}=m;var L=S('<h2 id="what-is-slidy-svelte">What is slidy-svelte?</h2> <p>@slidy/svelte - configurable, reusable and accessible SvelteJS carousel component built on top of <!>.</p> <h2 id="getting-started">Getting started</h2> <p>The components are available via <!>:</p> <pre class="language-undefined"><!></pre> <p>The easiest way to get started is to use <code>&lt;Slidy /&gt;</code> component:</p> <pre class="language-svelte"><!></pre> <p>All props are optional, the only property required to get started is <code>slides</code> - an array of items, usually it is an array of image related data.</p>',1);function E(y,v){const h=j(v,["children","$$slots","$$events","$$legacy"]);J(y,G(()=>h,m,{children:(f,T)=>{var i=L(),e=s(P(i),2),$=s(t(e));g($,{href:"https://github.com/Valexr/slidy/tree/master/packages/core",rel:"nofollow",children:(l,x)=>{a();var r=d("@slidy/core");c(l,r)},$$slots:{default:!0}}),a(),n(e);var p=s(e,4),_=s(t(p));g(_,{href:"https://www.npmjs.com/package/@slidy/svelte",rel:"nofollow",children:(l,x)=>{a();var r=d("npm");c(l,r)},$$slots:{default:!0}}),a(),n(p);var o=s(p,2),b=t(o);k(b,()=>'<code class="language-undefined">npm i @slidy/core @slidy/svelte</code>'),n(o);var u=s(o,4),w=t(u);k(w,()=>`<code class="language-svelte"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">></span></span><span class="token script"><span class="token language-javascript">
	<span class="token keyword">import</span> <span class="token punctuation">&#123;</span> Slidy <span class="token punctuation">&#125;</span> <span class="token keyword">from</span> <span class="token string">"@slidy/svelte"</span><span class="token punctuation">;</span>

	<span class="token keyword">const</span> slides <span class="token operator">=</span> <span class="token punctuation">[</span>
		<span class="token punctuation">&#123;</span>
			<span class="token literal-property property">id</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
			<span class="token literal-property property">width</span><span class="token operator">:</span> <span class="token number">800</span><span class="token punctuation">,</span>
			<span class="token literal-property property">height</span><span class="token operator">:</span> <span class="token number">1200</span><span class="token punctuation">,</span>
			<span class="token literal-property property">src</span><span class="token operator">:</span> <span class="token string">"static/img/some-image.webp"</span><span class="token punctuation">,</span>
		<span class="token punctuation">&#125;</span><span class="token punctuation">,</span>
	<span class="token punctuation">]</span><span class="token punctuation">;</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Slidy</span> <span class="token language-javascript"><span class="token punctuation">&#123;</span>slides<span class="token punctuation">&#125;</span></span> <span class="token punctuation">/></span></span></code>`),n(u),a(2),c(f,i)},$$slots:{default:!0}}))}export{E as default,m as metadata};
