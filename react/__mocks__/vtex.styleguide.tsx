import React from 'react'

export const Input = ({
  label,
  error,
  errorMessage,
  isLoading,
  prefix,
  suffix,
  ...props
}: any) => {
  return (
    <label>
      {label}
      {prefix}
      <input
        data-isloading={isLoading}
        data-error={error}
        data-errormessage={errorMessage}
        {...props}
      />
      {suffix}
    </label>
  )
}

export const Button = jest.fn(
  ({ isLoading, variation, block, children, ...props }) => {
    return (
      <button
        data-variation={variation}
        data-isloading={isLoading}
        data-block={block}
        {...props}
      >
        {children}
      </button>
    )
  }
)
