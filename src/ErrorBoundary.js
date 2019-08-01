// Mostly code from reactjs.org/docs/error-boundaries.html
import React, { Component } from 'react'
import { Link, Redirect } from '@reach/router'

export class ErrorBoundary extends Component {
	state = {
		hasError: false,
		redirect: false,
	}

	static getDerivedStateFromError() {
		return { hasError: true }
	}

	componentDidCatch(error, info) {
		console.error('ErrorBoundary caught an error', error, info) // eslint-disable-line no-console
	}

	componentDidUpdate() {
		if (this.state.hasError) {
			setTimeout(() => {
				this.setState({ redirect: true })
			}, 5000)
		}
	}

	render() {
		if (this.state.redirect) {
			return <Redirect to="/" />
		} else if (this.state.hasError) {
			return (
				<h1>
					There was an error with this listing. <Link to="/">Click here</Link> to go back
					to the home page or wait 5 seconds.
				</h1>
			)
		} else {
			return this.props.children
		}
	}
}

export default ErrorBoundary
