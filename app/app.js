// Include the Main React Dependencies
import React from "react";
import ReactDOM from "react-dom";

// Implementing very simple routing for single-page app.
import { BrowserRouter, Route } from "react-router-dom";

// Include the main Main Component
import Main from "./components/Main";

// Render main route.
ReactDOM.render(
	(
		<BrowserRouter>
			<Route path="/" component={Main} />
		</BrowserRouter>
	),
	document.getElementById("app")
);

// var Main = React.createClass({
// 	render: function(){
// 		return (

// 			<div className="container">
// 				<nav className="navbar navbar-default" role="navigation">
// 					<div className="container-fluid">


// var Query = React.createClass({
// 	getInitialState: function() {
// 		return {term: ''};
// 	},