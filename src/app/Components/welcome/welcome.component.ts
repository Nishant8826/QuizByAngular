import { Component } from '@angular/core';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent {
  startQuiz(name:string){
    console.log(name)
    localStorage.setItem('name',name)
  }
}
