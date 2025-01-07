import ServiceDescription from "@/app/components/ServiceDescription/ServiceDescription"
import { offerServices } from "@/constants/offerCategories"

import { getSelectedContent } from "@/utils/markdownParser"

export  default async function Offer({params}:{params:Promise<{service:string, category:string}>}) {
    // Retrieve the category, service from the params
    const {service, category}  = (await params)

    // Get the markdown file name from the service (query param)
    const offer = offerServices.filter(offer => offer.path === service)[0]

    if (!offer) {
      throw new Error("Service not found");
    } 
    const md_content  = await getSelectedContent(offer.mdFileName, 'offer/'+category)

    return<>
    <ServiceDescription md_content={md_content} offer={offer}/>
   
    </>
}

