import { Component, EventEmitter, OnInit } from '@angular/core';
import { faUserShield, faClipboardList, faKey, faFileCode, faHandshake} from "@fortawesome/free-solid-svg-icons";
import { Output } from "@angular/core";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  @Output() onCatSeleccionada = new EventEmitter()

  faUserShield= faUserShield;
  faClipboard= faClipboardList;
  faKey=faKey;
  faCode=faFileCode;
  faHandshake=faHandshake;


  constructor() { }

  ngOnInit(): void {
  }

  catSeleccionada(categoria){
    this.onCatSeleccionada.emit(categoria);
  }
}
