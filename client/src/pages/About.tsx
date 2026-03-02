import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";

export default function About() {
  return (
    <div className="min-h-screen bg-[#7b74cc] p-8 flex flex-col items-center">
      <header className="mb-12 text-center">
        <Link href="/">
          <h1 className="text-4xl font-bold text-white mb-2 cursor-pointer">Narasimharao</h1>
        </Link>
        <p className="text-white/80">About Us</p>
      </header>

      <Card className="w-full max-auto max-w-4xl bg-white/20 backdrop-blur-md border-white/30 shadow-2xl text-white">
        <CardContent className="p-8 space-y-6">
          <p className="text-xl leading-relaxed">
            Narasimharao is a premium suite of online tools designed to make working with PDFs easy, fast, and secure. Our mission is to provide high-quality file conversion tools with elegance.
          </p>
          <p className="text-lg">
            Whether you need to merge PDFs, convert images, or compress documents, we've got you covered with a focus on privacy and user experience.
          </p>
        </CardContent>
      </Card>
      
      <footer className="mt-auto pt-12 text-white/60 text-sm">
        <div className="flex gap-4 justify-center">
          <Link href="/privacy-policy">Privacy Policy</Link>
          <Link href="/terms">Terms</Link>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
          <Link href="/disclaimer">Disclaimer</Link>
        </div>
      </footer>
    </div>
  );
}
