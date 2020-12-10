import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-editor-tiendas',
  templateUrl: './editor-tiendas.component.html',
  styleUrls: ['./editor-tiendas.component.css']
})
export class EditorTiendasComponent implements OnInit {

  constructor(private route:ActivatedRoute) { 
    console.log(this.route.snapshot.paramMap.get('idCompany'));
  }

  ngOnInit(): void {
    console.log(this.route.snapshot.paramMap.get('idPage'));
  }

}
