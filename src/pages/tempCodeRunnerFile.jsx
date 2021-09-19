
  async fetchApi() {
    const requestReturn = await fetch('src/services/userAPI.js');
    const requestObject = await requestReturn.json();
    this.setState({
      apiState: requestObject,
    });
  }