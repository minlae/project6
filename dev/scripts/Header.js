import React from 'react';

// my note: this simple component = the function that I have in my template literals.
// NB don't break things into component unless you need it to do something
// Gulp bundles all these modules together into one script file
// import and export come from Babelify and Browserify

const Header = () => {
	return (
		<header>
		    <div className='wrapper'>
		      <h1>Fun Food Friends</h1>
		    </div>
		</header>
	)
}

export default Header;