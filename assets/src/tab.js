var Link = React.createClass({
  render: function() {
    return (
      <a href={this.props.url}>{this.props.title}</a>
    )
  }
});

var PageLinksListItem = React.createClass({
  render: function() {
    var subLink = this.props.link.sub ? <PageLinksSubList links={this.props.link.sub} /> : null;

    return (
      <li>
        <a href={this.props.link.url}>{this.props.link.title}</a>
        {subLink}
      </li>
    );
  }
});


var PageLinksSubList = React.createClass({
  render: function() {
    var links = [];

    this.props.links.forEach(function(link, index){
      var key = "link-" + index;

      links.push(
        <PageLinksListItem key={key} link={link} />
      )
    });

    return (
      <ul>
        {links}
      </ul>
    );
  }
});


var PageLinksList = React.createClass({
  render: function() {
    return (
      <section>
        <h2>{this.props.title}</h2>
        <PageLinksSubList links={this.props.links} />
      </section>
    );
  }
});


var PageLinks = React.createClass({
  render: function() {
    var lists = []

    this.props.links.forEach(function(list, index){
      var key = "links-list-" + index;

      lists.push(
        <PageLinksList key={key} title={list.title} links={list.links} />
      )
    });

    return (
      <main className="group">
        {lists}
      </main>
    );
  }
});


var PageHeaderInfo = React.createClass({
  render: function() {
    if(!this.props.core.podId){
      return (<div id="info"></div>);
    }

    var podId = this.props.core.podId;
    var desk = this.props.core.desk;
    var pair = this.props.day.pods[podId].pairs[desk];

    return (
      <div id="info">
        <p>{this.props.day.dateStamp} — {this.props.day.day} — <Pair pair={pair} /></p>
      </div>
    );
  }
});


var PageHeaderClock = React.createClass({
  getInitialState: function() {
    return {time: "0:00"};
  },

  componentWillMount: function() {
    this.interval = null;
  },

  componentWillUnmount: function() {
    clearInterval(this.interval);
  },

  componentDidMount: function() {
    this.updateTime();
    this.interval = setInterval(this.updateTime, 10000);
  },

  updateTime: function() {
    var currentTime = new Date();
    var currentHours = currentTime.getHours();
    var currentMinutes = currentTime.getMinutes();
    currentMinutes = (currentMinutes < 10 ? "0" : "") + currentMinutes;

    this.setState({time: currentHours + ":" + currentMinutes});
  },

  render: function() {
    return (
      <h1 id="clock">{this.state.time}</h1>
    );
  }
});


var PageHeader = React.createClass({
  render: function() {
    var desk = this.props.core.desk ? this.props.core.desk : "•";

    return (
      <header className="clock-wrap">
        <h2 id="desk" onClick={this.props.onDeskClick}>{desk}</h2>
        <PageHeaderClock />
        <PageHeaderInfo core={this.props.core} day={this.props.day} />
      </header>
    );
  }
});


var Page = React.createClass({
  render: function() {
    return (
      <div className="wrap">
        <PageHeader core={this.props.core} day={this.props.day} onDeskClick={this.props.onDeskClick} />
        <PageLinks ord={this.props.day.ord} links={this.props.links} />
        <h3 className="localhost">
          <a href="http://localhost:3000/">Localhost:3000</a>
        </h3>
      </div>
    );
  }
});

var CornerLink = React.createClass({
  render: function() {
    return (
      <li>
        <a href={this.props.url}>{this.props.title}</a>
      </li>
    )
  }
})


var Corners = React.createClass({
  render: function() {
    var links = [];

    this.props.corners.forEach(function(link, index){
      var key = "corner-" + index;

      links.push(
        <CornerLink key={key} url={link.url} title={link.title} />
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
    if(!this.props.weather.main){
      return (<header className="header group"></header>);
    }

    var city = this.props.core.cityId == 1 ? "NYC" : "SF";
    var degreeCel = parseInt(this.props.weather.main.temp);
    var degreeFar = parseInt((degreeCel * 9 / 5) + 32);

    return (
      <header className="header group">
        <em className="weather-left">
          {city} / {this.props.weather.weather[0].main}
          <span className="weather-hidden"> — {this.props.weather.weather[0].description}</span>
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


var Pair = React.createClass({
  render: function() {
    var pair = [];

    this.props.pair.forEach(function(student, index){
      var key = "link-" + student.github;

      pair.push(
        <Link key={key} url={student.github} title={student.name} />
      );

      if (this.props.pair.length - 1 > index) {
        pair.push(" & ");
      }
    }.bind(this));

    return (
      <span className="pair">{pair}</span>
    )
  }
})


var DesksPairListItem = React.createClass({
  render: function() {
    return (
      <li>
      <strong>{this.props.desk}</strong> — <Pair pair={this.props.pair} />
      </li>
    );
  }
});


var DesksPairList = React.createClass({
  render: function() {
    var pairs = []
    var desks = Object.getOwnPropertyNames(this.props.pod.pairs);

    desks.forEach(function(desk, index){
      var key = "pair-" + index;

      pairs.push(
        <DesksPairListItem
          key={key}
          desk={desk}
          pair={this.props.pod.pairs[desk]} />
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
    if(!this.props.day.pods || !this.props.core.podId){
      return (<article id="desks"></article>);
    }

    var pod = this.props.day.pods[this.props.core.podId];
    var deskClass = this.props.visible ? "is-active" : "";

    return (
      <article className={deskClass} id="desks">
        <span>×</span>
        <h1>{this.props.day.day} Desks</h1>
        <h2>{pod.name} — {pod.instructor}</h2>

        <DesksPairList pod={pod} />
      </article>
    );
  }
});


var Body = React.createClass({
  getInitialState: function() {
    return {
      deskVisible: false
    };
  },
  handleDeskClick: function(event) {
    this.setState({
      deskVisible: true
    });
  },
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
          day={this.props.data.day}
          visible={this.state.deskVisible} />

        <Page
          core={this.props.data.core}
          day={this.props.data.day}
          links={this.props.data.links}
          onDeskClick={this.handleDeskClick} />

        <footer>
          <a href="options.html">Options</a>
        </footer>
      </div>
    );
  }
});


/* DATA FUNCTIONS */

(function(){

  var stamp = (function(){
    var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday',
                'Thursday', 'Friday', 'Saturday'];

    var months = ['January', 'February', 'March', 'April',
                  'May', 'June', 'July', 'August', 'September',
                  'October', 'November', 'December'];

    var dateStamp;
    var d = new Date();
    var hours = d.getHours();

    dateStamp = days[d.getDay()].substring(0,3) + ", ";
    dateStamp += months[d.getMonth()].substring(0,3) + " ";
    dateStamp += d.getDate();

    return {
      date: dateStamp,
      time: dateStamp + ", " + hours
    };
  })();

  var getCoreData = function(){
    var core = Data.core;

    core.cityId = localStorage["cityId"] || 1;
    core.podId = localStorage["podId"];
    core.desk = localStorage["desk"];
    core.password = localStorage["password"];
  };

  var getWeatherData = function(){
    var weatherId = (Data.core.cityId == 2) ? 5391959 : 5128581;
    var url = "http://api.openweathermap.org/data/2.5/weather?id=" + weatherId + "&units=metric";

    Data.weather = JSON.parse(localStorage["weather"] || "{}");

    if(!Data.weather || Data.weather.timeStamp != stamp.time){
      $.getJSON(url, function(data){

        Data.weather = data;
        Data.weather.timeStamp = stamp.time;
        localStorage["weather"] = JSON.stringify(Data.weather);

        renderEverything();
      });
    }
  };

  var getDayData = function(){
    var url = "http://progress.appacademy.io/api/pairs.json?city_id=" + Data.core.cityId;
    Data.day = JSON.parse(localStorage["day"] || "{}");

    if(!Data.day || Data.day.dateStamp != stamp.date){
      $.getJSON(url, function(data){

        Data.day = data;
        Data.day.dateStamp = stamp.date;
        localStorage["day"] = JSON.stringify(Data.day);

        if(!Data.core.podId){
          Data.core.podId = Object.keys(Data.day.pods)[0];
        }

        if(!Data.core.desk){
          Data.core.desk = Object.keys(Data.day.pods[Data.core.podId].pairs)[0];
        }

        renderEverything();
      });
    }
  };

  var renderEverything = function(){
    React.render(
      <Body data={Data} />,
      document.body
    );
  };

  $(function(){
    getCoreData();
    getWeatherData();
    getDayData();
    renderEverything();
  });

})();
