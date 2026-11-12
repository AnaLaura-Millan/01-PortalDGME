
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, map, tap } from 'rxjs';

import { API_CONFIG } from '../config/api.config';

export type SeccionMapa = 'murales' | 'creativos' | 'chamakes';

interface RespuestaApi<T> {
  ok: boolean;
  total: number;
  datos: T[];
}

interface RegistroApi {
  estado: string;
  [campo: string]: any;
}

interface MuralApi extends RegistroApi {
  titulo: string;
  autor: string;
  ubicacion: string;
  sede: string;
  url_img: string;
  url_video: string;
}

interface CreativoApi extends RegistroApi {
  nombre: string;
  ubicacion: string;
  creativoName: string;
  municipio: string;
  years: Array<Record<string, any[]>>;
}

interface ChamakeApi extends RegistroApi {
  nombre: string;
  municipio: string;
  url_img: string;
  url_tarjeta: string;
}

@Injectable({
  providedIn: 'root'
})
export class MapaDgmeService {

  private readonly http = inject(HttpClient);
  private readonly apiUrl = API_CONFIG.baseUrlM;

  /* DATOS RECUPERADOS DE MYSQL */
  private datos: Record<SeccionMapa,Record<string, any[]>> = {
    murales: {},
    creativos: {},
    chamakes: {}
  };

  /* CONSULTAR LAS TRES SECCIONES */
  cargarDatos(): Observable<void> {
    return forkJoin({ murales: this.http.get<RespuestaApi<MuralApi>>(`${this.apiUrl}/murales.php`),
                      creativos: this.http.get<RespuestaApi<CreativoApi>>(`${this.apiUrl}/creativos.php`),
                      chamakes: this.http.get<RespuestaApi<ChamakeApi>>(`${this.apiUrl}/chamakes.php`)
    }).pipe( map(respuestas => {
        if ( !respuestas.murales.ok || !respuestas.creativos.ok || !respuestas.chamakes.ok) {
          throw new Error('No fue posible recuperar la información del mapa.');
        }

        return {
          murales: respuestas.murales.datos,
          creativos: respuestas.creativos.datos,
          chamakes: respuestas.chamakes.datos
        };
      }),

      tap(respuestas => {
        this.datos = {
          murales: this.agruparPorEstado(
            respuestas.murales.map(mural => ({
              ...mural,

              // Nombres utilizados por el modal actual
              mural: mural.titulo,
              municipio: mural.ubicacion,
              escuela: mural.sede,
              img: mural.url_img,
              enlace: mural.url_video
            }))
          ),

          creativos: this.agruparPorEstado(
            respuestas.creativos.map(creativo => ({
              ...creativo,

              creativoName: creativo.nombre,
              municipio: creativo.ubicacion,
              years: creativo.years ?? []
            }))
          ),

          chamakes: this.agruparPorEstado(
            respuestas.chamakes.map(chamake => ({
              ...chamake,

              // Adaptación de campos para el modal
              name: chamake.nombre,
              img: chamake.url_img,
              enlace: chamake.url_tarjeta
            }))
          )
        };
      }),
      map(() => undefined)
    );
  }

  /*  AGRUPAR REGISTROS POR ESTADO */
  private agruparPorEstado<T extends RegistroApi>(registros: T[]): Record<string, T[]> {
    const agrupados: Record<string, T[]> = {};
    
    for (const registro of registros) {
      const estado = registro.estado;

      if (!agrupados[estado]) {
        agrupados[estado] = [];
      }
      agrupados[estado].push(registro);
    }
    return agrupados;
  }

  /* SECCIONES DISPONIBLES */
  obtenerSecciones(): SeccionMapa[] {
    return ['murales', 'creativos', 'chamakes'];
  }

  /* ESTADOS CON INFORMACIÓN */
  obtenerEstados(seccion: SeccionMapa): string[] {
    return Object.keys(this.datos[seccion]);
  }

  /*  REGISTROS POR SECCIÓN Y ESTADO */
  obtenerRegistros( seccion: SeccionMapa, estado: string): unknown[] {
    return this.datos[seccion][estado] ?? [];
  }

  /* CICLOS ESCOLARES */
  obtenerCiclos(  years: Array<Record<string, unknown[]>>): string[] {
    return [
      ...new Set(  years.flatMap(bloque => Object.keys(bloque)))
    ];
  }

  /* DOCUMENTOS POR CICLO  */
  obtenerDocumentos(
    years: Array<Record<string, unknown[]>>,
    ciclo: string
  ): unknown[] {

    return years.flatMap(
      bloque => bloque[ciclo] ?? []
    );
  }
}