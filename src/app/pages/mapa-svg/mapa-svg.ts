
import { Component, EventEmitter, Output, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-mapa-svg',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mapa-svg.html',
  styleUrl: './mapa-svg.scss'
})
export class MapaSvg {

  @ViewChild('contenedorMapa') contenedorMapa!: ElementRef<HTMLElement>;
  @Output() estadoSeleccionado = new EventEmitter<string>();

  nombreEstado = '';
  mostrarInfoEstado = false;

  posicionMouseX = 0;
  posicionMouseY = 0;

  private nombresEstados: Record<string, string> = {
    chihuahua: 'Chihuahua',
    sonora: 'Sonora',
    coahuila: 'Coahuila',
    durango: 'Durango',
    bajacalifornia: 'Baja California',
    bajacaliforniasur: 'Baja California Sur',
    oaxaca: 'Oaxaca',
    zacatecas: 'Zacatecas',
    jalisco: 'Jalisco',
    chiapas: 'Chiapas',
    tamaulipas: 'Tamaulipas',
    nuevoleon: 'Nuevo León',
    veracruz: 'Veracruz',
    sanluispotosi: 'San Luis Potosí',
    guerrero: 'Guerrero',
    sinaloa: 'Sinaloa',
    yucatan: 'Yucatán',
    guanajuato: 'Guanajuato',
    puebla: 'Puebla',
    quintanaroo: 'Quintana Roo',
    nayarit: 'Nayarit',
    mexico: 'Estado de México',
    tlaxcala: 'Tlaxcala',
    hidalgo: 'Hidalgo',
    queretaro: 'Querétaro',
    aguascalientes: 'Aguascalientes',
    morelos: 'Morelos',
    cdmx: 'Ciudad de México',
    michoacan: 'Michoacán',
    colima: 'Colima',
    tabasco: 'Tabasco',
    campeche: 'Campeche'
  };

  seleccionarEstado(event: MouseEvent): void {
    const elemento = event.target;

    if (!(elemento instanceof SVGElement)) return;
    if (!elemento.classList.contains('estado')) return;

    this.estadoSeleccionado.emit(elemento.id);
  }

  mostrarNombre(event: MouseEvent): void {
    const elemento = event.target;

    if (!(elemento instanceof SVGElement)) return;
    if (!elemento.classList.contains('estado')) return;

    this.nombreEstado =
      this.nombresEstados[elemento.id] ?? elemento.id;

    this.mostrarInfoEstado = true;
    this.moverInformacion(event);
  }

  moverInformacion(event: MouseEvent): void {

    if (!this.contenedorMapa) {
      return;
    }

    const rect =
      this.contenedorMapa.nativeElement.getBoundingClientRect();

    this.posicionMouseX = event.clientX - rect.left + 15;
    this.posicionMouseY = event.clientY - rect.top + 15;
  }

  ocultarNombre(): void {
    this.mostrarInfoEstado = false;
    this.nombreEstado = '';
  }
}