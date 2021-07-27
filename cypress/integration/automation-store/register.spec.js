/// <reference types="cypress">

var faker = require('faker')

describe("To test the registration page functionality",() =>{   

    beforeEach(() =>{
        cy.visit('/')
    });

it("should be able to register successfully",() =>{

    cy.get('li > a').contains('Login or register').click()
    cy.url().should('include','login')
    cy.get('button[title="Continue"]').click()

    cy.get('#AccountFrm_firstname').type(faker.name.firstName())
    cy.get('#AccountFrm_lastname').type(faker.name.lastName())
    cy.get('#AccountFrm_email').type(faker.internet.email())
    cy.get('#AccountFrm_address_1').type(faker.address.streetName())
    cy.get('#AccountFrm_city').type(faker.address.city())
    cy.get('#AccountFrm_zone_id').select('Derbyshire')
    cy.get('#AccountFrm_postcode').type(faker.address.zipCode())

    cy.get('#AccountFrm_loginname').type(faker.internet.userName())
    cy.get('#AccountFrm_password').type('Password1')
    cy.get('#AccountFrm_confirm').type('Password1')

    cy.get('#AccountFrm_newsletter0').click()
    cy.get('#AccountFrm_agree').click()

    cy.get('button[title="Continue"]').click()

    cy.url().should('include','account/success')
    cy.contains(' Your Account Has Been Created!').should('be.visible')
})

it("should see error when madatory fields are missing",() =>{

    cy.get('li > a').contains('Login or register').click()
    cy.url().should('include','login')
    cy.get('button[title="Continue"]').click()

    cy.get('#AccountFrm_firstname').type(faker.name.firstName())
    cy.get('#AccountFrm_lastname').type(faker.name.lastName())
    
    cy.get('#AccountFrm_city').type(faker.address.city())
    cy.get('#AccountFrm_zone_id').select('Derbyshire')
    
    cy.get('#AccountFrm_loginname').type(faker.internet.userName())
    cy.get('#AccountFrm_password').type('Password1')
    cy.get('#AccountFrm_confirm').type('Password1')

    cy.get('#AccountFrm_newsletter0').click()
    cy.get('#AccountFrm_agree').click()

    cy.get('button[title="Continue"]').click()

    cy.get('.alert').contains('Email Address does not appear to be valid!')
    cy.get('.alert').contains('Address 1 must be between 3 and 128 characters!')
    cy.get('.alert').contains('Zip/postal code must be between 3 and 10 characters!')    

})



})

