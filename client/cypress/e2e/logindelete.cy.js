describe('Login Tests', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3001/login');
    });

    it('successfully logs in with correct credentials', () => {
        cy.get('input#username').type('testUser');
        cy.get('input#password').type('testPass');
        cy.get('.login-button').click();
        cy.url().should('not.include', '/login');
    });

    it('displays an error for missing username', () => {
        cy.get('input#password').type('testPass');
        cy.get('.login-button').click();

        cy.get('.error-message').should('contain', 'Missing username');
    });

    it('displays an error for missing password', () => {
        cy.get('input#username').type('validUsername');
        cy.get('.login-button').click();

        cy.get('.error-message').should('contain', 'Missing password');
    });

    it('displays an error for non-existent user', () => {
        cy.get('input#username').type('sdfsdfsdf');
        cy.get('input#password').type('sdfsddfs');
        cy.get('.login-button').click();

        cy.get('.error-message').should('contain', 'User does not exist');
    });

    it('locks the account after 3 failed login attempts', () => {
        const tryLogin = (username, password) => {
            cy.get('input#username').clear().type(username);
            cy.get('input#password').clear().type(password);
            cy.get('.login-button').click();
            cy.get('.error-message').should('contain', 'Password does not match our records');
        };

        // Simulate 3 failed login attempts
        cy.visit('http://localhost:3001/login');
        tryLogin('testUser', 'testsdfsdf');

        cy.visit('http://localhost:3001/login');
        tryLogin('testUser', 'testsdfsdf');

        cy.visit('http://localhost:3001/login');
        tryLogin('testUser', 'testsdfsdf');

        // Attempt to log in again, should be locked now
        cy.visit('http://localhost:3001/login');
        cy.get('input#username').type('testUser');
        cy.get('input#password').type('testPass');
        cy.get('.login-button').click();
        cy.get('.error-message').should('contain', 'Account is locked for 2 minutes');
    });

    // Optional: test that the user can log in again after 10 minutes
    // Note: This test will take at least 10 minutes to run and might not be suitable for regular test runs
    it('allows the user to log in after 2 minutes', () => {
        // Wait for 10 minutes (600000 milliseconds)
        cy.wait(120000);

        // Now attempt to log in with the correct credentials
        cy.get('input#username').type('testUser');
        cy.get('input#password').type('testPass');
        cy.get('.login-button').click();

        // Assuming successful login redirects to another page
        cy.url().should('not.include', '/login');
    });
});

describe('Delete Post Test', () => {
    it('logs in and deletes a post, then checks if it is removed from the activity feed', () => {
        // Step 1: Log in
        cy.visit('http://localhost:3001/login');
        cy.get('input#username').type('testUser');
        cy.get('input#password').type('testPass');
        cy.get('.login-button').click();

        // Assuming successful login redirects to the activity feed
        cy.url().should('include', '/');

        // Step 2: Delete a Post
        // Navigate to a specific post
        // Replace 'postId' with the id of the post you want to delete
        cy.visit('http://localhost:3001/post/6556a7b20c6a6b729de8d7b8');

        // Click the delete button
        // This assumes that the delete button is available and the user has permissions
        cy.get('.deleteButton button').click();

        // Assuming deleting a post redirects back to the activity feed
        cy.url().should('include', '/');

        // Step 3: Check if the Post is Removed from the Activity Feed
        // We will wait for a brief moment to ensure the page is updated
        cy.wait(1000); // Adjust the waiting time as per the application's response time

        // Now we check if the post is no longer present in the activity feed
        // This can be done by checking for a unique element of the post like title or id
        // Replace 'uniqueElement' with a selector that uniquely identifies the post
        cy.get('uniqueElement').should('not.exist');
    });

    it('does not show delete button on others\' posts', () => {
        // Log in as a user
        cy.visit('http://localhost:3001/login');
        cy.get('input#username').type('testUser');
        cy.get('input#password').type('testPass');
        cy.get('.login-button').click();

        // Navigate to a post not created by 'testUser'
        // Replace the below command with the actual way to navigate to such a post
        cy.visit('http://localhost:3001/post/6546a03883f3ecca248c99f7');

        // Verify that the delete button is not present
        cy.get('.deleteButton button').should('not.exist');
    });
});