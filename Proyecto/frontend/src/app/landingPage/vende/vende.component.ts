import { Component, OnInit } from '@angular/core';
import { faImages, faTools , faCode} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-vende',
  templateUrl: './vende.component.html',
  styleUrls: ['./vende.component.css']
})
export class VendeComponent implements OnInit {
  faImages= faImages;
  faTools= faTools;
  faCode= faCode;

  constructor() { }

  ngOnInit(): void {
  }

}
