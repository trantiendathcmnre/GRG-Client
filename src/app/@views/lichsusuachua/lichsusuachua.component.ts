import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-lichsusuachua',
  templateUrl: './lichsusuachua.component.html',
  styleUrls: ['./lichsusuachua.component.css']
})
export class LichSuSuaChuaComponent implements OnInit {

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    const firstParam: string = this.route.snapshot.queryParamMap.get('title');
    debugger
  }

}
