
import { geoOffer } from '@/constants/geoOffer'
import { getSelectedContent } from '@/utils/markdownParser'
import React from 'react'

export default async function Test(){
    const data = await getSelectedContent('mdcp', 'geo')
      
    console.log(geoOffer['mapa-do-celow-projektowych'] )


    return <div>Test</div>
}


