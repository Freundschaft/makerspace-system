import { CarpentryProjectForm } from "./project-form"

export default function NewCarpentryProjectPage() {
  return (
    <div className="container mx-auto px-4 py-6 sm:py-10">
      <h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">New Carpentry Project</h1>
      <CarpentryProjectForm />
    </div>
  )
}
