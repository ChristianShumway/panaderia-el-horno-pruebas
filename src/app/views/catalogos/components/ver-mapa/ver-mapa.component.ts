import { Component, OnInit, Inject, AfterViewInit } from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as L from 'leaflet';
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';
// import 'node_modules/leaflet-geosearch/dist/geosearch.css';

const provider = new OpenStreetMapProvider();
// const provider = new GeoSearch.OpenStreetMapProvider;
const searchControl = new GeoSearchControl({
  provider: provider,
});



@Component({
  selector: 'app-ver-mapa',
  templateUrl: './ver-mapa.component.html',
  styleUrls: ['./ver-mapa.component.scss']
})
export class VerMapaComponent implements OnInit, AfterViewInit {
  private map;

  constructor(
    private bottomSheetRef: MatBottomSheetRef<VerMapaComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit() {
    // this.bottomSheetRef.dismiss();
  }

  ngAfterViewInit(): void {
    this.initMap();
  }

  private initMap(): void {
    // var searchLayer = L.geoJson().addTo(this.map);
    this.map = L.map('map', {
      center: [21.88234, -102.28259],
      zoom: 16,
      zoomControl: true,
    });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this.map);

  this.map.addControl(searchControl);


   
  }

}
