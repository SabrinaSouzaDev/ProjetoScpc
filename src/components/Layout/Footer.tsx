import bruninhoAvatar from '../../../public/static/images/funcionarios/bruninhoAvatar.png'
import brunoAvatar2 from '../../../public/static/images/funcionarios/brunoAvatar2.jpeg'
import hutoAvatar from '../../../public/static/images/funcionarios/hutoAvatar.jpeg'
import imgAvatar from '../../../public/static/images/funcionarios/imgAvatar.png'
import otavioAvatar from '../../../public/static/images/funcionarios/otavioAvatar.jpeg'
import sabrinaAvatar from '../../../public/static/images/funcionarios/sabrinaAvatar.png'
import { PopoverDemo } from './PopoverEquipeScpc'

const employees = [
  {
    src: brunoAvatar2,
    alt: 'Avatar User 1',
    name: 'Bruno Fraga',
    position: 'Dev.FullStack/Product Owner',
    linkUrl: 'https://www.linkedin.com/in/bruun21/',
  },
  {
    src: sabrinaAvatar,
    alt: 'Avatar User 2',
    name: 'Sabrina Souza',
    position: 'Dev.Front-End',
    linkUrl: 'https://www.linkedin.com/in/sabrina-souza-6361a5148/',
  },
  {
    src: otavioAvatar,
    alt: 'Avatar User 3',
    name: 'Otávio Araujo',
    position: 'Dev.Front-End',
    linkUrl: 'https://www.linkedin.com/in/ot%C3%A1vio-araujo-77474b1ab/',
  },
  {
    src: bruninhoAvatar,
    alt: 'Avatar User 4',
    name: 'Pedro Inácio',
    position: 'Estagiário Dev.Back-End',
    linkUrl: 'https://www.linkedin.com/in/pedro-in%C3%A1cio-366a1823b/',
  },
  {
    src: imgAvatar,
    alt: 'Avatar User 5',
    name: 'Marcus Oliveira',
    position: 'Estagiário Dev.Back-End',
  },
  {
    src: hutoAvatar,
    alt: 'Avatar User 6',
    name: 'Hugo Rodrigues',
    position: 'Estagiário Dev.Front-End',
    linkUrl: 'https://www.linkedin.com/in/hugojrodrigues/',
  },
]
export function Footer() {
  return (
    <footer className="mt-auto bg-primary py-4 text-white dark:bg-primary/35">
      <div className="container mx-auto text-center">
        <PopoverDemo
          employees={employees}
          triggerText={'Defensoria Pública do Estado do Pará'}
          contentText={
            'Equipe desenvolvedora do sistema SCPC da Defensoria Pública do Estado do Pará'
          }
        />
      </div>
    </footer>
  )
}
