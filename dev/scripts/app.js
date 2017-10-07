import React from 'react';
import ReactDOM from 'react-dom';
import firebase from './firebase';


// My only simple component
const HiddenButton = (props) => {
		return (
			<div>
				<MyList type={props.type} />
			</div>
		);
}


// TV Shows Component
class ShowForm extends React.Component {
	constructor() {
		super();
		this.state = {
			showInput: "",
			items: [],
		}
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	componentDidMount() {
		const itemsRef = firebase.database().ref("shows");
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
			if (this.props.random === true) {
				const randomIndex = Math.round(Math.random() * newState.length);
				const randomItem = newState[randomIndex];
				newState = [randomItem];
			}
			this.setState({
				items: newState
			});
		});
	}

	removeItem(itemId) {
		const itemRef = firebase.database().ref(`/shows/${itemId}`)
		itemRef.remove();
	}

	handleChange(e) {
		this.setState({
			[e.target.name]: e.target.value
		});
	}

	handleSubmit(e) {
		e.preventDefault();
		const itemsRef = firebase.database().ref("shows");
		const item = {
			rec: this.state.showInput,
		}
		itemsRef.push(item);
		this.setState({
			showInput: "",
		})
	}

	render() {
		return (
			<div className="mainList">
				{this.props.random === false && (
				<form onSubmit={this.handleSubmit}>
					<input required className="inputField" type="text" name="showInput" placeholder="enter show name" onChange={this.handleChange} value={this.state.showInput}/>
					<button className="addToListButton">Add Show</button>
				</form>)}
				<div>
					<ul>
						{this.state.items.map((item) => {
							return (
								<div>
									<li className="itemsList" key={item.id}>
									 	<button className="removeButton" onClick={() => this.removeItem(item.id)}>&#10008;</button>
										{item.rec}
									</li>
								</div>
							)
						})}
					</ul>
				</div>
			</div>
		)
	}
}


// Books Component
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
				});
			}
			if (this.props.random === true) {
				const randomIndex = Math.round(Math.random() * newState.length);
				const randomItem = newState[randomIndex];
				newState = [randomItem];
			}
			this.setState({
				items: newState
			});
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
			<div className="mainList">
				{this.props.random === false && (
				<form onSubmit={this.handleSubmit}>
					<input required className="inputField" type="text" name="bookInput" placeholder="enter book name" onChange={this.handleChange} value={this.state.bookInput}/>
					<button className="addToListButton">Add Book</button>
				</form>)}
				<div className="bookList">
					<ul>
						{this.state.items.map((item) => {
							return (
								<div>
									<li className="itemsList" key={item.id}>
									 	<button className="removeButton" onClick={() => this.removeItem(item.id)}>&#10008;</button>
										{item.rec}
									</li>
								</div>
							)
						})}
					</ul>
				</div>
			</div>
		)
	}
}

// Movies Component
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
				});
			}
			if (this.props.random === true) {
				const randomIndex = Math.round(Math.random() * newState.length);
				const randomItem = newState[randomIndex];
				newState = [randomItem];
			}
			this.setState({
				items: newState
			});
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
			<div className="mainList">
				{this.props.random === false && (
				<form onSubmit={this.handleSubmit}>
					<input className="inputField" required type="text" name="movieInput" placeholder="enter movie name" onChange={this.handleChange} value={this.state.movieInput}/>
					<button className="addToListButton">Add Movie</button>
				</form>)}
				<div className="movieList">
					<ul>
						{this.state.items.map((item) => {
							return (
								<div>
									<li className="itemsList" key={item.id}>
									 	<button className="removeButton" onClick={() => this.removeItem(item.id)}>&#10008;</button>
										{item.rec}
									</li>
								</div>
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
			showListSection: false,
			showRandomItem: false,
		}
		this.handleClick = this.handleClick.bind(this);
		this.formToShow = this.formToShow.bind(this);
		this.randomItemToShow = this.randomItemToShow.bind(this);
		this.showRandom = this.showRandom.bind(this);
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

	showRandom() {
		if (this.state.showRandomItem === false) {
			this.setState( {
				showRandomItem: true
			});
		} else {
			this.setState( {
				showRandomItem: false
			})
		}
	}

	randomItemToShow() {
		if (this.props.type === "Movies") {
			return <MovieForm random={true} />
		} else if (this.props.type === "Shows"){
			return <ShowForm random={true} />
		} else {
			return <BookForm random={true} />
		}
	}
	formToShow() {
		if (this.props.type === "Movies") {
			return <MovieForm random={false} />
		} else if (this.props.type === "Shows"){
			return <ShowForm random={false} />
		} else {
			return <BookForm random={false} />
		}
	}

	render() {
		return (
			<div className="myList">
				<button className="getRandomButton" onClick={this.showRandom}>Get random</button>
				<button className="myListButton" onClick={this.handleClick}>See My List</button>
				{this.state.showRandomItem ? this.randomItemToShow() : null}
				{this.state.showListSection ? this.formToShow() : null}
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
			<div className="app">
				<header>
					<div className="titleText">
						<h1>Recommendation Lists</h1>
						<h2>Create lists that keep track of your movie, tv, and book recommendations.</h2>
					</div>
				</header>
				<section className="main wrapper">
					<div className="wrapper" className="container">
	      				<TitleCard title="Movies"/>
	          			<TitleCard title="Shows"/>
	          			<TitleCard title="Books"/>
					</div>
				</section>
				<footer>
					<p>&copy; 2017 Milena Djokic</p>
				</footer>
			
			</div>
		);
	}
}

ReactDOM.render(<App />, document.getElementById('app'));

