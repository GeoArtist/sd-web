import { Roboto} from 'next/font/google'
 


export const roboto = Roboto({
  weight: ["100", "400", "700"],
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-roboto",
  preload: true,
});