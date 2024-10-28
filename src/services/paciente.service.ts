import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ValidatorService } from './tools/validator.service';
import { ErrorService } from './tools/error.service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FacadeService } from './facade.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class PacienteService {

  constructor(
    private http: HttpClient,
    private validatorService: ValidatorService,
    private errorService: ErrorService,
    private facadeService: FacadeService
  ) { }

  public esquemaPaciente(){
    return {
      'rol':'',
      'name': '',
      'email': '',
      'password': '',
      'confirmar_password': '',
      'telefono': '',
      'dieta': '',
    }
  }
//Validación para el formulario
  public validarPaciente(data: any, editar: boolean){
    console.log("Validando paciente... ", data);
    let error: any = [];

    if(!this.validatorService.required(data["name"])){
      error["name"] = this.errorService.required;
    }

    if(!this.validatorService.required(data["email"])){
      error["email"] = this.errorService.required;
    }else if(!this.validatorService.max(data["email"], 40)){
      error["email"] = this.errorService.max(40);
    }else if (!this.validatorService.email(data['email'])) {
      error['email'] = this.errorService.email;
    }

    if(!editar){
      if(!this.validatorService.required(data["password"])){
        error["password"] = this.errorService.required;
      }

      if(!this.validatorService.required(data["confirmar_password"])){
        error["confirmar_password"] = this.errorService.required;
      }
    }

    if(!this.validatorService.required(data["telefono"])){
      error["telefono"] = this.errorService.required;
    }else if(!this.validatorService.numeric(data["telefono"])){
      alert("El formato es solo números");
      error["telefono"] = this.errorService.numeric;
    }

    if(!this.validatorService.required(data["dieta"])){
      error["dieta"] = this.errorService.required;
    }

    //Return arreglo
    return error;
  }

  //Aquí van los servicios HTTP
  //Servicio para registrar un nuevo usuario
  public registrarPaciente (data: any): Observable <any>{
    return this.http.post<any>(`${environment.url_api}/paciente/`,data, httpOptions);
  }

  public obtenerListaPacientes (): Observable <any>{
    var token = this.facadeService.getSessionToken();
    var headers = new HttpHeaders({ 'Content-Type': 'application/json' , 'Authorization': 'Bearer '+token});
    return this.http.get<any>(`${environment.url_api}/lista-pacientes/`, {headers:headers});
  }

  //Obtener un solo usuario dependiendo su ID
  public getPacienteByID(idUser: Number){
    return this.http.get<any>(`${environment.url_api}/paciente/?id=${idUser}`,httpOptions);
  }

  //Servicio para actualizar un usuario
  public editarPaciente (data: any): Observable <any>{
    var token = this.facadeService.getSessionToken();
    var headers = new HttpHeaders({ 'Content-Type': 'application/json' , 'Authorization': 'Bearer '+token});
    return this.http.put<any>(`${environment.url_api}/paciente-edit/`, data, {headers:headers});
  }
  //Eliminar Admin
  public eliminarPaciente(idUser: number): Observable <any>{
    var token = this.facadeService.getSessionToken();
    var headers = new HttpHeaders({ 'Content-Type': 'application/json' , 'Authorization': 'Bearer '+token});
    return this.http.delete<any>(`${environment.url_api}/paciente-edit/?id=${idUser}`,{headers:headers});
  }
  //Obtener el total de cada uno de los usuarios
  public getTotalUsuarios(){
    var token = this.facadeService.getSessionToken();
    var headers = new HttpHeaders({ 'Content-Type': 'application/json' , 'Authorization': 'Bearer '+token});
    return this.http.get<any>(`${environment.url_api}/paciente-edit/`, {headers:headers});
  }

}