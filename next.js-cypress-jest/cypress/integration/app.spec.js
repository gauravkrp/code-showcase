describe('Complete E2E test', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('Should display site h1 heading & Test users request', () => {
    cy.get('h1').should('contain', 'My Project Heading')
    cy.request("https://jsonplaceholder.typicode.com/users").then((response) => {
      expect(response.body).to.have.lengthOf(10)
    })
  })

  it('Click on form submit button to show form errors and on then focus to remove errors', () => {
    cy.get('.submit-btn').click()
    cy.get('[id="Glenna Reichert"]').should('be.visible')
    cy.get('[id="Glenna Reichert"]').click()
    cy.get('[data-cy="select-error"]').should('not.exist')
    cy.get('[name="title"]').focus()
    cy.get('[data-cy="title-error"]').should('not.exist')
    cy.get('[data-cy="body-error"]').should('exist')
    cy.get('.form-msg').should('not.exist')
  })

  it('Enter form fields and submit', () => {
    cy.get('[id="Ervin Howell"]').should('be.visible')
    cy.get('[id="Ervin Howell"]').click()
    cy.get('[data-cy="select-error"]').should('not.exist')
    cy.get('[name="title"]').type('Gaurav')
    cy.get('[name="body"]').type('Hello World!')
    cy.get('.submit-btn').click()
    cy.get('.form-msg').should('have.text', 'Form submitted successfully!')
  })
  
})
