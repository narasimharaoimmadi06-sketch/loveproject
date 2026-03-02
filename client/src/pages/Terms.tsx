import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";

export default function Terms() {
  return (
    <div className="min-h-screen bg-[#7b74cc] p-8 flex flex-col items-center">
      <header className="mb-12 text-center">
        <Link href="/">
          <h1 className="text-4xl font-bold text-white mb-2 cursor-pointer">Narasimharao</h1>
        </Link>
        <p className="text-white/80">Terms of Service</p>
      </header>

      <Card className="w-full max-auto max-w-4xl bg-white/20 backdrop-blur-md border-white/30 shadow-2xl text-white">
        <CardContent className="p-8 space-y-6">
          <section>
            <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
            <p className="text-white/90">By using Narasimharao PDF tools, you agree to these terms. If you do not agree, please do not use our services.</p>
          </section>
          <section>
            <h2 className="text-2xl font-semibold mb-4">2. Usage Rights</h2>
            <p className="text-white/90">You retain all rights to your uploaded files. You grant us a temporary license to process the files as needed for the service.</p>
          </section>
          <section>
            <h2 className="text-2xl font-semibold mb-4">3. Limitation of Liability</h2>
            <p className="text-white/90">We provide the service "as is" and are not responsible for any data loss or errors during processing.</p>
          </section>
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
