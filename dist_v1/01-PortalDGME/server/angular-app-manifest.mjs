
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "preload": [
      "chunk-Q5VFT5WQ.js"
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
    'index.csr.html': {size: 6009, hash: '080b165dd3a699c338d4d16750fb671ef6ed2205b39933c7fc5bf5b83aac3aa1', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1344, hash: 'b19ca0ddc608f5a8a5c2dff8971992cfecf429d8808d7ee04a948341ec1292d1', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'index.html': {size: 45378, hash: 'c9d8c318e2b3249f129f5e561269957f22b6930934594a49db42032ec0c7cf55', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'styles-2DP2DG35.css': {size: 231684, hash: 'ifb7EXeaSEo', text: () => import('./assets-chunks/styles-2DP2DG35_css.mjs').then(m => m.default)}
  },
};
