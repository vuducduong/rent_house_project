import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize, map } from 'rxjs/operators';
import { HouseService } from 'src/app/service/house.service';
import { House } from 'src/app/model/houses/houses';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';



@Component({
  selector: 'app-create-house',
  templateUrl: './create-house.component.html',
  styleUrls: ['./create-house.component.css']
})
export class CreateHouseComponent implements OnInit {
  house!:any;
  createForm: FormGroup;
  id!:any;
  submitted: boolean = false;

  value : any = ['Con trong', 'Da cho thue']

// name!: any;
// price!:any;
// type!: any;
// description!: any;


  title = "cloudsSorage";
  selectedFile: File = null;
  fb: any;
  downloadURL: Observable<string>;
  srcImg: any;

  constructor(
    private houseService: HouseService,
    private router : Router,
    private route: ActivatedRoute,
    private notificationService: ToastrService,
    private storage: AngularFireStorage,
    private formBuilder: FormBuilder

    )
    {}



  ngOnInit(): void {
    this.createForm = this.formBuilder.group({
      name:['',[ Validators.required]],
      type:['',[ Validators.required]],
      pricePerDay: ['',[ Validators.required]],
      description: ['',[ Validators.required]],
      address: ['',[ Validators.required]],
      status: ['',[ Validators.required]],
      amountOfbedrooms: ['',[ Validators.required]],
      amountOfbathrooms:['',[ Validators.required]],

    })

    this.house = new House();
    this.id= localStorage.getItem("id")

  }

  onSubmit(){
    this.submitted=true;
    this.createHouse();
  }

  createHouse(){
    this.house.users_id=this.id;
    this.house.image =this.srcImg;
    console.log(this.house.status)
    console.log(this.house);
    this.houseService.createHouse(this.house).subscribe(
      (data: any) => {
        console.log(data);
        this.showToasterSuccess();
        this.house = new House();
        this.router.navigate(['house']);
      },
      (error: any) => {
        console.log(error)
      }
    )
  }
  cancel(){
    this.router.navigate(['house']);

  }

  showToasterSuccess() {
    this.notificationService.success('Đã thêm mới một nhà vào trong danh sách của bạn .', 'Thông báo !');
  }

  showToasterError() {
    this.notificationService.error(
      'Thêm mới không thành công',
      'email của quý khách đã có người sử dụng'
    );
  }

  onFileSelected(event: any) {
    var n = Date.now();
    const file = event.target.files[0];
    const filePath = `RoomsImages/${n}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(`RoomsImages/${n}`, file);
    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          this.downloadURL = fileRef.getDownloadURL();
          this.downloadURL.subscribe((url: any) => {
            if (url) {
              this.fb = url;
            }
            this.srcImg = url;
            console.log(this.fb);
          });
        })
      )
      .subscribe((url: any) => {
        if (url) {

           console.log(url);
        }
      });
  }

  
  }

