import Image from "next/image";
import Link from "next/link";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <Link
          href="/"
          className="flex items-center gap-2 self-center font-medium"
        >
          <div className="flex size-6 items-center justify-center rounded-md">
            <Image
              src="/logo/wolfkrow.svg"
              alt="WolfKrow AI"
              width={25}
              height={25}
            />
          </div>
          WolfKrow AI
        </Link>
        {children}
      </div>
    </div>
  );
}
