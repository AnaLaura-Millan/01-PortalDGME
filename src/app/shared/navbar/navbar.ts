import { Component } from '@angular/core';
import { NgClass } from '@angular/common';

import { inject } from '@angular/core';
import { Analytics } from '../../services/analytics';

@Component({
  imports: [NgClass],
  selector: 'app-navbar',
  standalone: true,
  styleUrl: './navbar.scss',
  templateUrl: './navbar.html',
})
export class Navbar {

  private analytics = inject(Analytics);

  menuActivo = 'inicio';
  menuAbierto = false;

  activarMenu(menu: string): void {
    this.menuActivo = menu;
    // En móvil cerramos el menú después de seleccionar.
    this.menuAbierto = false;
  }

  alternarMenu(): void {
    this.menuAbierto = !this.menuAbierto;
  }

  //Evento para Google Analytics
  registrarNavegacion(elemento: string): void {
    this.analytics.registrarClick('navegacion', elemento);
  }
}
