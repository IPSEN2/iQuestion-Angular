import {NgModule} from "@angular/core";
import {ToastsContainer} from "./toast/toasts-container.component";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {CommonModule} from "@angular/common";
import {NavigationComponent} from "../navigation/navigation.component";
import {FooterComponent} from "../footer/footer.component";
import {HttpClientModule} from "@angular/common/http";
import {FilterPipe} from "../pipe/filter.pipe";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";

@NgModule({
  declarations: [
    NavigationComponent,
    FooterComponent,
    FilterPipe
  ],
  imports: [
    CommonModule,
    NgbModule,
    ToastsContainer,
    HttpClientModule,
    RouterModule
  ],
  exports: [
    ToastsContainer,
    CommonModule,
    NgbModule,
    NavigationComponent,
    FooterComponent,
    FilterPipe,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class SharedModule {

}
