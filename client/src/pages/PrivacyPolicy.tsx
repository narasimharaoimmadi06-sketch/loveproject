import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-[#7b74cc] p-8 flex flex-col items-center">
      <header className="mb-12 text-center">
        <Link href="/">
          <h1 className="text-4xl font-bold text-white mb-2 cursor-pointer">Narasimharao</h1>
        </Link>
        <p className="text-white/80">Privacy Policy</p>
      </header>

      <Card className="w-full max-auto max-w-4xl bg-white/20 backdrop-blur-md border-white/30 shadow-2xl text-white">
        <CardContent className="p-8 space-y-6">
          <section>
            <h2 className="text-2xl font-semibold mb-4">1. Information We Collect</h2>
            <p className="text-white/90">We do not store your uploaded files permanently. Files are processed in real-time and deleted from our temporary storage immediately after processing or after a short period.</p>
          </section>
          <section>
            <h2 className="text-2xl font-semibold mb-4">2. How We Use Data</h2>
            <p className="text-white/90">We use your files solely to provide the conversion service you requested. We do not analyze or share the content of your files.</p>
          </section>
          <section>
            <h2 className="text-2xl font-semibold mb-4">3. Security</h2>
            <p className="text-white/90">Your files are handled securely using industry-standard encryption during transit and at rest in our temporary processing environment.</p>
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
