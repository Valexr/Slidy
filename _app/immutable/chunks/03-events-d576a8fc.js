import{S as Pa,i as Ua,s as ja,N as Un,w as za,x as Ha,y as La,Q as Ia,a3 as ba,f as Ma,t as Aa,z as Sa,T as Ra,k as a,q as o,a as d,l as e,m as s,r as l,h as n,c as u,n as r,b as H,C as t,B as Qa}from"./index-9be55e4b.js";import{P as Ya}from"./Page-a8b91d99.js";import{L as Fa}from"./Link-f9f4500f.js";function Ga(R){let c,_;return{c(){c=a("code"),_=o("destroy()")},l(g){c=e(g,"CODE",{});var f=s(c);_=l(f,"destroy()"),f.forEach(n)},m(g,f){H(g,c,f),t(c,_)},p:Qa,d(g){g&&n(c)}}}function Ja(R){let c,_,g,f,i,k,D,At,St,B,Bt,Nt,N,Pt,Ut,h,T,P,it,jt,It,U,ft,Qt,Yt,y,kt,Ft,Gt,ht,Jt,Kt,Vt,O,j,gt,Wt,Xt,I,_t,Zt,tn,L,nn,vt,an,en,x,Q,Et,sn,on,Y,mt,ln,cn,F,pn,rn,$,G,Dt,dn,un,J,Tt,fn,kn,K,hn,gn,C,V,yt,_n,vn,W,Ot,En,mn,m,Dn,xt,Tn,yn,$t,On,xn,$n,w,X,Ct,Cn,wn,Z,wt,bn,Rn,tt,qn,zn,b,nt,bt,Hn,Ln,at,Rt,Mn,An,q,Sn,z,Bn,zt,M,Nn,Ht,A,Ba=`<code class="language-html"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>head</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>module<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token script"><span class="token language-javascript">
        <span class="token keyword">import</span> <span class="token punctuation">&#123;</span> slidy <span class="token punctuation">&#125;</span> <span class="token keyword">from</span> <span class="token string">"@slidy/core"</span><span class="token punctuation">;</span>

        <span class="token keyword">const</span> node <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">querySelector</span><span class="token punctuation">(</span><span class="token string">"#node"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">slidy</span><span class="token punctuation">(</span>document<span class="token punctuation">.</span><span class="token function">querySelector</span><span class="token punctuation">(</span><span class="token string">"#node"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        node<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">"mount"</span><span class="token punctuation">,</span> <span class="token parameter">e</span> <span class="token operator">=></span> console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>e<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        node<span class="token punctuation">.</span><span class="token function-variable function">onupdate</span> <span class="token operator">=</span> <span class="token parameter">e</span> <span class="token operator">=></span> console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>e<span class="token punctuation">.</span>detail<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token keyword">function</span> <span class="token function">onMove</span><span class="token punctuation">(</span><span class="token parameter">e</span><span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
            <span class="token keyword">const</span> <span class="token punctuation">&#123;</span> index<span class="token punctuation">,</span> position <span class="token punctuation">&#125;</span> <span class="token operator">=</span> e<span class="token punctuation">.</span>detail
            console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>index<span class="token punctuation">,</span> position<span class="token punctuation">)</span>
        <span class="token punctuation">&#125;</span>
    </span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>head</span><span class="token punctuation">></span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>section</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>ul</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>node<span class="token punctuation">"</span></span> <span class="token attr-name">onmove</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>onMove<span class="token punctuation">"</span></span> <span class="token attr-name">tabindex</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>0<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
        <span class="token comment">&lt;!-- items --></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>ul</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>section</span><span class="token punctuation">></span></span></code>`,Lt;return z=new Fa({props:{href:"#methods",$$slots:{default:[Ga]},$$scope:{ctx:R}}}),{c(){c=a("h2"),_=o("Events"),g=d(),f=a("table"),i=a("thead"),k=a("tr"),D=a("th"),At=o("Name"),St=d(),B=a("th"),Bt=o("Detail"),Nt=d(),N=a("th"),Pt=o("Description"),Ut=d(),h=a("tbody"),T=a("tr"),P=a("td"),it=a("code"),jt=o("mount"),It=d(),U=a("td"),ft=a("code"),Qt=o("{options}"),Yt=d(),y=a("td"),kt=a("code"),Ft=o("node.children.length"),Gt=o(" and "),ht=a("code"),Jt=o("node.children"),Kt=o(" are connected."),Vt=d(),O=a("tr"),j=a("td"),gt=a("code"),Wt=o("resize"),Xt=d(),I=a("td"),_t=a("code"),Zt=o("{ROE}"),tn=d(),L=a("td"),nn=o("The target node changed it’s size: "),vt=a("code"),an=o("ROE: ResizeObserverEntry[]"),en=d(),x=a("tr"),Q=a("td"),Et=a("code"),sn=o("move"),on=d(),Y=a("td"),mt=a("code"),ln=o("{index,position}"),cn=d(),F=a("td"),pn=o("The sliding occured."),rn=d(),$=a("tr"),G=a("td"),Dt=a("code"),dn=o("index"),un=d(),J=a("td"),Tt=a("code"),fn=o("{index}"),kn=d(),K=a("td"),hn=o("The index was changed."),gn=d(),C=a("tr"),V=a("td"),yt=a("code"),_n=o("keys"),vn=d(),W=a("td"),Ot=a("code"),En=o("{e.key}"),mn=d(),m=a("td"),Dn=o("The key is pressed during the target node focus. Arrow keys behaviour is predefined for navigation with "),xt=a("code"),Tn=o("preventDefault"),yn=o(" used on them. To get the focus use "),$t=a("code"),On=o("tabIndex=0"),xn=o(" attribute on the target node."),$n=d(),w=a("tr"),X=a("td"),Ct=a("code"),Cn=o("update"),wn=d(),Z=a("td"),wt=a("code"),bn=o("{updated.options}"),Rn=d(),tt=a("td"),qn=o("Options were changed."),zn=d(),b=a("tr"),nt=a("td"),bt=a("code"),Hn=o("destroy"),Ln=d(),at=a("td"),Rt=a("code"),Mn=o("{node}"),An=d(),q=a("td"),Sn=o("Targed node is unmounted from the DOM or "),za(z.$$.fragment),Bn=o(" method was used."),zt=d(),M=a("h3"),Nn=o("Events Usage Example"),Ht=d(),A=a("pre"),this.h()},l(p){c=e(p,"H2",{id:!0});var E=s(c);_=l(E,"Events"),E.forEach(n),g=u(p),f=e(p,"TABLE",{});var S=s(f);i=e(S,"THEAD",{});var jn=s(i);k=e(jn,"TR",{});var et=s(k);D=e(et,"TH",{align:!0});var In=s(D);At=l(In,"Name"),In.forEach(n),St=u(et),B=e(et,"TH",{align:!0});var Qn=s(B);Bt=l(Qn,"Detail"),Qn.forEach(n),Nt=u(et),N=e(et,"TH",{align:!0});var Yn=s(N);Pt=l(Yn,"Description"),Yn.forEach(n),et.forEach(n),jn.forEach(n),Ut=u(S),h=e(S,"TBODY",{});var v=s(h);T=e(v,"TR",{});var st=s(T);P=e(st,"TD",{align:!0});var Fn=s(P);it=e(Fn,"CODE",{});var Gn=s(it);jt=l(Gn,"mount"),Gn.forEach(n),Fn.forEach(n),It=u(st),U=e(st,"TD",{align:!0});var Jn=s(U);ft=e(Jn,"CODE",{});var Kn=s(ft);Qt=l(Kn,"{options}"),Kn.forEach(n),Jn.forEach(n),Yt=u(st),y=e(st,"TD",{align:!0});var qt=s(y);kt=e(qt,"CODE",{});var Vn=s(kt);Ft=l(Vn,"node.children.length"),Vn.forEach(n),Gt=l(qt," and "),ht=e(qt,"CODE",{});var Wn=s(ht);Jt=l(Wn,"node.children"),Wn.forEach(n),Kt=l(qt," are connected."),qt.forEach(n),st.forEach(n),Vt=u(v),O=e(v,"TR",{});var ot=s(O);j=e(ot,"TD",{align:!0});var Xn=s(j);gt=e(Xn,"CODE",{});var Zn=s(gt);Wt=l(Zn,"resize"),Zn.forEach(n),Xn.forEach(n),Xt=u(ot),I=e(ot,"TD",{align:!0});var ta=s(I);_t=e(ta,"CODE",{});var na=s(_t);Zt=l(na,"{ROE}"),na.forEach(n),ta.forEach(n),tn=u(ot),L=e(ot,"TD",{align:!0});var Pn=s(L);nn=l(Pn,"The target node changed it’s size: "),vt=e(Pn,"CODE",{});var aa=s(vt);an=l(aa,"ROE: ResizeObserverEntry[]"),aa.forEach(n),Pn.forEach(n),ot.forEach(n),en=u(v),x=e(v,"TR",{});var lt=s(x);Q=e(lt,"TD",{align:!0});var ea=s(Q);Et=e(ea,"CODE",{});var sa=s(Et);sn=l(sa,"move"),sa.forEach(n),ea.forEach(n),on=u(lt),Y=e(lt,"TD",{align:!0});var oa=s(Y);mt=e(oa,"CODE",{});var la=s(mt);ln=l(la,"{index,position}"),la.forEach(n),oa.forEach(n),cn=u(lt),F=e(lt,"TD",{align:!0});var ca=s(F);pn=l(ca,"The sliding occured."),ca.forEach(n),lt.forEach(n),rn=u(v),$=e(v,"TR",{});var ct=s($);G=e(ct,"TD",{align:!0});var pa=s(G);Dt=e(pa,"CODE",{});var ra=s(Dt);dn=l(ra,"index"),ra.forEach(n),pa.forEach(n),un=u(ct),J=e(ct,"TD",{align:!0});var da=s(J);Tt=e(da,"CODE",{});var ua=s(Tt);fn=l(ua,"{index}"),ua.forEach(n),da.forEach(n),kn=u(ct),K=e(ct,"TD",{align:!0});var ia=s(K);hn=l(ia,"The index was changed."),ia.forEach(n),ct.forEach(n),gn=u(v),C=e(v,"TR",{});var pt=s(C);V=e(pt,"TD",{align:!0});var fa=s(V);yt=e(fa,"CODE",{});var ka=s(yt);_n=l(ka,"keys"),ka.forEach(n),fa.forEach(n),vn=u(pt),W=e(pt,"TD",{align:!0});var ha=s(W);Ot=e(ha,"CODE",{});var ga=s(Ot);En=l(ga,"{e.key}"),ga.forEach(n),ha.forEach(n),mn=u(pt),m=e(pt,"TD",{align:!0});var rt=s(m);Dn=l(rt,"The key is pressed during the target node focus. Arrow keys behaviour is predefined for navigation with "),xt=e(rt,"CODE",{});var _a=s(xt);Tn=l(_a,"preventDefault"),_a.forEach(n),yn=l(rt," used on them. To get the focus use "),$t=e(rt,"CODE",{});var va=s($t);On=l(va,"tabIndex=0"),va.forEach(n),xn=l(rt," attribute on the target node."),rt.forEach(n),pt.forEach(n),$n=u(v),w=e(v,"TR",{});var dt=s(w);X=e(dt,"TD",{align:!0});var Ea=s(X);Ct=e(Ea,"CODE",{});var ma=s(Ct);Cn=l(ma,"update"),ma.forEach(n),Ea.forEach(n),wn=u(dt),Z=e(dt,"TD",{align:!0});var Da=s(Z);wt=e(Da,"CODE",{});var Ta=s(wt);bn=l(Ta,"{updated.options}"),Ta.forEach(n),Da.forEach(n),Rn=u(dt),tt=e(dt,"TD",{align:!0});var ya=s(tt);qn=l(ya,"Options were changed."),ya.forEach(n),dt.forEach(n),zn=u(v),b=e(v,"TR",{});var ut=s(b);nt=e(ut,"TD",{align:!0});var Oa=s(nt);bt=e(Oa,"CODE",{});var xa=s(bt);Hn=l(xa,"destroy"),xa.forEach(n),Oa.forEach(n),Ln=u(ut),at=e(ut,"TD",{align:!0});var $a=s(at);Rt=e($a,"CODE",{});var Ca=s(Rt);Mn=l(Ca,"{node}"),Ca.forEach(n),$a.forEach(n),An=u(ut),q=e(ut,"TD",{align:!0});var Mt=s(q);Sn=l(Mt,"Targed node is unmounted from the DOM or "),Ha(z.$$.fragment,Mt),Bn=l(Mt," method was used."),Mt.forEach(n),ut.forEach(n),v.forEach(n),S.forEach(n),zt=u(p),M=e(p,"H3",{id:!0});var wa=s(M);Nn=l(wa,"Events Usage Example"),wa.forEach(n),Ht=u(p),A=e(p,"PRE",{class:!0});var Na=s(A);Na.forEach(n),this.h()},h(){r(c,"id","events"),r(D,"align","left"),r(B,"align","left"),r(N,"align","left"),r(P,"align","left"),r(U,"align","left"),r(y,"align","left"),r(j,"align","left"),r(I,"align","left"),r(L,"align","left"),r(Q,"align","left"),r(Y,"align","left"),r(F,"align","left"),r(G,"align","left"),r(J,"align","left"),r(K,"align","left"),r(V,"align","left"),r(W,"align","left"),r(m,"align","left"),r(X,"align","left"),r(Z,"align","left"),r(tt,"align","left"),r(nt,"align","left"),r(at,"align","left"),r(q,"align","left"),r(M,"id","events-usage-example"),r(A,"class","language-html")},m(p,E){H(p,c,E),t(c,_),H(p,g,E),H(p,f,E),t(f,i),t(i,k),t(k,D),t(D,At),t(k,St),t(k,B),t(B,Bt),t(k,Nt),t(k,N),t(N,Pt),t(f,Ut),t(f,h),t(h,T),t(T,P),t(P,it),t(it,jt),t(T,It),t(T,U),t(U,ft),t(ft,Qt),t(T,Yt),t(T,y),t(y,kt),t(kt,Ft),t(y,Gt),t(y,ht),t(ht,Jt),t(y,Kt),t(h,Vt),t(h,O),t(O,j),t(j,gt),t(gt,Wt),t(O,Xt),t(O,I),t(I,_t),t(_t,Zt),t(O,tn),t(O,L),t(L,nn),t(L,vt),t(vt,an),t(h,en),t(h,x),t(x,Q),t(Q,Et),t(Et,sn),t(x,on),t(x,Y),t(Y,mt),t(mt,ln),t(x,cn),t(x,F),t(F,pn),t(h,rn),t(h,$),t($,G),t(G,Dt),t(Dt,dn),t($,un),t($,J),t(J,Tt),t(Tt,fn),t($,kn),t($,K),t(K,hn),t(h,gn),t(h,C),t(C,V),t(V,yt),t(yt,_n),t(C,vn),t(C,W),t(W,Ot),t(Ot,En),t(C,mn),t(C,m),t(m,Dn),t(m,xt),t(xt,Tn),t(m,yn),t(m,$t),t($t,On),t(m,xn),t(h,$n),t(h,w),t(w,X),t(X,Ct),t(Ct,Cn),t(w,wn),t(w,Z),t(Z,wt),t(wt,bn),t(w,Rn),t(w,tt),t(tt,qn),t(h,zn),t(h,b),t(b,nt),t(nt,bt),t(bt,Hn),t(b,Ln),t(b,at),t(at,Rt),t(Rt,Mn),t(b,An),t(b,q),t(q,Sn),La(z,q,null),t(q,Bn),H(p,zt,E),H(p,M,E),t(M,Nn),H(p,Ht,E),H(p,A,E),A.innerHTML=Ba,Lt=!0},p(p,E){const S={};E&2&&(S.$$scope={dirty:E,ctx:p}),z.$set(S)},i(p){Lt||(Ma(z.$$.fragment,p),Lt=!0)},o(p){Aa(z.$$.fragment,p),Lt=!1},d(p){p&&n(c),p&&n(g),p&&n(f),Sa(z),p&&n(zt),p&&n(M),p&&n(Ht),p&&n(A)}}}function Ka(R){let c,_;const g=[R[0],qa];let f={$$slots:{default:[Ja]},$$scope:{ctx:R}};for(let i=0;i<g.length;i+=1)f=Un(f,g[i]);return c=new Ya({props:f}),{c(){za(c.$$.fragment)},l(i){Ha(c.$$.fragment,i)},m(i,k){La(c,i,k),_=!0},p(i,[k]){const D=k&1?Ia(g,[k&1&&ba(i[0]),k&0&&ba(qa)]):{};k&2&&(D.$$scope={dirty:k,ctx:i}),c.$set(D)},i(i){_||(Ma(c.$$.fragment,i),_=!0)},o(i){Aa(c.$$.fragment,i),_=!1},d(i){Sa(c,i)}}}const qa={toc:[{level:2,title:"Events",id:"events"},{level:3,title:"Events Usage Example",id:"events-usage-example"}]};function Va(R,c,_){return R.$$set=g=>{_(0,c=Un(Un({},c),Ra(g)))},c=Ra(c),[c]}class te extends Pa{constructor(c){super(),Ua(this,c,Va,Ka,ja,{})}}export{te as default,qa as metadata};