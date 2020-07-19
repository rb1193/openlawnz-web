global.___loader = {
  enqueue: jest.fn(),
}

process.env = {
  GATSBY_SEARCH_API_URL: "https://search.openlaw.nz",
  GATSBY_API_URL: "http://localhost/8000",
}
