import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
// Importez ici d'autres modules que vous voulez partager

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports: [
    CommonModule,
    FormsModule
    // Exportez ici d'autres modules que vous voulez partager
  ]
})
export class SharedModule { }
