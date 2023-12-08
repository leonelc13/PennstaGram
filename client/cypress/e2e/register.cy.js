// eslint-disable-next-line no-undef
describe('Register flow', () => {
  // eslint-disable-next-line no-undef
  beforeEach(() => {
    cy.visit('http://localhost:3001/register')
  });

  it('Should display register page', () => {
    cy.get('.register-container').should('exist');
});

  it('Register page renders correctly', () => {
    cy.get('.btn-edits').contains('Sign Up');
    cy.get('.title-text').contains('Sign Up');
    cy.get('#username').should('have.value', '');
    cy.get('#password').should('have.value', '');
      cy.get('.header-text').contains('PennConnect');
      cy.get('#user2').contains("Pick a Username");
      cy.get('#password2').contains("Pick a Password");
    });
  
    it('Testing existing user inputs', () => {
      cy.get('#username').type('testUser');
      cy.get('#password').type('testPass');
      cy.get('.btn-edits').click()
      cy.get('.error-text').should('contain', 'User already exists')
    })
  
    it('Testing missing username', () => {
      cy.get('#password').type('incorrectpassword');
      cy.get('.btn-edits').click()
      cy.get('.error-text').should('contain', 'Missing username')
    })
  
    it('Testing missing password', () => {
      cy.get('#username').type('testuser');
      cy.get('.btn-edits').click()
      cy.get('.error-text').should('contain', 'Missing password')
    })
  
    it('Testing missing password', () => {
      cy.get('.btn-edits').click()
      cy.get('.error-text').should('contain', 'Missing username and password')
    })
  
    it('Testing clicking sign in', () => {
      cy.get('.url-text').click()
      cy.url().should('include', '/login')
    })

    
    it('Successful registration navigates to login', () => {
      cy.get('#username').type('newUser');
      cy.get('#password').type('newPassword');
      cy.get('.btn-edits').click();
      cy.url().should('include', '/login');
    });
  
  })