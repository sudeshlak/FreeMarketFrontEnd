export const styleSelect: any = {
  control: (base: any) => ({
    ...base,
    cursor: 'pointer',
    "@media only screen and (max-width: 992px)": {
      ...base["@media only screen and (max-width: 992px)"],
      fontSize: "0.8em",
    }
  }),
  option: (base: any) => ({
    ...base,
    cursor: 'pointer',
    zIndex: 5,
    "@media only screen and (max-width: 992px)": {
      ...base["@media only screen and (max-width: 992px)"],
      fontSize: "0.8em",
    }
  }),
  placeholder: (base: any) => ({
    ...base,
    "@media only screen and (max-width: 992px)": {
      ...base["@media only screen and (max-width: 992px)"],
      fontSize: "0.8em",
    }
  })
}