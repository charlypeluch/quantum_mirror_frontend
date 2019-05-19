import { Injectable } from '@angular/core';

@Injectable()
export class ThemeService {
  currentTheme!: string;
  supportedThemes!: string[];

  constructor() { }

  init(currentTheme: string, supportedThemes: string[]) {
    this.currentTheme = currentTheme;
    this.supportedThemes = supportedThemes;
  }

  setTheme(theme: string) {
    if (this.currentTheme != theme) {
      document.body.classList.forEach(function(t) {
        document.body.classList.remove(t);
      });

      document.body.classList.add(theme);
      this.currentTheme = theme;
    }
  }

  getTheme(): string {
    return this.currentTheme;
  }

  getSupportedThemes(): string[] {
    return this.supportedThemes;
  }
}
