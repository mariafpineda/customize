import { Component, OnInit } from '@angular/core';
import { faImages, faTools , faCode} from "@fortawesome/free-solid-svg-icons";
import { PlanesService } from "../../services/planes.service";

@Component({
  selector: 'app-vende',
  templateUrl: './vende.component.html',
  styleUrls: ['./vende.component.css']
})
export class VendeComponent implements OnInit {
  faImages= faImages;
  faTools= faTools;
  faCode= faCode;
  planes:any = [];

  constructor(private planesService:PlanesService) { }

  ngOnInit(): void {

    this.planesService.getPlans()
    .subscribe(res => {
      console.log(res);
      this.planes= res;
    }, error => console.log(error)
    )
  }



}
