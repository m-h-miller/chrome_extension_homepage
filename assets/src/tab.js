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
    var pods = this.props.day.pods;
    var pod = pods && pods[this.props.podId];
    var pair = pod && pod.pairs[this.props.desk];
    var pairComponent;

    if(pair){
      pairComponent = (
        <Pair pair={pair} />
      );
    }

    return (
      <div id="info">
        <p>{this.props.day.dateStamp} — {this.props.day.day} {pair && "—"} {pairComponent}</p>
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
    var desk = this.props.desk ? this.props.desk : "•";

    return (
      <header className="clock-wrap">
        <h2 id="desk" onClick={this.props.onDeskClick}>{desk}</h2>
        <PageHeaderClock />
        <PageHeaderInfo
          desk={this.props.desk}
          podId={this.props.podId}
          day={this.props.day} />
      </header>
    );
  }
});


var Page = React.createClass({
  render: function() {
    return (
      <div className="wrap">
        <PageHeader
          desk={this.props.desk}
          podId={this.props.podId}
          day={this.props.day}
          onDeskClick={this.props.onDeskClick} />

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
    var city = this.props.cityId == 1 ? "NYC" : "NYC";
    var weatherLeft, weatherRight;

    if(this.props.weather.main){
      var degreeCel = parseInt(this.props.weather.main.temp);
      var degreeFar = parseInt((degreeCel * 9 / 5) + 32);

      weatherLeft = (
        <em className="weather-left">
          {city} / {this.props.weather.weather[0].main}
          <span className="weather-hidden"> — {this.props.weather.weather[0].description}</span>
        </em>
      );

      weatherRight = (
        <em className="weather-right">
          <span className="weather-hidden">{degreeFar} &deg; F / </span>
          {degreeCel} &deg; C
        </em>
      );
    }

    return (
      <header className="header group">
        {weatherLeft}
        {weatherRight}

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
      var url = "https://github.com/" + student.github;

      pair.push(
        <Link key={key} url={url} title={student.name} />
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
    var pods = this.props.day.pods;
    var pod = pods && pods[this.props.podId];
    var deskClass = this.props.visible ? "is-active" : "";
    var podName, podDeskPairList;

    if(pod){
      podName = (
        <h2>{pod.name} {pod.instructor && "—"} {pod.instructor}</h2>
      );

      podDeskPairList = (
        <DesksPairList pod={pod} />
      );
    }

    return (
      <article className={deskClass} id="desks">
        <span onClick={this.props.onDeskClick}>×</span>
        <h1>{this.props.day.day} Desks</h1>
        {podName}
        {podDeskPairList}
      </article>
    );
  }
});


var Body = React.createClass({
  mixins: [CityMixin],
  getWeather: function(){
    var weatherId = (this.getCityId() == 2) ? 5391959 : 5128581;
    var url = "http://api.openweathermap.org/data/2.5/weather?id=" + weatherId + "&units=metric";
    var weather = JSON.parse(localStorage["weather"] || "{}");

    if(!weather || weather.timeStamp != this.props.stamp.time){
      $.getJSON(url, function(data){
        data.timeStamp = this.props.stamp.time;

        localStorage["weather"] = JSON.stringify(data);
        this.setState({weather: data});
      }.bind(this));
    }

    return weather;
  },
  getDay: function(){
    var url = "http://progress.appacademy.io/api/pairs.json?city_id=" + this.getCityId();
    var day = JSON.parse(localStorage["day"] || "{}");

    if(!day || day.dateStamp != this.props.stamp.date){
      $.getJSON(url, function(data){
        data.dateStamp = this.props.stamp.date;
        localStorage["day"] = JSON.stringify(data);

        if(!this.state.podId || !data.pods[this.state.podId]){
          var podId = Object.keys(data.pods)[0];
          localStorage["podId"] = podId;
          this.setState({podId: podId});
        }

        this.setState({day: data});
      }.bind(this));
    }

    return day;
  },
  componentDidMount: function() {
    this.getCityByIP();
  },
  getInitialState: function() {
    return {
      cityId: localStorage["cityId"],
      podId: localStorage["podId"],
      desk: localStorage["desk"],
      weather: this.getWeather(),
      day: this.getDay(),
      deskVisible: false
    };
  },
  handleDeskClick: function(event) {
    this.setState({
      deskVisible: !this.state.deskVisible
    });
  },
  render: function() {
    return (
      <div>
        <Header
          cityId={this.state.cityId}
          weather={this.state.weather} />

        <Corners
          corners={this.props.links.corners} />

        <Desks
          podId={this.state.podId}
          day={this.state.day}
          visible={this.state.deskVisible}
          onDeskClick={this.handleDeskClick} />

        <Page
          desk={this.state.desk}
          podId={this.state.podId}
          day={this.state.day}
          links={this.props.links.main}
          onDeskClick={this.handleDeskClick} />

        <footer>
          <a href="options.html">Options</a>
        </footer>
      </div>
    );
  }
});

$(function(){

  var Stamp = (function(){
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

  React.render(
    <Body
      stamp={Stamp}
      links={Links} />,
    document.body
  );

});
