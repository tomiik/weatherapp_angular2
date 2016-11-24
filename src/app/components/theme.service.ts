import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ENUM_THEME } from './enum';

@Injectable()
export class ThemeService {
  public fontColor: BehaviorSubject<any> = new BehaviorSubject([]);
  public bgColor: BehaviorSubject<any> = new BehaviorSubject([]);
  public selectedTheme: BehaviorSubject<any> = new BehaviorSubject([]);
  public selectedSize: BehaviorSubject<any> = new BehaviorSubject([]);
  constructor() {
    this.selectedTheme.next('theme-normal');
    this.selectedSize.next('size-normal');
  }
  changeTheme() {
    switch (this.selectedTheme.getValue()) {
      case 'theme-normal':
        this.selectedTheme.next('theme-dark');
        break;
      case 'theme-dark':
        this.selectedTheme.next('theme-warm');
        break;
      case 'theme-warm':
        this.selectedTheme.next('theme-cold');
        break;
      case 'theme-cold':
        this.selectedTheme.next('theme-normal');
        break;
      }
    }
  changeSize() {
    switch (this.selectedSize.getValue()) {
      case 'size-normal':
        this.selectedSize.next('size-mini');
        break;
      case 'size-mini':
        this.selectedSize.next('size-normal');
        break;
      //case 'size-tiny':
      //  this.selectedSize.next('size-normal');
      //  break;
      }
    }
  }
