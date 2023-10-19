"use client"
import React from 'react'
import Select from 'react-select'
import useCountries from '../hooks/useCountries'
import { Country } from 'world-countries'

export type CountrySelectValue = {
    flag: string,
    label: string
    latlng: number[]
    region: string
    value: string
}

interface CountrySelectProps{
    value?: CountrySelectValue
    onChange: (value: CountrySelectValue)=>void
}

const CountrySelect:React.FC<CountrySelectProps> = ({
    value,
    onChange
}) => {

    const { getAll } = useCountries();

  return (
    <div>
      <Select className='text-black'
      placeholder = "Anywhere"
      isClearable
      options={getAll()}
      value = {value}
      onChange={(value) => onChange(value as CountrySelectValue)}
      formatOptionLabel={(options: any )=>(
        <div className='flex flex-row items-center gap-3'>

          <div>
            {options.flag}
          </div>

          <div>
            {options.label},
            <span className='text-neutral-800 ml-1'>
                {options.region}
            </span>
          </div>


        </div>
      )}
      />
    </div>
  )
}

export default CountrySelect
