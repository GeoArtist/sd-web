import dashboard from '@/public/icons/offer/dashboard.svg'
import data from '@/public/icons/offer/data.svg'
import drone from '@/public/icons/offer/drone.svg'
import earth from '@/public/icons/offer/earth.svg'
import gnss from '@/public/icons/offer/gnss.svg'
import map from '@/public/icons/offer/roadmap.svg'
import { OfferIconsLink } from '@/types/offerIconsLink'

export const offerIcons:OfferIconsLink[] = [
    {title: 'Geodezja', icon: gnss},
    {title: 'GiS', icon: earth },
    {title: 'Drony', icon: drone },
    {title: 'Analiza Danych', icon: dashboard },
    {title: 'Wizualizacje', icon: map},
    {title: 'Programowanie', icon: data},

]