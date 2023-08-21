import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class TrackerApiService {

  constructor() { }


  getPackages() {
    return axios.get('http://localhost:5000/api/packages');
  }
  
  getDeliveries() {
    return axios.get('http://localhost:5000/api/deliveries');
  }

  createPackage(formData: Object) {
    return axios.post('http://localhost:5000/api/packages',formData,{
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
  updatePackage(formData: Object, id: String) {
    return axios.put(`http://localhost:5000/api/packages/${id}`,formData,{
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
  
  deletePackage(id: String) {
    return axios.delete(`http://localhost:5000/api/packages/${id}`,{
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
  
  createDelivery(formData: Object) {
    return axios.post('http://localhost:5000/api/deliveries',formData,{
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
  
  updateDelivery(formData: Object, id: String) {
    return axios.put(`http://localhost:5000/api/deliveries/${id}`,formData,{
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
  
  deleteDelivery(id: String) {
    return axios.delete(`http://localhost:5000/api/deliveries/${id}`,{
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}
