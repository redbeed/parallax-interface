var ParallaxInterface=function(){"use strict";var t="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},e="Expected a function",i=NaN,n="[object Symbol]",r=/^\s+|\s+$/g,a=/^[-+]0x[0-9a-f]+$/i,o=/^0b[01]+$/i,s=/^0o[0-7]+$/i,l=parseInt,c="object"==typeof t&&t&&t.Object===Object&&t,p="object"==typeof self&&self&&self.Object===Object&&self,u=c||p||Function("return this")(),h=Object.prototype.toString,f=Math.max,d=Math.min,m=function(){return u.Date.now()};function y(t,i,n){var r,a,o,s,l,c,p=0,u=!1,h=!1,y=!0;if("function"!=typeof t)throw new TypeError(e);function w(e){var i=r,n=a;return r=a=void 0,p=e,s=t.apply(n,i)}function x(t){var e=t-c;return void 0===c||e>=i||e<0||h&&t-p>=o}function b(){var t=m();if(x(t))return M(t);l=setTimeout(b,function(t){var e=i-(t-c);return h?d(e,o-(t-p)):e}(t))}function M(t){return l=void 0,y&&r?w(t):(r=a=void 0,s)}function E(){var t=m(),e=x(t);if(r=arguments,a=this,c=t,e){if(void 0===l)return function(t){return p=t,l=setTimeout(b,i),u?w(t):s}(c);if(h)return l=setTimeout(b,i),w(c)}return void 0===l&&(l=setTimeout(b,i)),s}return i=g(i)||0,v(n)&&(u=!!n.leading,o=(h="maxWait"in n)?f(g(n.maxWait)||0,i):o,y="trailing"in n?!!n.trailing:y),E.cancel=function(){void 0!==l&&clearTimeout(l),p=0,r=c=a=l=void 0},E.flush=function(){return void 0===l?s:M(m())},E}function v(t){var e=typeof t;return!!t&&("object"==e||"function"==e)}function g(t){if("number"==typeof t)return t;if(function(t){return"symbol"==typeof t||function(t){return!!t&&"object"==typeof t}(t)&&h.call(t)==n}(t))return i;if(v(t)){var e="function"==typeof t.valueOf?t.valueOf():t;t=v(e)?e+"":e}if("string"!=typeof t)return 0===t?t:+t;t=t.replace(r,"");var c=o.test(t);return c||s.test(t)?l(t.slice(2),c?2:8):a.test(t)?i:+t}var w=function(t,i,n){var r=!0,a=!0;if("function"!=typeof t)throw new TypeError(e);return v(n)&&(r="leading"in n?!!n.leading:r,a="trailing"in n?!!n.trailing:a),y(t,i,{leading:r,maxWait:i,trailing:a})};class x{static instances=[];static options={throttleTime:16,hitzoneFactor:1,mouseMoveFactor:.5,animationTime:500};static init(t={}){x.options={...x.options,...t},document.addEventListener("DOMContentLoaded",(()=>{document.querySelectorAll("[data-pxi]").forEach((t=>new x(t)))}))}constructor(t){this.element=t,this.ParallaxInterfaces=Array.from(this.element.querySelectorAll("[data-pxi-factor]")),this.hitzoneFactor=parseFloat(this.element.dataset.pxiHitzone)||x.options.hitzoneFactor,this.wrapper=null,this.prepareElement(),this.prepareParallaxInterfaces(),this.createWrapper(),this.element.setAttribute("data-pxi","init"),x.instances.push(this),x.mouseMoveInitialized||(x.initMouseMove(),x.mouseMoveInitialized=!0)}createWrapper(){const t=this.element.getBoundingClientRect();this.wrapper=document.createElement("div"),this.wrapper.setAttribute("data-pxi-wrapper",""),this.element.parentNode.insertBefore(this.wrapper,this.element),this.wrapper.appendChild(this.element),this.wrapper.style.width=`${t.width}px`,this.wrapper.style.height=`${t.height}px`}prepareElement(){const t=this.element.getBoundingClientRect();this.element.style.width=`${t.width}px`,this.element.style.height=`${t.height}px`}prepareParallaxInterfaces(){this.ParallaxInterfaces.forEach((t=>{const e=t.getBoundingClientRect();t.style.width=`${e.width}px`,t.style.height=`${e.height}px`,t.cachedFactor=parseFloat(t.dataset.pxiFactor||x.options.mouseMoveFactor)}))}static initMouseMove(){document.addEventListener("mousemove",w((t=>{x.instances.forEach((e=>{const i=e.wrapper.getBoundingClientRect(),n=Math.hypot(i.width,i.height)*e.hitzoneFactor/2,r=i.left+i.width/2,a=i.top+i.height/2;Math.hypot(t.clientX-r,t.clientY-a)<=n?requestAnimationFrame((()=>{const r={x:t.clientX-i.left-i.width/2,y:t.clientY-i.top-i.height/2},a=Math.sqrt(Math.pow(r.x,2)+Math.pow(r.y,2)),o=1-a/n;e.ParallaxInterfaces.forEach((t=>{const e=t.cachedFactor,i=r.x*e*o,s=r.y*e*o,l=a/n*x.options.animationTime;t.style.transform=`translate(${i}px, ${s}px)`,t.style.transitionDuration=`${l}ms`}))})):e.ParallaxInterfaces.forEach((t=>{t.style.transitionDuration="1000ms",t.style.transform="translate(0, 0)"}))}))}),x.options.throttleTime))}}return x}();
//# sourceMappingURL=parallax-interface.js.map
