import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Github, Linkedin, Mail } from "lucide-react"

export function Contact() {
  return (
    <section id="contact" className="py-16 bg-muted/30">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col gap-8 max-w-3xl mx-auto">
          <div>
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Get In Touch</h2>
            <p className="text-muted-foreground mt-2">
              Feel free to reach out if you're looking for a developer, have a question, or just want to connect.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">Contact Information</h3>
                <div className="space-y-3">
                  <a
                    href="mailto:hello@example.com"
                    className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Mail className="h-4 w-4" />
                    <span>lethanhtrung7412@gmail.com</span>
                  </a>
                  <p className="text-sm text-muted-foreground">
                    I'm currently available for freelance work and full-time positions.
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">Connect</h3>
                <div className="flex gap-3">
                  <Button asChild size="icon" variant="outline">
                    <a href="https://github.com/lethanhtrung7412" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                      <Github className="h-4 w-4" />
                    </a>
                  </Button>
                  <Button asChild size="icon" variant="outline">
                    <a href="https://www.linkedin.com/in/lethanhtrung712/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                      <Linkedin className="h-4 w-4" />
                    </a>
                  </Button>
                </div>
              </div>
            </div>

            <form className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">
                  Name
                </label>
                <Input id="name" placeholder="Your name" />
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Email
                </label>
                <Input id="email" type="email" placeholder="Your email" />
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium">
                  Message
                </label>
                <Textarea id="message" placeholder="Your message" className="min-h-[120px]" />
              </div>

              <Button type="submit" className="w-full">
                Send Message
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
