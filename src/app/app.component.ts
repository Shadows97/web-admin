import {  Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TrackerApiService } from './services/tracker-api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  packages: any[] = [];
  deliveries: any[] = [];

  packageErrorMsg: String = "";
  deliveryErrorMsg: String = "";

  packageForm!: FormGroup;
  packageUpdateForm!: FormGroup;
  deliveryForm!: FormGroup;
  deliveryUpdateForm!: FormGroup;

  packageSelected: any = null;
  deliverySelected: any = null;
  
  constructor(private tracket_api: TrackerApiService, 
    private formBuilder: FormBuilder, private toastr: ToastrService) {
   
    
  }

  getPackages(): void {
    this.tracket_api.getPackages()
    .then(response => {
      this.packages = response.data;
      console.log(response.data)
    })
    .catch(error => {
      console.log(error);
    });
  }
  
  getDeliveries(): void {
    this.tracket_api.getDeliveries()
    .then(response => {
      this.deliveries = response.data;
      console.log(response.data)
    })
    .catch(error => {
      console.log(error);
    });
  }

  deleteDelivery(id: String): void {
    this.tracket_api.deleteDelivery(id)
    .then(response => {
      console.log(response.data)
      this.getDeliveries()
    })
    .catch(error => {
      console.log(error);
    });
  }
  
  deletePackage(id: String): void {
    this.tracket_api.deletePackage(id)
    .then(response => {
      console.log(response.data)
      this.getPackages()
    })
    .catch(error => {
      console.log(error);
    });
  }

  selectPackage(id: String): void {
    console.log(this.packages.filter((p) => p.package_id == id)[0]);
    this.packageSelected = this.packages.filter((p) => p.package_id == id)[0];
    this.packageUpdateForm = this.formBuilder.group({
    package_id: [this.packageSelected?.package_id],
    active_delivery_id: [this.packageSelected?.active_delivery_id],
    description: [this.packageSelected?.description, Validators.required],
    weight: [this.packageSelected?.weight, Validators.required],
    width: [this.packageSelected?.width, Validators.required],
    height: [this.packageSelected?.height, Validators.required],
    depth: [this.packageSelected?.depth, Validators.required],
    from_name: [this.packageSelected?.from_name, Validators.required],
    from_address: [this.packageSelected?.from_address, Validators.required],
    from_location_lat: [this.packageSelected?.from_location.lat, Validators.required],
    from_location_lng:  [this.packageSelected?.from_location.lng, Validators.required],
    to_name: [this.packageSelected?.to_name, Validators.required],
    to_address: [this.packageSelected?.to_address, Validators.required],
    to_location_lat: [this.packageSelected?.to_location.lat, Validators.required],
    to_location_lng: [this.packageSelected?.to_location.lng, Validators.required],
  });
}

selectDelivery(id: String): void {
    this.deliverySelected = this.deliveries.filter((p) => p.delivery_id == id)[0];
    this.deliveryUpdateForm = this.formBuilder.group({
      delivery_id: [this.deliverySelected?.delivery_id],
      package_id: [this.deliverySelected?.package_id, Validators.required],
      location_lat: [this.deliverySelected?.location.lat, Validators.required],
      location_lng:[this.deliverySelected?.location.lng, Validators.required],
      status: [this.deliverySelected?.status, Validators.required]
    });
}

ngOnInit(): void {

  this.getPackages();
  this.getDeliveries();



  this.packageForm = this.formBuilder.group({
    description: ['', Validators.required],
    weight: ['', Validators.required],
    width: ['', Validators.required],
    height: ['', Validators.required],
    depth: ['', Validators.required],
    from_name: ['', Validators.required],
    from_address: ['', Validators.required],
    from_location_lat: ['', Validators.required],
    from_location_lng:  ['', Validators.required],
    to_name: ['', Validators.required],
    to_address: ['', Validators.required],
    to_location_lat: ['', Validators.required],
    to_location_lng: ['', Validators.required],
  });

  this.packageUpdateForm = this.formBuilder.group({
    package_id: [this.packageSelected?.package_id],
    active_delivery_id: [this.packageSelected?.active_delivery_id],
    description: [this.packageSelected?.description, Validators.required],
    weight: [this.packageSelected?.weight, Validators.required],
    width: [this.packageSelected?.width, Validators.required],
    height: [this.packageSelected?.height, Validators.required],
    depth: [this.packageSelected?.depth, Validators.required],
    from_name: [this.packageSelected?.from_name, Validators.required],
    from_address: [this.packageSelected?.from_address, Validators.required],
    from_location_lat: [this.packageSelected?.from_location.lat, Validators.required],
    from_location_lng:  [this.packageSelected?.from_location.lng, Validators.required],
    to_name: [this.packageSelected?.to_name, Validators.required],
    to_address: [this.packageSelected?.to_address, Validators.required],
    to_location_lat: [this.packageSelected?.to_location.lat, Validators.required],
    to_location_lng: [this.packageSelected?.to_location.lng, Validators.required],
  });


  this.deliveryForm = this.formBuilder.group({
    package_id: ['', Validators.required],
    location_lat: ['', Validators.required],
    location_lng:['', Validators.required],
    status: ['', Validators.required]
  });

  this.deliveryUpdateForm = this.formBuilder.group({
    delivery_id: [this.deliverySelected?.delivery_id],
    package_id: [this.deliverySelected?.package_id, Validators.required],
    location_lat: [this.deliverySelected?.location.lat, Validators.required],
    location_lng:[this.deliverySelected?.location.lng, Validators.required],
    status: [this.deliverySelected?.status, Validators.required]
  });


}

onSubmitPackage() {
  if (this.packageForm.valid) {
    const formData = this.packageForm.value;
    const formattedData = {
      description: formData.description,
      weight: formData.weight,
      width: formData.width,
      height: formData.height,
      depth: formData.depth,
      from_name: formData.from_name,
      from_address: formData.from_address,
      from_location: {
        lat: formData.from_location_lat,
        lng: formData.from_location_lng
      },
      to_name: formData.to_name,
      to_address: formData.to_address,
      to_location: {
        lat: formData.to_location_lat,
        lng: formData.to_location_lng
      }
    };
    console.log(formattedData);
    const cleanedData = JSON.parse(JSON.stringify(formattedData));

    console.log(JSON.stringify(cleanedData));

    this.tracket_api.createPackage(JSON.stringify(cleanedData))
    .then(response => {
      console.log(response.data)
      this.getPackages()
    })
    .catch(error => {
      const msg: any = Object.values(error.response.data.error.errors)[0];
      this.packageErrorMsg = error.response.data.message;
      console.log(msg.message);
    });
  }
}

onSubmitPackageUpdate() {
  if (this.packageUpdateForm.valid) {
    const formData = this.packageUpdateForm.value;
    const formattedData = {
      description: formData.description,
      weight: formData.weight,
      width: formData.width,
      height: formData.height,
      depth: formData.depth,
      from_name: formData.from_name,
      from_address: formData.from_address,
      from_location: {
        lat: formData.from_location_lat,
        lng: formData.from_location_lng
      },
      to_name: formData.to_name,
      to_address: formData.to_address,
      to_location: {
        lat: formData.to_location_lat,
        lng: formData.to_location_lng
      }
    };
    console.log(formattedData);
    const cleanedData = JSON.parse(JSON.stringify(formattedData));

    console.log(JSON.stringify(cleanedData));

    this.tracket_api.updatePackage(JSON.stringify(cleanedData), formData.package_id)
    .then(response => {
      console.log(response.data)
      this.getPackages();
    })
    .catch(error => {
      const msg: any = Object.values(error.response.data.error.errors)[0];
      this.packageErrorMsg = error.response.data.message;
      console.log(msg.message);
    });
  }
}


onSubmitDelivery() {
  if (this.deliveryForm.valid) {
    const formData = this.deliveryForm.value;

    // Formatage des données
    const formattedData = {
      package_id: formData.package_id,
      pickup_time: formData.pickup_time,
      start_time: formData.start_time,
      end_time: formData.end_time,
      location: {
        lat: formData.location_lat.toString(),
        lng: formData.location_lng.toString()
      },
      status: formData.status
    };

    console.log(formattedData);

    const cleanedData = JSON.parse(JSON.stringify(formattedData));

    console.log(JSON.stringify(cleanedData));

    this.tracket_api.createDelivery(JSON.stringify(cleanedData))
    .then(response => {
      
      console.log(response.data);
      this.getDeliveries();
      this.getPackages();
      
      
    })
    .catch(error => {
      const msg: any = Object.values(error.response.data.error.errors)[0];
      this.deliveryErrorMsg = error.response.data.message;
      console.log(msg.message);
    });
   
  }
}


onSubmitDeliveryUpdate() {
  if (this.deliveryUpdateForm.valid) {
    const formData = this.deliveryUpdateForm.value;

    // Formatage des données
    const formattedData = {
      package_id: formData.package_id,
      pickup_time: formData.pickup_time,
      start_time: formData.start_time,
      end_time: formData.end_time,
      location: {
        lat: formData.location_lat.toString(),
        lng: formData.location_lng.toString()
      },
      status: formData.status
    };

    console.log(formattedData);

    const cleanedData = JSON.parse(JSON.stringify(formattedData));

    console.log(JSON.stringify(cleanedData));

    this.tracket_api.updateDelivery(JSON.stringify(cleanedData),formData.delivery_id )
    .then(response => {
      
      console.log(response.data);

      this.getDeliveries();
      
      
    })
    .catch(error => {
      const msg: any = Object.values(error.response.data.error.errors)[0];
      this.deliveryErrorMsg = error.response.data.message;
      console.log(msg.message);
    });
   
  }
}
}
