
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "preload": [
      "chunk-FSFX4QXL.js"
    ],
    "route": "/"
  },
  {
    "renderMode": 2,
    "redirectTo": "/",
    "route": "/**"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 6009, hash: '9eef08e1fd72f2f176fa333597123d167f981f1fd3769acba6248ef12be90d19', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1344, hash: '0c1d05667ad7a0e95a201d452a848073f76e83d39753341fad83630799885304', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'index.html': {size: 45383, hash: 'f01691d34ea933fea26b4caf2bd1da37dc9ad142c93a0ae5b7cd0d9c1ab5c6d4', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'styles-2DP2DG35.css': {size: 231684, hash: 'ifb7EXeaSEo', text: () => import('./assets-chunks/styles-2DP2DG35_css.mjs').then(m => m.default)}
  },
};
