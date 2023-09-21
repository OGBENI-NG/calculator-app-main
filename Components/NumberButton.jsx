import classnames from "classnames"


function NumberButton({children, onClick, className, variant, ...rest}) {
  
      let variantClass = variant ? `button-${variant}` : null
      const allClass = classnames("button", className, variantClass)
      const handleClick = (e) => {
            e.preventDefault()
            onClick(children); // Pass the button's value to the onClick handler
      };
      return (
            <button onClick={handleClick} className={allClass} {...rest}>{children}</button>
      )
}

export default NumberButton