import React, { Component } from 'react';

import styles from './App.scss';
import Logo from '../Logo';

class App extends Component {
	
	componentDidMount() {
		const { store } = this.context;
		this.unsubscribe = store.subscribe(() => this.forceUpdate()); 
	}

	render(){
		const prop = this.props;
		const { store } = this.context;
		return <Logo/>
	}

	componentWillUnmount() {
		this.unsubscribe();
	}
}

App.contextTypes = {
	store: React.PropTypes.object
}

export default App; 