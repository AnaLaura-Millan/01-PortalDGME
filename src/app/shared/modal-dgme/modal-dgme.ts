
import { Component, ElementRef, ViewChild, Input, AfterViewInit, OnDestroy, inject, PLATFORM_ID, signal} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import type ModalBootstrap from 'bootstrap/js/dist/modal';

@Component({
  selector: 'app-modal-dgme',
  standalone: true,
  imports: [],
  templateUrl: './modal-dgme.html',
  styleUrl: './modal-dgme.scss'
})
export class ModalDgme implements AfterViewInit, OnDestroy {

  private readonly platformId = inject(PLATFORM_ID);
  private modalBootstrap?: ModalBootstrap;
  private inicializacionModal?: Promise<void>;
  private destruido = false;
  // Controla si el modal fue trasladado al body.
  private modalMovidoAlBody = false;

  @ViewChild('modalElemento')
  modalElemento!: ElementRef<HTMLElement>;

  @Input() seccion: 'murales' | 'creativos' | 'chamakes' = 'murales';
  @Input() estado = '';
  @Input() registros: any[] = [];

  indiceRegistro = 0;
  indiceCiclo = 0;

  /* REGISTRO ACTUAL */
  get registroActual(): any | null {
    return this.registros[this.indiceRegistro] ?? null;
  }

  /* IMAGEN DEL REGISTRO  */
  get imagenRegistro(): string {
    const imagen = this.registroActual?.img;

    if (!imagen) {
      return '';
    }

    return `/assets/mapa-dgme/${imagen}`;
  }

  /*  NAVEGACIÓN DE REGISTROS  */
  anteriorRegistro(): void {
    if (this.indiceRegistro > 0) {
      this.indiceRegistro--;
      this.indiceCiclo = 0;
    }
  }

  siguienteRegistro(): void {
    if (this.indiceRegistro < this.registros.length - 1) {
      this.indiceRegistro++;
      this.indiceCiclo = 0;
    }
  }

  /* INICIALIZAR BOOTSTRAP SOLO EN NAVEGADOR */
  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }
    this.inicializacionModal = this.inicializarBootstrap();
  }

  private async inicializarBootstrap(): Promise<void> {
    try {
      // Bootstrap se carga solamente en el navegador.
      const { default: Modal } = await import(
        'bootstrap/js/dist/modal'
      );

      if (this.destruido) {
        return;
      }

      const elemento = this.modalElemento.nativeElement;

      if (elemento.parentElement !== document.body) {
        document.body.appendChild(elemento);
        this.modalMovidoAlBody = true;
      }

      this.modalBootstrap = new Modal(
        elemento,
        {
          backdrop: 'static',
          keyboard: false,
          focus: true
        }
      );

    } catch (error) {
      console.error(
        'Error al inicializar el modal DGME:',
        error
      );
    }
  }

  /* ABRIR MODAL */
  async abrir(): Promise<void> {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    this.limpiarBusqueda();

    if (this.inicializacionModal) {
      await this.inicializacionModal;
    }

    if (this.destruido) {
      return;
    }

    this.modalBootstrap?.show();
  }

  /* CERRAR MODAL */
  cerrar(): void {
    this.modalBootstrap?.hide();
  }

  /*  DESTRUIR MODAL */
  ngOnDestroy(): void {
    this.destruido = true;

    // Liberar instancia de Bootstrap.
    this.modalBootstrap?.dispose();
    this.modalBootstrap = undefined;

    // Eliminar el elemento que trasladamos al body.
    if (this.modalMovidoAlBody && isPlatformBrowser(this.platformId) && this.modalElemento?.nativeElement) {
      this.modalElemento.nativeElement.remove();
      this.modalMovidoAlBody = false;
    }
  }

  /*  CICLOS ESCOLARES DE CREATIVOS  */
  get ciclosCreativo(): {
    ciclo: string;
    documentos: {
      name: string;
      url: string;
    }[];
  }[] {

    const years = this.registroActual?.years;

    if (!Array.isArray(years)) {
      return [];
    }

    return years.flatMap(
      ( bloque: Record<string, {
          name: string;
          url: string;
        }[]>
      ) =>
        Object.entries(bloque).map(
          ([ciclo, documentos]) => ({
            ciclo,
            documentos
          })
        )
    );
  }

  /* CICLO ESCOLAR ACTUAL  */
  get cicloActual() {
    return this.ciclosCreativo[this.indiceCiclo] ?? null;
  }

  seleccionarCiclo(indice: number): void {
    this.indiceCiclo = indice;
  }

  /* RUTAS DE DOCUMENTOS PDF */
  rutaDocumento(ruta: string): string {
    if (!ruta) {
      return '';
    }

    // Conservar enlaces externos.
    if (/^https?:\/\//i.test(ruta)) {
      return ruta;
    }

    // Normalizar caracteres Unicode.
    const rutaNormalizada = ruta.normalize('NFC');

    // Codificar cada segmento sin alterar las diagonales.
    const rutaSegura = rutaNormalizada
      .replace(/^\/+/, '')
      .split('/')
      .map(segmento => encodeURIComponent(segmento))
      .join('/');

    return `/assets/mapa-dgme/${rutaSegura}`;
  }

  /*  BUSCADOR DE CREATIVOS */
  busquedaCreativos = signal('');
  actualizarBusqueda(valor: string): void {
    this.busquedaCreativos.set(valor);
    this.buscarCreativo();
  }

  private normalizarTexto(texto: string): string {
    return texto
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .trim();
  }

  buscarCreativo(): void {
    const consulta = this.normalizarTexto(
      this.busquedaCreativos()
    );

    if (!consulta) {
      return;
    }

    const indice = this.registros.findIndex(
      (registro: any) => {

        const nombre = this.normalizarTexto(
          registro.creativoName ?? ''
        );

        const municipio = this.normalizarTexto(
          registro.municipio ?? ''
        );

        return nombre.includes(consulta) ||
          municipio.includes(consulta) ||
          (
            Array.isArray(registro.years) &&
            registro.years.some(
              (
                bloque: Record<string, {
                  name: string;
                  url: string;
                }[]>
              ) =>
                Object.values(bloque).some(
                  documentos =>
                    documentos.some(
                      documento =>
                        this.normalizarTexto(
                          documento.name
                        ).includes(consulta)
                    )
                )
            )
          );
      }
    );

    if (indice !== -1) {
      this.indiceRegistro = indice;
      this.indiceCiclo = 0;
    }
  }

  /* LIMPIAR BUSCADOR  */
  limpiarBusqueda(): void {
    this.busquedaCreativos.set('');
    this.indiceCiclo = 0;
    this.indiceRegistro = 0;
  }
}
