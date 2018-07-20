import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConstantsService {

  constructor() { }

  // public BACKEND_URL="https://zaraka.herokuapp.com"
  // public FRONTEND_URL="https://zaraportal.herokuapp.com";

  public BACKEND_URL="http://192.168.100.27:5050"
  public FRONTEND_URL="http://localhost:4200"
}
