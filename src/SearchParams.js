import React, { useState, useEffect } from 'react'
import pet, { ANIMALS } from '@frontendmasters/pet'
import useDropdown from './useDropdown'
import Results from './Results'

const SearchParams = () => {
	const [location, setLocation] = useState('Seattle, WA')
	const [breeds, setBreeds] = useState([])
	const [animal, AnimalDropdown] = useDropdown('Animal', 'dog', ANIMALS)
	const [breed, BreedDropdown, setBreed] = useDropdown('Breed', '', breeds)
	const [pets, setPets] = useState([])

	// An async function is a function that is guaranteed to return a promise
	async function requestPets() {
		// Wait until pet.animals() completes, and then give back the data
		const { animals } = await pet.animals({
			location,
			breed,
			type: animal,
		})
		// Set to either the array of animals, or an empty array
		setPets(animals || [])
	}

	useEffect(() => {
		// First, clear the breeds
		setBreeds([])
		setBreed('')

		// Fetch from API
		pet.breeds(animal).then(({ breeds: apiBreeds }) => {
			const breedStrings = apiBreeds.map(({ name }) => name)
			setBreeds(breedStrings)
		}, console.error) // eslint-disable-line no-console
	}, [animal, setBreed, setBreeds]) // only run useEffect when animal updates, add setBreed and setBreeds since ESLint demands it (it's technically correct)

	return (
		<div className="search-params">
			<form
				onSubmit={e => {
					e.preventDefault()
					requestPets()
				}}
			>
				<label htmlFor="location">
					Location
					<input
						id="location"
						value={location}
						placeholder="Location"
						onChange={e => setLocation(e.target.value)}
					/>
				</label>
				<AnimalDropdown />
				<BreedDropdown />
				<button>Submit</button>
			</form>
			<Results pets={pets} />
		</div>
	)
}

export default SearchParams
