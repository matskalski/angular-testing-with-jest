describe('template spec', () => {
  beforeEach(() => {
    //mockowanie requestów do bazy danych
    //metoda get
    cy.intercept(
      //request
      {
        method: 'GET',
        url: 'http://localhost:3004/todos'
      },
      //response
      {
        body: [
          {
            text: 'first todo',
            isCompleted: true,
            id: 1,
          },
          {
            text: 'second todo',
            isCompleted: false,
            id: 2,
          },
          {
            text: 'third todo',
            isCompleted: false,
            id: 3,
          },
        ]
      }
    )
      //metoda POST
      .intercept(//request
        {
          method: 'POST',
          url: 'http://localhost:3004/todos'
        },
        //response
        {
          body:
          {
            text: 'forth todo',
            isCompleted: false,
            id: 4,
          }
        })
      //metoda DELETE
      .intercept(//request
        {
          method: 'DELETE',
          url: 'http://localhost:3004/todos/1'
        },
        //response
        {
          body:
          { }
        })
      ;

    cy.visit('http://localhost:4200')
  });

  it('visit initial page', () => {
    cy.contains('todos')
  });

  it('renders 3 todos', () => {
    cy.get('[data-cy="todo"]').should('have.length', 3);

    cy.get('[data-cy="todoLabel"]').eq(0).should('contain.text', 'first todo');
    cy.get('[data-cy="todoLabel"]').eq(1).should('contain.text', 'second todo');
    cy.get('[data-cy="todoLabel"]').eq(2).should('contain.text', 'third todo');

    cy.get('[data-cy="todoCheckbox"]').eq(0).should('be.checked');
  });

  it('renders footer', () => {
    cy.get('[data-cy="todoCount"]').should('contain.text', '2 items left');
    cy.get('[data-cy="filterLink"]').eq(0)
      .should('contain.text', 'All')
      .should('have.class', 'selected');
    cy.get('[data-cy="filterLink"]').eq(1).should('contain.text', 'Active');
    cy.get('[data-cy="filterLink"]').eq(2).should('contain.text', 'Completed');
  });

  it('can change filter', () => {
    //symulacja kliknięcia drugiego elementu na liście
    cy.get('[data-cy="filterLink"]').eq(1).click()
    cy.get('[data-cy="filterLink"]').eq(1).should('contain.text', 'Active');
  })

  it('can add todo', () => {
    cy.get('[data-cy="newTodoInput"]')
      //symulacja wypełnienia inputu treścią 'forth todo' i wciśnięcia od razu enter
      .type('forth todo{enter}');

    cy.get('[data-cy="todoCount"]').should('contain.text', '3 items left');
    //sprawdzenie czy element został dodany do listy
    cy.get('[data-cy="todoLabel"]').eq(3).should('contain.text', 'forth todo');
  })

  it('can remove todo', ()=>{
    //wymuszenie kliknięcia na elemencie
    //potrzebne poniewaz element nie jest wyświetlany
    //a jest potrzeba zasymulowania tego zdarzenia
    cy.get('[data-cy="destroy"]').eq(0).click({force: true})
    cy.get('[data-cy="todo"]').should('have.length', 2)
  })
})
