import { Component, OnInit } from '@angular/core';
import { DaoService } from '@app/services/dao.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
  caracteres$ = this.daoService.characters$;
  eposodios$ = this.daoService.eposides$;

  option = false;
  constructor(private daoService: DaoService) { }

  ngOnInit(): void {
  }

}
