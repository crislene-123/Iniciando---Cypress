import userData from '../fixtures users/user-data.json'

const elementsList = {
  usernameField: "[name='username']",
  passwordField: "[name='password']",
  submitButton: "[type='submit']"
}

describe('Login Tests', () => {
  it('Login - Success', () => {
    cy.visit('/auth/login')
    cy.get(elementsList.usernameField).type('Admin')
    cy.get(elementsList.passwordField).type('admin123')
    cy.get(elementsList.submitButton).click()
    cy.location('pathname').should('equal', '/web/index.php/dashboard/index')
    cy.get('.oxd-topbar-header-breadcrumb > .oxd-text').contains('Dashboard')
  })

  it('Login - Fail', () => {
    cy.visit('/auth/login')
    cy.get(elementsList.usernameField).type('Test')
    cy.get(elementsList.passwordField).type('Test')
    cy.get(elementsList.submitButton).click()
    cy.get("[role='alert']")
  })
})


