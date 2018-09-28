const React = require('react');
const PropTypes = require('prop-types');
const Layout = require('./layout');


class Index extends React.Component {

  submitHandler (event) {
    console.log('1');
    if (event.preventDefault) event.preventDefault();
    console.log(event);
  }

  render () {
    return (
      <div className="container">
        <Layout title={this.props.title}>
            <h1>{this.props.title}</h1>
            <p>Welcome to Film Search</p>

            {/*<form onSubmit={this.submitHandler}>*/}
            <form onSubmit={(e) => {this.submitHandler(e); e.preventDefault();}}>
              <div className="form-group">
                <label htmlFor="film-title-input">Title</label>
                <input type="text" className="form-control" id="film-title-input" aria-describedby="film-title-help" placeholder="Film Title" />
                <small id="titleHelp" className="form-text text-muted">Put the title of the film, you are looking.</small>
              </div>

              <div className="form-group">
                <label htmlFor="film-year-input">Year</label>
                <input type="text" className="form-control" id="film-year-input" aria-describedby="film-year-help" placeholder="Film Year" />
                <small id="film-year-help" className="form-text text-muted">Put the year of the film, you are looking.</small>
              </div>

              <div className="form-group">
                <input type="submit" className="btn btn-primary" id="film-form-submit" value="Find" />
                <input type="button" className="btn" id="test" value="test" onClick={() => console.log('test')}/>

                {/*<input 
                  type="button" 
                  className="btn btn-primary" 
                  id="film-form-submit" 
                  value="Find"
                  onClick={this.submitHandler} />*/}
              </div>
            </form>
        </Layout>
      </div>
    );
  }
}

Index.propTypes = {
  title: PropTypes.string,
};

module.exports = Index;