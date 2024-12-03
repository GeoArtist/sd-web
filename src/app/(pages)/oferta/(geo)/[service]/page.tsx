import ServiceDescription from "@/app/components/ServiceDescription/ServiceDescription"
import { geoOffer } from "@/constants/geoOffer"
import { geoOfferImgs } from "@/constants/geoOfferImgs"
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
    const img = geoOfferImgs.filter(img => img.alt === md_filename)[0]

    return<>
    <ServiceDescription md_content={md_content} img={img}/>
   
    </>
}

