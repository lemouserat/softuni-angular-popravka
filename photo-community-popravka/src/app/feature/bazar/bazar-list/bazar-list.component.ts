import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, filter, startWith, switchMap, tap } from 'rxjs/operators';
import { IOffer } from 'src/app/core/interfaces';
import { OfferService } from 'src/app/core/offer.service';

@Component({
  selector: 'app-bazar-list',
  templateUrl: './bazar-list.component.html',
  styleUrls: ['./bazar-list.component.css']
})
export class BazarListComponent implements OnInit {

  offerList: IOffer[]
  searchControl = new FormControl('')

  constructor(private offerService: OfferService) { }

  ngOnInit(): void {
    this.searchControl.valueChanges.pipe(
      debounceTime(1000),
      //filter(searchTerm => searchTerm.length >= 3),
      startWith(''),
      switchMap(searchTerm => this.offerService.loadOfferList(searchTerm))
      //switchMap  ako vtoriq observable emitne nova stoinost stariq se unseubsribva
    ) .subscribe(offerList => {
      this.offerList = offerList
      
    })
  }

}
