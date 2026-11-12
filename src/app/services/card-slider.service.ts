
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_CONFIG } from '../config/api.config';

// ESTRUCTURA DE CADA REGISTRO DEVUELTO POR PHP
export interface ICardSliderApi {
  id_slider: number;
  titulo: string;
  descripcion: string;
  imagen: string;
  url: string | null;
  tipo: 'pdf' | 'facebook';
}

// ESTRUCTURA DE LA RESPUESTA JSON
export interface ICardSliderRespuesta {
  estado: string;
  total: number;
  datos: ICardSliderApi[];
}

@Injectable({
  providedIn: 'root'
})
export class CardSliderService {

  private http = inject(HttpClient);
    private apiUrl = API_CONFIG.baseUrl;

  // API DEL PORTAL DGME
  //private apiUrl = 'https://dgme.sep.gob.mx/dgme-api/card-slider/listar.php';

  obtenerTarjetas(): Observable<ICardSliderRespuesta> {
    //return this.http.get<ICardSliderRespuesta>(this.apiUrl);
    return this.http.get<ICardSliderRespuesta>(`${this.apiUrl}/card-slider/listarTarjetas.php`)
  }
}
