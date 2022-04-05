export const customStyles = {
    control: (provided: any) => ({
      ...provided,
      borderRadius: 3,
      borderColor: '#9E9E9E',
      minHeight: 27,
      paddingTop: 2,
      paddingBottom: 2,
      fontSize: '.8em',
      height: '29px'
    }),
    indicatorsContainer: (provided: any) => ({
      ...provided,
      minHeight: 25,
      padding: '0px 8px 0px 8px',
      marginTop: -12
    }),
    valueContainer: (provided: any) => ({
      ...provided,
      paddingTop: 0,
      paddingBottom: 0,
      marginBottom: '10px',
    }),
    indicatorContainer: (provided: any) => ({
      ...provided,
      padding: '0px 8px 11px 8px',
    }),
    placeholder: (provided: any) => ({
      ...provided,
      paddingBottom: '2px'
    }),
    menu: (provided: any) => ({
      ...provided,
      marginTop: 1,
    }),
    option: (provided: any) => ({
      ...provided,
      fontSize: '.8rem',
      paddingTop: 2,
      paddingBottom: 2
    }),
    singleValue: (provided: any) => ({
      ...provided,
      paddingBottom: 2
    }),
    indicatorSeparator: (provided: any) => ({
      ...provided,
      marginBottom: 17,
      marginTop: 15,
    }),
  };