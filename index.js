import { h, render } from 'https://esm.sh/preact';
import { useState, useEffect, useMemo } from 'https://esm.sh/preact/hooks';
import htm from 'https://esm.sh/htm';

const html = htm.bind(h);

const PersonIcon = () => {
	return html`
		<svg viewBox="0 -2 24 24">
		<title/>
		<circle cx="12" cy="8" fill="#464646" r="4"/><path d="M20,19v1a1,1,0,0,1-1,1H5a1,1,0,0,1-1-1V19a6,6,0,0,1,6-6h4A6,6,0,0,1,20,19Z" fill="#464646"/>
		</svg>`;
}

const mkLink = (onclick) => ({ children }) => html`<a href="#" onclick=${onclick} class="btn">${children}</a>`

const Card = ({ title, subtitle, icon, children }) => {
	let iconEl = icon ? html`<${icon}/>` : "";
	return html`
	<div class="card">
	  <div class="card-body">
	  	<h5 class="card-title">${iconEl} ${title}</h5>
    	<h6 class="card-subtitle mb-2 text-muted">${subtitle}</h6>
		${children}
	  </div>
	</div>`
}

const AboutMePage = ({ goTo }) => {
	const Experience = mkLink(goTo('experience'))
	const AboutMe = mkLink(goTo('aboutme'))

	return html`
	<${Section}>
		<${Card} icon=${PersonIcon} title="Maciej Wasilewski" subtitle="Software Engineer"> 
			<p class="card-text">
				I'm a:
				<ul>
					<li>Professional software engineer with 3 years of experience</li>
					<li>Open source enthusiast and contributor</li>
				</ul>
			</p>
			<${Experience}>Experience<//>
			<${AboutMe}>About me<//>
		<//>
	<//>`
}

const Experience = ({ goTo }) => {
	const AboutMe = mkLink(goTo('aboutme'))
	const Projects = mkLink(goTo('projects'))

	return html`
	<${Section} sizes=${[9, 10, 12]}>
		<${Card} title="Maciej Wasilewski" subtitle="My Experience">
			<p class="card-text">
				I'm a:
				<ul>
					<li>Professional software engineer with 3 years of experience</li>
					<li>Open source enthusiast and contributor</li>
					<li>Open source enthusiast and contributor</li>
					<li>Open source enthusiast and contributor</li>
					<li>Open source enthusiast and contributor</li>
					<li>Open source enthusiast and contributor</li>
					<li>Open source enthusiast and contributor</li>
					<li>Open source enthusiast and contributor</li>
					<li>Open source enthusiast and contributor</li>
					<li>Open source enthusiast and contributor</li>
					<li>Open source enthusiast and contributor</li>
					<li>Open source enthusiast and contributor</li>
				</ul>
			</p>
			
			<${AboutMe}>About me<//>
			<${Projects}>Projects<//>
		<//>
	<//>`
}

const Section = ({ children, sizes=[6, 8, 10] }) => {
	const middleClasses = `col-lg-${sizes[0]} col-md-${sizes[2]} col-sm-${sizes[2]}`
	const rightClasses = `col-lg-${12 - sizes[0]} col-md-${12 - sizes[1]} col-sm-${12 - sizes[2]}`
	return html`
		<div class="section row align-items-center">
	  		<div class="col-lg-0 col-md-0 col-sm-0"></div>
	  		<div class=${middleClasses}>${children}</div>
	  		<div class=${rightClasses}></div>
		</div>`
}

const Glitters = () => {
	return html`		
	<ul class="circles" style="z-index:-1;">
		<li style="background: var(--blue-light)"></li>
		<li style="background: var(--blue-darkest)"></li>
		<li style="background: var(--blue-dark)"></li>
		<li style="background: var(--blue-light)"></li>
		<li style="background: var(--blue-lightest)"></li>
		<li style="background: var(--blue-light)"></li>
		<li style="background: var(--blue-lightest)"></li>
		<li style="background: var(--blue-lightest)"></li>
		<li style="background: var(--blue-lightest)"></li>
		<li style="background: var(--blue)"></li>
	</ul>`
}

const PAGES = {
	"aboutme": AboutMePage,
	"experience": Experience
}

const getPageFromHash = () => (location.hash && location.hash.slice(1) in PAGES)
	? location.hash.slice(1)
	: "aboutme";

const App = ({ }) => {
	let [page, setPage] = useState(getPageFromHash());

	let goTo = (page) => () => {
		setPage(page);
	}

	useEffect(
		() => location.hash = page,
		[page]
	)

	window.onhashchange = function() {
		setTimeout(
			() => (getPageFromHash() !== page) ? window.location.reload() : null,
			100 // To prevent data-race on the `page` variable
		)
	}

	let shownElement = useMemo(
		() => PAGES[page],
		page
	);

	return html`
	<div class="container area">
		<${shownElement} goTo=${goTo}/>
		<${Glitters}/>
	</div>`
}

const renderApp = () => {
	const mount = document.getElementById("app-mountpoint");
	return render(html`<${App}/>`, mount);
}

export default renderApp