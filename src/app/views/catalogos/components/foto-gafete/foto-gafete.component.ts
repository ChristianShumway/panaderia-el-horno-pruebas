import { Component, OnInit, Inject, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-foto-gafete',
  templateUrl: './foto-gafete.component.html',
  styleUrls: ['./foto-gafete.component.scss']
})
// const $video = this.document.querySelector('#video');
export class FotoGafeteComponent implements OnInit, AfterViewInit {

  @ViewChild("video", {static: false}) public video: ElementRef;
  @ViewChild("canvas", {static: false}) public canvas: ElementRef;
  public captures: Array<any>;
 
  constructor(
  ) {
    this.captures = ['./../../../../../assets/images/faces/12.jpg', './../../../../../assets/images/faces/10.jpg'];
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true })
      .then( stream => {
        try {
          this.video.nativeElement.srcObject = stream;
        } catch (error) {
          this.video.nativeElement.src = window.URL.createObjectURL(stream);
        }
        this.video.nativeElement.play();
      });
    } 
  }

  public capture() {
    var context = this.canvas.nativeElement.getContext("2d").drawImage(this.video.nativeElement, 0, 0, 640, 480);
    this.captures.push(this.canvas.nativeElement.toDataURL("image/png"));
    console.log(this.captures);
  }


  

}
