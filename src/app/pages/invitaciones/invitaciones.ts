
import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { forkJoin } from 'rxjs';
import { InvitacionesService, TipoInvitacion, IInvitacionApi } from '../../services/invitaciones.service';
import { Navbar } from '../../shared/navbar/navbar';
import { Banner } from '../../shared/banner/banner';
import { IInvitacion } from '../../interface/invitacion.model';

type TipoPestana = 'vigentes' | 'pasadas' | 'resultados';

@Component({
  imports: [Navbar, Banner],
  standalone: true,
  selector: 'app-invitaciones',
  styleUrl: './invitaciones.scss',
  templateUrl: './invitaciones.html',
})
export class Invitaciones  implements OnInit {

  private invitacionesService = inject(InvitacionesService);

  //pestaña activa
  pestanaActiva = signal<TipoPestana>('vigentes');
  // AÑOS SELECCIONADOS
  anioPasadas = signal<number | null>(null);
  anioResultados = signal<number | null>(null);

  //Datos para el API
  invitaciones = signal<IInvitacion[]>([]);
  cargando = signal<boolean>(false);
  errorCarga = signal<string | null>(null);

  // CLASIFICAR INVITACIONES POR CATEGORÍA
  invitacionesVigentes = computed(() => this.invitaciones().filter( invitacion => invitacion.categoria === 'vigentes'));
  
  invitacionesPasadas = computed(() => this.invitaciones().filter( invitacion => invitacion.categoria === 'pasadas'));

  resultados = computed(() => this.invitaciones().filter( invitacion => invitacion.categoria === 'resultados'));

  // AÑOS DISPONIBLES PARA INVITACIONES PASADAS
  aniosPasadas = computed(() => [...new Set(this.invitacionesPasadas().map(item => item.anio))].sort((a, b) => b - a));

  // AÑOS DISPONIBLES PARA RESULTADOS
  aniosResultados = computed(() => [...new Set(this.resultados().map(item => item.anio))].sort((a, b) => b - a));

  // INVITACIONES PASADAS FILTRADAS
  invitacionesPasadasFiltradas = computed(() => this.invitacionesPasadas().filter(item => this.anioPasadas() === null || item.anio === this.anioPasadas()));

  // RESULTADOS FILTRADOS
  resultadosFiltrados = computed(() => this.resultados().filter(item => this.anioResultados() === null || item.anio === this.anioResultados()));

  ngOnInit(): void {
    this.cargarInvitaciones();
  }

  // CAMBIAR AÑO DE INVITACIONES PASADAS
  filtrarPorAnio(anio: number | null): void {
    this.anioPasadas.set(anio);
  }

  // CAMBIAR AÑO DE RESULTADOS
  filtrarResultadosPorAnio(anio: number | null): void {
    this.anioResultados.set(anio);
  }

  // CAMBIAR PESTAÑA
  cambiarPestana(pestana: TipoPestana): void {
    this.pestanaActiva.set(pestana);
    
    // Reiniciar los filtros al cambiar de pestaña
    this.anioPasadas.set(null);
    this.anioResultados.set(null);
  }

  private cargarInvitaciones(): void {

    this.cargando.set(true);
    this.errorCarga.set(null);

    forkJoin({
      vigentes: this.invitacionesService.obtenerInvitaciones('vigentes'),
      pasadas: this.invitacionesService.obtenerInvitaciones('pasadas'),
      resultados: this.invitacionesService.obtenerInvitaciones('resultados')
    }).subscribe({
      next: (respuesta) => {
        const invitaciones: IInvitacion[] = [
          ...this.transformarInvitaciones(respuesta.vigentes.datos, 'vigentes'),
          ...this.transformarInvitaciones(respuesta.pasadas.datos, 'pasadas'),
          ...this.transformarInvitaciones(respuesta.resultados.datos, 'resultados')
        ];

        this.invitaciones.set(invitaciones);
        this.cargando.set(false);
      },
      error: (error) => {
        console.error('Error al cargar invitaciones:', error);
        this.errorCarga.set('No fue posible cargar las invitaciones.');
        this.cargando.set(false);
      }
    });
  }

  private transformarInvitaciones(datos: IInvitacionApi[], categoria: TipoInvitacion): IInvitacion[] {
    return datos.map(invitacion => ({
      id: invitacion.id_inv,
      titulo: invitacion.titulo,
      anio: invitacion.anio,
      categoria,
      documentos: invitacion.documentos.map(documento => ({
        id: documento.id_doc,
        nombre: documento.nombre,
        url: documento.url
      }))
    }));
  }
}
