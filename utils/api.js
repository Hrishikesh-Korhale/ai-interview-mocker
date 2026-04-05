// API client for the FastAPI backend
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

class ApiClient {
  constructor() {
    this.baseURL = "http://localhost:8000";
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
    };

    // Add auth token if available
    const token = this.getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    try {
      const response = await fetch(url, config);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error("API request failed:", error);
      throw error;
    }
  }

  getToken() {
    if (typeof window !== "undefined") {
      return localStorage.getItem("access_token");
    }
    return null;
  }

  setToken(token) {
    if (typeof window !== "undefined") {
      localStorage.setItem("access_token", token);
    }
  }

  removeToken() {
    if (typeof window !== "undefined") {
      localStorage.removeItem("access_token");
    }
  }

  // Auth endpoints
  async register(userData) {
    const response = await this.request("/auth/register", {
      method: "POST",
      body: JSON.stringify(userData),
    });
    return response;
  }

  async login(credentials) {
    const response = await this.request("/auth/login", {
      method: "POST",
      body: JSON.stringify(credentials),
    });
    this.setToken(response.access_token);
    return response;
  }

  async getCurrentUser() {
    return this.request("/auth/me");
  }

  async logout() {
    this.removeToken();
  }

  // Interview endpoints
  async createInterview(interviewData) {
    return this.request("/interviews/", {
      method: "POST",
      body: JSON.stringify(interviewData),
    });
  }

  async getInterviews() {
    return this.request("/interviews/");
  }

  async getInterview(mockId) {
    return this.request(`/interviews/${mockId}`);
  }

  // Answer endpoints
  async saveAnswer(answerData) {
    return this.request("/answers/", {
      method: "POST",
      body: JSON.stringify(answerData),
    });
  }

  async getAnswers(mockId) {
    return this.request(`/answers/${mockId}`);
  }
}

export const apiClient = new ApiClient();
