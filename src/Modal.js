import React, { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'

const Modal = ({ children }) => {
	// useRef will let you target the modal when you're done and clean up your garbage
	const elRef = useRef(null)
	if (!elRef.current) {
		const div = document.createElement('div')
		elRef.current = div
	}

	useEffect(() => {
		const modalRoot = document.getElementById('modal')
		modalRoot.appendChild(elRef.current)

		// If you return a function, it is the cleanup function (when unmounts)
		return () => modalRoot.removeChild(elRef.current)
		// Force it to run once
	}, [])

	return createPortal(<div>{children}</div>, elRef.current)
}

export default Modal
