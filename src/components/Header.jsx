import React from 'react';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: '',
      loading: false,
    };
    this.userInfo = this.userInfo.bind(this);
  }

  componentDidMount() {
    this.userInfo();
  }

  async userInfo() {
    this.setState({
      loading: true,
    });
    const username = await getUser();
    this.setState({
      user: username.name,
      loading: false,
    });
  }

  render() {
    const { user, loading } = this.state;
    if (loading === true) {
      return <Loading />;
    }
    return (
      <header data-testid="header-component">
        <h1 data-testid="header-user-name">{ user }</h1>
      </header>
    );
  }
}

export default Header;
