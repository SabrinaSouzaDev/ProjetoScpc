'use client'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { routes } from '@/constants/routes'
import { usePathname } from 'next/navigation'
import React from 'react'

function camelCaseToWords(input: string): string {
  return input
    .replace(/([a-z])([A-Z])/g, '$1 $2') // Add space between lowercase and uppercase letters
    .replace(/([A-Z])([A-Z][a-z])/g, '$1 $2') // Add space between sequences of uppercase and lowercase letters
    .replace(/^./, (str) => str.toUpperCase()) // Capitalize the first letter
}

function Breadcrumbs() {
  const path = usePathname()
  const segments = path.split('/').filter((segment) => segment !== '')

  return (
    <Breadcrumb className="xs:w-11/12 flex content-end items-center justify-end sm:w-11/12 md:w-11/12 lg:w-11/12 xl:w-11/12">
      <BreadcrumbList className="flex flex-row items-center justify-start py-1">
        <BreadcrumbItem>
          <BreadcrumbLink href={routes.HOME}>
            <p className="text-primary-main flex items-center justify-center font-bold">
              Página Inicial
            </p>
          </BreadcrumbLink>
        </BreadcrumbItem>
        {segments.map((segment, index) => {
          const url = `/${segments.slice(0, index + 1).join('/')}`
          const isLastSegment = index === segments.length - 1

          return (
            <React.Fragment key={index}>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href={url}>
                  <p className="text-primary-main flex items-center justify-center pl-2 font-bold">
                    {isLastSegment
                      ? camelCaseToWords(segment)
                      : camelCaseToWords(segment)}
                  </p>
                </BreadcrumbLink>
              </BreadcrumbItem>
            </React.Fragment>
          )
        })}
      </BreadcrumbList>
    </Breadcrumb>
  )
}

export function PageTitle() {
  return (
    <div className="flex items-center justify-center pb-7">
      <Breadcrumbs />
    </div>
  )
}
