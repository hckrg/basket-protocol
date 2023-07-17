export type ToggleSwitchProps = {
    checked: boolean,
    onChange: () => void,
    label?: string | null,
    id: string
  }
  
  function ToggleSwitch({ id, checked, onChange, label }: ToggleSwitchProps) {
  
    return (
      <div className="flex items-center justify-center">
        <label htmlFor={id} className="flex items-center cursor-pointer">
          {label && 
              <div className="mx-3 text-gray-400 text-sm font-light">
                  {label}
              </div>
          }
          <div className="relative">
            <input
              type="checkbox"
              checked={checked}
              onChange={onChange}
              id={id}
              className="sr-only"
            />
            <div className="block toggle bg-gray-400 w-10 h-6 rounded-full"></div>
            <div className="dot absolute left-1 top-1 bg-white-100 w-4 h-4 rounded-full transition"></div>
          </div>
        </label>
      </div>
    );
  }
  
  export default ToggleSwitch;