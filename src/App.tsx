// React
import React, { useState } from 'react';
// Componentes
import Feedback from './components/Feedback';
import Signup from './components/Signup';
import Success from './components/Success';
// Imagens
import logo from './svg/logo.svg';
// Tipos
import Data from './interface';

// Componente App
const App = () => {
	// Estado
	const [data, setData] = useState<Data>(null);
	// Render
	return (
		<>
			{data && <Success />}
			<div className="background">
				<img
					className="background__logo"
					src={logo}
					alt="Logo Docket"
				/>
				<main className="main">
					<Signup handleData={setData} />
					<Feedback data={data} />
				</main>
			</div>
			<footer className="footer">
				<p className="footer__text">Docket © 2019</p>
			</footer>
		</>
	);
}
export default App;
