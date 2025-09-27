import { TestBed } from "@angular/core/testing";
import { ApiService } from "./api.service";
import { HttpTestingController, provideHttpClientTesting } from "@angular/common/http/testing";
import { HttpErrorResponse, provideHttpClient } from "@angular/common/http";
import { TagInterface } from "../types/tag.interface";

describe('ApiService', () => {
  let apiService: ApiService
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        //zależności zastąpujące HttpClienta
        //aby w trakcie testów nie wysyłać prawdziwych zapytań http a jedynie je mockować
        //wcześniej stosowany HttpClientTestingModule jest oznaczony jako deprecated
        ApiService,
        provideHttpClient(),
        provideHttpClientTesting()
      ],
      //imports: [HttpClientTestingModule]
    });

    apiService = TestBed.inject(ApiService);
    //przypisanie testowego controlera do zapytań http
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  //sprawdza czy nie pozostały jakieś niezakończone żądania http
  afterEach(() => {
    httpTestingController.verify();
  });


  it('creates service', () => {
    expect(apiService).toBeTruthy()
  })

  describe("getTags tests", () => {
    it('should return list of tags', () => {
      let tags: TagInterface[] | undefined

      //poniższy kod tworzy żądanie http
      apiService.getTags().subscribe(resp => {
        tags = resp
      });

      const req = httpTestingController.expectOne('http://localhost:3004/tags');
      //mockowanie odpowiedzi z http
      req.flush([{ id: '1', name: 'foo' }]);

      expect(tags).toEqual([{ id: '1', name: 'foo' }])
    })
  })

  describe('createTags tests', () => {
    it('should create a tag', () => {
      let tag: TagInterface | undefined

      apiService.createTag('foo').subscribe(resp => {
        tag = resp
      });

      const req = httpTestingController.expectOne('http://localhost:3004/tags');
      //mockowanie odpowiedzi z http
      req.flush({ id: '1', name: 'foo' });

      expect(tag).toEqual({ id: '1', name: 'foo' })
    })

    it('passes the correct body', ()=> {
        let tag: TagInterface | undefined

      apiService.createTag('foo').subscribe(resp => {
        tag = resp
      });

      const req = httpTestingController.expectOne('http://localhost:3004/tags');
      //mockowanie odpowiedzi z http
      req.flush({ id: '1', name: 'foo' });

      //weryfikacja typu wywołanej metody http
      expect(req.request.method).toEqual('POST')

      //weryfikacja zawartości body przekazanego do metody
      expect(req.request.body).toEqual({name: 'foo'})
    })

    //testowanie błędów z requestu http
    it('throws error if request failed', ()=>{
      let actualError: HttpErrorResponse | undefined;

      apiService.createTag('foo').subscribe({
        next: () => {
          fail('Success should not be called')
        },
        error: err => {
          actualError = err
        }
      })

      const req = httpTestingController.expectOne('http://localhost:3004/tags');
      //mockowanie odpowiedzi z http
      req.flush('Server error', {
        status: 422,
        statusText: 'Unprocessable entity'
      });

      expect(actualError!.status).toEqual(422)
      expect(actualError!.statusText).toEqual('Unprocessable entity')
    })
  });
})


