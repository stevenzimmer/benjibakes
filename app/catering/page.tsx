import type { Metadata } from "next";
import CateringForm from "@/components/Catering/Form";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
export const metadata: Metadata = {
    alternates: {
        canonical: "/catering",
    },
    title: "Catering by Benji Bakes - Homemade Cookies for every occasion",
    description:
        "Make your event extra sweet with Benji Bakes catering! We offer customizable cookie platters, individually wrapped treats, and large boxes at discounted rates. Perfect for weddings, parties, and corporate events.",
    keywords: [
        "cookie catering, event cookies, wedding cookies, party cookies, homemade cookie platters, custom cookie orders, corporate event cookies, bulk cookies, dessert catering, Benji Bakes catering",
    ],
};

const cookies = [
  {
    caption: "Custom order for a team event",
    path: "/catering/ind-cookie-boxes.jpg",
  },
  {
    caption: "Bulk cookies for setting up your own party displays",
    path: "/catering/assorted-cookie-platter.jpg",
  },
  {
    caption: "Custom order for client Holiday gifts",
    path: "/catering/wrapped-cookies.jpg",
  },
  {
    caption: "Custom combo flavor boxes",
    path: "/catering/cookie-box.jpg",
  },
  {
    caption: "Individually wrapped cookies for a conference",
    path: "/catering/cookie-boxes.jpg",
  },

  {
    caption: "Custom 4th of July cookies",
    path: "/catering/cookie-platter.jpg",
  },
  {
    caption: "Bulk cookies for setting up your own party displays",
    path: "/catering/cookie-platters.jpg",
  }
]
export default function CateringPage() {
    return (
        <div className="w-full">
            <h1 className="font-semibold text-3xl text-center mb-12">
                Benji Bakes Catering
            </h1>
            <div className="flex justify-between flex-wrap">
                <div className="w-full lg:w-7/12">
                    <h2 className="font-semibold text-xl mb-3">
                        Our Catering Options
                    </h2>
                    <ul className="list-disc pl-6 space-y-3">
                        <li>
                            <strong>Bulk cookies for large displays</strong>:
                            Order our homemade cookies in bulk at a special
                            discounted rate, perfect for customers looking to
                            create their own beautiful displays for parties and
                            events. Enjoy the flexibility to customize your
                            dessert table while delighting guests with our
                            incredible flavors.
                        </li>
                        <li>
                            <strong>Individually wrapped cookies</strong>:
                            Perfect for grab-and-go events or party favors. We
                            can customize the amount of cookies in each bag, a
                            custom label (i.e. Happy Birthday Benji), decorative
                            ribbon, and more!
                        </li>
                        <li>
                            <strong>Custom orders</strong>: Looking for
                            something even more unique? Let us know your vision,
                            and we’ll work together to make it happen!
                        </li>
                    </ul>
                    <Carousel
      opts={{
        align: "start",
        loop: true,
        
      }}
      className="w-full my-6 px-6"
    >
      <CarouselContent className="flex items-center w-full">
        {cookies.map((cookie, i) => (
          <CarouselItem key={i} className="w-full max-w-md mx-auto">
<Image src={cookie.path} alt={cookie.caption} width={500} height={500} className="rounded-lg shadow-lg w-full" />
       <p className="text-center text-slate-800 mt-3">{cookie.caption}</p>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="left-0 lg:-left-5 shadow-lg" />
      <CarouselNext className="right-0 lg:-right-5 shadow-lg" />
    </Carousel>
                </div>
                <div className="w-full lg:w-5/12  lg:px-6 xl:px-12">
                    <div className="bg-bb-brown-20 rounded-lg px-6 py-6 sticky top-24">
                        <h3 className="font-semibold text-xl text-center mb-6">
                            Ready to elevate your event with Benji Bakes Catering?
                        </h3>
                        <CateringForm />
                    </div>
                </div>
            </div>
        </div>
    );
}
