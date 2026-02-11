import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, convertToParamMap, provideRouter, ResolveFn, Router, RouterStateSnapshot } from '@angular/router';
import { editShopAttributeResolver } from './edit-shop-attribute-resolver';
import { Observable, of } from 'rxjs';
import { ShopAttributeModel } from '../../models/shop-attribute/shop-attribute.model';
import { AttributeTableModel } from '../../models/attribute-table.model';
import { ShopAttributesService } from '../../shop-attributes/shopAttributesService/shop-attributes.service';
import { Component } from '@angular/core';

describe('editShopAttributeResolver', () => {
  const executeResolver: ResolveFn<Observable<{
    shopAttribute: ShopAttributeModel;
    tables: AttributeTableModel[];
  }>> = (...resolverParameters) =>
      TestBed.runInInjectionContext(() => editShopAttributeResolver(...resolverParameters));

  let router: Router;

  const shopAttributesServiceMock = {
    getAttribute: jest.fn()
      .mockImplementation(() => {
        const res: ShopAttributeModel = {
          id: 'id',
          name: 'name',
          tableName: 'tableName',
          columnName: 'columnName',
          canBeEdited: true,
          version: 1
        };

        return of(res);
      }),
    getColumnsWithAttributes: jest.fn()
      .mockImplementation(() => {
        const res: AttributeTableModel[] = [{
          tableName: 'tableName',
          columns: ['column1', 'column2', 'column3']
        }];

        return of(res);
      })
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: ShopAttributesService, useValue: shopAttributesServiceMock },
        //provider dla ActivatedRoute
        provideRouter([
          { path: 'not-found', component: DummyComponent },
        ])
      ]
    });

    router = TestBed.inject(Router)
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });

  it('when id is passed then should return array of data', () => {
    const ars = {paramMap: convertToParamMap({'id': '123'})} as ActivatedRouteSnapshot;
    const rrs = {} as RouterStateSnapshot

    const resultObs = executeResolver(ars, rrs) as Observable<{
      shopAttribute: ShopAttributeModel;
      tables: AttributeTableModel[];
    }>

    let result: {
      shopAttribute: ShopAttributeModel;
      tables: AttributeTableModel[];
    } = {
      shopAttribute: {} as ShopAttributeModel,
      tables: []
    }

    resultObs.subscribe(res => result = res);

    expect(result.shopAttribute.id).toBe('id');
    expect(result.shopAttribute.name).toBe('name');
    expect(result.shopAttribute.tableName).toBe('tableName');
    expect(result.shopAttribute.columnName).toBe('columnName');
    expect(result.shopAttribute.canBeEdited).toBe(true);
    expect(result.shopAttribute.version).toBe(1);

    expect(result.tables.length).toBe(1);
    expect(result.tables[0].tableName).toBe('tableName')
    expect(result.tables[0].columns).toContain('column1')
    expect(result.tables[0].columns).toContain('column2')
    expect(result.tables[0].columns).toContain('column3')
  })

  it('when id is not passed then should return empty data and redirect to not-found url', () => {
    jest.spyOn(router, 'navigateByUrl')

    const ars = {paramMap: convertToParamMap({ })} as ActivatedRouteSnapshot;
    const rrs = {} as RouterStateSnapshot

    const resultObs = executeResolver(ars, rrs) as Observable<{
      shopAttribute: ShopAttributeModel;
      tables: AttributeTableModel[];
    }>

    let result
    resultObs.subscribe(res => result = res);

    expect(result).toBeFalsy();
    expect(router.navigateByUrl).toHaveBeenCalledWith('/not-found')
  })
});

@Component({
  selector: 'sm-dummy',
  template: '<h1>Dummy component</h1>',
})
export class DummyComponent { }