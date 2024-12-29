import ServiceDescription from "@/app/components/ServiceDescription/ServiceDescription"
import { offerServices } from "@/constants/offerCategories"
import { offerImgs} from "@/constants/offerImgs"
import { getSelectedContent } from "@/utils/markdownParser"

export  default async function Offer({params}:{params:Promise<{service:string, category:string}>}) {
    // Retrieve the category, service from the params
    const {service, category}  = (await params)

    // Get the markdown file name from the service (query param)
    const mdFilename = offerServices.filter(offer => offer.path === service)[0]?.mdFileName

    if (!mdFilename) {
        throw new Error('Service not found')
    }
    const md_content  = await getSelectedContent(mdFilename, 'offer/'+category)
    const img = offerImgs.filter(img => img.alt === mdFilename)[0]

    return<>
    <ServiceDescription md_content={md_content} img={img}/>
   
    </>
}

