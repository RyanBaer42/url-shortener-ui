describe('empty spec', () => {
  beforeEach(() => {
    cy.intercept('GET', 'http://localhost:3001/api/v1/urls', { fixture: 'testUrls.json' })
    cy.intercept('POST', 'http://localhost:3001/api/v1/urls', {
      statusCode: 201,
      body: {
        "id": 2,
        "long_url": "https://www.nytimes.com/2023/03/07/us/politics/debt-default-economy.html",
        "short_url": "http://localhost:3001/useshorturl/2",
        "title": "Stub Link"
      }
    });
    cy.visit('http://localhost:3000/')
  })
  it('should have access to the url website', () => {
    cy.visit('http://localhost:3000/')
  })
  it('When a user visits the page, they can view the page title and the existing shortened URLs', () => {
    cy.get('.website-name')
      .should('be.visible')
      .contains('URL Shortener')
    cy.get('.url')
      .should('be.visible')
  })
  it('When a user visits the page, they can view the Form with the proper inputs', () => {
    cy.get('form')
      .find('.form-title')
      .should('be.visible')
    cy.get('form')
      .find('.form-long_url')
      .should('be.visible')
    cy.get('form')
      .find('button')
      .should('be.visible')
  })
  it('When a user fills out the form, the information is reflected in the input fields', () => {
    const titleValue = 'NY Times Link';
    const urlValue = 'https://www.nytimes.com/2023/03/07/us/politics/nord-stream-pipeline-sabotage-ukraine.html'
    cy.get('form')
      .find('.form-title')
      .type(titleValue)
      .should('have.value', titleValue);
    cy.get('form')
      .find('.form-long_url')
      .type(urlValue)
      .should('have.value', urlValue);
  })
  it('When a user fills out and submits the form, the new shortened URL is rendered', () => {
    cy.get('form')
      .find('.form-title')
      .type('Cool Link')
    cy.get('form')
      .find('.form-long_url')
      .type('https://www.nytimes.com/2023/03/07/us/politics/debt-default-economy.html')
    cy.get('form')
      .find('button')
      .click()
    cy.get('[id=2]')
      .should('be.visible')
      .find('h3')
      .contains('Stub Link')
    cy.get('[id=2]')
      .find('p')
      .contains('https://www.nytimes.com/2023/03/07/us/politics/debt-default-economy.html')
      cy.get('[id=2]')
      .find('a')
      .contains('http://localhost:3001/useshorturl/2')
  })
})