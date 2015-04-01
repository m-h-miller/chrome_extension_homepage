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
    var links = [];

    this.props.corners.forEach(function(link){
      links.push(
        <li>
          <a href={link.url}>{link.title}</a>
        </li>
      );
    });

    return (
      <nav>
        <ul>
          {links}
        </ul>
      </nav>
    );
  }
});


var Header = React.createClass({
  render: function() {

    var city = this.props.core.cityId == 1 ? "NYC" : "SF";
    var degreeCel = parseInt(this.props.weather.main.temp);
    var degreeFar = parseInt((degreeCel * 9 / 5) + 32);

    return (
      <header className="group">
        <em className="weather-left">
          {city} / {this.props.weather.weather[0].main}
          <span className="weather-hidden"> &mdash; {this.props.weather.weather[0].description}</span>
        </em>

        <em className="weather-right">
          <span className="weather-hidden">{degreeFar} &deg; F / </span>
          {degreeCel} &deg; C
        </em>

        <h1 className="logo">
          <a href="http://www.appacademy.io/">App Academy</a>
        </h1>
      </header>
    );
  }
});


var DesksPairListItem = React.createClass({
  render: function() {

    var students = [];

    this.props.students.forEach(function(student, index){
      students.push(
        <a href="{student.github}">{student.name}</a>
      );

      if (this.props.students.length - 1 > index) {
        students.push(<span> &amp; </span>);
      }
    }.bind(this));

    return (
      <li>
        <strong>{this.props.desk}</strong> &ndash; {students}
      </li>
    );
  }
});


var DesksPairList = React.createClass({
  render: function() {
    var pairs = []
    var desks = Object.getOwnPropertyNames(this.props.pod.pairs);

    desks.forEach(function(desk){
      pairs.push(
        <DesksPairListItem
          desk={desk}
          students={this.props.pod.pairs[desk]} />
      );
    }.bind(this));

    return (
      <ul>
        {pairs}
      </ul>
    );
  }
});


var Desks = React.createClass({
  render: function() {
    var pod = this.props.day.pods[this.props.core.pod.toString()];

    return (
      <article id="desks">
        <span>×</span>
        <h1>{this.props.day.day} Desks</h1>
        <h2>{pod.name} &mdash; {pod.instructor}</h2>

        <DesksPairList pod={pod} />
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
