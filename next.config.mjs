/** @type {import('next').NextConfig} */

import autoCert from "anchor-pki/auto-cert/integrations/next";

const withAutoCert = autoCert({
    enabledEnv: "development",
});

const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "files.stripe.com",
                port: "",
                pathname: "/links/**",
            },
        ],
    },
};

export default withAutoCert(nextConfig);
