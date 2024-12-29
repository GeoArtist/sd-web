'use client'
import { redirect } from 'next/navigation'
import { useCurrentPath } from "@/app/contexts/CurrentPathContext";


export default function DefaultServicePage() {
    const currentPath = useCurrentPath()
    const category = currentPath.split("/")[2]

    if (currentPath.endsWith(category))
    { switch (category) {
        case 'geodezja':
            redirect('/oferta/geodezja/mapa-do-celow-projektowych')
        case 'gis':
            redirect('/oferta/gis/gis')
        case 'data-analysis':
            redirect('/oferta/data-analysis/data-analysis')
        default:
            redirect('/oferta/geodezja/mapa-do-celow-projektowych')}}
}