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

const HiddenButton = (props) => {
		return (
			<div>
				{/*<button>Get Random</button>*/}
				<MyList type={props.type} />
			</div>
		);
}

// Book Form
class BookForm extends React.Component {
	constructor() {
		super();
		this.state = {
			bookInput: "",
			items: [],
		}
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	componentDidMount() {
		const itemsRef = firebase.database().ref("books");
		itemsRef.on("value", (snapshot) =>{
			let items = snapshot.val();
			let newState = [];
			for (let item in items) {
				newState.push({
					id: item,
					rec: items[item].rec,
					// what is this doing? creating an array of objects in the Firebase database
				});
			}
			this.setState({
				items: newState
			});
			// console.log(newState)
			// console.log(this.state.items);
			// the second console log (this.state) is one item behind the (newState). What?
		});
	}

	removeItem(itemId) {
		const itemRef = firebase.database().ref(`/books/${itemId}`)
		itemRef.remove();
	}

	handleChange(e) {
		this.setState({
			[e.target.name]: e.target.value
		});
	}

	handleSubmit(e) {
		e.preventDefault();
		const itemsRef = firebase.database().ref("books");
		const item = {
			rec: this.state.bookInput,
		}
		itemsRef.push(item);
		this.setState({
			bookInput: "",
		})
	}

	render() {
		return (
			<div>
				<form onSubmit={this.handleSubmit}>
					<input type="text" name="bookInput" placeholder="enter book name" onChange={this.handleChange} value={this.props.bookInput}/>
					<button>Add Book</button>
				</form>
				<div className="bookList">
					<ul>
						{this.state.items.map((item) => {
							return (
								<li key={item.id}>
									<h3>{item.rec}</h3>
									<button onClick={() => this.removeItem(item.id)}>Remove Item</button>
								</li>
							)
						})}
					</ul>
				</div>
			</div>
		)
	}
}



class MovieForm extends React.Component {
	constructor() {
		super();
		this.state = {
			movieInput: "",
			items: [],
		}
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	componentDidMount() {
		const itemsRef = firebase.database().ref("movies");
		itemsRef.on("value", (snapshot) =>{
			let items = snapshot.val();
			let newState = [];
			for (let item in items) {
				newState.push({
					id: item,
					rec: items[item].rec,
					// what is this doing? creating an array of objects in the Firebase database
				});
			}
			this.setState({
				items: newState
			});
			// console.log(newState)
			// console.log(this.state.items);
			// the second console log (this.state) is one item behind the (newState). What?
		});
	}

	removeItem(itemId) {
		const itemRef = firebase.database().ref(`/movies/${itemId}`)
		itemRef.remove();
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
			<div>
				<form onSubmit={this.handleSubmit}>
					<input type="text" name="movieInput" placeholder="enter movie name" onChange={this.handleChange} value={this.props.movieInput}/>
					<button>Add Movie</button>
				</form>
				<div className="movieList">
					<ul>
						{this.state.items.map((item) => {
							return (
								<li key={item.id}>
									<h3>{item.rec}</h3>
									<button onClick={() => this.removeItem(item.id)}>Remove Item</button>
								</li>
							)
						})}
					</ul>
				</div>
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
		console.log(typeof this.props.type);
		// let button = "";
		// if (this.showListSection = true) {
		// 	button = (
		// 		<div>
		// 		<button className="titleButton" onClick={this.handleClick}>See My List</button>
		// 				<BookForm />
		// 		</div>
		// 	)
		// }

		// you need to use an if/then (or ternary operator) to display list from BookForm (have to create that component) rather than MovieForm component. Because right now you're getting list from BooksForm.
		// if this.props.type == "Books" show books else if this.props.type=="Movies" show movies else null?
		return (
			<div className="myList">
				<button className="titleButton" onClick={this.handleClick}>See My List</button>
				{this.state.showListSection ? <BookForm /> : null }
				{/*above says: if the state of ShowListSection is true, show BookForm, else nothing */}
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
				<button className="titleButton" onClick={this.handleClick}>{this.props.title}</button>
				{this.state.showHidden ? <div><HiddenButton type={this.props.title} /></div> : null}
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
              				<TitleCard title="Movies"/>
	              			<TitleCard title="Books"/>
						</div>
					</div>
				</header>
			
			</div>
		);
	}
}

ReactDOM.render(<App />, document.getElementById('app'));

