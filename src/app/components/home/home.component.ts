import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  @ViewChild('anasayfaSection') anasayfaSection!: ElementRef;
  @ViewChild('yazilimlarSection') yazilimlarSection!: ElementRef;
  @ViewChild('sertifikalarSection') sertifikalarSection!: ElementRef;
  @ViewChild('basarilarSection') basarilarSection!: ElementRef;
  @ViewChild('hakkimdaSection') hakkimdaSection!: ElementRef;
  @ViewChild('iletisimSection') iletisimSection!: ElementRef;

  @HostListener('window:scroll', [])

  selectedMenu = 'anasayfa';
  constructor(private elementRef: ElementRef) {

  }


  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if (this.isOpen && !(event.target as HTMLElement).closest('.navbar')) {
      this.isOpen = false;
    }
  }

  @HostListener('window:scroll', ['$event'])
  checkScroll() {

    if (this.isElementInViewport(this.anasayfaSection.nativeElement)) {
      this.selectedMenu = 'anasayfa';
    }
    else if (this.isElementInViewport(this.yazilimlarSection.nativeElement)) {
      this.selectedMenu = 'yazilimlar';
    }
    else if (this.isElementInViewport(this.sertifikalarSection.nativeElement)) {
      this.selectedMenu = 'sertifikalar';
    }
    else if (this.isElementInViewport(this.basarilarSection.nativeElement)) {
      this.selectedMenu = 'basarilar';
    }
    else if (this.isElementInViewport(this.hakkimdaSection.nativeElement)) {
      this.selectedMenu = 'hakkimda';
    }
    else if (this.isElementInViewport(this.iletisimSection.nativeElement)) {
      this.selectedMenu = 'iletisim';
    }
    else {
    }
  }

  isElementInViewport(element: any) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }

  goToSection(sectionId: string) {
    this.isOpen = false;
    this.selectedMenu = sectionId;
    const section = this.elementRef.nativeElement.querySelector(`#${sectionId}`);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  }
  scrollToTop() {
    this.selectedMenu = 'anasayfa';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  isOpen: boolean = false;

  toggleMenu() {
    this.isOpen = !this.isOpen;
  }





}
