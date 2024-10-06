import{r as m}from"./index.DhYZZe0J.js";var b={exports:{}},a={};/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var u=m,c=Symbol.for("react.element"),p=Symbol.for("react.fragment"),x=Object.prototype.hasOwnProperty,f=u.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,_={key:!0,ref:!0,__self:!0,__source:!0};function i(r,e,o){var t,s={},d=null,l=null;o!==void 0&&(d=""+o),e.key!==void 0&&(d=""+e.key),e.ref!==void 0&&(l=e.ref);for(t in e)x.call(e,t)&&!_.hasOwnProperty(t)&&(s[t]=e[t]);if(r&&r.defaultProps)for(t in e=r.defaultProps,e)s[t]===void 0&&(s[t]=e[t]);return{$$typeof:c,type:r,key:d,ref:l,props:s,_owner:f.current}}a.Fragment=p;a.jsx=i;a.jsxs=i;b.exports=a;var n=b.exports;const v={bumblebee:"bumblebee",aqua:"aqua",dark:"dark"},y=r=>r.slice(0,1).toUpperCase()+r.slice(1),w=({children:r})=>{const e=o=>{document.documentElement.dataset.theme=o};return n.jsxs("div",{className:"dropdown dropdown-bottom",children:[n.jsx("div",{tabIndex:0,role:"button",className:"btn btn-md rounded-btn btn-outline",children:r}),n.jsx("ul",{tabIndex:0,className:"menu dropdown-content bg-base-100 rounded-box z-[1] w-52 p-2 mt-2 ring-2 ring-primary max-h-[200px] flex-nowrap overflow-auto",children:Object.values(v).map(o=>n.jsx("li",{"data-theme":o,className:"!bg-base-100 rounded-box border-2 border-secondary mb-2 [&:last-child]:mb-0",children:n.jsx("div",{role:"button",tabIndex:0,onClick:()=>e(o),className:"btn btn-primary rounded-box",children:y(o)})},o))})]})};export{w as ThemeDropdown};
