var Link = React.createClass({displayName: "Link",
  render: function() {
    return (
      React.createElement("a", {href: this.props.url}, this.props.title)
    )
  }
});


var PageLinksListItem = React.createClass({displayName: "PageLinksListItem",
  render: function() {
    var subLink = this.props.link.sub ? React.createElement(PageLinksSubList, {links: this.props.link.sub}) : null;

    return (
      React.createElement("li", null,
        React.createElement("a", {href: this.props.link.url}, this.props.link.title),
        subLink
      )
    );
  }
});


var PageLinksSubList = React.createClass({displayName: "PageLinksSubList",
  render: function() {
    var links = [];

    this.props.links.forEach(function(link, index){
      var key = "link-" + index;

      links.push(
        React.createElement(PageLinksListItem, {key: key, link: link})
      )
    });

    return (
      React.createElement("ul", null,
        links
      )
    );
  }
});


var PageLinksList = React.createClass({displayName: "PageLinksList",
  render: function() {
    return (
      React.createElement("section", null,
        React.createElement("h2", null, this.props.title),
        React.createElement(PageLinksSubList, {links: this.props.links})
      )
    );
  }
});


var PageLinks = React.createClass({displayName: "PageLinks",
  render: function() {
    var lists = []

    this.props.links.forEach(function(list, index){
      var key = "links-list-" + index;

      lists.push(
        React.createElement(PageLinksList, {key: key, title: list.title, links: list.links})
      )
    });

    return (
      React.createElement("main", {className: "group"},
        lists
      )
    );
  }
});


var PageHeaderInfo = React.createClass({displayName: "PageHeaderInfo",
  render: function() {
    var pods = this.props.day.pods;
    var pod = pods && pods[this.props.podId];
    var pair = pod && pod.pairs[this.props.desk];
    var pairComponent;

    if(pair){
      pairComponent = (
        React.createElement(Pair, {pair: pair})
      );
    }

    return (
      React.createElement("div", {id: "info"},
        React.createElement("p", null, this.props.day.dateStamp, " — ", this.props.day.day, " ", "Harry")
      )
    );
  }
});


var PageHeaderClock = React.createClass({displayName: "PageHeaderClock",
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
      React.createElement("h1", {id: "clock"}, this.state.time)
    );
  }
});


var PageHeader = React.createClass({displayName: "PageHeader",
  render: function() {
    var desk = this.props.desk ? this.props.desk : "•";

    return (
      React.createElement("header", {className: "clock-wrap"},
        React.createElement("h2", {id: "desk", onClick: this.props.onDeskClick}, desk),
        React.createElement(PageHeaderClock, null),
        React.createElement(PageHeaderInfo, {
          desk: this.props.desk,
          podId: this.props.podId,
          day: this.props.day})
      )
    );
  }
});


var Page = React.createClass({displayName: "Page",
  render: function() {
    return (
      React.createElement("div", {className: "wrap"},
        React.createElement(PageHeader, {
          desk: this.props.desk,
          podId: this.props.podId,
          day: this.props.day,
          onDeskClick: this.props.onDeskClick}),

        // React.createElement(PageLinks, {ord: this.props.day.ord, links: this.props.links}),
        React.createElement("h3", {className: "localhost"},
          React.createElement("a", {href: "http://localhost:3000/"}, "Localhost:3000")
        )
      )
    );
  }
});

var CornerLink = React.createClass({displayName: "CornerLink",
  render: function() {
    return (
      React.createElement("li", null,
        React.createElement("a", {href: this.props.url}, this.props.title)
      )
    )
  }
})


var Corners = React.createClass({displayName: "Corners",
  render: function() {
    var links = [];

    this.props.corners.forEach(function(link, index){
      var key = "corner-" + index;

      links.push(
        React.createElement(CornerLink, {key: key, url: link.url, title: link.title})
      );
    });

    return (
      React.createElement("nav", null,
        React.createElement("ul", null,
          links
        )
      )
    );
  }
});


var Header = React.createClass({displayName: "Header",
  render: function() {
    var city = this.props.cityId == 1 ? "NYC" : "SF";
    var weatherLeft, weatherRight;

    if(this.props.weather.main){
      var degreeCel = parseInt(this.props.weather.main.temp);
      var degreeFar = parseInt((degreeCel * 9 / 5) + 32);

      weatherLeft = (
        React.createElement("em", {className: "weather-left"},
          city, " / ", this.props.weather.weather[0].main,
          React.createElement("span", {className: "weather-hidden"}, " — ", this.props.weather.weather[0].description)
        )
      );

      weatherRight = (
        React.createElement("em", {className: "weather-right"},
          React.createElement("span", {className: "weather-hidden"}, degreeFar, " ° F / "),
          degreeCel, " ° C"
        )
      );
    }

    return (
      React.createElement("header", {className: "header group"},
        weatherLeft,
        weatherRight,

        React.createElement("h1", {className: "logo"},
          React.createElement("a", {href: "http://www.appacademy.io/"}, ":)")
        )
      )
    );
  }
});


var LinkSet = React.createClass({displayName: "LinkSet",
  render: function() {
    var setOfLinks = [];
    this.props.links.forEach(function(link, index) {
      var key = "link-" + link.title,
          url = link.url,
          title = link.title;

      setOfLinks.push(
        React.createElement(Link, {key:key, url:url, title:title })
      )

      if (this.props.links.length - 1 > index) {
        setOfLinks.push(" & ");
      }
    }.bind(this));

    return (
      React.createElement("span", {className: "pair"}, setOfLinks)
    )
  }
})


var LinkSetItem = React.createClass({displayName: "LinkSetItem",
  render: function() {
    return (
      React.createElement("li", null,
      React.createElement("strong", null, this.props.title), " — ", React.createElement(LinkSet, {links: this.props.links})
      )
    );
  }
});


var HiddenLinksList = React.createClass({displayName: "HiddenLinksList",
  render: function() {
    var topics = [];

    var main_topics = this.props.links;

    main_topics.forEach(function( topic ) {
      var key = topic.title;

      topics.push(
        React.createElement(LinkSetItem, {
          key: key,
          title: topic.title,
          links: topic.links
        })
      )
    }.bind(this));

    return (
      React.createElement("ul", null,
        topics
      )
    );
  }
});


var HiddenLinks = React.createClass({displayName: "HiddenLinks",
  render: function() {
    var links = this.props.links;
    var pods = this.props.day.pods;
    var pod = pods && pods[this.props.podId];
    var deskClass = this.props.visible ? "is-active" : "";
    var podName, podDeskPairList;

      podName = (
        React.createElement("h2", null, "Easy Village", " ", pod.instructor && "—", " ", "pod.instructor")
      );

      secretLinksList = (
        React.createElement(HiddenLinksList, {pod: pod, links: links})
      );


    return (
      React.createElement("article", {className: deskClass, id: "hiddenLinks"},
        React.createElement("span", {onClick: this.props.onDeskClick}, "×"),
        React.createElement("h1", null, this.props.day.day, " Desks"),
        podName,
        secretLinksList
      )
    );
  }
});


var Body = React.createClass({displayName: "Body",
  mixins: [ CityMixin ],
  getWeather: function(){
    var url = "http://api.openweathermap.org/data/2.5/weather?lat=40&lon=-74&appid=44db6a862fba0b067b1930da0d769e98";
    var weather = JSON.parse(localStorage["weather"] || "{}");
    if (!weather || weather.timeStamp != this.props.stamp.time){
      $.getJSON(url, function(data){
        data.timeStamp = this.props.stamp.time;

        localStorage["weather"] = JSON.stringify(data);
        this.setState({ weather: data });
        console.log("local storage accessed? in #getWeather");
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
      React.createElement("div", null,
        React.createElement(Header, {
          cityId: this.state.cityId,
          weather: this.state.weather}),

        React.createElement(Corners, {
          corners: this.props.links.corners}),

        React.createElement(HiddenLinks, {
          links: this.props.links.main,
          podId: this.state.podId,
          day: this.state.day,
          visible: this.state.deskVisible,
          onDeskClick: this.handleDeskClick}),

        React.createElement(Page, {
          desk: this.state.desk,
          podId: this.state.podId,
          day: this.state.day,
          links: this.props.links.main,
          onDeskClick: this.handleDeskClick}),

        React.createElement("footer", null,
          React.createElement("a", {href: "options.html"}, "Options")
        )
      )
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
    React.createElement(Body, {
      stamp: Stamp,
      links: Links}),
    document.body
  );

});
