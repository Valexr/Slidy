var d=Object.defineProperty;var h=(e,t,r)=>t in e?d(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r;var i=(e,t,r)=>(h(e,typeof t!="symbol"?t+"":t,r),r);class f{constructor(t,r){i(this,"name","HttpError");i(this,"stack");this.status=t,this.message=r!=null?r:`Error: ${t}`}toString(){return this.message}}class k{constructor(t,r){this.status=t,this.location=r}}function L(e,t){return new f(e,t)}const m=function(){const t=document.createElement("link").relList;return t&&t.supports&&t.supports("modulepreload")?"modulepreload":"preload"}(),p=function(e){return"/Slidy/"+e},c={},R=function(t,r,E){return!r||r.length===0?t():Promise.all(r.map(n=>{if(n=p(n),n in c)return;c[n]=!0;const o=n.endsWith(".css"),l=o?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${n}"]${l}`))return;const s=document.createElement("link");if(s.rel=o?"stylesheet":m,o||(s.as="script",s.crossOrigin=""),s.href=n,document.head.appendChild(s),o)return new Promise((u,a)=>{s.addEventListener("load",u),s.addEventListener("error",()=>a(new Error(`Unable to preload CSS for ${n}`)))})})).then(()=>t())};export{f as H,k as R,R as _,L as e};
