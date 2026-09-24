import { Component,OnDestroy, OnInit, signal } from '@angular/core';
import { IDireccion } from '../../interface/direcciones.model';


@Component({
  imports: [],
  selector: 'app-direcciones',
  styleUrl: './direcciones.scss',
  templateUrl: './direcciones.html',
})

export class Direcciones implements OnInit, OnDestroy {

  indice = signal(0);
  private intervalo?: ReturnType<typeof setInterval>;
  private inicioX = 0;

  direcciones: IDireccion[] = [
    {
      id: 1,
      titulo: 'Dirección de Administración de Recursos y de Gestión Digital',
      descripcion: 'Nuestra labor es administrar los recursos humanos, financieros y materiales, promoviendo la mejora administrativa y la gestión digital de la DGME.',
      imagen: '/assets/images/direcciones/dargd.png'
    },
    {
      id: 2,
      titulo: 'Dirección Editorial',
      descripcion: 'Nuestra labor es editar, diseñar y hacer la búsqueda iconográfica de los Libros de Texto Gratuitos y materiales educativos complementarios, guiados por los principios de la NEM, para garantizar estándares de calidad técnica y fortalecer los procesos de enseñanza y aprendizaje en las seis fases.',
      imagen: '/assets/images/direcciones/de.png'
    },
    {
      id: 3,
      titulo: 'Dirección de Desarrollo e Innovación de Materiales Educativos',
      descripcion: 'Nuestra labor es coordinar acciones para el desarrollo, innovación y actualización de materiales educativos dirigidos a infancias, adolescencias, docentes y familias, para contribuir al fortalecimiento de la educación básica.',
      imagen: '/assets/images/direcciones/ddime.png'
    },
    {
      id: 4,
      titulo: 'Dirección de Planeación y Seguimiento',
      descripcion: 'Nuestra labor es coordinar de los recursos autorizados por ejercer en las actividades de la DGME, así como generar un seguimiento de los proyectos para garantizar que éstos se encuentren alineados a la política educativa bajo los principios de transparencia, eficiencia y austeridad.',
      imagen: '/assets/images/direcciones/dps.png'
    },
    {
      id: 5,
      titulo: 'Dirección de Bibliotecas y Promoción de la Lectura',
      descripcion: 'Nuestra labor es impulsar la creación de bibliotecas escolares para la formación de comunidades lectoras y la formación de una ciudadanía crítica desde la educación básica. ',
      imagen: '/assets/images/direcciones/dbpl.png'
    },
    {
      id: 6,
      titulo: 'Dirección de Evaluación y Distribución',
      descripcion: 'Nuestra labor es coordinar los procesos de evaluación y difusión de los Libros de Texto Gratuito y otros materiales educativos para la educación básica, de acuerdo con los lineamientos establecidos por la DGME.',
      imagen: '/assets/images/direcciones/ded.png'
    },
    {
      id: 7,
      titulo: 'Dirección de Medios Audiovisuales e Informáticos',
      descripcion: 'Nuestra labor es coordinar la producción de materiales educativos audiovisuales e informáticos, así como el fortalecimiento de capacidades técnicas, para apoyar y enriquecer los procesos de enseñanza y aprendizaje en la educación básica, conforme a los lineamientos de la NEM, basados en la inclusión y diversidad.',
      imagen: '/assets/images/direcciones/dmai.png'
    }
  ];

  ngOnInit(): void {
    this.iniciarAutoPlay();
  }

  ngOnDestroy(): void {
    this.detenerAutoPlay();
  }

  /* AUTOPLAY */
  iniciarAutoPlay(): void {
    this.detenerAutoPlay();
    this.intervalo = setInterval(() => { this.siguiente();}, 30000);
  }

  detenerAutoPlay(): void {
    if (this.intervalo) {
      clearInterval(this.intervalo);
      this.intervalo = undefined;
    }
  }

  siguiente(): void {
    this.indice.update( indiceActual => (indiceActual + 1) % this.direcciones.length);
  }

  anterior(): void {
    this.indice.update(indiceActual => indiceActual === 0 ? this.direcciones.length - 1 : indiceActual - 1);
  }

  /* SELECCIONAR DESDE LOS PUNTOS */
  saltarA(indice: number): void {
    this.indice.set(indice);
    this.iniciarAutoPlay();
  }

  /* INICIAR DESLIZAMIENTO */
  iniciarDeslizamiento(event: PointerEvent): void {
    this.inicioX = event.clientX;
    this.detenerAutoPlay();
  }

  /* TERMINAR DESLIZAMIENTO */
  terminarDeslizamiento(event: PointerEvent): void {
    const finX = event.clientX;
    const diferencia = finX - this.inicioX;
    const distanciaMinima = 50;
    if (Math.abs(diferencia) >= distanciaMinima) {
      if (diferencia < 0) {
        this.siguiente();
      }
      else {
        this.anterior();
      }
    }
    this.iniciarAutoPlay();
  }
}
