import { Component, OnInit } from '@angular/core';
import { faPlus } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css']
})
export class CategoriasComponent implements OnInit {
  faPlus=faPlus;
  constructor() { }

  ngOnInit(): void {
  }

}
