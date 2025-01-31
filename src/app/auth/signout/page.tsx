'use client'

import { routes } from '@/constants/routes'
import { redirect } from 'next/navigation'

const url = process.env.NEXT_PUBLIC_BASE_PATH

export default function Signout() {
  redirect(url ?? routes.HOME)
}
