import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConstantsService {

  constructor() { }

  // public BACKEND_URL="https://zaraka.herokuapp.com/"

  public BACKEND_URL="http://172.17.157.177:5050"
  public FRONTEND_URL="http://localhost:4200"
}
