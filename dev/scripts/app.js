import React from 'react';
import ReactDOM from 'react-dom';
// import Header from './Header.js';
import firebase from './firebase';
// note no need to add .js to Header and firebase above. They're optional. npm assumes you'll have it.

// FIRST STEP: Make one workign card and one working title list. Minimum styling.

// PSEUDOCODE PART 1:
// When you click a titleCard you get the 2nd display: get random or see my list.
	// Two more buttons appear to replace button
	// Event: on mouseOver ?
	// So then the h2s within title cards will have to be buttons. Or the title cards themselves have to be buttons.
	// Try creating the button first and putting it in the div as the h2, then if that works, see if you can do it for the card.

// Create card component
	// needs state
	// when click on movie button, your state is going to swap between true and false for "toggleButtons" Based on whether or not state is true or false, you will see the buttons or not.
// Render: True or False logic, if toggleButtons true then show buttons else no buttons
// click on button and two buttons show up

// 2. When you hit See My List:
// Section expands into an overlay with a completely new screen
	// Buttons are hidden, replaced with a "done" button
		// done button removes the section and brings you back to card with get random and see my list buttons

// to make things simpler: 
	// Want to hide something and want to display something else
	// same logic as hidden button toggle

// Essential for today:
// finish todo list movies - then figure out how to apply to other subjects
// how to hide the buttons / how button hides itself? I think I get the logic but...
// code to spit out random movie. At least have it work for one card.
// at least have one other card - so movies and books. That way know how to set up two. And then the random generator thing.
// Third I can do at home or once CSS is done...

const HiddenButton = () => {
		return (
			<div>
				<button>Get Random</button>
				<MyList />
			</div>
			// <button id="myList">See My List</button>
			// the above should be separate components I think... like buttons that then have their own state?
		);
}

// Can modify this to apply to any input: tv show or book. Just sub in variables somehow? Or through props?
// QUESTION: How to add multiple constructors... so needs to be separate component? E.g. This form vs the app one below... Hope I'm doing this right.
class Form extends React.Component {
	constructor() {
		super();
		this.state = {
			movieInput: "",
		}
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(e) {
		this.setState({
			[e.target.name]: e.target.value
		});
	}

	handleSubmit(e) {
		e.preventDefault();
		const itemsRef = firebase.database().ref("movies");
		const item = {
			rec: this.state.movieInput,
		}
		itemsRef.push(item);
		this.setState({
			movieInput: "",
		})
	}

	render() {
		return (
			<form onSubmit={this.handleSubmit}>
				<input type="text" name="movieInput" placeholder="enter movie name" onChange={this.props.handleChange} value={this.props.movieInput}/>
				<button>Add Movie</button>
			</form>
		)
	}

}


class MovieSection extends React.Component {
		// make a state - similar to To Do List
		// then bring in info from Firebase - again similar to Fun Food Friends
		render() {
			return (
				<div>
					<Form 
						handleChange={this.handleChange}
						handleSubmit={this.handleSubmit}
						// movieInput={this.state.movieInput}
					/>
				</div>
			)
		}
}

class MyList extends React.Component {
	constructor() {
		super();
		this.state = {
			showListSection: false
		}
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick() {
		if (this.state.showListSection === false) {
			this.setState({
				showListSection: true
			});
		} else {
			this.setState({
				showListSection: false
			});
		}
	}
	render() {
		return (
			<div className="myList">
				<button onClick={this.handleClick}>See My List</button>
				{this.state.showListSection ? <MovieSection /> : null}
			</div>
		)
	}
}


class TitleCard extends React.Component {	
	// display two previously hidden buttons: Get Random and My List
	constructor() {
		super();
		this.state = {
			showHidden: false
		}
		this.handleClick = this.handleClick.bind(this);
	}
	handleClick() {
		// Note: another way of doing this, for future reference:
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


// App Class
class App extends React.Component {
	render() {
		return (
			<div className='app'>
				<header>
					<div className='wrapper'>
						<h1>Keeping Track of Your Recs</h1>
						<div className="container">
              				<TitleCard />
	              			<div>
	              				<h2>Shows</h2>
	              			</div>
	              			<div>
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

