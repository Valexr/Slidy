var h=Object.defineProperty;var f=(e,t,r)=>t in e?h(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r;var i=(e,t,r)=>(f(e,typeof t!="symbol"?t+"":t,r),r);const m=function(){const t=document.createElement("link").relList;return t&&t.supports&&t.supports("modulepreload")?"modulepreload":"preload"}(),p=function(e,t){return new URL(e,t).href},c={},R=function(t,r,l){return!r||r.length===0?t():Promise.all(r.map(n=>{if(n=p(n,l),n in c)return;c[n]=!0;const o=n.endsWith(".css"),u=o?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${n}"]${u}`))return;const s=document.createElement("link");if(s.rel=o?"stylesheet":m,o||(s.as="script",s.crossOrigin=""),s.href=n,document.head.appendChild(s),o)return new Promise((a,d)=>{s.addEventListener("load",a),s.addEventListener("error",()=>d(new Error(`Unable to preload CSS for ${n}`)))})})).then(()=>t())};class E{constructor(t,r){i(this,"name","HttpError");i(this,"stack");this.status=t,this.message=r!=null?r:`Error: ${t}`}toString(){return this.message}}class S{constructor(t,r){this.status=t,this.location=r}}function k(e,t){return new E(e,t)}export{E as H,S as R,R as _,k as e};
