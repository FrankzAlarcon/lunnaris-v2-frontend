'use client'

import { useNavbar } from "@/hooks/use-navbar"
import { cn } from "@/lib/utils"
import { useEffect } from "react"
import { useMediaQuery } from "usehooks-ts"

interface ContainerProps {
  children: React.ReactNode
}

const Container = ({
  children
}: ContainerProps) => {
  const matches = useMediaQuery(
    '(max-width: 1024px)'
  )
  const {
    collapsed,
    onCollapse,
    onExpand
  } = useNavbar((state) => state)

  useEffect(() => {
    if (matches) {
      onCollapse()
    } else {
      onExpand()
    }
  }, [matches, onCollapse, onExpand])

  return (
    <div className={cn(
      'flex-1 bg-black',
      collapsed ? 'ml-[70px]' : 'ml-[70px] lg:ml-60'
    )

    }>{children}</div>
  )
}

export default Container