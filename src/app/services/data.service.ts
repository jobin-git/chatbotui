import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private _chats:any = [] 
  private _chatFlow = {'scenario':'', 'getId':false, 'status':false}

  constructor() {
    this._chats.push({message: 'Hi, I am a vitual bot to assist you.', user: 'bot'},{message: 'How can I help?', user: 'bot'})
   }

  get chats(): any {
    return this._chats;
  }

  updateChatHistory(message:any){
    this._chats.push(message)
  }

  get chatFlow(): any {
    return this._chatFlow;
  }

  updateScenario(value:string){
    this._chatFlow.scenario = value
  }

  updateId(value:boolean){
    this._chatFlow.getId = value
  }

  updateStatus(value:boolean){
    this._chatFlow.status = value
  }
}
