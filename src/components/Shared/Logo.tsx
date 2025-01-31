import Image from 'next/image'

export function Logo() {
  return (
    <div className="grow items-start">
      <Image
        className="xs:p-2 justify-start"
        src="/static/image/logo/LOGO-DPE-PA_BRANCA.png"
        alt="Logo Defensoria"
        height={70}
        width={70}
      />
    </div>
  )
}
