import { Component } from '@angular/core';
import { Navbar } from '../../shared/navbar/navbar';
import { Banner } from '../../shared/banner/banner';
import { Conoce } from '../conoce/conoce';
import { Direcciones } from '../direcciones/direcciones';
import { Contacto } from '../contacto/contacto';

@Component({
  imports: [Navbar, Banner, Conoce, Direcciones, Contacto],
  selector: 'app-home',
  styleUrl: './home.scss',
  templateUrl: './home.html',
})
export class Home {}
