import { faker } from '@faker-js/faker/locale/en'

const welcomeModal = {
  closeButton: '#welcome_modal .button--t1'
}

const navbar = {
  signUpButton: '[data-test=nav-reg-head]'
}

const registration = {
  emailInput: '[data-test=input-email]',
  checkboxInputTyC: '#registration_form_1 > fieldset.form__section.form__section--registration > div.form__input.form__input--checkbox.checkbox > div > label',
  radioButtonBonusInput: '[data-test=input-bonus]',
  selectCurrencyInput: '[data-test="input-currency"]',
  passwordInput: '[data-test=input-password]',
  passwordConfirmationInput: '[data-test=input-password_confirmation]',
  submitButton: '[data-test=control-submit]',
}

const errorMessages = {
  errorEmail: '[data-test$="error-email"]', 
  errorTyC: '[data-test=error-terms_and_conditions]',
  errorPromo: "#bonus-list div.form__error-message.error",
  errorPassword: '[data-test$="error-password"]',
  errorPasswordConfirmation: '[data-test$="error-password_confirmation"]'              
}

describe("User Registration", () => {
  beforeEach(() => {
    cy.visit('/', {failOnStatusCode: false})
    cy.get(welcomeModal.closeButton).should('be.visible')
    cy.get(welcomeModal.closeButton).click()
  })

  it("Should render sign up elements", () =>{
    cy.get(navbar.signUpButton).should('be.visible')
    cy.get(navbar.signUpButton).click()
    cy.get(registration.emailInput).should('be.enabled')
    cy.get(registration.checkboxInputTyC).should('be.visible')
    cy.get(registration.radioButtonBonusInput).should('be.enabled')
    cy.get(registration.selectCurrencyInput).should('be.enabled')
    cy.get(registration.passwordInput).should('be.enabled')
    cy.get(registration.passwordConfirmationInput).should('be.enabled')
    cy.get(registration.submitButton).should('be.visible')
  })

  it("should validate empty fields", () => {
    cy.visit('/user/registration', {failOnStatusCode: false})
    cy.get(registration.submitButton).click()
    cy.get('body').click({force: true});
    cy.get(errorMessages.errorEmail).should('contain', 'Email or phone number is required.')
    cy.get(errorMessages.errorTyC).should('contain', 'You have to accept our Terms and Conditions.')
    cy.get(errorMessages.errorPromo).should('contain', 'Promo code is invalid')
    cy.get(errorMessages.errorPassword).should('contain', 'Password cannot be blank.')
    cy.get(errorMessages.errorPasswordConfirmation).should('contain', 'Password confirmation cannot be blank.')

  })
  const registerUser = (email, password) => {
    email ||= faker.internet.email()
    password ||= faker.internet.password({prefix: 'Abc123@'})
    cy.get(registration.emailInput).clear()
    cy.get(registration.emailInput).type(email)
    cy.get(registration.checkboxInputTyC).click({force: true})
    cy.get(registration.radioButtonBonusInput).click({force: true})
    cy.get(registration.selectCurrencyInput).select('EUR', {force: true})
    cy.get(registration.passwordInput).clear()
    cy.get(registration.passwordInput).type(password)
    cy.get(registration.passwordConfirmationInput).clear()
    cy.get(registration.passwordConfirmationInput).type(password)
    cy.get(registration.submitButton).click()
    return { email, password }
  }
  it("should register user", () => {
    cy.visit('/user/registration', {failOnStatusCode: false})
    registerUser()
    cy.url().should('include', '/registrationSuccess')    
  })    
  
})
