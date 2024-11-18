
import { getContent } from '@/utils/markdownParser'
import React from 'react'

export default async function Test(){
    const data = await getContent('offer')

    


    return <div>Test{data.content}</div>
}


