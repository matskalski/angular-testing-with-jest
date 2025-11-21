import { ResolveFn, Router } from '@angular/router';
import { ShopAttributeModel } from '../../models/shop-attribute/shop-attribute.model';
import { ShopAttributesService } from '../../shop-attributes/shopAttributesService/shop-attributes.service';
import { inject } from '@angular/core';
import { EMPTY, forkJoin, Observable } from 'rxjs';
import { AttributeTableModel } from '../../models/attribute-table.model';
import { map } from 'rxjs';

export const editShopAttributeResolver: ResolveFn<Observable<{
  shopAttribute: ShopAttributeModel;
  tables: AttributeTableModel[];
}> > = (route) => {
  const shopAttributesService: ShopAttributesService = inject(ShopAttributesService);
  const router = inject(Router)
  const attributeId = route.paramMap.get('id');

  if(!attributeId){
    router.navigateByUrl('/not-found');
    return EMPTY;
  };

  return forkJoin([
    shopAttributesService.getAttribute(attributeId),
    shopAttributesService.getColumnsWithAttributes()
  ])
  .pipe(
    map(result => {
      return {
        shopAttribute: result[0],
        tables: result[1]
      };
  }));
};
