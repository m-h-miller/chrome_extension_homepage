// SF: 37.7833 N, 122.4167 W
// NYC: 40.6700 N, 73.9400 W

var Form = React.createClass({displayName: "Form",
  componentDidMount: function(){
    localStorage.removeItem("day");
    localStorage.removeItem("weather");

    this.getCityByIP();
    this.loadRemotePods();
  },
  getInitialState: function(){
    return {
      cityId: localStorage["cityId"],
      podId: localStorage["podId"],
      desk: localStorage["desk"],
      password: localStorage["password"],
      saved: false,
      pods: {}
    };
  },
  getPods: function(data){
    var pods = {};

    if(data && data.pods){
      for(podId in data.pods){
        pods[podId] = data.pods[podId].name;
      }
    }

    return pods;
  },
  loadRemotePods: function(){
    var url = "http://progress.appacademy.io/api/pairs.json?city_id=" + this.state.cityId;

    $.getJSON(url, function(data){
      this.setState({"pods": this.getPods(data)});
    }.bind(this));
  },
  getCityByIP: function(){
    if(localStorage["cityId"] || (this.state && this.state.cityId)){
      return;
    };

    var sfLong = -122;
    var nycLong = -74;
    var midLong = parseInt((sfLong + nycLong) / 2);

    $.getJSON("http://ipinfo.io/json", function(data) {
        var long = parseInt(data.loc.split(",")[1]);
        this.setCityId((long > midLong) ? 1 : 2);
    }.bind(this));
  },
  setCityId: function(cityId){
    localStorage["cityId"] = cityId;
    localStorage["podId"] = "";

    this.setState({
      cityId: cityId,
      podId: ""
    },
    function(){
      this.loadRemotePods();
      this.flashInfo();
    });
  },
  flashInfo: function(){
    this.setState({saved: true});

    if(this.flashTimeout){
      clearTimeout(this.flashTimeout);
    }

    this.flashTimeout = setTimeout(function(){
      this.setState({saved: false});
    }.bind(this), 2000);
  },
  handleDeskChange: function(event){
    var desk = event.target.value;
    localStorage["desk"] = desk;
    this.setState({desk: desk});
    this.flashInfo();
  },
  handlePasswordChange: function(event){
    var password = event.target.value;
    localStorage["password"] = password;
    this.setState({desk: password});
    this.flashInfo();
  },
  handleLocationChange: function(event){
    this.setCityId(event.target.value);
  },
  handlePodChange: function(event){
    var podId = event.target.value;
    localStorage["podId"] = podId;
    this.setState({podId: podId});
    this.flashInfo();
  },
  render: function(){
    var info = this.state.saved ? React.createElement("p", null, "Settings saved!") : "";
    var podOptions = [];

    if(this.state.cityId && this.state.pods){
      for(podId in this.state.pods){
        podOptions.push(
          React.createElement("option", {value: podId, key: podId}, this.state.pods[podId])
        );
      }
    }

    return (
      React.createElement("form", {action: "#"},

        React.createElement("h1", null, "Options"),

        React.createElement("div", {id: "info"}, info),

        React.createElement("div", {className: "input"},
          React.createElement("div", {className: "label"}, "Location"),
          React.createElement("div", {id: "input-location"},
            React.createElement("label", null,
              React.createElement("input", {
                type: "radio",
                htmlName: "location",
                value: "1",
                checked: this.state.cityId == 1,
                onChange: this.handleLocationChange}), " NYC"
            ),
            React.createElement("label", null,
              React.createElement("input", {
                type: "radio",
                htmlName: "location",
                value: "2",
                checked: this.state.cityId == 2,
                onChange: this.handleLocationChange}), " SF"
            )
          )
        ),

        React.createElement("div", {className: "input"},
          React.createElement("label", {htmlFor: "select-pod"}, "Pod"),
          React.createElement("select", {id: "select-pod", value: this.state.podId, onChange: this.handlePodChange},
            podOptions
          )
        ),

        React.createElement("div", {className: "input"},
          React.createElement("label", {htmlFor: "input-desk"}, "Desk"),
          React.createElement("input", {
            type: "number",
            value: this.state.desk,
            id: "input-desk",
            onChange: this.handleDeskChange})
        ),

        React.createElement("div", {className: "input"},
          React.createElement("label", {htmlFor: "input-password"}, "Password"),
          React.createElement("input", {
            type: "password",
            value: this.state.password,
            id: "input-password",
            onChange: this.handleDeskChange})
        )

      )
    );
  }
});


var Body = React.createClass({displayName: "Body",
  render: function(){
    return (
      React.createElement("div", null,

        React.createElement("header", {className: "header group"},
          React.createElement("h1", {className: "logo"},
            React.createElement("a", {href: "http://www.appacademy.io/"}, "App Academy")
          )
        ),

        React.createElement(Form, null),

        React.createElement("footer", null,
          React.createElement("a", {href: "tab.html"}, "Options")
        )

      )
    );
  }
});

$(function(){
  React.render(
    React.createElement(Body, null),
    document.body
  );
});
