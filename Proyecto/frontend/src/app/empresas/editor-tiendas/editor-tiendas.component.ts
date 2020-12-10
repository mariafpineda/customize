import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HostListener } from '@angular/core'
import { faBars, faChevronDown, faPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-editor-tiendas',
  templateUrl: './editor-tiendas.component.html',
  styleUrls: ['./editor-tiendas.component.css']
})
export class EditorTiendasComponent implements OnInit {
  public isMenuCollapsed=true;
  public isSidebarCollapsed=true;
  public isCollapsed=true;
  public isCollapsed2=true;
  public isCollapsed3=true;
  disabled = false;
  faBars=faBars;
  faChevronDown=faChevronDown;
  faPlus=faPlus;

  constructor(private route:ActivatedRoute) { 
    console.log(this.route.snapshot.paramMap.get('idCompany'));
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(e){
    {
      let element = document.querySelector('.sideMenu');
      if (window.pageYOffset > 0) {
        element.classList.add('sideMenu-scrolled');
      } else {
        element.classList.remove('sideMenu-scrolled');
      }
    }
  } 


  ngOnInit(): void {
    console.log(this.route.snapshot.paramMap.get('idPage'));
  }

}
