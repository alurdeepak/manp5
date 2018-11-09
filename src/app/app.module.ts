import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AssetsComponent } from './assets/assets.component';
import { RouterModule, Routes } from '@angular/router';
import {FormsModule } from '@angular/forms';
import { GeneratorComponent } from './generator/generator.component';
import { TurbineInfoComponent } from './turbine-info/turbine-info.component';
import { HomeComponent } from './home/home.component';
import {GeneratorService} from './generator/services/generator.service';



const appRoutes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent },
  { path: 'generator', component: GeneratorComponent },
  { path: 'turbine', component: TurbineInfoComponent }

];


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AssetsComponent,
    GeneratorComponent,
    TurbineInfoComponent,
    HomeComponent


  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [GeneratorService],
  bootstrap: [AppComponent]
})
export class AppModule { }
