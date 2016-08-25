import React, { Component } from 'react';
import styles from './Logo.scss';
import classnames from 'classnames';

const Logo = () => {
	return (
		<div className = {classnames(styles.vcenter)}>  
			<span className = {classnames(styles.outer)}>
				Class 1
			</span>
			<span className = {classnames(styles.inner)}>
					Class 2
			</span>
		</div>
	);
}

export default Logo;