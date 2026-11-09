
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "preload": [
      "chunk-DYKh8y_P.js",
      "chunk-Dt9divNX.js"
    ],
    "route": "/"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-DQmY4PgG.js",
      "chunk-Dt9divNX.js"
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
    'index.csr.html': {size: 6863, hash: '535b2b5173479d56104ddc52b21f4b7ea643a47c332b9ae5357dbac68d00e3d4', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 2058, hash: '2aa84f8aec1d5a246b608c89589628cfc30e2e11f2d1bc0d148ef64ea604555a', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'index.html': {size: 55786, hash: '7d6c0449949b792bcb0ed9aa19c0bc138cd04f95a38b6a15904ff17ca97afcf7', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'invitaciones/index.html': {size: 52897, hash: 'e222cbc43935948e324ab1c56587f3a167c62c856fc2baffe2f4cb00a14e8f04', text: () => import('./assets-chunks/invitaciones_index_html.mjs').then(m => m.default)},
    'styles-3QL3M54Z.css': {size: 316654, hash: 'lQ5456TgC18', text: () => import('./assets-chunks/styles-3QL3M54Z_css.mjs').then(m => m.default)}
  },
};
