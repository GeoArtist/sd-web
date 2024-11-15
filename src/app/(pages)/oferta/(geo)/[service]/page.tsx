
export  default async function GeoOffer({params}:{params:Promise<{service:string}>}){
    const service  = (await params).service
    
    return<>
    <h1>GEO OFFER</h1>
    <p>Service: {service}</p>
    </>
}