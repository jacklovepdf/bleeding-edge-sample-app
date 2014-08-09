/** @jsx React.DOM */

var React = require("react/addons");

var HelloWorld = require('../../../client/testing_examples/hello_world');

describe("HelloWorld", function(){
  describe("renderComponent", function(){

    var el;

    beforeEach(function(){
      // put a DOM element into the <body> tag with an id of "content"
      el = document.createElement("div");
      el.id = 'content';
      document.body.appendChild(el);
    });

    // If you use React.renderComponent in your tests, you MUST do this!!
    //   Otherwise the component from one test will affect (ie pollute) the component in another test.
    afterEach(function(){
      // we need to tell React to unmount the component to clean everything up
      React.unmountComponentAtNode(el);

      // we should remove the <div id="content"></div> as well, so the beforeEach function creates a
      //  new one which is unique and fresh for each test
      el.parentNode.removeChild(el);
    });

    it("should return the component which is mounted", function(){
      // notice how we have to specify the dom element we want to insert the
      //  component into (unlike TestUtils.renderIntoDocument)?
      var myComponent = React.renderComponent(<HelloWorld />, el);

      // you can assert things on the component
      expect(myComponent.props.name).toBe("Bleeding Edge React.js Book");
    });

    it("should put the component into the DOM", function(){
      var myComponent = React.renderComponent(<HelloWorld />, el);

      // notice how the width and height of the dom node are actual values
      expect(myComponent.getDOMNode().offsetWidth).not.toBe(0);
      expect(myComponent.getDOMNode().offsetHeight).not.toBe(0);
    });

  });
});