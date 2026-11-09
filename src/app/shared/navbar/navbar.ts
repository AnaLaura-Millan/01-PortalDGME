import { Component } from '@angular/core';
import { CommonModule, NgClass } from '@angular/common';

import { inject } from '@angular/core';
import { Analytics } from '../../services/analytics';
import { Router, RouterLink} from '@angular/router';

@Component({
  imports: [NgClass, RouterLink, CommonModule],
  selector: 'app-navbar',
  standalone: true,
  styleUrl: './navbar.scss',
  templateUrl: './navbar.html',
})
export class Navbar {

  private analytics = inject(Analytics);
  private router = inject(Router);
  menuAbierto = false;

  get menuActivo(): string {
    return this.router.url.split('?')[0].split('#')[0] === '/invitaciones'
      ? 'invitaciones'
      : 'inicio';
  }

  activarMenu(menu: string): void {
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
