// apiDocs.js
const apiEndPoints = require('./apiEndPoints');

const generateApiDocs = () => {
  // Determine if the imported data is already grouped or needs grouping
  let groupedEndpoints;
  
  // Check if apiEndPoints is an object with arrays of endpoints
  if (typeof apiEndPoints === 'object' && !Array.isArray(apiEndPoints) && 
      Object.values(apiEndPoints).some(value => Array.isArray(value))) {
    // Data is already grouped
    console.log("Using pre-organized endpoint groups");
    groupedEndpoints = apiEndPoints;
  } else {
    // Data needs to be grouped - assume it's an array of endpoints
    console.log("Grouping endpoints automatically based on path patterns");
    groupedEndpoints = groupEndpoints(apiEndPoints);
  }
  
  // Group endpoints by category if needed
  function groupEndpoints(endpoints) {
    const groups = {
      'Users': [],
      'Players': [],
      'Authentication': [],
      'Organizations': [],
      'Systems': []
    };

    endpoints.forEach(endpoint => {
      if (endpoint.path.includes('/api/users')) {
        groups.Users.push(endpoint);
      } else if (endpoint.path.includes('/players')) {
        groups.Players.push(endpoint);
      } else if (endpoint.path.includes('/auth')) {
        groups.Authentication.push(endpoint);
      } else if (endpoint.path.includes('/api/organizations')) {
        groups.Organizations.push(endpoint);
      } else {
        groups.Systems.push(endpoint);
      }
    });

    // Remove empty groups
    Object.keys(groups).forEach(key => {
      if (groups[key].length === 0) {
        delete groups[key];
      }
    });

    return groups;
  }

  // Format each endpoint for Markdown documentation
  const formatEndpoint = (endpoint) => {
    return `
    ## ${endpoint.method} ${endpoint.path}
    
    ${endpoint.description}
    `;
  };

  // Generate Markdown documentation
  const generateMarkdownDocs = () => {
    let documentation = '# API Documentation\n\n';
    
    // Process each group of endpoints
    Object.keys(groupedEndpoints).forEach(groupName => {
      documentation += `\n## ${groupName}\n`;
      
      // Add each endpoint in the current group
      groupedEndpoints[groupName].forEach(endpoint => {
        documentation += formatEndpoint(endpoint);
      });
    });
    
    return documentation;
  };

  // Generate HTML documentation
  const generateHTMLDocs = () => {
    const template = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Sports Management API Documentation</title>
            <style>
                :root {
                    --primary-color: #2563eb;
                    --background-color: #f8fafc;
                    --card-background: #ffffff;
                    --text-color: #1e293b;
                    --border-color: #e2e8f0;
                }
                
                body {
                    font-family: system-ui, -apple-system, sans-serif;
                    line-height: 1.6;
                    max-width: 1200px;
                    margin: 0 auto;
                    padding: 20px;
                    background-color: var(--background-color);
                    color: var(--text-color);
                }
                
                .header {
                    background-color: var(--card-background);
                    padding: 2rem;
                    border-radius: 8px;
                    margin-bottom: 2rem;
                    box-shadow: 0 1px 3px rgba(0,0,0,0.1);
                }
                
                .section {
                    background-color: var(--card-background);
                    padding: 2rem;
                    border-radius: 8px;
                    margin-bottom: 2rem;
                    box-shadow: 0 1px 3px rgba(0,0,0,0.1);
                }
                
                .category {
                    margin-bottom: 3rem;
                }
                
                .category-title {
                    color: var(--primary-color);
                    font-size: 1.5rem;
                    margin-bottom: 1rem;
                    padding-bottom: 0.5rem;
                    border-bottom: 2px solid var(--border-color);
                }
                
                table {
                    width: 100%;
                    border-collapse: collapse;
                    margin-bottom: 1rem;
                }
                
                th, td {
                    padding: 1rem;
                    text-align: left;
                    border-bottom: 1px solid var(--border-color);
                }
                
                th {
                    background-color: var(--background-color);
                    font-weight: 600;
                }
                
                tr:hover {
                    background-color: var(--background-color);
                }
                
                .method {
                    font-weight: 600;
                    padding: 0.25rem 0.75rem;
                    border-radius: 4px;
                    width: 80px;
                    display: inline-block;
                    text-align: center;
                    font-size: 0.875rem;
                }
                
                .GET { background-color: #dbeafe; color: #1e40af; }
                .POST { background-color: #dcfce7; color: #166534; }
                .PUT { background-color: #fff7ed; color: #9a3412; }
                .DELETE { background-color: #fee2e2; color: #991b1b; }
                
                .path-param {
                    color: var(--primary-color);
                    font-family: monospace;
                }
                
                @media (max-width: 768px) {
                    body { padding: 10px; }
                    .method { width: auto; }
                    th, td { padding: 0.5rem; }
                }
            </style>
        </head>
        <body>
            <div class="header">
                <h1>Sports Management API Documentation</h1>
                <p>API Version: 1.0</p>
                <p>Environment: ${process.env.NODE_ENV || 'development'}</p>
            </div>
            
            ${Object.entries(groupedEndpoints).map(([category, endpoints]) => `
                <div class="section">
                    <div class="category">
                        <h2 class="category-title">${category}</h2>
                        <table>
                            <thead>
                                <tr>
                                    <th>Method</th>
                                    <th>Path</th>
                                    <th>Description</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${endpoints.map(endpoint => `
                                    <tr>
                                        <td><span class="method ${endpoint.method}">${endpoint.method}</span></td>
                                        <td><code class="path-param">${endpoint.path}</code></td>
                                        <td>${endpoint.description}</td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                    </div>
                </div>
            `).join('')}
        </body>
        </html>
    `;

    return template;
  };

  // By default, return HTML documentation
  // You could modify this to return either format based on an option parameter
  return generateHTMLDocs();
};

module.exports = generateApiDocs;