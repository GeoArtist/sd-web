import { OfferMenu } from "@/app/components/OfferMenu/OfferMenu"


export default function GeoOffer({children}:{children:React.ReactNode}) {
    return <>
    <OfferMenu display={true} menuType={'sidebar'}></OfferMenu>
    {children}
    </>
}