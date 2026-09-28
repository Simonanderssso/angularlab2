// import { Component } from '@angular/core'; 
// Borttaget då den ej används och endast behövs i filer 
// som definierar en component med @Component
import { bootstrapApplication } from '@angular/platform-browser';
import { App } from './app/app';


bootstrapApplication(App).catch(err => console.error(err));
