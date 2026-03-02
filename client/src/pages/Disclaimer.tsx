import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";

export default function Disclaimer() {
  return (
    <div className="min-h-screen bg-[#7b74cc] p-8 flex flex-col items-center">
      <header className="mb-12 text-center">
        <Link href="/">
          <h1 className="text-4xl font-bold text-white mb-2 cursor-pointer">Narasimharao</h1>
        </Link>
        <p className="text-white/80">Disclaimer</p>
      </header>

      <Card className="w-full max-auto max-w-4xl bg-white/20 backdrop-blur-md border-white/30 shadow-2xl text-white">
        <CardContent className="p-8 space-y-6 text-center">
          <p className="text-lg">
            The information provided on Narasimharao is for general informational purposes only. All file conversions are performed "at your own risk".
          </p>
          <p className="text-white/80">
            We do not guarantee the accuracy or reliability of any converted documents and are not responsible for any damages resulting from the use of our tools.
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
