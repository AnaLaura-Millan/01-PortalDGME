export default `<!doctype html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <title>DGME</title>
  <base href="/">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="icon" type="image/x-icon" href="favicon.ico">
   <!-- CSS de accesibilidad gob.mx -->
  <link rel="stylesheet" href="https://framework-gb.cdn.gob.mx/gm/accesibilidad/css/gobmx-accesibilidad.min.css">

  <!-- Google Analytics 4 -->
  <script>
    (function () {
      // Registrar estadísticas únicamente en el dominio oficial
      if (window.location.hostname !== 'dgme.sep.gob.mx') {
        return;
      }

      // Cargar Google Analytics
      const script = document.createElement('script');
      script.async = true;
      script.src = 'https://www.googletagmanager.com/gtag/js?id=G-1EN3L0ST8H';
      document.head.appendChild(script);

      // Inicializar Google Analytics
      window.dataLayer = window.dataLayer || [];

      window.gtag = function () {
        window.dataLayer.push(arguments);
      };

      window.gtag('js', new Date());
      window.gtag('config', 'G-1EN3L0ST8H');
    })();
  </script>
  <!-- Fin Google Analytics 4 -->
   
<link rel="stylesheet" href="styles-3QL3M54Z.css"></head>
<body><script type="text/javascript" id="ng-event-dispatch-contract">(()=>{function p(t,n,r,o,e,i,f,m){return{eventType:t,event:n,targetElement:r,eic:o,timeStamp:e,eia:i,eirp:f,eiack:m}}function u(t){let n=[],r=e=>{n.push(e)};return{c:t,q:n,et:[],etc:[],d:r,h:e=>{r(p(e.type,e,e.target,t,Date.now()))}}}function s(t,n,r){for(let o=0;o<n.length;o++){let e=n[o];(r?t.etc:t.et).push(e),t.c.addEventListener(e,t.h,r)}}function c(t,n,r,o,e=window){let i=u(t);e._ejsas||(e._ejsas={}),e._ejsas[n]=i,s(i,r),s(i,o,!0)}window.__jsaction_bootstrap=c;})();
</script>
  <app-root></app-root>
  <!-- JS de accesibilidad gob.mx -->
  <script src="https://framework-gb.cdn.gob.mx/gm/accesibilidad/js/gobmx-accesibilidad.min.js">
  </script>
<script src="scripts-TTWY4XDY.js" defer=""></script><script src="main-FNSFIMMN.js" type="module"></script></body>
</html>`;