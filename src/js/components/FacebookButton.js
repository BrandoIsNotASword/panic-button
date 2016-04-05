import React from 'react';
import Button from '../components/Button';

const fbId = '501483663362220';

const {
  Component,
  PropTypes
} = React;

const propTypes = {
  onFacebookResponse: PropTypes.func.isRequired
};

class FacebookButton extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    /* eslint-disable */
    window.fbAsyncInit = () => {
      this.FB = FB;

      this.FB.init({
        appId: fbId,
        xfbml: false,
        version: 'v2.5'
      });

      // this.FB.getLoginStatus(this.checkLoginState.bind(this));
    };

    ((d, s, id) => {
      const element = d.getElementsByTagName(s)[0];
      const fjs = element;
      let js = element;

      if (d.getElementById(id)) return;
      js = d.createElement(s); js.id = id;
      js.src = '//connect.facebook.net/en_US/sdk.js';
      fjs.parentNode.insertBefore(js, fjs);
    })(document, 'script', 'facebook-jssdk');
    /* eslint-enable */
  }

  responseApi(authResponse) {
    /* eslint-disable */
    this.FB.api('/me', (me) => {
      me.accessToken = authResponse.accessToken;
      this.props.onFacebookResponse(me);
    });
    /* eslint-enable */
  }

  checkLoginState(response) {
    if (response.authResponse) {
      this.responseApi(response.authResponse);
    } else {
      if (this.props.onFacebookResponse) {
        this.props.onFacebookResponse({ status: response.status });
      }
    }
  }

  handleClick() {
    /* eslint-disable */
    this.FB.login(this.checkLoginState.bind(this), { scope: 'public_profile, email' });
    /* eslint-enable */
  }

  render() {
    return (
      <div>
        <Button
          onClick={this.handleClick.bind(this)}
          text="Facebook"
        />
        <div id="fb-root"></div>
      </div>
    );
  }
}

FacebookButton.propTypes = propTypes;

export default FacebookButton;
