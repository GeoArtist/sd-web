import ServiceDescription from "@/app/components/ServiceDescription/ServiceDescription"
import { geoOffer } from "@/constants/offerCategories"
import { geoOfferImgs } from "@/constants/geoOfferImgs"
import { getSelectedContent } from "@/utils/markdownParser"

export  default async function GeoOffer({params}:{params:Promise<{service:string}>}){
    // Retrieve the service from the params
    const service  = (await params).service

    
    // Get the markdown file name from the service (query param)
    const mdFilename = geoOffer.filter(geo => geo.path === service)[0]?.mdFileName

    if (!mdFilename) {
        throw new Error('Service not found')
    }
    const md_content  = await getSelectedContent(mdFilename, 'offer/geodezja')
    const img = geoOfferImgs.filter(img => img.alt === mdFilename)[0]

    return<>
    <ServiceDescription md_content={md_content} img={img}/>
   
    </>
}

