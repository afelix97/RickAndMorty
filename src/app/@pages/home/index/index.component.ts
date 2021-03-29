import { Component, HostListener, OnInit } from '@angular/core';
import { DaoService } from '@app/services/dao.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
  caracteres$ = this.daoService.characters$;
  eposodios$ = this.daoService.eposides$;

  option = true;

  pageShowList:number = 1;
  constructor(private daoService: DaoService) { }

  ngOnInit(): void {
  }

  /* funcion que se manda llamar al hacer scroll */
  @HostListener('window:scroll')
  onWindowScroll() {
   // console.log("haciendo scroll");
  }

  onScrollDown():void{
    this.pageShowList++;//incrementa el valor para mostrar las pagina de resultado siguiente
    this.daoService.getCharactersByPage(this.pageShowList);
  }
}
