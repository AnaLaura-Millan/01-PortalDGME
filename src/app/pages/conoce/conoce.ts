import { Component} from '@angular/core';
import { ModalContenido } from '../../shared/modal-contenido/modal-contenido';
import { IConoce } from '../../interface/conoce.model';

@Component({
  standalone: true,
  imports: [ModalContenido],
  selector: 'app-conoce',
  styleUrl: './conoce.scss',
  templateUrl: './conoce.html',
})
export class Conoce {

  opcionSeleccionada: IConoce | null = null;
  opciones: IConoce [] = [
    {
      id: 1,
      titulo: '¿Quiénes somos?',
      imagen: '/assets/images/conoce/somos.png',
      descripcion:
        `Somos la institución pública encargada de la construcción de materiales educativos para la educación básica, desde una perspectiva de justicia social, inclusión y sentido comunitario. Buscamos visibilizar, mediante dichos materiales, la diversidad cultural, histórica, territorial y social del país, así como fortalecer el reconocimiento, la valoración y el orgullo por los pueblos, lenguas, saberes y tradiciones.`,
    },

    {
      id: 2,
      titulo: '¿Cuáles son los objetivos?',
      imagen: '/assets/images/conoce/objetivos.png',
      contenido: [
        'Contribuir al desarrollo integral de la comunidad de educación básica en sus distintos niveles, modalidades y servicios, mediante los LTG y diversos materiales educativos, con la participación tanto del magisterio como de las comunidades y autoridades educativas.',
        'Responder a las realidades territoriales, culturales, sociales e históricas del país, para fortalecer la autonomía docente y promover el pensamiento crítico, la creatividad, la inclusión, la participación y la justicia educativa.',
        'Promover que los LTG, las bibliotecas, los materiales audiovisuales, digitales y demás recursos educativos sean herramientas vivas que reconozcan la capacidad de agencia, autonomía y dignidad de infancias, adolescentes, docentes y de las diversas personas actoras de las comunidades.'
        ],
    },

    {
      id: 3,
      titulo: '¿Cuál es nuestra labor?',
      imagen: '/assets/images/conoce/labor.png',
      descripcion:
        `Diseñar, crear, actualizar, evaluar y difundir —desde el humanismo mexicano y los principios de la Nueva Escuela Mexicana (NEM)— los Libros de Texto Gratuitos (LTG) y diversos materiales educativos que fortalezcan la Educación Básica y acompañen el trabajo de la comunidad educativa. Todo ello mediante el diálogo, la reflexión y la participación, reconociendo sus realidades territoriales, culturales e históricas, así como la autonomía profesional del magisterio y la construcción crítica del conocimiento.`,
    },
    {
      id: 4,
      titulo: '¿Qué hacemos por México?',
      imagen: '/assets/images/conoce/hacemosxmexico.png',
      descripcion: `Contribuimos a que las escuelas sean comunidades de aprendizaje, diálogo y emancipación, capaces de fortalecer el tejido social y formar una ciudadanía que comprenda, valore y transforme su realidad con dignidad, solidaridad y responsabilidad compartida. De este modo, hacemos de los materiales educativos herramientas para el encuentro, la construcción colectiva y la transformación social.`,
      //tamanioModal: 'md'
    }
  ];
  

  /* =====================================================
     ABRIR MODAL
  ====================================================== */
 abrirOpcion(opcion: IConoce): void {

    this.opcionSeleccionada = opcion;

  }
}
