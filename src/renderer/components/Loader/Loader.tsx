import React from 'react';
import './Loader.css';

interface ILoaderProps {
	loading?: boolean;
}

const Loader = ({
	loading = false
}: ILoaderProps) => (
	<div className={loading ? 'loading' : ''}>
		<div className={loading ? 'loader' : ''}>
			<div/><div/><div/><div/>
		</div>
	</div>
);

export default Loader;