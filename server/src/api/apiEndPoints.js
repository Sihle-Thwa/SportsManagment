// apiEndPoints.js

const apiEndPoints = {
    Users: [
        {
            method: 'POST',
            path: '/api/users/register',
            description: 'Register a new user. Requires username, email, and password.',
        },
        {
            method: 'POST',
            path: '/api/users/login',
            description: 'Authenticate a user and get tokens. Requires username and password.',
        },
        {
            method: 'POST',
            path: '/api/users/logout',
            description: 'Logout user and invalidate refresh token. Requires authentication.',
        },
        {
            method: 'GET',
            path: '/api/users',
            description: 'Get all users. Requires admin role.',
        },
        {
            method: 'GET',
            path: '/api/users/:id',
            description: 'Get a specific user by ID. Requires admin role.',
          
        },

        {
            method: 'PUT',
            path: '/api/users/:id',
            description: 'Update user details. Requires admin role.',
           
        },
        {
            method: 'DELETE',
            path: '/api/users/:id',
            description: 'Delete a user. Requires admin role.',
        },
    ],
    Players: [
        {
            method: 'POST',
            path: '/api/players/register',
            description: 'Register a new player. Requires name, surname, email, and password.',
        },
        {
            method: 'POST',
            path: '/api/players/login',
            description: 'Authenticate a player and get tokens. Requires email and password.',
        },
        {
            method: 'POST',
            path: '/api/players/logout',
            description: 'Logout player and invalidate refresh token. Requires authentication.',
        },
        {
            method: 'POST',
            path:'/api/players/:id',
            description: 'Update player details. Requires player role.',
        },
      
    ],
    Authentication: [
        {
            method: 'POST',
            path: '/api/auth/register',
            description: 'Register a new user. Requires username, email, and password.',
        },
        {
            method: 'POST',
            path: '/api/auth/login',
            description: 'Authenticate a user and get tokens. Requires username and password.',
        },
        {
            method: 'POST',
            path: '/api/auth/logout',
            description: 'Logout user and invalidate refresh token. Requires authentication.',
        },
        {
            method: 'POST',
            path: '/api/auth/refresh-token',
            description: 'Get a new access token using refresh token.',
        },
    ],
    Organizations: [
        {
            method: 'POST',
            path: '/api/organizations',
            description: 'Create a new organization. Requires authentication.',
        },
        {
            method: 'GET',
            path: '/api/organizations/user',
            description: 'Get all organizations for the authenticated user.',
        },
        {
            method: 'GET',
            path: '/api/organizations/:id',
            description: 'Get organization details by ID. Requires organization membership.',
        },
        {
            method: 'GET',
            path: '/api/organizations/:id/users',
            description: 'Get all users in an organization. Requires admin role.',
        },
        {
            method: 'PUT',
            path: '/api/organizations/:id',
            description: 'Update organization details. Requires admin role.',
        },
        {
            method: 'DELETE',
            path: '/api/organizations/:id',
            description: 'Delete an organization. Requires admin role.',
        },
        {
            method: 'POST',
            path: '/api/organizations/:organizationId/users',
            description: 'Add a user to an organization. Requires admin role.',
        },
        {
            method: 'DELETE',
            path: '/api/organizations/:organizationId/users/:userId',
            description: 'Remove a user from an organization. Requires admin role.',
        },
    ],
    Systems: [
        {
            method: 'GET',
            path: '/',
            description: 'Welcome message and API information.',
        },
        {
            method: 'GET',
            path: '/health',
            description: 'System health check status.',
        },
        {
            method: 'GET',
            path: '/api-docs',
            description: 'Interactive API documentation.',
        },
    ],
};

module.exports = apiEndPoints;