export function About() {
  return (
    <section id="about" className="py-16 bg-muted/30">
      <div className="container items-center px-4 md:px-6">
        <div className="flex flex-col gap-4 max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            About Me
          </h2>

          <div className="space-y-4 text-muted-foreground">
            <p>
              I'm a Developer with 1+ years of experiences in Odoo development.
              I have a strong background in JavaScript and Python.
            </p>

            <p>
              I'm passionate about clean code, performance optimization, and
              creating seamless user experiences.
            </p>
          </div>

          <div className="mt-6">
            <h3 className="text-xl font-semibold mb-3">Experience</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-baseline">
                  <h4 className="font-medium">Software Developer</h4>
                  <span className="text-sm text-muted-foreground">
                    2024 - 2025
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Gigarion Technology
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
