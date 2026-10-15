
/* DOCUMENTOS ASOCIADOS */
export interface IDocumento {
  id: number;
  nombre: string;
  url: string;
}

/* INVITACIONES Y RESULTADOS */
export interface IInvitacion {
  id: number;
  titulo: string;
  anio: number;
  categoria: 'vigentes' | 'pasadas' | 'resultados';
  documentos: IDocumento[];
}
