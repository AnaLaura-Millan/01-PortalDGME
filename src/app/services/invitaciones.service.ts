
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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

  private apiUrl =
    'http://localhost/01-PortalDGME/dgme-api/invitaciones/listar.php';

  obtenerInvitaciones( tipo: TipoInvitacion): Observable<IRespuestaInvitaciones> {
    return this.http.get<IRespuestaInvitaciones>(
      this.apiUrl,
      {
        params: { tipo }
      }
    );
  }
}
