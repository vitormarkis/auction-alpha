import { Dispatch, SetStateAction, useCallback, useState } from "react"

export const useLimitedInput = (
  initialValue: string,
  step: number
): [string, Dispatch<SetStateAction<string>>, (event: any) => void] => {
  const [price, setPrice] = useState(initialValue)

  const handlePrice = useCallback(
    (event: any) => {
      const inputValue = event.target.value
      const newValue = parseFloat(inputValue)
      if (!isNaN(newValue)) {
        const roundedValue = parseFloat(newValue.toFixed(step))
        if (roundedValue !== newValue) {
          setPrice(roundedValue.toString())
        } else {
          setPrice(inputValue)
        }
      } else {
        setPrice("")
      }
    },
    [initialValue, step]
  )

  return [price, setPrice, handlePrice]
}
