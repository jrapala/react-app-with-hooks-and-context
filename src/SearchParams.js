import React, { useState, useEffect } from 'react'
import pet, { ANIMALS } from '@frontendmasters/pet'
import useDropdown from './useDropdown'

const SearchParams = () => {
	const [location, setLocation] = useState('Seattle, WA')
	const [breeds, setBreeds] = useState([])
	const [animal, AnimalDropdown] = useDropdown('Animal', 'dog', ANIMALS)
	const [breed, BreedDropdown, setBreed] = useDropdown('Breed', '', breeds)

	useEffect(() => {
		// First, clear the breeds
		setBreeds([])
		setBreed('')

		pet.breeds(animal).then(({ breeds }) => {
			const breedStrings = breeds.map(({ name }) => name)
			setBreeds(breedStrings)
		}, console.error)
	}, [animal, setBreed, setBreeds]) // only run useEffect when animal updates, add setBreed and setBreeds since ESLint depends it (it's technically correct)

	return (
		<div className="search-params">
			<form>
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
		</div>
	)
}

export default SearchParams
