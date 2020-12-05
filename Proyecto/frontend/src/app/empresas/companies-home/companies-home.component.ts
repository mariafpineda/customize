import { Component, OnInit } from '@angular/core';
import { faCog, faSignOutAlt, faTag, faList, faStore, faBars} from '@fortawesome/free-solid-svg-icons';
import { faUserCircle as farUserCircle, faFile as farFile } from "@fortawesome/free-regular-svg-icons"

@Component({
  selector: 'app-companies-home',
  templateUrl: './companies-home.component.html',
  styleUrls: ['./companies-home.component.css']
})
export class CompaniesHomeComponent implements OnInit {
  
  public isMenuCollapsed=true;
  public isSidebarCollapsed=true;
 /*Fontawesome*/
  faCog=faCog;
  faSignOutAlt=faSignOutAlt;
  farUser=farUserCircle;
  farFile=farFile;
  faTag=faTag;
  faList=faList;
  faStore=faStore;
  faBars=faBars;

  constructor() { }

  ngOnInit(): void {
  }

}
