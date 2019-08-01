import React, { Component } from 'react'

export class Carousel extends Component {
	state = {
		photos: [],
		active: 0,
	}

	// Takes in a set of props and gives back a new of state
	static getDerivedStateFromProps({ media }) {
		let photos = ['http://placecorgi.com/600/600']

		if (media.length) {
			photos = media.map(({ large }) => large)
		}

		// Return the object that gets merged into state
		return { photos }
	}

	handleIndexClick = event => {
		this.setState({
			active: +event.target.dataset.index,
		})
	}

	render() {
		const { photos, active } = this.state
		return (
			<div className="carousel">
				<img src={photos[active]} alt="animal" />
				<div className="carousel-smaller">
					{photos.map((photo, index) => (
						// Note, this isn't very accessible (onClick should be on a button, not an image)
						// eslint-disable-next-line
						<img
							key={photo}
							onClick={this.handleIndexClick}
							data-index={index}
							src={photo}
							className={index === active ? 'active' : ''}
							alt="animal thumbnail"
						/>
					))}
				</div>
			</div>
		)
	}
}

export default Carousel
