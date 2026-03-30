'use client'

import {
    Dialog,
    DialogPanel,
    Transition,
} from '@headlessui/react'
import { Fragment } from 'react'
import { X } from 'lucide-react'
import ContactForm from '../web/ContactForm'

interface ContactPopupProps {
    isOpen: boolean
    setIsOpen: (open: boolean) => void
}

const ContactPopup: React.FC<ContactPopupProps> = ({ isOpen, setIsOpen }) => {
    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog
                as="div"
                className="relative z-9999"
                onClose={setIsOpen}
            >
                {/* Backdrop animation */}
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" />
                </Transition.Child>

                {/* Modal wrapper */}
                <div className="fixed inset-0 flex items-center justify-center p-4">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-400"
                        enterFrom="opacity-0 scale-95 translate-y-4"
                        enterTo="opacity-100 scale-100 translate-y-0"
                        leave="ease-in duration-250"
                        leaveFrom="opacity-100 scale-100 translate-y-0"
                        leaveTo="opacity-0 scale-95 translate-y-4"
                    >
                        <DialogPanel className="relative w-full max-w-2xl max-h-[90vh] rounded-4xl bg-white shadow-xl overflow-hidden">
                            {/* header */}
                            <div className="sticky top-0 z-10 flex items-center justify-between px-8 py-5 border-b border-b-gray-200 bg-white">
                                <h2 className="text-2xl font-semibold tracking-tight">
                                    Contact Us
                                </h2>

                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="rounded-full bg-red-500 p-2 text-white hover:bg-red-600 transition"
                                >
                                    <X size={18} />
                                </button>
                            </div>

                            {/* scrollable form area */}
                            <div className="max-h-[calc(90vh-80px)] overflow-y-auto px-8 py-6">
                                <ContactForm />
                            </div>
                        </DialogPanel>

                    </Transition.Child>
                </div>
            </Dialog>
        </Transition>
    )
}

export default ContactPopup
