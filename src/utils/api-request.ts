import axios, { AxiosInstance } from "axios";

class ApiRequest {
  private readonly httpClient: AxiosInstance;
  private _instance: ApiRequest;

  constructor() {
    this.httpClient = axios.create({
      baseURL: import.meta.env.VITE_BACKEND_URL,
    });
    this._instance = this;
  }

  public getInstance() {
    if (!this._instance) {
      this._instance = new ApiRequest();
      return this._instance;
    }
    return this._instance;
  }

  async post(url: string, data: any) {
    return await this.httpClient.post(url, data);
  }

  async get(url: string) {
    return await this.httpClient.get(url);
  }
}

export default new ApiRequest().getInstance();
