
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_CONFIG } from '../config/api.config';

export type TipoInvitacion = 'vigentes' | 'pasadas' | 'resultados';

export interface IDocumentoApi {
  id_doc: number;
  nombre: string;
  url: string;
  categoria: string;
  fecha_creacion: string;
}

export interface IInvitacionApi {
  id_inv: number;
  titulo: string;
  anio: number;
  ultima_fecha: string;
  documentos: IDocumentoApi[];
}

export interface IRespuestaInvitaciones {
  estado: string;
  total: number;
  datos: IInvitacionApi[];
}

@Injectable({
  providedIn: 'root'
})

export class InvitacionesService {

  private http = inject(HttpClient);
  private apiUrl = API_CONFIG.baseUrl;

  obtenerInvitaciones( tipo: TipoInvitacion): Observable<IRespuestaInvitaciones> {
    //console.log(tipo);
    return this.http.get<IRespuestaInvitaciones>(`${this.apiUrl}/invitaciones/listar.php`,
      {
        params: { tipo }
      }
    );
  }
}
