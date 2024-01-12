import { ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
import { DataService } from '../services/data.service';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css',
})

export class ChatComponent {
  @ViewChild('scrollContainer') scrollContainer!: ElementRef;
  isLoading = false
  userInput = ""
  isScrollbarPresent = false;

  constructor(private elementRef: ElementRef, public dataService: DataService){}

  ngAfterViewChecked() {
    this.checkScrollbar();
    this.scrollToBottom();
  }

  addToChat(){
    if(this.userInput!=""){
      const message = {message:this.userInput, user:'user'}
      this.dataService.updateChatHistory(message)
      this.userInput = ""
      this.isLoading = true
      setTimeout(()=>{
        this.isLoading = false
        this.dataService.updateChatHistory({message:'Please wait a minute...', user:'bot'})
      },1000)
    }
  }

  checkScrollbar() {
    const element = this.elementRef.nativeElement.querySelector('.user-chats');

    if (element.scrollHeight > element.clientHeight) {
      this.isScrollbarPresent = true;
    } else {
      this.isScrollbarPresent = false;
    }
  }

  scrollToBottom() {
    try {
      this.scrollContainer.nativeElement.scrollTop = this.scrollContainer.nativeElement.scrollHeight+100;
    } catch (err) {
      console.error(err);
    }
  }
}
