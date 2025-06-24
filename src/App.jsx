import { useState } from 'react'
import './App.css'  
import 'bootswatch/dist/slate/bootstrap.min.css'

import Map from './Map'
const MAPBOX_ACCESS_TOKEN =
  "pk.eyJ1IjoiYXR0aWxhNTIiLCJhIjoiY2thOTE3N3l0MDZmczJxcjl6dzZoNDJsbiJ9.bzXjw1xzQcsIhjB_YoAuEw";

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
       <Map MAPBOX_ACCESS_TOKEN={MAPBOX_ACCESS_TOKEN} />
    </>
  )
}

export default App
