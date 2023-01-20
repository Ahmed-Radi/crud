describe('Login form test', () => {
    beforeEach(() => {
        cy.visit('/');
    });

    it('Should submit the form with correct email and password', () => {
        cy.get('input[data-cy="login-email"]').type('b@gmail.com');
        cy.get('input[data-cy="login-password"]').type('123');
        cy.get('button[data-cy="login-submit"]').click();
        cy.url().should('include', 'home');
    });

    it('Should display an error message if email or password is incorrect', () => {
        cy.get('input[data-cy="login-email"]').type('b@gmail.com');
        cy.get('input[data-cy="login-password"]').type('wrongpassword');
        cy.get('button[data-cy="login-submit"]').click();
        cy.get('p[data-cy="login-error"]').should('be.visible').and('contain', 'Your email or password not correct.');
    });

    it('Should display an error message if email and password fields are empty', () => {
        cy.get('button[data-cy="login-submit"]').click();
        cy.get('p[data-cy="login-error"]').should('be.visible').and('contain', 'Please enter your email and password.');
    });
});
