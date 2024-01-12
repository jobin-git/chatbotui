import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private _chats:any = [] 

  constructor() {
    this._chats.push({message: 'Hi, I am a vitual assistant to assist you.', user: 'bot'},{message: 'How can I help?', user: 'bot'})
   }

  get chats(): any {
    return this._chats;
  }

  updateChatHistory(message:any){
    this._chats.push(message)
  }
}
