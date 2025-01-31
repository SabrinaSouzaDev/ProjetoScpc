import React, { useState } from 'react'

const ExcluirButtonComponent = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isOpenApproved, setIsOpenApproved] = useState(false)

  const handleOpen = () => setIsOpen(true)
  const handleClose = () => setIsOpen(false)

  const handleOpenApproved = () => setIsOpenApproved(true)
  const handleCloseApproved = () => setIsOpenApproved(false)

  return (
    <div className="flex justify-end">
      <button
        className="mr-5 mt-5 rounded bg-green-500 px-4 py-2 text-white"
        onClick={handleOpenApproved}
      >
        Aprovar
      </button>
      <button
        onClick={handleOpen}
        className="mt-5 rounded bg-red-500 px-4 py-2 text-white"
      >
        Reprovar
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-screen items-end justify-center px-4 pb-20 pt-4 text-center sm:block sm:p-0">
            <div className="inline-block overflow-hidden rounded-lg bg-white text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:align-middle">
              <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:text-left">
                    <h3 className="text-lg font-medium leading-6 text-gray-900">
                      Justificar
                    </h3>
                  </div>
                </div>
                <input
                  type="text"
                  className="mt-2 w-full rounded-md border p-2"
                  placeholder="Digite aqui"
                />
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                  onClick={handleClose}
                  type="button"
                  className="mr-2 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mr-5 sm:mt-0 sm:w-auto sm:text-sm"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleClose}
                  type="button"
                  className="inline-flex w-full justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-2 sm:w-auto sm:text-sm"
                >
                  Reprovar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {isOpenApproved && (
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-screen items-end justify-center px-4 pb-20 pt-4 text-center sm:block sm:p-0">
            <div className="inline-block overflow-hidden rounded-lg bg-white text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:align-middle">
              <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:text-left">
                    <h3 className="text-lg font-medium leading-6 text-gray-900">
                      Você deseja aprovar estas folgas?
                    </h3>
                  </div>
                </div>
              </div>
              <div className="space-between bg-gray-50 px-4 py-3 sm:flex sm:flex-row sm:px-6">
                <button
                  onClick={handleCloseApproved}
                  type="button"
                  className="inline-flex w-full justify-center rounded-md border border-transparent bg-green-500 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 sm:ml-2 sm:w-auto sm:text-sm"
                >
                  Aprovar
                </button>
                <button
                  onClick={handleCloseApproved}
                  type="button"
                  className="mr-2 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mr-5 sm:mt-0 sm:w-auto sm:text-sm"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ExcluirButtonComponent
