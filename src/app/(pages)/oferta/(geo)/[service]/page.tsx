import ServiceDescription from "@/app/components/ServiceDescription/ServiceDescription"
import { geoOffer } from "@/constants/geoOffer"
import { getSelectedContent } from "@/utils/markdownParser"

export  default async function GeoOffer({params}:{params:Promise<{service:string}>}){
    // Retrieve the service from the params
    const service  = (await params).service
    
    // Get the markdown file name from the service (query param)
    const md_filename = geoOffer.filter(geo => geo.path === service)[0]?.mdFileName

    if (!md_filename) {
        throw new Error('Service not found')
    }
    const md_content  = await getSelectedContent(md_filename, 'geo')
    

    return<>
    <h1>GEO OFFER</h1>
    <ServiceDescription md_content={md_content}/>
   
    </>
}

