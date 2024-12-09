import RegulationView from '@/app/views/RegulationView/RegulationView'
import { regulations } from '@/constants/regulations'

import { getSelectedContentHTML } from '@/utils/markdownParser'

export default async function RegulationsPage({params}:{params:Promise<{regulation:string}>}){
    const regulation = (await params).regulation

    const md_filename = regulations.filter(reg => reg.path === regulation)[0]?.mdFileName

    const md_contentHTML  = await getSelectedContentHTML(md_filename, 'regulations')
    
    return (
        <RegulationView md_contentHTML={md_contentHTML} />
    )
}