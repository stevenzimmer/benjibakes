import type { Metadata } from "next";
export const metadata: Metadata = {
    robots: {
      index: false,
    },
  };

export default function layout({children}: {children: React.ReactNode}) {
    return <div className="min-h-dvh flex  justify-center ">{children}</div>;
}
