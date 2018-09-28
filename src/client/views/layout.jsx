var React = require('react');
var PropTypes = require('prop-types');

class Layout extends React.Component {
  render() {
    return (
      <html>
        <head>
          <title>{this.props.title}</title>
          <link rel="shortcut icon" type="image/x-icon" href="/favicon.ico" />
          <link rel="stylesheet" href="https://bootswatch.com/4/slate/bootstrap.min.css"/>
          <link rel="stylesheet" href="/assets/stylesheets/style.css" />
        </head>
        <body>{this.props.children}</body>
      </html>
    );
  }
}

Layout.propTypes = {
  title: PropTypes.string,
};

module.exports = Layout;