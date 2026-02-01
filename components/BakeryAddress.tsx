import React from "react";

export default function BakeryAddress() {
    return (
        <div className="rounded-2xl border border-bb-brown-20 bg-white/90 p-5">
            <p className="mb-3 text-sm uppercase tracking-[0.2em] text-bb-blue font-semibold">
                Pickup window
            </p>
            <p className="mb-4 text-bb-brown">
                Orders can be picked up between <strong>3:00–6:00 PM</strong> on
                your selected pickup date.
            </p>
            <div>
                <h3 className="font-semibold text-bb-ink mb-2">
                    Benji Bakes HQ
                </h3>
                <p className="text-bb-brown">4535 Mountaingate Dr.</p>
                <p className="text-bb-brown mb-2">Rocklin, CA 95765</p>
                <a
                    href="https://www.google.com/maps/place/4535+Mountaingate+Dr,+Rocklin,+CA+95765/@38.8288284,-121.2527969,17z/data=!3m1!4b1!4m6!3m5!1s0x809b1897ec277435:0x31e0224be2fb318c!8m2!3d38.8288284!4d-121.250222!16s%2Fg%2F11c2gc8b9g?entry=ttu&g_ep=EgoyMDI0MTAyMy4wIKXMDSoASAFQAw%3D%3D"
                    target="_blank"
                    rel="noreferrer"
                    className="underline font-semibold text-bb-blue"
                >
                    View on map
                </a>
            </div>
        </div>
    );
}
