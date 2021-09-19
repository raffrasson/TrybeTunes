import React from 'react';
import { Link } from 'react-router-dom';
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
      <div>
        <header data-testid="header-component">
          <Link to="/search" data-testid="link-to-search"> Search</Link>
          <Link to="/favorites" data-testid="link-to-favorites"> Favorites</Link>
          <Link to="/profile" data-testid="link-to-profile"> Profile </Link>
          <h1 data-testid="header-user-name">{ user }</h1>
        </header>

      </div>
    );
  }
}

export default Header;
