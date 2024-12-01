type OfferSidebarProps={
    menuType:'sidebar'
}

type OfferDropDownProps={
    display:boolean,
    menuType:'dropdown'
}

export type OfferMenuProps= OfferSidebarProps | OfferDropDownProps