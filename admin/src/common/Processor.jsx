import React from 'react'

function Processor({widthValue=6,heightValue=6,borderColorValue="primary",borderWidth=2}) {
  return (
    <div className={`h-${widthValue} w-${heightValue} animate-spin rounded-full border-${borderWidth} border-solid border-${borderColorValue} border-t-transparent`}></div>
  )
}

export default Processor