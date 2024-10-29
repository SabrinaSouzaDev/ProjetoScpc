'use client'
import Image from 'next/image'
import LogoBrancSvg from '../../../public/static/icon/dpe-branca.svg'

export function Logo() {
  return (
    <div className="grow items-start">
      <Image
        className="xs:p-2 justify-start"
        src={LogoBrancSvg}
        alt="Logo Defensoria"
        height={70}
        width={70}
        // blurDataURL="data:..."
        // placeholder="blur"
        placeholder="blur"
        blurDataURL="/static/images/logo/LOGO_DPE_PA_BRANCA.png" // Placeholder de baixa qualidade
        // fill
      />
    </div>
  )
}
