describe('template spec', () => {
  beforeEach(() => {
    //mockowanie requestów do bazy danych
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
  );

  cy.visit('http://localhost:4200')
  });

  it('visit initial page', () => {
    cy.contains('todos')
  });

  it('renders 3 todos', ()=>{
    cy.get('[data-cy="todo"]').should('have.length', 3);
    cy.get('[data-cy="todoLabel"]').eq(0).should('contain.text', 'first todo')
  });
})