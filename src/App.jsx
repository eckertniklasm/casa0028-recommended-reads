import { useState } from 'react'
import TitleBar from './components/TitleBar'
import MapDisplay from './components/MapDisplay'
import './tw-styles.css'
import PlaqueModal from './components/PlaqueModal'

function App() {

  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <div className="mx-auto max-w-screen-xl h-screen bg-gray-50 flex flex-col overflow-hidden">
      <TitleBar title="Recommended Reading" />
      <MapDisplay longitude={-0.137310} latitude={51.521699} />
      {isModalOpen ? <PlaqueModal setIsModalOpen={setIsModalOpen} /> : null}
  </div>
  )
}

export default App
