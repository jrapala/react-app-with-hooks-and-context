import React from 'react'
import { navigate } from '@reach/router'
import pet from '@frontendmasters/pet'
import Carousel from './Carousel'
import ErrorBoundary from './ErrorBoundary'
import ThemeContext from './ThemeContext'
import Modal from './Modal'

class Details extends React.Component {
	state = {
		loading: true,
		showModal: false,
	}

	componentDidMount() {
		pet.animal(this.props.id).then(({ animal }) => {
			this.setState({
				url: animal.url,
				name: animal.name,
				animal: animal.type,
				location: `${animal.contact.address.city}, ${animal.contact.address.state}`,
				description: animal.description,
				media: animal.photos,
				breed: animal.breeds.primary,
				loading: false,
			})
		}, console.error) // eslint-disable-line no-console
	}

	toggleModal = () => {
		this.setState({ showModal: !this.state.showModal })
	}

	adopt = () => navigate(this.state.url)

	render() {
		const { name, animal, location, description, media, breed, loading, showModal } = this.state

		if (loading) {
			return <h1>Loading...</h1>
		}

		return (
			<div className="details">
				<Carousel media={media} />
				<div>
					<h1>{name}</h1>
					<h2>{`${animal} - ${breed} - ${location}`}</h2>
					{/* Using context in a Class Component */}
					<ThemeContext.Consumer>
						{themeHook => (
							<button
								style={{ backgroundColor: themeHook[0] }}
								onClick={this.toggleModal}
							>
								Adopt {name}
							</button>
						)}
					</ThemeContext.Consumer>
					<p>{description}</p>
					{showModal ? (
						<Modal>
							<h1>Would you like to adopt {name}?</h1>
							<div className="buttons">
								<button onClick={this.adopt}>Yes</button>
								<button onClick={this.toggleModal}>No, I&apos;m a monster</button>
							</div>
						</Modal>
					) : null}
				</div>
			</div>
		)
	}
}

export default function DetailsWithErrorBoundary(props) {
	return (
		<ErrorBoundary>
			<Details {...props} />
		</ErrorBoundary>
	)
}
