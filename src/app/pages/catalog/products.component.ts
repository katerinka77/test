import { Component } from '@angular/core';
import { CatalogComponent } from '../../components/catalog/catalog.component';
import { CatalogService } from '../../services/catalog.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CatalogComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
  providers: [CatalogService]
})
export class ProductComponent {

}
