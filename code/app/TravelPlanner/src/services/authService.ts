export async function login(email: string, password: string): Promise<any> {
    try {
      const response = await fetch('http://localhost:5000/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
  
      console.log('Response Status:', response.status);
      const responseBody = await response.json();
      console.log('Response Body:', responseBody);
  
      if (!response.ok) {
        throw new Error(`Login failed: ${responseBody.message || 'Unknown error'}`);
      }
  
      return responseBody;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }  

  export async function register(name: string, email: string, password: string): Promise<any> {
    try {
      const response = await fetch('http://localhost:5000/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, password })
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Registration failed');
      }
  
      return await response.json();
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  }
  
  