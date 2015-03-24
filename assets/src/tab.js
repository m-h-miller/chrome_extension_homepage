

var PageLinksListItem = React.createClass({
  render: function() {
    return (
      <li>
        <a href="https://github.com/appacademy/ruby-curriculum">Ruby</a>
      </li>
    );
  }
});


var PageLinksList = React.createClass({
  render: function() {
    return (
      <section>
        <h2>Curriculum</h2>
        <ul>
          <PageLinksListItem />
        </ul>
      </section>
    );
  }
});


var PageLinks = React.createClass({
  render: function() {
    return (
      <main className="group">
        <PageLinksList />
      </main>
    );
  }
});


var PageHeaderInfo = React.createClass({
  render: function() {
    return (
      <div id="info">
        <p>Wed, Mar 4 — W7D3</p>
      </div>
    );
  }
});


var PageHeaderClock = React.createClass({
  render: function() {
    return (
      <h1 id="clock">15:06</h1>
    );
  }
});


var PageHeader = React.createClass({
  render: function() {
    return (
      <header className="clock-wrap">
        <h2 id="desk">•</h2>
        <PageHeaderClock />
        <PageHeaderInfo />
      </header>
    );
  }
});


var Page = React.createClass({
  render: function() {
    return (
      <div className="wrap">
        <PageHeader />
        <PageLinks />
        <h3 className="localhost">
          <a href="http://localhost:3000/">Localhost:3000</a>
        </h3>
      </div>
    );
  }
});


var Corners = React.createClass({
  render: function() {
    return (
      <nav>
        <ul>
        </ul>
      </nav>
    );
  }
});


var Header = React.createClass({
  render: function() {
    return (
      <header className="group">
        <h1 className="logo">
          <a href="http://www.appacademy.io/">App Academy</a>
        </h1>
      </header>
    );
  }
});


var DesksPairListItem = React.createClass({
  render: function() {
    return (
      <li>
        <strong>&nbsp;1</strong> —
        <a href="https://github.com/NickyTesla">Nicky Pyle</a> &amp;
        <a href="https://github.com/Faeylayn">Angela Dobbs</a>
      </li>
    );
  }
});


var DesksPairList = React.createClass({
  render: function() {
    return (
      <ul>
        <DesksPairListItem />
      </ul>
    );
  }
});


var Desks = React.createClass({
  render: function() {
    return (
      <article id="desks">
        <span>×</span>
        <h1>W7D3 Desks</h1>
        <DesksPairList />
      </article>
    );
  }
});

var Body = React.createClass({
  render: function() {
    return (
      <div>
        <Header
          core={this.props.data.core}
          weather={this.props.data.weather} />

        <Corners
          corners={this.props.data.corners} />

        <Desks
          core={this.props.data.core}
          day={this.props.data.day} />

        <Page
          core={this.props.data.core}
          day={this.props.data.day}
          links={this.props.data.links} />

        <footer>
          <a href="options.html">Options</a>
        </footer>
      </div>
    );
  }
});

$(function(){
  React.render(
    <Body data={Data} />,
    document.body
  );
});
