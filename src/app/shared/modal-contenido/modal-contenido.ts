import { Component,Input} from '@angular/core';
import { IConoce } from '../../interface/conoce.model';

@Component({
  imports: [],
  selector: 'app-modal-contenido',
  styleUrl: './modal-contenido.scss',
  templateUrl: './modal-contenido.html',
})

export class ModalContenido  {

  @Input()
  opcion: IConoce | null = null;
}
