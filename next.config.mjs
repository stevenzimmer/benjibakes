import autoCert from "anchor-pki/auto-cert/integrations/next";
/** @type {import('next').NextConfig} */

const withAutoCert = autoCert({
    enabledEnv: "development",
});

const nextConfig = {
    reactStrictMode: true,
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
