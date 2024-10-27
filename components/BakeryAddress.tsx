import React from "react";

export default function BakeryAddress() {
    return (
        <div className="bg-blue-50 p-3 rounded-lg">
            <p className="mb-2">
                Orders are picked up between 3pm - 6pm at our home bakery:
            </p>
            <div className="px-3">
                <p>4535 Mountaingate Dr.</p>
                <p>Rocklin, CA 95765</p>
                <a
                    href="https://www.google.com/maps/place/4535+Mountaingate+Dr,+Rocklin,+CA+95765/@38.8288284,-121.2527969,17z/data=!3m1!4b1!4m6!3m5!1s0x809b1897ec277435:0x31e0224be2fb318c!8m2!3d38.8288284!4d-121.250222!16s%2Fg%2F11c2gc8b9g?entry=ttu&g_ep=EgoyMDI0MTAyMy4wIKXMDSoASAFQAw%3D%3D"
                    target="_blank"
                    className="underline font-semibold"
                >
                    View on map
                </a>
            </div>
        </div>
    );
}
