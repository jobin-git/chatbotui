import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent {
  @ViewChild('scrollContainer') scrollContainer!: ElementRef;
  
  userInput = ""
  isScrollbarPresent = false;
  chats:any = [{message: 'How can I help you', user: 'bot'},{message: 'How can I help you', user: 'user'}]

  constructor(private elementRef: ElementRef){}

  ngDoCheck() {
    this.checkScrollbar();
    this.scrollToBottom();
  }

  addToChat(){
    const message = {message:this.userInput, user:'user'}
    this.chats.push(message)
    this.userInput = ""
    this.chats.push({message:'Please wait a minute...', user:'bot'})
    console.log(this.chats);
  }

  checkScrollbar() {
    const element = this.elementRef.nativeElement.querySelector('.user-chats');

    if (element.scrollHeight > element.clientHeight) {
      this.isScrollbarPresent = true;
      console.log('scrollbar present');
    } else {
      this.isScrollbarPresent = false;
      console.log('scrollbar not present');
    }
  }

  scrollToBottom() {
    try {
      this.scrollContainer.nativeElement.scrollTop = this.scrollContainer.nativeElement.scrollHeight;
    } catch (err) {
      console.error(err);
    }
  }
}
