(function(e){function t(t){for(var i,s,l=t[0],o=t[1],c=t[2],d=0,h=[];d<l.length;d++)s=l[d],a[s]&&h.push(a[s][0]),a[s]=0;for(i in o)Object.prototype.hasOwnProperty.call(o,i)&&(e[i]=o[i]);u&&u(t);while(h.length)h.shift()();return r.push.apply(r,c||[]),n()}function n(){for(var e,t=0;t<r.length;t++){for(var n=r[t],i=!0,l=1;l<n.length;l++){var o=n[l];0!==a[o]&&(i=!1)}i&&(r.splice(t--,1),e=s(s.s=n[0]))}return e}var i={},a={app:0},r=[];function s(t){if(i[t])return i[t].exports;var n=i[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,s),n.l=!0,n.exports}s.m=e,s.c=i,s.d=function(e,t,n){s.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},s.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},s.t=function(e,t){if(1&t&&(e=s(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(s.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)s.d(n,i,function(t){return e[t]}.bind(null,i));return n},s.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return s.d(t,"a",t),t},s.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},s.p="";var l=window["webpackJsonp"]=window["webpackJsonp"]||[],o=l.push.bind(l);l.push=t,l=l.slice();for(var c=0;c<l.length;c++)t(l[c]);var u=o;r.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"1ca9":function(e,t,n){"use strict";var i=n("6f32"),a=n.n(i);a.a},2274:function(e,t,n){"use strict";var i=n("2fbc"),a=n.n(i);a.a},"2fbc":function(e,t,n){},3225:function(e,t,n){},"467c":function(e,t,n){"use strict";var i=n("3225"),a=n.n(i);a.a},"56d7":function(e,t,n){"use strict";n.r(t);var i=n("6e6d"),a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("Game")],1)},r=[],s=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"game"},[n("div",{staticClass:"title"},[e._v("扫雷")]),n("Minebroad",{attrs:{level:e.level}})],1)},l=[],o=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"mine-body"},[n("div",{staticClass:"info"},[n("div",{staticClass:"timer"},[e._v("时间："+e._s(e.timestr))]),n("div",{staticClass:"reset"},[n("button",{on:{click:e.reset}},[e._v("重来")])]),n("div",{staticClass:"mine-count"},[e._v("剩余："+e._s(e.level.mineTotal-e.mineCount.mark))])]),n("div",{staticClass:"board"},e._l(e.mineMap,function(t,i){return n("div",{key:i,staticClass:"row"},e._l(t,function(t){return n("cell",{key:t.row+"-"+t.index,attrs:{data:t},on:{handleMark:e.handleMark,handleOpen:e.handleOpen}})}),1)}),0)])},c=[],u=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"cell",class:{open:e.data.isOpen,mark:e.data.isMark,trigger:e.data.isTrigger},on:{click:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"left",37,t.key,["Left","ArrowLeft"])?null:"button"in t&&0!==t.button?null:e.handleOpen(t)},contextmenu:function(t){return e.handleMark(t)}}},[e._v(e._s(e.data.isOpen?"true"===e.data.isMine?"💣":e.data.adjMine:e.data.isMark?"🚩":""))])},d=[],h={name:"cell",props:{data:Object},data(){return{}},methods:{handleOpen(){const{row:e,index:t}=this.data;this.$emit("handleOpen",e,t)},handleMark(){const{row:e,index:t}=this.data;event.preventDefault(),this.$emit("handleMark",e,t)},mousedown(e,{idx:t}){console.log(e),console.log(t)}}},m=h,p=(n("467c"),n("17cc")),f=Object(p["a"])(m,u,d,!1,null,null,null),v=f.exports,M={name:"Orzminesweeper",props:{level:{type:Object,required:!0}},components:{Cell:v},data(){return{mineMap:[],mineCount:{open:0,mark:0},gameover:!1,state:{dead:!1,win:!1,time:0},interval:void 0,timestr:"00:00"}},computed:{timer(){return!(!this.mineCount.mark&&!this.mineCount.open||this.state.dead||this.state.win)},newlevel(){return this.level.size}},watch:{newlevel:function(){this.initboard()},timer(e){e?(this.state.time=1,this.interval=setInterval(()=>{this.state.time++;const e=this.state.time;let t=("0"+Math.floor(e/60)).slice(-2),n=("0"+e%60).slice(-2);this.timestr=`${t}:${n}`},1e3)):this.interval=clearInterval(this.interval)}},methods:{reset(){this.state={dead:!1,win:!1,time:0},this.mineCount={open:0,mark:0},this.interval=clearInterval(this.interval),this.timestr="00:00",this.initboard()},initboard(){this.mineMap=this.createmines()},createmines(){const{mineTotal:e,size:[t,n]}=this.level,i=new Array(t*n-e).fill("false"),a=new Array(e).fill("true");let r=[];const s=a.concat(i).sort(()=>{return Math.random()>.5?-1:1});for(let l=0;l<s.length;l+=n){const e=l/n;r.push(s.slice(l,l+n).map((t,n)=>({row:e,index:n,isMine:t})))}for(let l=0;l<t;l++)for(let e=0;e<n;e++){const i=[[l-1,e-1],[l-1,e],[l-1,e+1],[l,e-1],[l,e+1],[l+1,e-1],[l+1,e],[l+1,e+1]];let a=0;for(let e=0;e<8;e++){let s=i[e][0],l=i[e][1];s<0||l<0||s>t-1||l>n-1||"true"===r[s][l].isMine&&a++}r[l][e]={row:l,index:e,adjMine:a,isMine:r[l][e].isMine,isOpen:!1,isMark:!1,isTrigger:!1}}return r},handleOpen(e,t){if(this.state.dead||this.state.win)return;const{size:[n,i]}=this.level;if(e<0||t<0||e>n-1||t>i-1)return;let a=this.mineMap[e][t];if(!a.isOpen){if(a.isMark&&(this.mineMap[e][t].isMark=!1,this.mineCount.mark--),this.mineMap[e][t].isOpen=!0,this.mineCount.open++,this.checkwin(),"true"===a.isMine)return this.mineMap[e][t].isTrigger=!0,void this.GameOver();0===a.adjMine&&(this.handleOpen(e-1,t),this.handleOpen(e+1,t),this.handleOpen(e,t+1),this.handleOpen(e,t-1))}},handleMark(e,t){if(this.state.dead||this.state.win)return;const n=this.mineMap[e][t];this.level.mineTotal-this.mineCount.mark-1<0||n.isOpen||(this.mineCount.mark+=n.isMark?-1:1,this.mineMap[e][t].isMark=!this.mineMap[e][t].isMark)},GameOver(){this.state.dead=!0;for(let e in this.mineMap){let t=this.mineMap[e];for(let n in t){const t=this.mineMap[e][n];"true"===t.isMine&&(t.isOpen=!0)}}},checkwin(){const{size:[e,t],mineTotal:n}=this.level,i=e*t;this.mineCount.open+n===i&&(this.state.win=!0,console.log("win!"))}},mounted(){this.initboard()},destroyed(){clearInterval(this.interval)}},b=M,O=(n("1ca9"),Object(p["a"])(b,o,c,!1,null,null,null)),k=O.exports,w={components:{Minebroad:k},data(){return{levels:[{name:"easy",size:[9,9],mineTotal:10},{name:"mid",size:[16,16],mineTotal:40},{name:"hard",size:[16,30],mineTotal:99}],level:{name:"easy",size:[9,9],mineTotal:10}}}},y=w,g=(n("2274"),Object(p["a"])(y,s,l,!1,null,null,null)),_=g.exports,C={components:{Game:_}},x=C,j=Object(p["a"])(x,a,r,!1,null,"3a9f2a98",null),T=j.exports;n("02ac");i["a"].config.productionTip=!1,new i["a"]({render:e=>e(T)}).$mount("#app")},"6f32":function(e,t,n){}});
//# sourceMappingURL=app.51cbfbe4.js.map