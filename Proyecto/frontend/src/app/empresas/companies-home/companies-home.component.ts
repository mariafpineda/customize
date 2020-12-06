import { Component, OnInit } from '@angular/core';
import { faCog, faSignOutAlt, faTag, faList, faStore, faBars, faHome} from '@fortawesome/free-solid-svg-icons';
import { faUserCircle as farUserCircle, faFile as farFile } from "@fortawesome/free-regular-svg-icons"
import { Router} from '@angular/router';
import { EmpresasService } from 'src/app/services/empresas.service';

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
  faHome=faHome;
  nombreEmpresa:String;


  constructor(private router:Router, private empresasService:EmpresasService) { }

  ngOnInit(): void {
    this.empresasService.getCompany(localStorage.getItem('idBrand'))
    .subscribe(res=>{
      this.nombreEmpresa=res[0].nombreEmpresa.toUpperCase();
    }, error=>{
      console.log(error);
    })
  }

  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('idBrand');
    this.router.navigate(['/company/login']);
  }

}
