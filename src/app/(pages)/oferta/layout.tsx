
import { ServiceLayoutView } from "@/views/ServiceLayoutView/ServiceLayoutView";


export default function OfferLayout(props: LayoutProps<"/oferta">) {
  return <ServiceLayoutView>{props.children}</ServiceLayoutView>;
}