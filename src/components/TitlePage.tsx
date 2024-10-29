import { Route } from 'lucide-react'

type titlePageProps = {
  title: string
}

export const TitlePage = ({ title }: titlePageProps) => {
  return (
    <div className="flex items-center gap-4">
      <div className="flex size-14 items-center justify-center rounded-full bg-cyan-900">
        <Route className="size-6 text-white sm:size-8" />{' '}
      </div>
      <h1 className="text-[1.2rem] sm:text-[1.8rem] md:text-[2.2rem]">
        {title}
      </h1>
    </div>
  )
}
