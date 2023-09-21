import classnames from "classnames"


function NumberButton({children, className, variant, ...rest}) {
  
      let variantClass = variant ? `button-${variant}` : null
      const allClass = classnames("button", className, variantClass)
      return (
            <button className={allClass} {...rest}>{children}</button>
      )
}

export default NumberButton