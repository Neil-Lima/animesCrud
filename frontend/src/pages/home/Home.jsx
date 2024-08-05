import React, { useState } from 'react'
import NavAnime from '../components/NavAnime'
import FormAnime from '../components/FormAnime'
import CardAnime from '../components/CardAnime'

function Home() {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleAnimeAdded = () => {
    setRefreshTrigger(prev => prev + 1);
  };
  return (
   <>
   <NavAnime/><br />
   <FormAnime onAnimeAdded={handleAnimeAdded} />
   <CardAnime refreshTrigger={refreshTrigger} />
   </>
  )
}

export default Home