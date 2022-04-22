!function(t){var e={};function i(r){if(e[r])return e[r].exports;var s=e[r]={i:r,l:!1,exports:{}};return t[r].call(s.exports,s,s.exports,i),s.l=!0,s.exports}i.m=t,i.c=e,i.d=function(t,e,r){i.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},i.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},i.t=function(t,e){if(1&e&&(t=i(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(i.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var s in t)i.d(r,s,function(e){return t[e]}.bind(null,s));return r},i.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return i.d(e,"a",e),e},i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},i.p="",i(i.s=1)}([function(module,exports,__webpack_require__){var __WEBPACK_AMD_DEFINE_RESULT__;"undefined"!=typeof navigator&&function(t,e){void 0===(__WEBPACK_AMD_DEFINE_RESULT__=function(){return e(t)}.call(exports,__webpack_require__,exports,module))||(module.exports=__WEBPACK_AMD_DEFINE_RESULT__)}(window||{},(function(window){"use strict";var svgNS="http://www.w3.org/2000/svg",locationHref="",initialDefaultFrame=-999999,subframeEnabled=!0,idPrefix="",expressionsPlugin,isSafari=/^((?!chrome|android).)*safari/i.test(navigator.userAgent),cachedColors={},bmRnd,bmPow=Math.pow,bmSqrt=Math.sqrt,bmFloor=Math.floor,bmMax=Math.max,bmMin=Math.min,BMMath={};function ProjectInterface(){return{}}!function(){var t,e=["abs","acos","acosh","asin","asinh","atan","atanh","atan2","ceil","cbrt","expm1","clz32","cos","cosh","exp","floor","fround","hypot","imul","log","log1p","log2","log10","max","min","pow","random","round","sign","sin","sinh","sqrt","tan","tanh","trunc","E","LN10","LN2","LOG10E","LOG2E","PI","SQRT1_2","SQRT2"],i=e.length;for(t=0;t<i;t+=1)BMMath[e[t]]=Math[e[t]]}(),BMMath.random=Math.random,BMMath.abs=function(t){if("object"===typeof t&&t.length){var e,i=createSizedArray(t.length),r=t.length;for(e=0;e<r;e+=1)i[e]=Math.abs(t[e]);return i}return Math.abs(t)};var defaultCurveSegments=150,degToRads=Math.PI/180,roundCorner=.5519;function roundValues(t){bmRnd=t?Math.round:function(t){return t}}function styleDiv(t){t.style.position="absolute",t.style.top=0,t.style.left=0,t.style.display="block",t.style.transformOrigin="0 0",t.style.webkitTransformOrigin="0 0",t.style.backfaceVisibility="visible",t.style.webkitBackfaceVisibility="visible",t.style.transformStyle="preserve-3d",t.style.webkitTransformStyle="preserve-3d",t.style.mozTransformStyle="preserve-3d"}function BMEnterFrameEvent(t,e,i,r){this.type=t,this.currentTime=e,this.totalTime=i,this.direction=r<0?-1:1}function BMCompleteEvent(t,e){this.type=t,this.direction=e<0?-1:1}function BMCompleteLoopEvent(t,e,i,r){this.type=t,this.currentLoop=i,this.totalLoops=e,this.direction=r<0?-1:1}function BMSegmentStartEvent(t,e,i){this.type=t,this.firstFrame=e,this.totalFrames=i}function BMDestroyEvent(t,e){this.type=t,this.target=e}function BMRenderFrameErrorEvent(t,e){this.type="renderFrameError",this.nativeError=t,this.currentTime=e}function BMConfigErrorEvent(t){this.type="configError",this.nativeError=t}function BMAnimationConfigErrorEvent(t,e){this.type=t,this.nativeError=e}roundValues(!1);var createElementID=(_count=0,function(){return idPrefix+"__lottie_element_"+(_count+=1)}),_count;function HSVtoRGB(t,e,i){var r,s,a,n,o,h,l,p;switch(h=i*(1-e),l=i*(1-(o=6*t-(n=Math.floor(6*t)))*e),p=i*(1-(1-o)*e),n%6){case 0:r=i,s=p,a=h;break;case 1:r=l,s=i,a=h;break;case 2:r=h,s=i,a=p;break;case 3:r=h,s=l,a=i;break;case 4:r=p,s=h,a=i;break;case 5:r=i,s=h,a=l}return[r,s,a]}function RGBtoHSV(t,e,i){var r,s=Math.max(t,e,i),a=Math.min(t,e,i),n=s-a,o=0===s?0:n/s,h=s/255;switch(s){case a:r=0;break;case t:r=e-i+n*(e<i?6:0),r/=6*n;break;case e:r=i-t+2*n,r/=6*n;break;case i:r=t-e+4*n,r/=6*n}return[r,o,h]}function addSaturationToRGB(t,e){var i=RGBtoHSV(255*t[0],255*t[1],255*t[2]);return i[1]+=e,i[1]>1?i[1]=1:i[1]<=0&&(i[1]=0),HSVtoRGB(i[0],i[1],i[2])}function addBrightnessToRGB(t,e){var i=RGBtoHSV(255*t[0],255*t[1],255*t[2]);return i[2]+=e,i[2]>1?i[2]=1:i[2]<0&&(i[2]=0),HSVtoRGB(i[0],i[1],i[2])}function addHueToRGB(t,e){var i=RGBtoHSV(255*t[0],255*t[1],255*t[2]);return i[0]+=e/360,i[0]>1?i[0]-=1:i[0]<0&&(i[0]+=1),HSVtoRGB(i[0],i[1],i[2])}var rgbToHex=function(){var t,e,i=[];for(t=0;t<256;t+=1)e=t.toString(16),i[t]=1===e.length?"0"+e:e;return function(t,e,r){return t<0&&(t=0),e<0&&(e=0),r<0&&(r=0),"#"+i[t]+i[e]+i[r]}}();function BaseEvent(){}BaseEvent.prototype={triggerEvent:function(t,e){if(this._cbs[t])for(var i=this._cbs[t],r=0;r<i.length;r+=1)i[r](e)},addEventListener:function(t,e){return this._cbs[t]||(this._cbs[t]=[]),this._cbs[t].push(e),function(){this.removeEventListener(t,e)}.bind(this)},removeEventListener:function(t,e){if(e){if(this._cbs[t]){for(var i=0,r=this._cbs[t].length;i<r;)this._cbs[t][i]===e&&(this._cbs[t].splice(i,1),i-=1,r-=1),i+=1;this._cbs[t].length||(this._cbs[t]=null)}}else this._cbs[t]=null}};var createTypedArray=function(){function t(t,e){var i,r=0,s=[];switch(t){case"int16":case"uint8c":i=1;break;default:i=1.1}for(r=0;r<e;r+=1)s.push(i);return s}return"function"==typeof Uint8ClampedArray&&"function"==typeof Float32Array?function(e,i){return"float32"===e?new Float32Array(i):"int16"===e?new Int16Array(i):"uint8c"===e?new Uint8ClampedArray(i):t(e,i)}:t}();function createSizedArray(t){return Array.apply(null,{length:t})}function createNS(t){return document.createElementNS(svgNS,t)}function createTag(t){return document.createElement(t)}function DynamicPropertyContainer(){}DynamicPropertyContainer.prototype={addDynamicProperty:function(t){-1===this.dynamicProperties.indexOf(t)&&(this.dynamicProperties.push(t),this.container.addDynamicProperty(this),this._isAnimated=!0)},iterateDynamicProperties:function(){var t;this._mdf=!1;var e=this.dynamicProperties.length;for(t=0;t<e;t+=1)this.dynamicProperties[t].getValue(),this.dynamicProperties[t]._mdf&&(this._mdf=!0)},initDynamicPropertyContainer:function(t){this.container=t,this.dynamicProperties=[],this._mdf=!1,this._isAnimated=!1}};var getBlendMode=(blendModeEnums={0:"source-over",1:"multiply",2:"screen",3:"overlay",4:"darken",5:"lighten",6:"color-dodge",7:"color-burn",8:"hard-light",9:"soft-light",10:"difference",11:"exclusion",12:"hue",13:"saturation",14:"color",15:"luminosity"},function(t){return blendModeEnums[t]||""}),blendModeEnums,lineCapEnum={1:"butt",2:"round",3:"square"},lineJoinEnum={1:"miter",2:"round",3:"bevel"},Matrix=function(){var t=Math.cos,e=Math.sin,i=Math.tan,r=Math.round;function s(){return this.props[0]=1,this.props[1]=0,this.props[2]=0,this.props[3]=0,this.props[4]=0,this.props[5]=1,this.props[6]=0,this.props[7]=0,this.props[8]=0,this.props[9]=0,this.props[10]=1,this.props[11]=0,this.props[12]=0,this.props[13]=0,this.props[14]=0,this.props[15]=1,this}function a(i){if(0===i)return this;var r=t(i),s=e(i);return this._t(r,-s,0,0,s,r,0,0,0,0,1,0,0,0,0,1)}function n(i){if(0===i)return this;var r=t(i),s=e(i);return this._t(1,0,0,0,0,r,-s,0,0,s,r,0,0,0,0,1)}function o(i){if(0===i)return this;var r=t(i),s=e(i);return this._t(r,0,s,0,0,1,0,0,-s,0,r,0,0,0,0,1)}function h(i){if(0===i)return this;var r=t(i),s=e(i);return this._t(r,-s,0,0,s,r,0,0,0,0,1,0,0,0,0,1)}function l(t,e){return this._t(1,e,t,1,0,0)}function p(t,e){return this.shear(i(t),i(e))}function m(r,s){var a=t(s),n=e(s);return this._t(a,n,0,0,-n,a,0,0,0,0,1,0,0,0,0,1)._t(1,0,0,0,i(r),1,0,0,0,0,1,0,0,0,0,1)._t(a,-n,0,0,n,a,0,0,0,0,1,0,0,0,0,1)}function f(t,e,i){return i||0===i||(i=1),1===t&&1===e&&1===i?this:this._t(t,0,0,0,0,e,0,0,0,0,i,0,0,0,0,1)}function c(t,e,i,r,s,a,n,o,h,l,p,m,f,c,d,u){return this.props[0]=t,this.props[1]=e,this.props[2]=i,this.props[3]=r,this.props[4]=s,this.props[5]=a,this.props[6]=n,this.props[7]=o,this.props[8]=h,this.props[9]=l,this.props[10]=p,this.props[11]=m,this.props[12]=f,this.props[13]=c,this.props[14]=d,this.props[15]=u,this}function d(t,e,i){return i=i||0,0!==t||0!==e||0!==i?this._t(1,0,0,0,0,1,0,0,0,0,1,0,t,e,i,1):this}function u(t,e,i,r,s,a,n,o,h,l,p,m,f,c,d,u){var y=this.props;if(1===t&&0===e&&0===i&&0===r&&0===s&&1===a&&0===n&&0===o&&0===h&&0===l&&1===p&&0===m)return y[12]=y[12]*t+y[15]*f,y[13]=y[13]*a+y[15]*c,y[14]=y[14]*p+y[15]*d,y[15]*=u,this._identityCalculated=!1,this;var g=y[0],v=y[1],b=y[2],P=y[3],E=y[4],x=y[5],S=y[6],C=y[7],A=y[8],T=y[9],_=y[10],k=y[11],D=y[12],M=y[13],F=y[14],w=y[15];return y[0]=g*t+v*s+b*h+P*f,y[1]=g*e+v*a+b*l+P*c,y[2]=g*i+v*n+b*p+P*d,y[3]=g*r+v*o+b*m+P*u,y[4]=E*t+x*s+S*h+C*f,y[5]=E*e+x*a+S*l+C*c,y[6]=E*i+x*n+S*p+C*d,y[7]=E*r+x*o+S*m+C*u,y[8]=A*t+T*s+_*h+k*f,y[9]=A*e+T*a+_*l+k*c,y[10]=A*i+T*n+_*p+k*d,y[11]=A*r+T*o+_*m+k*u,y[12]=D*t+M*s+F*h+w*f,y[13]=D*e+M*a+F*l+w*c,y[14]=D*i+M*n+F*p+w*d,y[15]=D*r+M*o+F*m+w*u,this._identityCalculated=!1,this}function y(){return this._identityCalculated||(this._identity=!(1!==this.props[0]||0!==this.props[1]||0!==this.props[2]||0!==this.props[3]||0!==this.props[4]||1!==this.props[5]||0!==this.props[6]||0!==this.props[7]||0!==this.props[8]||0!==this.props[9]||1!==this.props[10]||0!==this.props[11]||0!==this.props[12]||0!==this.props[13]||0!==this.props[14]||1!==this.props[15]),this._identityCalculated=!0),this._identity}function g(t){for(var e=0;e<16;){if(t.props[e]!==this.props[e])return!1;e+=1}return!0}function v(t){var e;for(e=0;e<16;e+=1)t.props[e]=this.props[e];return t}function b(t){var e;for(e=0;e<16;e+=1)this.props[e]=t[e]}function P(t,e,i){return{x:t*this.props[0]+e*this.props[4]+i*this.props[8]+this.props[12],y:t*this.props[1]+e*this.props[5]+i*this.props[9]+this.props[13],z:t*this.props[2]+e*this.props[6]+i*this.props[10]+this.props[14]}}function E(t,e,i){return t*this.props[0]+e*this.props[4]+i*this.props[8]+this.props[12]}function x(t,e,i){return t*this.props[1]+e*this.props[5]+i*this.props[9]+this.props[13]}function S(t,e,i){return t*this.props[2]+e*this.props[6]+i*this.props[10]+this.props[14]}function C(){var t=this.props[0]*this.props[5]-this.props[1]*this.props[4],e=this.props[5]/t,i=-this.props[1]/t,r=-this.props[4]/t,s=this.props[0]/t,a=(this.props[4]*this.props[13]-this.props[5]*this.props[12])/t,n=-(this.props[0]*this.props[13]-this.props[1]*this.props[12])/t,o=new Matrix;return o.props[0]=e,o.props[1]=i,o.props[4]=r,o.props[5]=s,o.props[12]=a,o.props[13]=n,o}function A(t){return this.getInverseMatrix().applyToPointArray(t[0],t[1],t[2]||0)}function T(t){var e,i=t.length,r=[];for(e=0;e<i;e+=1)r[e]=A(t[e]);return r}function _(t,e,i){var r=createTypedArray("float32",6);if(this.isIdentity())r[0]=t[0],r[1]=t[1],r[2]=e[0],r[3]=e[1],r[4]=i[0],r[5]=i[1];else{var s=this.props[0],a=this.props[1],n=this.props[4],o=this.props[5],h=this.props[12],l=this.props[13];r[0]=t[0]*s+t[1]*n+h,r[1]=t[0]*a+t[1]*o+l,r[2]=e[0]*s+e[1]*n+h,r[3]=e[0]*a+e[1]*o+l,r[4]=i[0]*s+i[1]*n+h,r[5]=i[0]*a+i[1]*o+l}return r}function k(t,e,i){return this.isIdentity()?[t,e,i]:[t*this.props[0]+e*this.props[4]+i*this.props[8]+this.props[12],t*this.props[1]+e*this.props[5]+i*this.props[9]+this.props[13],t*this.props[2]+e*this.props[6]+i*this.props[10]+this.props[14]]}function D(t,e){if(this.isIdentity())return t+","+e;var i=this.props;return Math.round(100*(t*i[0]+e*i[4]+i[12]))/100+","+Math.round(100*(t*i[1]+e*i[5]+i[13]))/100}function M(){for(var t=0,e=this.props,i="matrix3d(";t<16;)i+=r(1e4*e[t])/1e4,i+=15===t?")":",",t+=1;return i}function F(t){return t<1e-6&&t>0||t>-1e-6&&t<0?r(1e4*t)/1e4:t}function w(){var t=this.props;return"matrix("+F(t[0])+","+F(t[1])+","+F(t[4])+","+F(t[5])+","+F(t[12])+","+F(t[13])+")"}return function(){this.reset=s,this.rotate=a,this.rotateX=n,this.rotateY=o,this.rotateZ=h,this.skew=p,this.skewFromAxis=m,this.shear=l,this.scale=f,this.setTransform=c,this.translate=d,this.transform=u,this.applyToPoint=P,this.applyToX=E,this.applyToY=x,this.applyToZ=S,this.applyToPointArray=k,this.applyToTriplePoints=_,this.applyToPointStringified=D,this.toCSS=M,this.to2dCSS=w,this.clone=v,this.cloneFromProps=b,this.equals=g,this.inversePoints=T,this.inversePoint=A,this.getInverseMatrix=C,this._t=this.transform,this.isIdentity=y,this._identity=!0,this._identityCalculated=!1,this.props=createTypedArray("float32",16),this.reset()}}();!function(t,e){var i=this,r=e.pow(256,6),s=e.pow(2,52),a=2*s;function n(t){var e,i=t.length,r=this,s=0,a=r.i=r.j=0,n=r.S=[];for(i||(t=[i++]);s<256;)n[s]=s++;for(s=0;s<256;s++)n[s]=n[a=255&a+t[s%i]+(e=n[s])],n[a]=e;r.g=function(t){for(var e,i=0,s=r.i,a=r.j,n=r.S;t--;)e=n[s=255&s+1],i=256*i+n[255&(n[s]=n[a=255&a+e])+(n[a]=e)];return r.i=s,r.j=a,i}}function o(t,e){return e.i=t.i,e.j=t.j,e.S=t.S.slice(),e}function h(t,e){for(var i,r=t+"",s=0;s<r.length;)e[255&s]=255&(i^=19*e[255&s])+r.charCodeAt(s++);return l(e)}function l(t){return String.fromCharCode.apply(0,t)}e.seedrandom=function(p,m,f){var c=[],d=h(function t(e,i){var r,s=[],a=typeof e;if(i&&"object"==a)for(r in e)try{s.push(t(e[r],i-1))}catch(t){}return s.length?s:"string"==a?e:e+"\0"}((m=!0===m?{entropy:!0}:m||{}).entropy?[p,l(t)]:null===p?function(){try{void 0;var e=new Uint8Array(256);return(i.crypto||i.msCrypto).getRandomValues(e),l(e)}catch(e){var r=i.navigator,s=r&&r.plugins;return[+new Date,i,s,i.screen,l(t)]}}():p,3),c),u=new n(c),y=function(){for(var t=u.g(6),e=r,i=0;t<s;)t=256*(t+i),e*=256,i=u.g(1);for(;t>=a;)t/=2,e/=2,i>>>=1;return(t+i)/e};return y.int32=function(){return 0|u.g(4)},y.quick=function(){return u.g(4)/4294967296},y.double=y,h(l(u.S),t),(m.pass||f||function(t,i,r,s){return s&&(s.S&&o(s,u),t.state=function(){return o(u,{})}),r?(e.random=t,i):t})(y,d,"global"in m?m.global:this==e,m.state)},h(e.random(),t)}([],BMMath);var BezierFactory=function(){var t={getBezierEasing:function(t,i,r,s,a){var n=a||("bez_"+t+"_"+i+"_"+r+"_"+s).replace(/\./g,"p");if(e[n])return e[n];var o=new h([t,i,r,s]);return e[n]=o,o}},e={};var i="function"==typeof Float32Array;function r(t,e){return 1-3*e+3*t}function s(t,e){return 3*e-6*t}function a(t){return 3*t}function n(t,e,i){return((r(e,i)*t+s(e,i))*t+a(e))*t}function o(t,e,i){return 3*r(e,i)*t*t+2*s(e,i)*t+a(e)}function h(t){this._p=t,this._mSampleValues=i?new Float32Array(11):new Array(11),this._precomputed=!1,this.get=this.get.bind(this)}return h.prototype={get:function(t){var e=this._p[0],i=this._p[1],r=this._p[2],s=this._p[3];return this._precomputed||this._precompute(),e===i&&r===s?t:0===t?0:1===t?1:n(this._getTForX(t),i,s)},_precompute:function(){var t=this._p[0],e=this._p[1],i=this._p[2],r=this._p[3];this._precomputed=!0,t===e&&i===r||this._calcSampleValues()},_calcSampleValues:function(){for(var t=this._p[0],e=this._p[2],i=0;i<11;++i)this._mSampleValues[i]=n(.1*i,t,e)},_getTForX:function(t){for(var e=this._p[0],i=this._p[2],r=this._mSampleValues,s=0,a=1;10!==a&&r[a]<=t;++a)s+=.1;var h=s+.1*((t-r[--a])/(r[a+1]-r[a])),l=o(h,e,i);return l>=.001?function(t,e,i,r){for(var s=0;s<4;++s){var a=o(e,i,r);if(0===a)return e;e-=(n(e,i,r)-t)/a}return e}(t,h,e,i):0===l?h:function(t,e,i,r,s){var a,o,h=0;do{(a=n(o=e+(i-e)/2,r,s)-t)>0?i=o:e=o}while(Math.abs(a)>1e-7&&++h<10);return o}(t,s,s+.1,e,i)}},t}();function extendPrototype(t,e){var i,r,s=t.length;for(i=0;i<s;i+=1)for(var a in r=t[i].prototype)Object.prototype.hasOwnProperty.call(r,a)&&(e.prototype[a]=r[a])}function getDescriptor(t,e){return Object.getOwnPropertyDescriptor(t,e)}function createProxyFunction(t){function e(){}return e.prototype=t,e}function bezFunction(){var t=Math;function e(t,e,i,r,s,a){var n=t*r+e*s+i*a-s*r-a*t-i*e;return n>-.001&&n<.001}var i=function(t,e,i,r){var s,a,n,o,h,l,p=defaultCurveSegments,m=0,f=[],c=[],d=bezierLengthPool.newElement();for(n=i.length,s=0;s<p;s+=1){for(h=s/(p-1),l=0,a=0;a<n;a+=1)o=bmPow(1-h,3)*t[a]+3*bmPow(1-h,2)*h*i[a]+3*(1-h)*bmPow(h,2)*r[a]+bmPow(h,3)*e[a],f[a]=o,null!==c[a]&&(l+=bmPow(f[a]-c[a],2)),c[a]=f[a];l&&(m+=l=bmSqrt(l)),d.percents[s]=h,d.lengths[s]=m}return d.addedLength=m,d};function r(t){this.segmentLength=0,this.points=new Array(t)}function s(t,e){this.partialLength=t,this.point=e}var a,n=(a={},function(t,i,n,o){var h=(t[0]+"_"+t[1]+"_"+i[0]+"_"+i[1]+"_"+n[0]+"_"+n[1]+"_"+o[0]+"_"+o[1]).replace(/\./g,"p");if(!a[h]){var l,p,m,f,c,d,u,y=defaultCurveSegments,g=0,v=null;2===t.length&&(t[0]!==i[0]||t[1]!==i[1])&&e(t[0],t[1],i[0],i[1],t[0]+n[0],t[1]+n[1])&&e(t[0],t[1],i[0],i[1],i[0]+o[0],i[1]+o[1])&&(y=2);var b=new r(y);for(m=n.length,l=0;l<y;l+=1){for(u=createSizedArray(m),c=l/(y-1),d=0,p=0;p<m;p+=1)f=bmPow(1-c,3)*t[p]+3*bmPow(1-c,2)*c*(t[p]+n[p])+3*(1-c)*bmPow(c,2)*(i[p]+o[p])+bmPow(c,3)*i[p],u[p]=f,null!==v&&(d+=bmPow(u[p]-v[p],2));g+=d=bmSqrt(d),b.points[l]=new s(d,u),v=u}b.segmentLength=g,a[h]=b}return a[h]});function o(t,e){var i=e.percents,r=e.lengths,s=i.length,a=bmFloor((s-1)*t),n=t*e.addedLength,o=0;if(a===s-1||0===a||n===r[a])return i[a];for(var h=r[a]>n?-1:1,l=!0;l;)if(r[a]<=n&&r[a+1]>n?(o=(n-r[a])/(r[a+1]-r[a]),l=!1):a+=h,a<0||a>=s-1){if(a===s-1)return i[a];l=!1}return i[a]+(i[a+1]-i[a])*o}var h=createTypedArray("float32",8);return{getSegmentsLength:function(t){var e,r=segmentsLengthPool.newElement(),s=t.c,a=t.v,n=t.o,o=t.i,h=t._length,l=r.lengths,p=0;for(e=0;e<h-1;e+=1)l[e]=i(a[e],a[e+1],n[e],o[e+1]),p+=l[e].addedLength;return s&&h&&(l[e]=i(a[e],a[0],n[e],o[0]),p+=l[e].addedLength),r.totalLength=p,r},getNewSegment:function(e,i,r,s,a,n,l){a<0?a=0:a>1&&(a=1);var p,m=o(a,l),f=o(n=n>1?1:n,l),c=e.length,d=1-m,u=1-f,y=d*d*d,g=m*d*d*3,v=m*m*d*3,b=m*m*m,P=d*d*u,E=m*d*u+d*m*u+d*d*f,x=m*m*u+d*m*f+m*d*f,S=m*m*f,C=d*u*u,A=m*u*u+d*f*u+d*u*f,T=m*f*u+d*f*f+m*u*f,_=m*f*f,k=u*u*u,D=f*u*u+u*f*u+u*u*f,M=f*f*u+u*f*f+f*u*f,F=f*f*f;for(p=0;p<c;p+=1)h[4*p]=t.round(1e3*(y*e[p]+g*r[p]+v*s[p]+b*i[p]))/1e3,h[4*p+1]=t.round(1e3*(P*e[p]+E*r[p]+x*s[p]+S*i[p]))/1e3,h[4*p+2]=t.round(1e3*(C*e[p]+A*r[p]+T*s[p]+_*i[p]))/1e3,h[4*p+3]=t.round(1e3*(k*e[p]+D*r[p]+M*s[p]+F*i[p]))/1e3;return h},getPointInSegment:function(e,i,r,s,a,n){var h=o(a,n),l=1-h;return[t.round(1e3*(l*l*l*e[0]+(h*l*l+l*h*l+l*l*h)*r[0]+(h*h*l+l*h*h+h*l*h)*s[0]+h*h*h*i[0]))/1e3,t.round(1e3*(l*l*l*e[1]+(h*l*l+l*h*l+l*l*h)*r[1]+(h*h*l+l*h*h+h*l*h)*s[1]+h*h*h*i[1]))/1e3]},buildBezierData:n,pointOnLine2D:e,pointOnLine3D:function(i,r,s,a,n,o,h,l,p){if(0===s&&0===o&&0===p)return e(i,r,a,n,h,l);var m,f=t.sqrt(t.pow(a-i,2)+t.pow(n-r,2)+t.pow(o-s,2)),c=t.sqrt(t.pow(h-i,2)+t.pow(l-r,2)+t.pow(p-s,2)),d=t.sqrt(t.pow(h-a,2)+t.pow(l-n,2)+t.pow(p-o,2));return(m=f>c?f>d?f-c-d:d-c-f:d>c?d-c-f:c-f-d)>-1e-4&&m<1e-4}}}!function(){for(var t=0,e=["ms","moz","webkit","o"],i=0;i<e.length&&!window.requestAnimationFrame;++i)window.requestAnimationFrame=window[e[i]+"RequestAnimationFrame"],window.cancelAnimationFrame=window[e[i]+"CancelAnimationFrame"]||window[e[i]+"CancelRequestAnimationFrame"];window.requestAnimationFrame||(window.requestAnimationFrame=function(e){var i=(new Date).getTime(),r=Math.max(0,16-(i-t)),s=setTimeout((function(){e(i+r)}),r);return t=i+r,s}),window.cancelAnimationFrame||(window.cancelAnimationFrame=function(t){clearTimeout(t)})}();var bez=bezFunction();function dataFunctionManager(){function t(s,a,n){var o,h,l,m,f,c,d=s.length;for(h=0;h<d;h+=1)if("ks"in(o=s[h])&&!o.completed){if(o.completed=!0,o.tt&&(s[h-1].td=o.tt),o.hasMask){var u=o.masksProperties;for(m=u.length,l=0;l<m;l+=1)if(u[l].pt.k.i)r(u[l].pt.k);else for(c=u[l].pt.k.length,f=0;f<c;f+=1)u[l].pt.k[f].s&&r(u[l].pt.k[f].s[0]),u[l].pt.k[f].e&&r(u[l].pt.k[f].e[0])}0===o.ty?(o.layers=e(o.refId,a),t(o.layers,a,n)):4===o.ty?i(o.shapes):5===o.ty&&p(o)}}function e(t,e){for(var i=0,r=e.length;i<r;){if(e[i].id===t)return e[i].layers.__used?JSON.parse(JSON.stringify(e[i].layers)):(e[i].layers.__used=!0,e[i].layers);i+=1}return null}function i(t){var e,s,a;for(e=t.length-1;e>=0;e-=1)if("sh"===t[e].ty)if(t[e].ks.k.i)r(t[e].ks.k);else for(a=t[e].ks.k.length,s=0;s<a;s+=1)t[e].ks.k[s].s&&r(t[e].ks.k[s].s[0]),t[e].ks.k[s].e&&r(t[e].ks.k[s].e[0]);else"gr"===t[e].ty&&i(t[e].it)}function r(t){var e,i=t.i.length;for(e=0;e<i;e+=1)t.i[e][0]+=t.v[e][0],t.i[e][1]+=t.v[e][1],t.o[e][0]+=t.v[e][0],t.o[e][1]+=t.v[e][1]}function s(t,e){var i=e?e.split("."):[100,100,100];return t[0]>i[0]||!(i[0]>t[0])&&(t[1]>i[1]||!(i[1]>t[1])&&(t[2]>i[2]||!(i[2]>t[2])&&null))}var a,n=function(){var t=[4,4,14];function e(t){var e,i,r,s=t.length;for(e=0;e<s;e+=1)5===t[e].ty&&(i=t[e],r=void 0,r=i.t.d,i.t.d={k:[{s:r,t:0}]})}return function(i){if(s(t,i.v)&&(e(i.layers),i."{% static '"{% static '$1' %}ON.stringify(e)),this.colors&&function(t,e,i){const r=i.split(",");if(r.length)for(const i of r){const r=i.split(":");if(2===r.length)for(const i of e)"color"===i.type&&i.name.toLowerCase()===r[0].toLowerCase()&&o(t,i.path,l(r[1]))}}(t,i,this.colors),this.stroke&&p(t,i,"stroke",this.stroke),this.scale&&p(t,i,"scale",this.scale),this["axis-x"]&&p(t,i,"axis",this["axis-x"],"0"),this["axis-y"]&&p(t,i,"axis",this["axis-y"],"1")}var e;this.lottie=function(t){if(!m)throw new Error("Unregistered Lottie.");return m(t)}({container:this.container,renderer:"svg",loop:!1,autoplay:!1,animationData:t,rendererSettings:{preserveAspectRatio:"xMidYMid meet",progressiveLoad:!0,hideOnTransparent:!1}}),this.lottie.setSpeed(this.animationSpeed),this.lottie.addEventListener("complete",()=>{this.dispatchEvent(new CustomEvent("animation-complete"))}),this.triggerChanged()}}unregisterLottie(){this.myConnectedTrigger&&(this.myConnectedTrigger.disconnectedCallback(),this.myConnectedTrigger=void 0),this.lottie&&(this.lottie.destroy(),this.lottie=void 0,this.container.innerHTML="")}notify(t,e){this[e]===t&&("icon"===e?(this.lottie&&this.unregisterLottie(),this.registerLottie()):"trigger"!==e||this.myConnectedTrigger||this.triggerChanged())}triggerChanged(){if(this.myConnectedTrigger&&(this.myConnectedTrigger.disconnectedCallback(),this.myConnectedTrigger=void 0),this.trigger&&this.lottie){const e=(t=this.trigger,c.get(t));if(e){const t=this.target?this.closest(this.target):null;this.myConnectedTrigger=new e(this,t||this,this.lottie),this.myConnectedTrigger.connectedCallback()}}var t}colorsChanged(){this.isReady&&(this.unregisterLottie(),this.registerLottie())}strokeChanged(){this.isReady&&(this.unregisterLottie(),this.registerLottie())}scaleChanged(){this.isReady&&(this.unregisterLottie(),this.registerLottie())}axisXChanged(){this.isReady&&(this.unregisterLottie(),this.registerLottie())}axisYChanged(){this.isReady&&(this.unregisterLottie(),this.registerLottie())}speedChanged(){this.lottie&&this.lottie.setSpeed(this.animationSpeed)}iconChanged(){this.isReady&&(this.unregisterLottie(),this.registerLottie())}async srcChanged(){this.src&&await y(this.src),this.isReady&&(this.unregisterLottie(),this.registerLottie())}get iconData(){return this.icon&&"object"==typeof this.icon?this.icon:(t=this.icon||this.src,d.get(t));var t}get connectedTrigger(){return this.myConnectedTrigger}get container(){return this.root.lastElementChild}get animationSpeed(){return this.speed&&parseFloat(this.speed)||1}static get observedAttributes(){return g}}class b{constructor(t,e,i){this.element=t,this.target=e,this.lottie=i,this.myInAnimation=!1,this.myIsReady=!1,this.myConnected=!1,this.myEnterBound=this.enter.bind(this),this.myLeaveBound=this.leave.bind(this);const r=()=>{this.myIsReady||(this.myIsReady=!0,this.ready())};i.addEventListener("complete",()=>{this.myInAnimation=!1,this.complete()}),i.addEventListener("config_ready",r),this.lottie.isLoaded&&r()}connectedCallback(){this.myConnected=!0}disconnectedCallback(){this.myConnected=!1}ready(){}complete(){}enter(){}leave(){}play(){this.myInAnimation=!0,this.lottie.play()}playFromBegining(){this.myInAnimation=!0,this.lottie.goToAndPlay(0)}stop(){this.lottie.stop()}goToFrame(t){this.lottie.goToAndStop(t,!0)}goToFirstFrame(){this.goToFrame(0)}goToLastFrame(){this.goToFrame(Math.max(0,this.lottie.getDuration(!0)-1))}setDirection(t){this.lottie.setDirection(t)}setLoop(t){this.lottie.loop=t}setSpeed(t){this.lottie.setSpeed(t)}get inAnimation(){return this.myInAnimation}get isReady(){return this.myIsReady}get enterBound(){return this.myEnterBound}get leaveBound(){return this.myLeaveBound}get connected(){return this.myConnected}}const P=["mousedown","touchstart"];class E extends b{connectedCallback(){super.connectedCallback();for(const t of P){const e="touchstart"===t?{passive:!0}:void 0;this.target.addEventListener(t,this.enterBound,e)}}disconnectedCallback(){for(const t of P)this.target.removeEventListener(t,this.enterBound);super.disconnectedCallback()}enter(){this.inAnimation||this.playFromBegining()}}class x extends b{connectedCallback(){super.connectedCallback(),this.target.addEventListener("mouseenter",this.enterBound)}disconnectedCallback(){this.target.removeEventListener("mouseenter",this.enterBound),super.disconnectedCallback()}enter(){this.inAnimation||this.playFromBegining()}}class S extends b{connectedCallback(){super.connectedCallback(),this.target.addEventListener("mouseenter",this.enterBound),this.target.addEventListener("mouseleave",this.leaveBound)}disconnectedCallback(){this.target.removeEventListener("mouseenter",this.enterBound),this.target.removeEventListener("mouseleave",this.leaveBound),this.setDirection(1),super.disconnectedCallback()}enter(){this.setDirection(1),this.play()}leave(){this.setDirection(-1),this.play()}}class C extends b{connectedCallback(){super.connectedCallback(),this.target.addEventListener("mouseenter",this.enterBound)}disconnectedCallback(){this.target.removeEventListener("mouseenter",this.enterBound),this.setDirection(1),super.disconnectedCallback()}enter(){this.setDirection(1),this.play()}complete(){this.setDirection(-1),this.play()}}class A extends b{constructor(){super(...arguments),this.playDelay=null,this.active=!1}connectedCallback(){super.connectedCallback(),this.target.addEventListener("mouseenter",this.enterBound),this.target.addEventListener("mouseleave",this.leaveBound)}disconnectedCallback(){this.resetPlayDelayTimer(),this.target.removeEventListener("mouseenter",this.enterBound),this.target.removeEventListener("mouseleave",this.leaveBound),this.setDirection(1),super.disconnectedCallback()}enter(){this.active=!0,this.inAnimation||this.playFromBegining()}leave(){this.active=!1}complete(){this.resetPlayDelayTimer(),this.active&&this.connected&&(this.delay>0?this.playDelay=setTimeout(()=>{this.playFromBegining()},this.delay):this.playFromBegining())}resetPlayDelayTimer(){this.playDelay&&(clearTimeout(this.playDelay),this.playDelay=null)}get delay(){return this.element.hasAttribute("delay")?+(this.element.getAttribute("delay")||0):0}}class T extends b{constructor(){super(...arguments),this.playDelay=null}ready(){this.play()}disconnectedCallback(){this.resetPlayDelayTimer(),super.disconnectedCallback()}complete(){this.resetPlayDelayTimer(),this.connected&&(this.delay>0?this.playDelay=setTimeout(()=>{this.playFromBegining()},this.delay):this.playFromBegining())}resetPlayDelayTimer(){this.playDelay&&(clearTimeout(this.playDelay),this.playDelay=null)}get delay(){return this.element.hasAttribute("delay")?+(this.element.getAttribute("delay")||0):0}}var _;_=r.loadAnimation,v.registerLoader(_),v.registerTrigger("click",E),v.registerTrigger("hover",x),v.registerTrigger("loop",T),v.registerTrigger("loop-on-hover",A),v.registerTrigger("morph",S),v.registerTrigger("morph-two-way",C),customElements.get&&customElements.get("lord-icon")||customElements.define("lord-icon",v)}]);