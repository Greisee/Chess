import { useMediaQuery } from 'react-responsive'

export function isMobile(){
    return useMediaQuery({
        query: '(min-width: 1224px)'
      })
}