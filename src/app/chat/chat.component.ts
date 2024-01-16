import { ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
import { DataService } from '../services/data.service';
import { ApiService } from '../services/api.service';
import { timeInterval, timeout } from 'rxjs';


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

  constructor(private elementRef: ElementRef, public dataService: DataService, private apiService: ApiService){}

  ngAfterViewChecked() {
    this.checkScrollbar();
    this.scrollToBottom();
  }

  addToChat(){
    if(this.userInput!=""){
      this.dataService.updateChatHistory({message: this.userInput, user:'user'})
      this.isLoading = true
      if(this.dataService.chatFlow.scenario=="" && this.dataService.chatFlow.status==false){
        const data = {"key":this.userInput}
        this.apiService.predictScenario(data).subscribe((response:any)=>{
          console.log(response);
          this.dataService.updateScenario(response.label)
          this.isLoading = false
          if(this.dataService.chatFlow.scenario=="order tracking"){
            this.dataService.updateChatHistory({message:'Do you want to track you order? Please enter the order id.', user:'bot'})
          } else if (this.dataService.chatFlow.scenario=="order cancellation"){
            this.dataService.updateChatHistory({message:'Do you want to cancel you order? Please enter the order id.', user:'bot'})
          } else if(this.dataService.chatFlow.scenario=="payment issue"){
            this.dataService.updateChatHistory({message:'Are you facing a payment issue? Sorry for the inconvenience you have faced. I will inform your issue with our executives and they will contact you within 10 minutes', user:'bot'})
            this.dataService.updateChatHistory({message:'Thank you for contacting us.', user:'bot'})
            this.dataService.updateScenario("")
            this.dataService.updateId(false)
            this.dataService.updateStatus(false)
          }else if(this.dataService.chatFlow.scenario=="initial greetings"){
            this.dataService.updateChatHistory({message:'Hi, How can I help you', user:'bot'})
            this.dataService.updateScenario("")
          } else if(this.dataService.chatFlow.scenario=="rephrase"){
            this.dataService.updateChatHistory({message:'I didnt got you, please rephrase the sentence.', user:'bot'})
            this.dataService.updateScenario("")
          }
        })
      } else if(this.dataService.chatFlow.scenario=="order tracking" && this.dataService.chatFlow.getId==false  && this.dataService.chatFlow.status==false){
          console.log("order tracking");
          let numericInputValue: number = +this.userInput;
          if(!isNaN(numericInputValue)){
            const response = {'current_location':'ernakulam'}
            //get order data
            setTimeout(()=>{
              this.isLoading = false
              this.dataService.updateChatHistory({message:'your order is now at: '+response.current_location, user:'bot'})
              this.dataService.updateChatHistory({message:'Thank you for contacting us.', user:'bot'})
            },1000)
            this.dataService.updateScenario("")
            this.dataService.updateId(false)
            this.dataService.updateStatus(false)
          }else {
            this.dataService.updateChatHistory({message:'please enter a valid order id', user:'bot'})
          }
      } 
      else if(this.dataService.chatFlow.scenario=="order cancellation" && this.dataService.chatFlow.getId==false && this.dataService.chatFlow.status==false){
        console.log("entered into cancellation");
        let numericInputValue: number = +this.userInput;
        if(!isNaN(numericInputValue)){
          //get order data
          setTimeout(()=>{
            this.isLoading = false
            this.dataService.updateChatHistory({message:'Your order with id '+this.userInput+' is cancelled', user:'bot'})
            this.dataService.updateChatHistory({message:'Thank you for contacting us.', user:'bot'})
          },1000)
          this.dataService.updateScenario("")
          this.dataService.updateId(false)
          this.dataService.updateStatus(false)
        }else {
          this.isLoading = false
          this.dataService.updateChatHistory({message:'please enter a valid order id', user:'bot'})
        }
      }
      this.userInput = ""
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
