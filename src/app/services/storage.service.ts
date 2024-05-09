import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  public setLocal(key: string, val: any) {
    try { localStorage.setItem(key, JSON.stringify(val))
    } catch(e) { console.log(e); }
  }

  public setSession(key: string, val: any) {
    try { sessionStorage.setItem(key, JSON.stringify(val))
    } catch(e) { console.log(e); }
  }

  public getLocal(key: string) {
    try { 
      let data = localStorage.getItem(key)
      return data && JSON.parse(data) || false
    } catch(e) { console.log(e); }
  }

  public getSession(key: string) {
    try {
      let data = sessionStorage.getItem(key)
      return data && JSON.parse(data) || false
    } catch(e) { console.log(e); }
  }

  public remove(key: string) {
    try {
      sessionStorage.removeItem(key)
      localStorage.removeItem(key)
    } catch(e) { console.log(e); }
  }

  public clear() {
    try {
      sessionStorage.clear()
      localStorage.clear()
    } catch (e) { console.log(e); }
  }

}
