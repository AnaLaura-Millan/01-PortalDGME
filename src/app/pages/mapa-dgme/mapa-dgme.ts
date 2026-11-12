
import { Component, inject, ViewChild, OnInit} from '@angular/core';
import { TitleCasePipe } from '@angular/common';
import { MapaDgmeService, SeccionMapa} from '../../services/mapa-dgme.service';
import { MapaSvg } from '../mapa-svg/mapa-svg';
import { ModalDgme } from '../../shared/modal-dgme/modal-dgme';

@Component({
  selector: 'app-mapa-dgme',
  standalone: true,
  imports: [MapaSvg, TitleCasePipe, ModalDgme],
  templateUrl: './mapa-dgme.html',
  styleUrl: './mapa-dgme.scss'
})

export class MapaDgme implements OnInit {

  private readonly mapaService = inject(MapaDgmeService);

  @ViewChild(ModalDgme)
  modalDgme!: ModalDgme;

  /* ESTADO DEL MAPA */

  seccionActual: SeccionMapa = 'murales';
  estadoActual = '';
  registrosSeleccionados: any[] = [];
  totalRegistros = 0;
  cargando = true;
  errorCarga = false;

  /* DATOS DE LAS SECCIONES */
  secciones = this.mapaService.obtenerSecciones();
  totalEstadosMurales = 0;
  totalEstadosCreativos = 0;
  totalEstadosChamakes = 0;

  private readonly estadosSvg: Record<string, string> = {
    bajacalifornia: 'Baja California',
    bajacaliforniasur: 'Baja California Sur',
    aguascalientes: 'Aguascalientes',
    campeche: 'Campeche',
    chiapas: 'Chiapas',
    chihuahua: 'Chihuahua',
    coahuila: 'Coahuila',
    colima: 'Colima',
    cdmx: 'CDMX',
    durango: 'Durango',
    guanajuato: 'Guanajuato',
    guerrero: 'Guerrero',
    hidalgo: 'Hidalgo',
    jalisco: 'Jalisco',
    mexico: 'Estado de México',
    michoacan: 'Michoacán',
    morelos: 'Morelos',
    nayarit: 'Nayarit',
    nuevoleon: 'Nuevo León',
    oaxaca: 'Oaxaca',
    puebla: 'Puebla',
    queretaro: 'Querétaro',
    quintanaroo: 'Quintana Roo',
    sanluispotosi: 'San Luis Potosí',
    sinaloa: 'Sinaloa',
    sonora: 'Sonora',
    tabasco: 'Tabasco',
    tamaulipas: 'Tamaulipas',
    tlaxcala: 'Tlaxcala',
    veracruz: 'Veracruz',
    yucatan: 'Yucatán',
    zacatecas: 'Zacatecas'
  };

  /* CARGAR INFORMACIÓN DESDE PHP */
  ngOnInit(): void {
    this.mapaService.cargarDatos().subscribe({
      next: () => {
        this.totalEstadosMurales = this.mapaService.obtenerEstados('murales').length;
        this.totalEstadosCreativos = this.mapaService.obtenerEstados('creativos').length;
        this.totalEstadosChamakes = this.mapaService.obtenerEstados('chamakes').length;

        this.cargando = false;
        this.errorCarga = false;

        // console.log('Mapa DGME cargado desde MySQL:', {
        //   murales: this.totalEstadosMurales,
        //   creativos: this.totalEstadosCreativos,
        //   chamakes: this.totalEstadosChamakes
        // });
      },
      error: (error) => {
        console.error(
          'Error al cargar el Mapa DGME:',
          error
        );
        this.cargando = false;
        this.errorCarga = true;
      }
    });
  }

  /* SELECCIONAR ESTADO  */
  seleccionarEstadoSvg(idEstado: string): void {
    if (this.cargando || this.errorCarga) {
      return;
    }

    const estado = this.estadosSvg[idEstado];

    if (!estado) {
      //console.warn('Estado no reconocido:', idEstado);
      return;
    }

    this.estadoActual = estado;
    this.registrosSeleccionados =
      this.mapaService.obtenerRegistros( this.seccionActual, estado);
    this.totalRegistros = this.registrosSeleccionados.length;

    const seccionHabilitada = this.seccionActual === 'murales' || this.seccionActual === 'creativos' || this.seccionActual === 'chamakes';

    if (seccionHabilitada && this.totalRegistros > 0) {
      this.modalDgme.abrir();
    }
  }

  /* CAMBIAR SECCIÓN */
  cambiarSeccion(seccion: SeccionMapa): void {
    this.modalDgme?.cerrar();
    this.seccionActual = seccion;
    this.estadoActual = '';
    this.totalRegistros = 0;
    this.registrosSeleccionados = [];
  }
}