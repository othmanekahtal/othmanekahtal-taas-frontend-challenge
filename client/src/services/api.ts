class Api {
  urlBase: string;
  token: string;
  constructor({ url, token }) {
    this.urlBase = url;
    this.token = token;
    console.log({ url: this.urlBase, token: this.token });
  }
  async getRepos({ page, perPage = 5 }) {
    const response = await fetch(
      `${this.urlBase}/user/repos?type=owner&per_page=${perPage}&page=${page}`,
      {
        method: "get",
        headers: { Authorization: `Bearer ${this.token}` },
      }
    );
    return response;
  }
  async getCommits({ branch, page, perPage, repo, userID }) {
    const response = await fetch(
      `${this.urlBase}/repos/${userID}/${repo}/commits?repo=${branch}&per_page=${perPage}&page=${page}`,
      {
        method: "get",
        headers: { Authorization: `Bearer ${this.token}` },
      }
    );
    return response;
  }
  async getUser() {
    const response = await fetch(`${this.urlBase}/user`, {
      method: "get",
      headers: { Authorization: `Bearer ${this.token}` },
    });
    return response;
  }
  async searchRepo(q) {
    const response = await fetch(
      `${this.urlBase}/search/repositories?q=${q}+in:name+user:@me`,
      {
        method: "get",
        headers: { Authorization: `Bearer ${this.token}` },
      }
    );
    return response;
  }
  async getBranches({ repo, userID }) {
    const response = await fetch(
      `${this.urlBase}/repos/${userID}/${repo}/branches`,
      {
        method: "get",
        headers: { Authorization: `Bearer ${this.token}` },
      }
    );
    return response;
  }
  async getRepo({ repo, userID }) {
    const response = await fetch(`${this.urlBase}/repos/${userID}/${repo}`, {
      method: "get",
      headers: { Authorization: `Bearer ${this.token}` },
    });
    return response;
  }
}
export { Api };
