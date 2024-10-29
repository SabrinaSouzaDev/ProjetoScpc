import React from 'react'

import ExcluirButtonComponent from './ExcluirButtonComponent'
import EditarButtonComponent from './EditarButtonComponent'

export default function TableButton() {
  return (
    <div className="flex  ">
      <EditarButtonComponent />
      <ExcluirButtonComponent />
    </div>
  )
}
