import React from 'react';
import { Redirect } from 'react-router';
import { createUser } from '../services/userAPI';
import Loading from '../components/Loading';
import Header from '../components/Header';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: '',
      loading: false,
      redirect: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.buttonClick = this.buttonClick.bind(this);
  }

  handleChange({ target }) {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
      [name]: value,
    });
  }

  async buttonClick() {
    const { user } = this.state;
    this.setState({
      loading: true,
    });
    await createUser({
      name: user,
    });
    await this.setState({
      loading: false,
    });
    this.setState({
      redirect: true,
    });
  }

  async fetchApi() {
    const requestReturn = await fetch('src/services/userAPI.js');
    const requestObject = await requestReturn.json();
    console.log(requestObject); // pra passar no lint, provisoriamente
  }

  render() {
    const { user, loading, redirect } = this.state;
    const two = 2;
    if (loading === true) {
      return <Loading />;
    }
    if (redirect === true) {
      return <Redirect to="/search" />;
    }
    return (
      <div data-testid="page-login">
        <Header />
        <form>
          <label htmlFor="user">
            <input
              type="text"
              name="user"
              value={ user }
              data-testid="login-name-input"
              onChange={ this.handleChange }
            />
            <button
              type="submit"
              data-testid="login-submit-button"
              disabled={ user.length <= two } // https://stackoverflow.com/questions/30187781/how-to-disable-a-button-when-an-input-is-empty (usei só o disabled, minha ideia jpa era usar state pra controlar)
              onClick={ this.buttonClick }

            >
              Entrar
            </button>
          </label>
        </form>
      </div>
    );
  }
}

export default Login;
