import { Component } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent {
  
  ngOnInit() {
    // when the user clicks on the hamburger button, toggle between hiding and showing the sidebar
    $('#hamburgerButton').on('click', function () {
      if ($('#sidebar').width() == 0) {
        openNav();
      } else {
        closeNav();
      }
    });

    function openNav() {
      $('#sidebar').css('width', '250px');
      $('#hamburgerButton').removeClass('bi-list');
      $('#hamburgerButton').addClass('bi-x');
    }

    function closeNav() {
      $('#sidebar').css('width', '');
      $('#hamburgerButton').removeClass('bi-x');
      $('#hamburgerButton').addClass('bi-list');
    }    
  }
}
