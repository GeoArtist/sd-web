
import { getSelectedContent } from '@/utils/markdownParser'
import React from 'react'

export default async function Test(){
    const data = await getSelectedContent('offer')

    


    return <div>Test{data.content}</div>
}


