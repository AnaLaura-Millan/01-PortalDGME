
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "preload": [
      "chunk-B8gfdrsT.js",
      "chunk-CmVL1jGf.js"
    ],
    "route": "/"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-CSn_8m9x.js",
      "chunk-CmVL1jGf.js"
    ],
    "route": "/invitaciones"
  },
  {
    "renderMode": 2,
    "redirectTo": "/",
    "route": "/**"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 6863, hash: '43db618c00c9b61debe3c38cf7318353dbcc1b9b9ec9719abf2748aaa453275e', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 2058, hash: '16c3ebac20708ac6604e079cbbaa2e435ba62f38cba73fb2da4fd7492e37fc52', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'index.html': {size: 55786, hash: 'fc6b53791f3e31b75d7777015e05cbbf930aa9d5a2646692414bd42171ce1907', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'invitaciones/index.html': {size: 55966, hash: '9753eb00fd9869e5b001484d9943e2603b883e0ec3a64e5e300323af96d0967d', text: () => import('./assets-chunks/invitaciones_index_html.mjs').then(m => m.default)},
    'styles-3QL3M54Z.css': {size: 316654, hash: 'lQ5456TgC18', text: () => import('./assets-chunks/styles-3QL3M54Z_css.mjs').then(m => m.default)}
  },
};
