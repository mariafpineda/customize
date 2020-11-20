import { Component, OnInit } from '@angular/core';
import { faUserShield, faClipboardList, faTools, faFileCode, faHandshake} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  faUserShield= faUserShield;
  faClipboard= faClipboardList;
  faTools=faTools;
  faCode=faFileCode;
  faHandshake=faHandshake;
  constructor() { }

  ngOnInit(): void {
  }

}
