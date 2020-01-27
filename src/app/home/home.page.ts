import { Component } from '@angular/core';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { Observable } from 'rxjs';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  myImage:string=null;

  constructor(
    private camera:Camera
  ) {

  }

  captureImage(){

      this.convertFileDataUrlviaFileReader(`assets/imgs/image1.jpg`).subscribe(base64=>{
          this.myImage = base64;
      });

      const options: CameraOptions = {
        quality:100,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE,
        sourceType: this.camera.PictureSourceType.CAMERA
      };

      this.camera.getPicture(options).then((imageData)=>{
           this.myImage = 'data:image/jpeg;base64,' + imageData;
      });

  }

  convertFileDataUrlviaFileReader(url:string){
   return Observable.create( observer=>{
      let xhr: XMLHttpRequest = new XMLHttpRequest();
      xhr.onload = function(){
          let reader:FileReader = new FileReader();
          reader.onloadend = function (){
            observer.next(reader.result);
            observer.complete();
          };
          reader.readAsDataURL(xhr.response); 
      };
      xhr.open('GET', url);
      xhr.responseType='blob';
      xhr.send();
   });
  }


  imageCropped(ev){

  }

}
