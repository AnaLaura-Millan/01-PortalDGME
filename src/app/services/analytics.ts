/* NOTA: Este servicio registra cuando un usuario hace clic sobre
una tarjeta, botón o enlace dela página (previamente configurados) 
y se registra en evento en Google Analytics*/

import { Injectable } from '@angular/core';

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

@Injectable({
  providedIn: 'root'
})
export class Analytics {

  registrarClick(seccion: string, elemento: string): void {

    // Evitar errores durante SSR
    if (typeof window === 'undefined') {
      return;
    }

    // Enviar evento a Google Analytics 4
    if (typeof window.gtag === 'function') {
      window.gtag('event', 'clic_seccion', {
        seccion: seccion,
        elemento: elemento
      });
    }

  }

}
