interface Props {
  id: boolean
}

export default function StateDisplay({ id }: Props) {
  if (id) {
    return (
      <div className=" mr-0 rounded-sm bg-blue-400 p-0 text-center text-white">
        <span>SOLICITADO</span>
      </div>
    )
  } else {
    return (
      <div className=" mr-0 rounded-sm bg-red-700 p-0 text-center text-white">
        <span>INDEFERIDO</span>
      </div>
    )
  }
}
