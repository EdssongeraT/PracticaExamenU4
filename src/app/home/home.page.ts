import { Component } from '@angular/core';

import { Student } from "../models/student";
import { StudentService } from "../services/student.service";
import { AlertController } from "@ionic/angular";
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public students: Student[];

  constructor(private studentService: StudentService, private alertController: AlertController, private router: Router) {
    this.studentService.getStudents().subscribe(resp=>{
      this.students = resp
    });
  }

  public async removeStudent(id: string) {
    const alert = await this.alertController.create({
      header: 'Confirmación',
      subHeader: '¿Estás seguro que deseas eliminar?',
      message: 'Esto es una confirmación',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {

          }
        },
        {
          text: 'Aceptar',
          role: 'confirm',
          handler: () => {
            this.studentService.removeStudent(id);
          }
        }
      ]
    });

    await alert.present();



  }

  public editStudent(id:string){
    this.router.navigate(['/edit-student'], {
      queryParams: { id: id },
    });
  }

  public getStudentByControlNumber(id: string): void {
    //console.log(this.studentService.getStudentByControlNumber(cn));
    this.router.navigate(['/view-student'], {
      queryParams: { id: id },
    });
  }

  public getStudentById(id:string):void{
    this.router.navigate(['/view-student'], {
      queryParams: { id: id },
    });
  }

  public goToNewStudent(): void {
    this.router.navigate(['/new-student']);
  }

}
