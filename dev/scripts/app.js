import React from 'react';
import ReactDOM from 'react-dom';
import Header from './Header.js';
import firebase from './firebase';
// note no need to add .js to Header and firebase above. They're optional. npm assumes you'll have it.

// WALKTHROUGH 
// Page loads, 
// constructor runs, render rounds, app successfully mounts to page
// componentDidMount is called. when its called an eventlistener fires that listens for new input values. Snapshot returns what's currently in there 
// we store it then push to new array. once its been pushed into new array - 
// setState is fired
// Then render (which always fires after setState)

// Props: higher level component can communicate with lower level (child) component
// Prop can be used to instruct lower level component to display something AND to have that lower communicate with higher / update the state of the higher level

const dbRef = firebase.database().ref('/items');

class Form extends React.Component {
	render() {
		return (
			<section className='add-item'>
			    <form onSubmit={this.props.handleSubmit}>
			      <input type="text" name="username" placeholder="What's your name?" onChange={this.props.handleChange} value={this.props.username} />
			      <input type="text" name="currentItem" placeholder="What are you bringing?" onChange={this.props.handleChange} value={this.props.currentItem} />
			      <button>Add Item</button>
			    </form>
			</section>
		)
	}
}

class App extends React.Component {
	constructor() {
		super();
		this.state = {
			username: '',
			currentItem: '',
			items: [],
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.removeItem = this.removeItem.bind(this);
	}
	removeItem(key) {
		const itemRef = firebase.database().ref(`/items/${key}`);
		itemRef.remove();

	}
	handleSubmit(event) {
		event.preventDefault();
		// .ref is where you're storing it in Firebase. We want to store it in a folder - so let's say "items".
		// const items = Array.from(this.state.items);
		const newItem = {
			foodName: this.state.currentItem,
			user: this.state.username,
		};
		dbRef.push(newItem);
		// items.push(newItem);
		// this.setState({
		// 	username: '',
		// 	currentItem: '',
		// 	items: items,
		// });
	}
	handleChange(event) {
		this.setState({
			[event.target.name]: event.target.value,
		});
	}

	componentDidMount() {
		// how on('value') works - when you snapshot event, it'll show you what's currently there at the start.
		// what is the type of firebaseItems? Object.
		// So need to convert the object into an array of items
		dbRef.on('value', (snapshot) => {
			const newItemsArray = [];
			const firebaseItems = snapshot.val();
			// looping over objects in js - for in loop
			for (let key in firebaseItems) {
				const firebaseItem = firebaseItems[key];
				firebaseItem.id = key;
				newItemsArray.push(firebaseItem);
				// NB: Important to use bracket notation here, not dot. Because otherwise it's looking for a property CALLED key rather than the key property
			}
			this.setState({
				items: newItemsArray,

			});
		});
	}

	render() {
	    return (
	    	// calling Header below
	    	// calling Form below
	    	// the {this.handleChange}: makes apps component handleChange method available inside the form component via PROPS.
	    	// it exposes the handleChange method above
	      <div className='app'>
	      	<Header />
	        <div className='container'>
        	{/* write comments here like this */}
        {/* think of a prop like a fancy HTML attribute */}
    	{/* in the below case the typeOf this is a method. We're referencing a function not calling it (see Ryan's stuff on fucntions as first class citizens*/}
 		{/*in this case props is an object with keys below: handleChange, handleSubmit, username, currentItem*/}
	        <Form 
	        	handleChange={this.handleChange}
	        	handleSubmit={this.handleSubmit}
	        	username={this.state.username}
	        	currentItem={this.state.currentItem}
        	/>
	          <section className='display-item'>
	            <div className='wrapper'>
	              <ul>
	              	{this.state.items.map((item, i) => {
	              		return (
	              			<li key={item.id}>
	              				<h3>{item.foodName}</h3>
	              				<p>brought by {item.user}</p>
	              				<button onClick={() => this.removeItem(item.id)}>Remove Item</button>
	              			</li>
	              		);
	              	})}
	              </ul>
	            </div>
	          </section>
	        </div>
	      </div>
	    );
	  }
}

ReactDOM.render(<App />, document.getElementById('app'));