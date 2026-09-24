import { Component } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  imports: [NgClass],
  selector: 'app-navbar',
  standalone: true,
  styleUrl: './navbar.scss',
  templateUrl: './navbar.html',
})
export class Navbar {

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
}
