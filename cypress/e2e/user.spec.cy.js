import userData from'../fixtures_users/users-data.json'

describe('Orange HRM Tests', () => {

  const selectorList = {
    usernameField: "[name='username']",
    passwordField: "[name='password']",
    loginButton: "[type='submit']",
    sectionTitleTopbar: ".oxd-topbar-header-breadcrumb-module",
    dashboardGrid: ".orangehrm-dashboard-grid",
    wrongCredentialAlert: "[role='alert']",
    MyInfoButton:'[href="/web/index.php/pim/viewMyDetails"]',
    firstNameField: "[name ='firstName']",
    lastNameField: "[name ='lastName']",
   genericField: ".oxd-input--active",
   dateField: "[placeholder ='yyyy-mm-dd']",
   dateCloseButton: ".--close",
   submitButton: "[type='submit']"
  }

  it.only('User Info Update - Success', () => {
    cy.fixture('users/user-data.json').then((userData) => {
      cy.visit('/auth/login')
      cy.get(selectorList.usernameField).type(userData.userSuccess.username)
      cy.get(selectorList.passwordField).type(userData.userSuccess.password)
      cy.get(selectorList.loginButton).click()
      cy.location('pathname').should('equal', '/web/index.php/dashboard/index')  
      cy.get(selectorList.dashboardGrid)
      cy.get(selectorList.MyInfoButton).click()
      cy.get(selectorList.firstNameField).type('FirstNameTest')
      cy.get(selectorList.lastNameField).type('lastNameTest')
      cy.get(selectorList.genericField).eq(3).clear().type('nickNameTest')
      cy.get(selectorList.genericField).eq(4).clear().type('Employee')
      cy.get(selectorList.genericField).eq(5).clear().type('OtherIdTest')
      cy.get(selectorList.genericField).eq(6).clear().type('DriversLicenseTest')
      cy.get(selectorList.genericField).eq(7).type('2025-03-10')
      cy.get(selectorList.dateCloseButton).click()
      cy.get(selectorList.genericField).eq(7).should('have.value', '2025-03-10')
      cy.get(selectorList.genericField).eq(8).clear().type('ssnNumberTest')
      cy.get(selectorList.genericField).eq(9).clear().type('sinNumberTest')
  })
  it('Login - Fail', () => {
    cy.fixture('users/user-data.json').then((userData) => {
      cy.visit('/auth/login')
      cy.get(selectorList.usernameField).type(userData.userFail.username)
      cy.get(selectorList.passwordField).type(userData.userFail.password)
      cy.get(selectorList.loginButton).click()
      cy.get(selectorList.wrongCredentialAlert)
    })
  })
  })

})
