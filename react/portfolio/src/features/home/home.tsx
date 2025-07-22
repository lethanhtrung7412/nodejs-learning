import { Button } from "@/components/ui/button";
import { ArrowRight, Download, Github, Mail, Linkedin } from "lucide-react";
import avatar from "@/assets/avatar.jpg"
interface HeroProps {
  scrollToSection: (sectionId: string) => void;
}

export function Hero({ scrollToSection }: HeroProps) {
  return (
    <section id="hero" className="py-16 md:py-24">
      <div className="container px-4 md:px-6">
        <div className="grid gap-8 md:grid-cols-2 md:gap-12 items-center">
          <div className="flex flex-col gap-4">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              Le Thanh Trung
            </h1>
            <h2 className="text-xl font-medium text-muted-foreground">
              Backend Developer & Odoo Developer
            </h2>
            <p className="text-muted-foreground max-w-[600px]">
              I build accessible, user-friendly web applications with modern
              technologies. Focused on creating clean, efficient code and
              intuitive user experiences.
            </p>

            <div className="flex flex-wrap gap-3 mt-2">
              <Button asChild size="sm" variant="outline">
                <a href="mailto:lethanhtrung7412@gmail.com">
                  <Mail className="mr-2 h-4 w-4" />
                  Contact Me
                </a>
              </Button>
              <Button asChild size="sm" variant="outline">
                <a href="https://github.com/lethanhtrung7412" target="_blank" rel="noopener noreferrer">
                  <Github className="mr-2 h-4 w-4" />
                  GitHub
                </a>
              </Button>
              <Button asChild size="sm" variant="outline">
                <a href="https://www.linkedin.com/in/lethanhtrung712/" target="_blank" rel="noopener noreferrer">
                  <Linkedin className="mr-2 h-4 w-4" />
                  LinkedIn
                </a>
              </Button>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 mt-4">
              <Button onClick={() => scrollToSection("work")}>
                View My Work
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" /> Download Resume
              </Button>
            </div>
          </div>
          <div className="flex justify-center md:justify-end">
            <div className="relative w-[280px] h-[280px] md:w-[320px] md:h-[320px] rounded-full overflow-hidden border-4 border-background shadow-xl">
              <img src={avatar} alt="" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
