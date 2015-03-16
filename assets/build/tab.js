

var PageLinksListItem = React.createClass({displayName: "PageLinksListItem",
  render: function() {
    return (
      React.createElement("li", null, 
        React.createElement("a", {href: "https://github.com/appacademy/ruby-curriculum"}, "Ruby")
      )
    );
  }
});


var PageLinksList = React.createClass({displayName: "PageLinksList",
  render: function() {
    return (
      React.createElement("section", null, 
        React.createElement("h2", null, "Curriculum"), 
        React.createElement("ul", null, 
          React.createElement(PageLinksListItem, null)
        )
      )
    );
  }
});


var PageLinks = React.createClass({displayName: "PageLinks",
  render: function() {
    return (
      React.createElement("main", {className: "group"}, 
        React.createElement(PageLinksList, null)
      )
    );
  }
});


var PageHeaderInfo = React.createClass({displayName: "PageHeaderInfo",
  render: function() {
    return (
      React.createElement("div", {id: "info"}, 
        React.createElement("p", null, "Wed, Mar 4 — W7D3")
      )
    );
  }
});


var PageHeaderClock = React.createClass({displayName: "PageHeaderClock",
  render: function() {
    return (
      React.createElement("h1", {id: "clock"}, "15:06")
    );
  }
});


var PageHeader = React.createClass({displayName: "PageHeader",
  render: function() {
    return (
      React.createElement("header", {className: "clock-wrap"}, 
        React.createElement("h2", {id: "desk"}, "•"), 
        React.createElement(PageHeaderClock, null), 
        React.createElement(PageHeaderInfo, null)
      )
    );
  }
});


var Page = React.createClass({displayName: "Page",
  render: function() {
    return (
      React.createElement("div", {className: "wrap"}, 
        React.createElement(PageHeader, null), 
        React.createElement(PageLinks, null), 
        React.createElement("h3", {className: "localhost"}, 
          React.createElement("a", {href: "http://localhost:3000/"}, "Localhost:3000")
        )
      )
    );
  }
});


var Corners = React.createClass({displayName: "Corners",
  render: function() {
    return (
      React.createElement("nav", null, 
        React.createElement("ul", null
        )
      )
    );
  }
});


var Header = React.createClass({displayName: "Header",
  render: function() {
    return (
      React.createElement("header", {className: "group"}, 
        React.createElement("h1", {className: "logo"}, 
          React.createElement("a", {href: "http://www.appacademy.io/"}, "App Academy")
        )
      )
    );
  }
});


var DesksPairListItem = React.createClass({displayName: "DesksPairListItem",
  render: function() {
    return (
      React.createElement("li", null, 
        React.createElement("strong", null, " 1"), " —", 
        React.createElement("a", {href: "https://github.com/NickyTesla"}, "Nicky Pyle"), " &", 
        React.createElement("a", {href: "https://github.com/Faeylayn"}, "Angela Dobbs")
      )
    );
  }
});


var DesksPairList = React.createClass({displayName: "DesksPairList",
  render: function() {
    return (
      React.createElement("ul", null, 
        React.createElement(DesksPairListItem, null)
      )
    );
  }
});


var Desks = React.createClass({displayName: "Desks",
  render: function() {
    return (
      React.createElement("article", {id: "desks"}, 
        React.createElement("span", null, "×"), 
        React.createElement("h1", null, "W7D3 Desks"), 
        React.createElement(DesksPairList, null)
      )
    );
  }
});

var Body = React.createClass({displayName: "Body",
  render: function() {
    return (
      React.createElement("div", null, 
        React.createElement(Header, null), 
        React.createElement(Corners, null), 
        React.createElement(Desks, null), 
        React.createElement(Page, null), 

        React.createElement("footer", null, 
          React.createElement("a", {href: "options.html"}, "Options")
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
