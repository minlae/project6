import React from 'react';
import ReactDOM from 'react-dom';
// import Header from './Header.js';
// import firebase from './firebase';
// note no need to add .js to Header and firebase above. They're optional. npm assumes you'll have it.

// FIRST STEP: Make one workign card and one working title list. Minimum styling.

// PSEUDOCODE PART 1:
// When you hover over a titleCard you get the 2nd display: get random or see my list.
	// Two more buttons appear to replace button
	// Event: on mouseOver ?
	// So then the h2s within title cards will have to be buttons. Or the title cards themselves have to be buttons.
	// Try creating the button first and putting it in the div as the h2, then if that works, see if you can do it for the card.

// Create card component
	// needs state
	// when click on movie button, your state is going to swap between true and false for "toggleButtons" Based on whether or not state is true or false, you will see the buttons or not.
// Render: True or False logic, if toggleButtons true then show buttons else no buttons
// click on button and two buttons show up


class TitleCard extends React.Component {	
	constructor() {
		super();
		this.state = {
			showHidden: false
		}
		this.handleClick = this.handleClick.bind(this);
	}
	handleClick() {

		// this.setState({
		// 	showHidden: !this.state.showHidden
		// })

		if (this.state.showHidden === false) {
			this.setState({
				showHidden: true
			});
		} else {
			this.setState({
				showHidden: false
			});
		}
		// display two previously hidden buttons: Get Random and My List
	}
	render() {
		return (
			<div className="titleCard">
				<button onClick={this.handleClick}>Movies</button>
				{this.state.showHidden ? <div><HiddenButton /></div> : null}
			</div>
		)
	}

}

class HiddenButton extends React.Component {
	render () {
		return (
			<button>hidden buttons!</button>
		)
	}
}

class GetRandomButton extends React.Component {
	render () {
		return (
			<button className="hidden" onMouseOver={this.handleClick}>Get Random</button>
		)
	}
}

class MyListButton extends React.Component {
	render () {
		return (
			<button className="hidden" onMouseOver={this.handleClick}>My List</button>
		)
	}
}



class App extends React.Component {
	render() {
		return (
			<div className='app'>
				<header>
					<div className='wrapper'>
						<h1>Keeping Track of Your Recs</h1>
						<div className="container">
              				<TitleCard />
	           
	              			<div className="titleCard">
	              				<h2>Shows</h2>
	              			</div>
	              			<div className="titleCard">
	              				<h2>Books</h2>
	              			</div>
						</div>
					</div>
				</header>
			
			</div>
		);
	}
}

ReactDOM.render(<App />, document.getElementById('app'));

// <div className='container'>
// 	<section className='add-item'>
// 		<form>
// 			<input type="text" name="username" placeholder="What's your name?" />
// 			<input type="text" name="currentItem" placeholder="What are you bringing?" />
// 			<button>Add Item</button>
// 		</form>
// 	</section>

// <section className='display-item'>
// 	<div className='wrapper'>
// 		<ul>
// 		</ul>
// 	</div>
// </section>
// </div>