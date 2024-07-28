import { useRef, useState, useId } from 'react'
import { FloatingPortal, useFloating, arrow, shift, offset, type Placement } from '@floating-ui/react-dom-interactions'
import { motion, AnimatePresence } from 'framer-motion'

interface Props {
  children: React.ReactNode
  rendenPopover: React.ReactNode
  className?: string
  initialOpen?: boolean
  placement?: Placement
}

const Popover = ({ children, className, rendenPopover, initialOpen, placement }: Props) => {
  const [open, setOpen] = useState(initialOpen || false)
  const arrowRef = useRef<HTMLElement>(null)
  const { x, y, reference, floating, strategy, middlewareData } = useFloating({
    middleware: [offset(6), shift(), arrow({ element: arrowRef })],
    placement: placement
  })
  const showPopover = () => {
    setOpen(true)
  }
  const hidePopover = () => {
    setOpen(false)
  }

  const id = useId()
  return (
    <div className={className} ref={reference} onMouseEnter={showPopover} onMouseLeave={hidePopover}>
      {children}
      <FloatingPortal id={id}>
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, transform: 'scale(0)' }}
              animate={{ opacity: 1, transform: 'scale(1)' }}
              exit={{ opacity: 0, transform: 'scale(0)' }}
              ref={floating}
              style={{
                position: strategy,
                top: y ?? 0,
                left: x ?? 0,
                width: 'max-content',
                transformOrigin: `${middlewareData.arrow?.x}px top`
              }}
            >
              <span
                ref={arrowRef}
                className='border-x-transparent border-t-transparent border-b-white border-[11px] absolute translate-y-[-99%]'
                style={{ left: middlewareData.arrow?.x, top: middlewareData.arrow?.y }}
              />
              {rendenPopover}
            </motion.div>
          )}
        </AnimatePresence>
      </FloatingPortal>
    </div>
  )
}

export default Popover
