'use client'

import Hint from "@/components/hint"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { useNavbar } from "@/hooks/use-navbar"
import { ArrowLeftFromLine, ArrowRightFromLine } from "lucide-react"

const Toggle = () => {
  const {
    collapsed,
    onExpand,
    onCollapse
  } = useNavbar((state) => state)

  const label = collapsed ? 'Mostrar' : 'Ocultar'
  return (
    <>
      {collapsed && (
        <div className="hidden lg:flex w-full items-center justify-center pt-4 mb-4">
          <Hint
          label={label}
          side="right"
          asChild
          >
            <Button
              onClick={onExpand}
              className="h-auto p-2 hover:bg-white/10"
              variant='ghost'
            >
              <ArrowRightFromLine className="h-4 w-4 text-white" />
            </Button>
          </Hint>
        </div>
      )}
      {!collapsed && (
        <div className="pt-4 mb-4 flex items-center w-full">
          <Hint
            label={label}
            side="right"
            asChild
          >
            <Button
              onClick={onCollapse}
              className="h-auto p-2 ml-auto mr-2 hover:bg-white/10"
              variant='ghost'
            >
              <ArrowLeftFromLine className="h-4 w-4 text-white" />
            </Button>
          </Hint>
        </div>
      )}
    </>
  )
}

export const ToggleSkeleton = () => {
  return (
    <div className="pt-6 p-3 pl-6 mb-2 lg:flex items-center justify-between w-full">
      <Skeleton className="hidden lg:block h-6 w-[100px]" />
      <Skeleton className="h-6 w-6" />
    </div>
  )
}

export default Toggle