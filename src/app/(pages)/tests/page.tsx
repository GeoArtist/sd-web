
import { geoOfferMap } from '@/constants/geoOffer'
import { getSelectedContent } from '@/utils/markdownParser'
import React from 'react'

export default async function Test(){
    const data = await getSelectedContent('mdcp', 'geo')
      
    console.log(geoOfferMap['mapa-do-celow-projektowych'] )


    return <div>Test</div>
}


