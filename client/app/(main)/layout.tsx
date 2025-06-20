import Image from "next/image";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="min-h-screen relative overflow-hidden">
        <Image
          src="/background.jpg"
          alt="Background Image"
          fill
          className="object-cover absolute inset-0 z-0 scale-105 transition-transform duration-[20s] ease-out hover:scale-100"
          priority
        />

        <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-black/70 z-[1]" />

        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-transparent to-purple-500/5 z-[1] animate-pulse" />
        {children}
      </div>
    </>
  );
}
