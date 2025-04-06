describe('Authentication', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should allow a user to log in', () => {
    // Arrange
    const email = 'test@example.com'
    const password = 'password123'

    // Act
    cy.login(email, password)

    // Assert
    cy.url().should('include', '/dashboard')
    cy.get('[data-testid="user-menu"]').should('be.visible')
  })

  it('should allow a user to log out', () => {
    // Arrange
    const email = 'test@example.com'
    const password = 'password123'
    cy.login(email, password)

    // Act
    cy.logout()

    // Assert
    cy.url().should('include', '/')
    cy.get('[data-testid="login-button"]').should('be.visible')
  })

  it('should show error message for invalid credentials', () => {
    // Arrange
    const email = 'invalid@example.com'
    const password = 'wrongpassword'

    // Act
    cy.visit('/login')
    cy.get('[data-testid="email-input"]').type(email)
    cy.get('[data-testid="password-input"]').type(password)
    cy.get('[data-testid="login-button"]').click()

    // Assert
    cy.get('[data-testid="error-message"]')
      .should('be.visible')
      .and('contain', 'Invalid email or password')
  })
}) 