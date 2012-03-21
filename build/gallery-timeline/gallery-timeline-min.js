YUI.add("gallery-timeline",function(a){var b=a.Lang,o="region",s="start",d="end",l="left",g="url",p="container",c="loaded",k="Change",f="event",r="categories",n="top",v="center",j="right",i="px",t="strings",u="timeline",e=function(){return a.ClassNameManager.getClassName.apply(this,[u].concat(a.Array(arguments)));},w=a.Node.create('<div class="'+e("bar")+'" />'),q=a.Node.create('<div class="'+e("grid")+'"/>'),h=a.Node.create('<div class="'+e("pointer")+'" />'),m='<div class="'+e("cats")+'">{categories}<p class="'+e("noCat")+'">{noCategory}</p></div>';a.Timeline=a.Base.create(u,a.Base,[],{initializer:function(x){this.set(t,a.Intl.get("gallery-"+u));this.after(g+k,this._load);this.after(p+k,this._render);this.after(c+k,this._render);if(x&&x[g]){this._load();}if(x&&x[p]){this._render();}},_readBoolean:function(y,x){var z=this._readValue(y,x);return z?z.toLowerCase()==="true":null;},_readDate:function(z,x){var y,A,B=this._readValue(z,x);if(B){B=B.split(" ");y=B[0].split("-");A=B[1].split(":");return new Date(y[0],y[1]-1,y[2],A[0],A[1],A[2]).getTime();}else{return null;}},_readColor:function(y,x){var A=this._readValue(y,x),z=function(B){return("00"+parseInt(B,10).toString(16)).substr(-2);};if(A){A=A.split(",");return"#"+z(A[0])+z(A[1])+z(A[2]);}else{return null;}},_readValue:function(y,x){var z=this._readEl(y,x);return z?z.textContent:null;},_readEl:function(y,x){var z=y.getElementsByTagName(x);return(z&&z.length)?z[0]:null;},_xmlReadCategories:function(x){var y={};a.each(x.children,function(z){y[this._readValue(z,"name")]={color:this._readColor(z,"color"),fontColor:this._readColor(z,"font_color")};},this);this.set(r,y);},_xmlReadView:function(x){var y=this._readEl(x,"displayed_period"),A=[],z=this._readEl(x,"hidden_categories").firstChild;if(y){this.set(s,this._readDate(y,s));this.set(d,this._readDate(y,d));}while(z){A.push(z.textContent);z=z.nextChild;}this.set("hiddenCats",A);},_xmlReadEvents:function(x){this.events=[];a.each(x.children,function(y){this.events.push({start:this._readDate(y,s),end:this._readDate(y,d),text:this._readValue(y,"text"),fuzzy:this._readBoolean(y,"fuzzy"),locked:this._readBoolean(y,"locked"),endsToday:this._readBoolean(y,"ends_today"),category:this._readValue(y,"category"),description:this._readValue(y,"description"),icon:this._readValue(y,"icon")});},this);},load:function(x){this.set(g,x);return this;},_load:function(){var x=this;x.set(c,false);a.io(x.get(g),{on:{success:function(A,z){var y=z.responseXML;x._xmlReadCategories(x._readEl(y,r));x._xmlReadView(x._readEl(y,"view"));x._xmlReadEvents(x._readEl(y,"events"));x.set(c,true);}}});},_getRegion:function(y){var x=y.get(o);x.left-=this._left;x.top-=this._top;return x;},_resize:function(y){y=y||this.get(p);var A=this.get(s),D=this.get(d),I=this._width,K=this._height,C=I/(D-A),J=this.get(r),F,z,B,H=false,G,x,E=false;a.each(this.events,function(L){F=L.bar||w.cloneNode();x=L.pointer;B=Math.round((L.start-A)*C);z=Math.round(((L.endsToday?Date.now():L.end)-L.start)*C);if(B+z<0||B>I){if(L.bar){L.bar.remove(true);L.bar=null;if(x){x.remove(true);L.pointer=x=null;}}return;}L.isPoint=z===0;F.setStyles({left:B+i,width:z?z+i:"auto"});if(!L.bar){L.bar=F;if(L.category){F.setStyles({backgroundColor:J[L.category].color,color:J[L.category].fontColor});}else{E=true;}F.setContent(L.text);F.set("title",L.text);if(L.fuzzy){F.addClass(e("fuzzy"));}if(L.description||L.icon){F.addClass(e("hasDescr"));}F.setData(f,L);}if(!F.inDoc()){y.append(F);H=true;}if(L.isPoint){G=this._getRegion(F);F.setStyle(l,G.left-G.width/2+i);if(!x){L.pointer=x=h.cloneNode();x.setStyle(n,K/2+i);}}else{if(x){x.remove(true);L.pointer=x=null;}}if(x){x.setStyle(l,B+i);if(!x.inDoc()){y.append(x);}}},this);if(H){this._locate();}y.one("."+e("noCat")).setStyle("display",E?"block":"none");},_locate:function(){var y,A,B,F=this._height/2,D=[],x=[],E,C,z=function(I,J,H,G){I.setStyle(n,F+(G?30*H+15:-30*(H+1)-15)+i);if(!J[H]){J[H]=[];}J[H].push({left:A,width:y});var K=I.getData(f).pointer;if(K){K.setStyle("height",30*H+15);}};this.get(p).all("div."+e("bar")).each(function(G){B=this._getRegion(G);y=B.width;A=B.left;C=G.getData(f).isPoint;E=(C?D:x);if(!a.some(E,function(I,H){if(!a.some(I,function(J){return !(J.left>(A+y)||A>(J.left+J.width));})){z(G,E,H,C);return true;}return false;},this)){z(G,E,E.length,C);}},this);},_grid:function(){var z=this.get(s),D=this.get(d),x=this.get(p),A=this._width,K=this._height,G=D-z,I=[1000*60*60,24,30,12,10,10,10,10],H=1,E,F,y,B,J,C,L=function(O,M,N){O=new Date(O);switch(M){case 0:return new Date(O.getFullYear(),O.getMonth(),O.getDate(),O.getHours()+N,0,0).getTime();case 1:return new Date(O.getFullYear(),O.getMonth(),O.getDate()+N).getTime();case 2:return new Date(O.getFullYear(),O.getMonth()+N,1).getTime();default:M=Math.pow(10,M-3);return new Date(Math.floor(O.getFullYear()/M)*M+(N?M:0),0,1).getTime();}};x.all("div."+e("grid")).remove(true);for(E=0;E<I.length;E+=1){H*=I[E];if(A/G*H>20){break;}}B=L(z,E,0);while(B<D){F=L(B,E,1);C=new Date(B);y=q.cloneNode();J=[C.getHours()];if(J[0]===0){J[1]=C.getDate();if(J[1]===1){J[2]=C.getMonth();if(J[2]===0){J[3]=C.getFullYear();}J[2]=this.get(t).months[J[2]];}}y.setContent(J.slice(Math.min(3,E)).join(", "));y.setStyles({width:Math.round((F-B)/G*A)-1+i,left:Math.round((B-z)/G*A)+i,paddingTop:K/2+i,height:K/2+i});x.append(y);B=F;}},render:function(x){this.set(p,x);return this;},_render:function(){var x=this.get(p);if(!(x&&this.get(c))){return;}x.addClass(e());x.setContent("");a.each(this.events,function(A){delete A.pointer;delete A.bar;});var z=x.get(o);this._left=z.left;this._top=z.top;this._height=z.height;this._width=z.width;x.append(a.Node.create('<div class="'+e("divider")+'"/>'));var y=x.appendChild(a.Node.create(b.sub(m,this.get(t))));a.each(this.get(r),function(A,B){y.append(a.Node.create('<p style="color:'+A.fontColor+";background-color:"+A.color+'">'+B+"</p>"));});this._descr=x.appendChild(a.Node.create('<div class="'+e("descr")+'"/>'));this._grid();this._resize(x);x.delegate("click",this._showDescr,"div."+e("bar"),this);
x.on("gesturemovestart",this._startMove,{},this);x.on("gesturemove",this._dragMove,{},this);x.on("gesturemoveend",this._dragMove,{},this);a.on("mousewheel",this._mouseWheel,this);return;},_hideDescr:function(){this._descr.setStyle("display","none");},_showDescr:function(C){var B=C.target,A=B.getData(f),z=this._getRegion(B),E=this._descr,x,D=z.left+z.width/2,y=this._width/3;if(A.description||A.icon){E.setContent((A.icon?'<img src="data:image/png;base64,'+A.icon+'">':"")+A.description);E.setStyles({display:"block",top:0});E.removeClass(e(l));E.removeClass(e(v));E.removeClass(e(j));x=this._getRegion(E);if(D<y){E.setStyle(l,Math.max(D,0)+i);E.addClass(e(l));}else{if(D<y*2){E.setStyle(l,D-x.width/2+i);E.addClass(e(v));}else{E.setStyle(l,Math.min(D,this._width-30)-x.width+i);E.addClass(e(j));}}E.setStyle(n,Math.round(z.top-x.height-20)+i);}},_startMove:function(x){x.halt();this._hideDescr();this._pageX=x.pageX;this._start=this.get(s);this._end=this.get(d);},_dragMove:function(A){var B=this._start,y=this._end,z=this._width,x=Math.round((A.pageX-this._pageX)/z*(y-B));if(x){this.set(s,B-x);if(A.ctrlKey){this.set(d,y+x);this._locate();}else{this.set(d,y-x);}this._resize();this._grid();}},_mouseWheel:function(z){if(z.target.ancestor("#"+this.get(p).get("id"),true)){z.halt();this._hideDescr();var A=this.get(s),y=this.get(d),x=(y-A)*0.1*(z.wheelDelta>0?-1:1);this.set(s,A-x);if(z.ctrlKey){this.set(d,y+x);this._locate();}else{this.set(d,y-x);}this._resize();this._grid();}}},{ATTRS:{categories:{validator:b.isObject,value:{}},hiddenCats:{validator:b.isArray,value:[]},start:{validator:b.isNumber,value:new Date(Date.now()-1000*60*60*24*30).getTime()},end:{validator:b.isNumber,value:new Date(Date.now()+1000*60*60*24*30).getTime()},container:{setter:function(x){return a.one(x);}},url:{validator:b.isString},loaded:{validator:b.isBoolean,value:false},strings:{value:{categories:"Categories",noCategory:"-no category-",months:["jan","feb","mar","apr","may","jun","jul","aug","sep","oct","nov","dec"]}}}});},"gallery-2012.01.25-21-14",{lang:["en","es"],optional:["intl"],requires:["node","io-base","base","event-mousewheel","event-gestures","classnamemanager"],skinnable:true});