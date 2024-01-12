import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'chatbotui';
  chatOpen = false

  openChat(){
    this.chatOpen = !this.chatOpen
  }
}
