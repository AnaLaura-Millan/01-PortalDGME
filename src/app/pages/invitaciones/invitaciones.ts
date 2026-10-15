import { Component, computed, signal} from '@angular/core';
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
export class Invitaciones {

  //pestaña activa
  pestanaActiva = signal<TipoPestana>('vigentes');
  // AÑOS SELECCIONADOS
  anioPasadas = signal<number | null>(null);
  anioResultados = signal<number | null>(null);

  // DATOS TEMPORALES
  invitaciones = signal<IInvitacion[]>([
    { id: 1,
      titulo: 'Invitación 1',
      anio: 2026,
      categoria: 'vigentes',
      documentos: [
        {
          id: 1,
          nombre: 'Participantes convocados',
          url: 'assets/pdf/participantes.pdf'
        },
        {
          id: 2,
          nombre: 'Bases de participación',
          url: 'assets/pdf/bases.pdf'
        }
      ]
    },
    {
      id: 2,
      titulo: 'Invitación 2025',
      anio: 2025,
      categoria: 'pasadas',
      documentos: [
        {
          id: 3,
          nombre: 'Convocatoria 2025',
          url: 'assets/pdf/convocatoria-2025.pdf'
        }
      ]
    },
    {
      id: 3,
      titulo: 'Resultados 2026',
      anio: 2026,
      categoria: 'resultados',
      documentos: [
        {
          id: 4,
          nombre: 'Listado de resultados',
          url: 'assets/pdf/resultados-2026.pdf'
        }
      ]
    },
    {
      id: 4,
      titulo: 'Invitación 2024',
      anio: 2024,
      categoria: 'pasadas',
      documentos: [
        {
          id: 5,
          nombre: 'Convocatoria 2024',
          url: 'assets/pdf/convocatoria-2024.pdf'
        },
        {
          id: 6,
          nombre: 'Bases de participación 2024',
          url: 'assets/pdf/bases-2024.pdf'
        }
      ]
    },
    {
      id: 5,
      titulo: 'Invitación 2023',
      anio: 2023,
      categoria: 'pasadas',
      documentos: [
        {
          id: 7,
          nombre: 'Convocatoria 2023',
          url: 'assets/pdf/convocatoria-2023.pdf'
        }
      ]
    },
    {
      id: 6,
      titulo: 'Resultados 2025',
      anio: 2025,
      categoria: 'resultados',
      documentos: [
        {
          id: 8,
          nombre: 'Listado de resultados 2025',
          url: 'assets/pdf/resultados-2025.pdf'
        }
      ]
    },
    {
      id: 7,
      titulo: 'Resultados 2024',
      anio: 2024,
      categoria: 'resultados',
      documentos: [
        {
          id: 9,
          nombre: 'Listado de resultados 2024',
          url: 'assets/pdf/resultados-2024.pdf'
        }
      ]
    }

  ]);

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
}
