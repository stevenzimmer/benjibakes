import type { Metadata } from "next";
import Image from "next/image";
import CateringForm from "@/components/Catering/Form";
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
            <h1 className="font-display text-4xl md:text-5xl text-center mb-12 text-bb-ink">
                Benji Bakes Catering
            </h1>
            <div className="flex justify-between flex-wrap">
                <div className="w-full lg:w-7/12">
                    <h2 className="font-display text-2xl mb-3 text-bb-ink">
                        Our Catering Options
                    </h2>
                    <ul className="list-disc pl-6 space-y-3 text-bb-brown">
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
                    <div className="columns-2 sm:gap-6 mt-8">
                    {cookies.map((cookie, i) => (
          <div key={i} className="w-full mx-auto py-6 break-inside-avoid-column ">
<Image src={cookie.path} alt={cookie.caption} width={500} height={500} className="rounded-2xl border border-bb-brown-20 shadow-lg w-full object-cover" />
       <p className="text-center text-bb-brown mt-3 px-3 text-sm sm:text-base">{cookie.caption}</p>
          </div>
        ))}
                    </div>
                </div>
                <div className="w-full lg:w-5/12 lg:pl-6 xl:pl-12">
                    <div className="bg-white/90 border border-bb-brown-20 rounded-2xl px-6 py-6 sticky top-24 shadow-lg">
                        <h3 className="font-display text-2xl text-center mb-4 text-bb-ink">
                            Ready to elevate your event with Benji Bakes Catering?
                        </h3>
                        <p className="text-bb-brown text-center mb-6">
                            Tell us about your event and we&apos;ll craft a custom quote.
                        </p>
                        <CateringForm />
                    </div>
                </div>
            </div>
        </div>
    );
}
