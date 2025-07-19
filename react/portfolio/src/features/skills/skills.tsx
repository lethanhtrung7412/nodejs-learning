const skills = {
  frontend: [
    "React",
    "TypeScript",
    "JavaScript",
    "HTML/CSS",
    "Tailwind CSS",
    "React Query",
  ],
  backend: ["Node.js", "Express", "REST APIs", "GraphQL", "Python"],
  tools: ["Git", "GitHub", "VS Code", "Jest", "Cypress", "Webpack", "npm/yarn"],
};

export function Skills() {
  return (
    <section id="skills" className="py-16">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col gap-8 max-w-3xl mx-auto">
          <div>
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Skills & Technologies
            </h2>
            <p className="text-muted-foreground mt-2">
              My technical skills and the technologies I work with.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Frontend Development</h3>
              <div className="flex flex-wrap gap-2">
                {skills.frontend.map((skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-background rounded-md text-sm border"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Backend Development</h3>
              <div className="flex flex-wrap gap-2">
                {skills.backend.map((skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-background rounded-md text-sm border"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Tools Development</h3>
              <div className="flex flex-wrap gap-2">
                {skills.tools.map((skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-background rounded-md text-sm border"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
