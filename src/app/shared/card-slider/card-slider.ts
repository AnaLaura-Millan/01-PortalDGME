
import { Component, ElementRef, ViewChild, AfterViewInit, OnDestroy, signal, OnInit, inject} from '@angular/core';
import { CardSliderService, ICardSliderApi } from '../../services/card-slider.service';
import { Analytics } from '../../services/analytics';

export interface Tarjeta {
  id: number;
  titulo:string;
  imagen: string;
  url: string | null;
  tipo: 'pdf' | 'facebook';
}

@Component({
  selector: 'app-card-slider',
  standalone: true,
  imports: [],
  templateUrl: './card-slider.html',
  styleUrl: './card-slider.scss'
})

export class CardSlider implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('contenedorSlider')
  contenedorSlider?: ElementRef<HTMLElement>;
  
  private cardSliderService = inject(CardSliderService);
  private resizeObserver?: ResizeObserver;
  private analytics = inject(Analytics);

  // TÍTULO GENERAL
  titulo = 'Novedades';

  // TARJETAS DEL CARRUSEL
  tarjetas = signal<Tarjeta[]>([]);
  cargando = signal<boolean>(false);
  errorCarga = signal<string | null>(null);

  // ESTADO DE LAS FLECHAS
  puedeAnterior = signal(false);
  puedeSiguiente = signal(false);


  ngOnInit(): void {
    this.cargarTarjetas();
  }

  private cargarTarjetas(): void {
    this.cargando.set(true);
    this.errorCarga.set(null);

    this.cardSliderService.obtenerTarjetas().subscribe({
      next: (respuesta) => {
        if (respuesta.estado !== 'correcto') {
          this.errorCarga.set( 'No fue posible obtener las publicaciones.');
          this.cargando.set(false);
          return;
        }

        const tarjetas: Tarjeta[] = respuesta.datos.map((registro: ICardSliderApi) => ({
            id: registro.id_slider,
            titulo: registro.titulo,
            imagen: registro.imagen,
            url: registro.url,
            tipo: registro.tipo
          })
        );

        this.tarjetas.set(tarjetas);
        this.cargando.set(false);
        //console.log('Tarjetas cargadas:', tarjetas.length);
      },

      error: (error) => {
        //console.error('Error al cargar Card Slider:', error);
        this.errorCarga.set('No fue posible cargar las publicaciones.');
        this.cargando.set(false);
      }
    });
  }

  ngAfterViewInit(): void {
    const contenedor = this.contenedorSlider?.nativeElement;
    if (!contenedor) return;

    this.actualizarFlechas();

    if (typeof ResizeObserver !== 'undefined') {
      this.resizeObserver = new ResizeObserver(() => {
        this.actualizarFlechas();
      });

      this.resizeObserver.observe(contenedor);
    }
  }

  ngOnDestroy(): void {
    this.resizeObserver?.disconnect();
  }

  // DESPLAZAR UNA TARJETA
  desplazar(direccion: number): void {
    const contenedor = this.contenedorSlider?.nativeElement;
    if (!contenedor) return;

    const tarjeta = contenedor.querySelector<HTMLElement>('.slider-item');

    if (!tarjeta) return;

    const estilos = getComputedStyle(contenedor);
    const espacio = parseFloat(estilos.columnGap) || 0;

    const distancia = tarjeta.offsetWidth + espacio;

    contenedor.scrollBy({
      left: direccion * distancia,
      behavior: 'smooth'
    });
  }

  // ACTUALIZAR ESTADO DE FLECHAS
  actualizarFlechas(): void {
    const contenedor = this.contenedorSlider?.nativeElement;
    if (!contenedor) return;

    const posicion = contenedor.scrollLeft;
    const maximo =
      contenedor.scrollWidth - contenedor.clientWidth;

    this.puedeAnterior.set(posicion > 2);
    this.puedeSiguiente.set(posicion < maximo - 2);
  }

  // VALIDAR URL SEGÚN EL TIPO DE ENLACE
  obtenerUrl(tarjeta: Tarjeta): string | null {
    const url = tarjeta.url?.trim();
    if (!url) return null;

    if (tarjeta.tipo === 'pdf') {
      // PDFs locales dentro de assets/documentos
      if ( !/^assets\/documentos\/[\w./-]+\.pdf$/i.test(url) ||  url.includes('..')) {
        return null;
      }
      return url;
    }

    if (tarjeta.tipo === 'facebook') {
      try {
        const destino = new URL(url);

        const dominiosPermitidos = [
          'facebook.com',
          'www.facebook.com',
          'm.facebook.com',
          'web.facebook.com',
          'fb.watch'
        ];

        if ( destino.protocol === 'https:' && dominiosPermitidos.includes(destino.hostname)) {
          return url;
        }
      } catch {
        return null;
      }
    }

    return null;
  }

  // REGISTRAR INTERACCIONES DEL CARRUSEL ANALYTICS
  registrarInteraccion(titulo: string): void {
    this.analytics.registrarClick('card_slider', titulo);
  }
}
