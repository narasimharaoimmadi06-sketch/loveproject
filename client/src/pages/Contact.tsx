import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function Contact() {
  return (
    <div className="min-h-screen bg-[#7b74cc] p-8 flex flex-col items-center">
      <header className="mb-12 text-center">
        <Link href="/">
          <h1 className="text-4xl font-bold text-white mb-2 cursor-pointer">Narasimharao</h1>
        </Link>
        <p className="text-white/80">Contact Support</p>
      </header>

      <Card className="w-full max-auto max-w-xl bg-white/20 backdrop-blur-md border-white/30 shadow-2xl text-white">
        <CardContent className="p-8">
          <form className="space-y-4">
            <div>
              <label className="block mb-1 text-sm font-medium">Name</label>
              <Input className="bg-white/10 border-white/20 text-white placeholder:text-white/40" placeholder="Your Name" />
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium">Email</label>
              <Input type="email" className="bg-white/10 border-white/20 text-white placeholder:text-white/40" placeholder="your@email.com" />
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium">Message</label>
              <Textarea className="bg-white/10 border-white/20 text-white placeholder:text-white/40 min-h-[120px]" placeholder="How can we help?" />
            </div>
            <Button className="w-full bg-white text-[#7b74cc] hover:bg-white/90">Send Message</Button>
          </form>
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
